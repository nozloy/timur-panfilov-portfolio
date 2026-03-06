"use client";

import { useMemo, useState } from "react";
import { Loader2, Save, Trash2, Upload, GripVertical, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  createPresignedUploadUrl,
  createSlide,
  deleteSlide,
  reorderSlides,
  toggleSlidePublish,
  updateSlide,
} from "@/modules/carousel/actions";

type SlideItem = {
  id: string;
  objectKey: string;
  publicUrl: string;
  width: number | null;
  height: number | null;
  titleRu: string | null;
  titleEn: string | null;
  altRu: string;
  altEn: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

interface AdminCarouselClientProps {
  initialSlides: SlideItem[];
}

type NewSlideForm = {
  titleRu: string;
  titleEn: string;
  altRu: string;
  altEn: string;
  isPublished: boolean;
};

const initialFormState: NewSlideForm = {
  titleRu: "",
  titleEn: "",
  altRu: "",
  altEn: "",
  isPublished: false,
};

const getImageDimensions = async (file: File): Promise<{ width: number; height: number }> => {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Could not read image dimensions."));
      img.src = objectUrl;
    });

    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const normalizeError = (error: unknown): string => {
  if (error instanceof TypeError && error.message.toLowerCase().includes("failed to fetch")) {
    return "Не удалось загрузить файл в S3. Проверьте CORS у bucket (должен разрешать Origin вашего сайта, метод PUT и header Content-Type).";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error. Please try again.";
};

export default function AdminCarouselClient({ initialSlides }: AdminCarouselClientProps) {
  const [slides, setSlides] = useState<SlideItem[]>(
    [...initialSlides].sort((a, b) => a.sortOrder - b.sortOrder),
  );
  const [drafts, setDrafts] = useState<Record<string, SlideItem>>(
    Object.fromEntries(initialSlides.map((slide) => [slide.id, slide])),
  );
  const [isOrderDirty, setIsOrderDirty] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [pendingSlideId, setPendingSlideId] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newSlideForm, setNewSlideForm] = useState<NewSlideForm>(initialFormState);
  const [isCreating, setIsCreating] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const publishedCount = useMemo(() => slides.filter((slide) => slide.isPublished).length, [slides]);

  const onFileChange = (file: File | null) => {
    setSelectedFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const onCreateSlide = async () => {
    if (!selectedFile) {
      toast.error("Выберите файл для загрузки.");
      return;
    }

    if (!newSlideForm.altRu.trim() || !newSlideForm.altEn.trim()) {
      toast.error("Заполните alt текст для RU и EN.");
      return;
    }

    setIsCreating(true);

    try {
      const { width, height } = await getImageDimensions(selectedFile);
      const presigned = await createPresignedUploadUrl({
        fileName: selectedFile.name,
        contentType: selectedFile.type as "image/jpeg" | "image/png" | "image/webp" | "image/avif",
        size: selectedFile.size,
      });

      const uploadResponse = await fetch(presigned.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        const details = await uploadResponse.text().catch(() => "");
        throw new Error(
          `Не удалось загрузить файл в S3 (HTTP ${uploadResponse.status}).${details ? ` ${details.slice(0, 220)}` : ""}`,
        );
      }

      const created = await createSlide({
        objectKey: presigned.objectKey,
        publicUrl: presigned.publicUrl,
        width,
        height,
        titleRu: newSlideForm.titleRu,
        titleEn: newSlideForm.titleEn,
        altRu: newSlideForm.altRu,
        altEn: newSlideForm.altEn,
        isPublished: newSlideForm.isPublished,
      });

      const newSlide = {
        ...created,
        createdAt: new Date(created.createdAt).toISOString(),
        updatedAt: new Date(created.updatedAt).toISOString(),
      } as SlideItem;

      setSlides((prev) => [...prev, newSlide].sort((a, b) => a.sortOrder - b.sortOrder));
      setDrafts((prev) => ({ ...prev, [newSlide.id]: newSlide }));

      setNewSlideForm(initialFormState);
      onFileChange(null);

      toast.success("Слайд добавлен.");
    } catch (error) {
      toast.error(normalizeError(error));
    } finally {
      setIsCreating(false);
    }
  };

  const onDraftChange = (id: string, patch: Partial<SlideItem>) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...patch,
      },
    }));
  };

  const onSaveSlide = async (id: string) => {
    const draft = drafts[id];
    if (!draft) {
      return;
    }

    setPendingSlideId(id);

    try {
      const updated = await updateSlide({
        id,
        titleRu: draft.titleRu,
        titleEn: draft.titleEn,
        altRu: draft.altRu,
        altEn: draft.altEn,
        isPublished: draft.isPublished,
      });

      const nextSlide = {
        ...updated,
        createdAt: new Date(updated.createdAt).toISOString(),
        updatedAt: new Date(updated.updatedAt).toISOString(),
      } as SlideItem;

      setSlides((prev) => prev.map((slide) => (slide.id === id ? nextSlide : slide)));
      setDrafts((prev) => ({ ...prev, [id]: nextSlide }));
      toast.success("Слайд обновлен.");
    } catch (error) {
      toast.error(normalizeError(error));
    } finally {
      setPendingSlideId(null);
    }
  };

  const onTogglePublish = async (id: string, value: boolean) => {
    setPendingSlideId(id);

    try {
      const updated = await toggleSlidePublish({
        id,
        isPublished: value,
      });

      const nextSlide = {
        ...updated,
        createdAt: new Date(updated.createdAt).toISOString(),
        updatedAt: new Date(updated.updatedAt).toISOString(),
      } as SlideItem;

      setSlides((prev) => prev.map((slide) => (slide.id === id ? nextSlide : slide)));
      setDrafts((prev) => ({ ...prev, [id]: nextSlide }));
    } catch (error) {
      toast.error(normalizeError(error));
    } finally {
      setPendingSlideId(null);
    }
  };

  const onDeleteSlide = async (id: string) => {
    const confirmed = window.confirm("Удалить слайд? Это действие нельзя отменить.");
    if (!confirmed) {
      return;
    }

    setPendingSlideId(id);

    try {
      await deleteSlide({ id });
      setSlides((prev) => prev.filter((slide) => slide.id !== id));
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setIsOrderDirty(true);
      toast.success("Слайд удален.");
    } catch (error) {
      toast.error(normalizeError(error));
    } finally {
      setPendingSlideId(null);
    }
  };

  const moveSlide = (fromId: string, toId: string) => {
    if (fromId === toId) {
      return;
    }

    setSlides((prev) => {
      const fromIndex = prev.findIndex((slide) => slide.id === fromId);
      const toIndex = prev.findIndex((slide) => slide.id === toId);

      if (fromIndex < 0 || toIndex < 0) {
        return prev;
      }

      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);

      const normalized = next.map((slide, index) => ({
        ...slide,
        sortOrder: index + 1,
      }));

      setDrafts((prevDrafts) => ({
        ...prevDrafts,
        ...Object.fromEntries(normalized.map((slide) => [slide.id, slide])),
      }));

      return normalized;
    });

    setIsOrderDirty(true);
  };

  const onSaveOrder = async () => {
    setIsSavingOrder(true);

    try {
      await reorderSlides({
        slideIds: slides.map((slide) => slide.id),
      });
      setIsOrderDirty(false);
      toast.success("Порядок сохранен.");
    } catch (error) {
      toast.error(normalizeError(error));
    } finally {
      setIsSavingOrder(false);
    }
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-xl uppercase tracking-[0.1em]">Home Carousel</CardTitle>
            <Badge variant="secondary" className="uppercase tracking-[0.14em]">
              {publishedCount}/{slides.length} published
            </Badge>
          </div>
          <CardDescription>
            Загружайте изображения в отдельный S3, редактируйте тексты RU/EN и управляйте порядком.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-slide-file">Файл</Label>
              <Input
                id="new-slide-file"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-3 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-600">
                <Switch
                  checked={newSlideForm.isPublished}
                  onCheckedChange={(value) =>
                    setNewSlideForm((prev) => ({
                      ...prev,
                      isPublished: value,
                    }))
                  }
                />
                Опубликовать сразу
              </div>
            </div>
          </div>

          {previewUrl ? (
            <div className="overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100">
              <img src={previewUrl} alt="Предпросмотр слайда" className="h-52 w-full object-cover" />
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-title-ru">Заголовок (RU)</Label>
              <Input
                id="new-title-ru"
                value={newSlideForm.titleRu}
                onChange={(event) => setNewSlideForm((prev) => ({ ...prev, titleRu: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-title-en">Заголовок (EN)</Label>
              <Input
                id="new-title-en"
                value={newSlideForm.titleEn}
                onChange={(event) => setNewSlideForm((prev) => ({ ...prev, titleEn: event.target.value }))}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-alt-ru">Alt (RU)</Label>
              <Textarea
                id="new-alt-ru"
                value={newSlideForm.altRu}
                onChange={(event) => setNewSlideForm((prev) => ({ ...prev, altRu: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-alt-en">Alt (EN)</Label>
              <Textarea
                id="new-alt-en"
                value={newSlideForm.altEn}
                onChange={(event) => setNewSlideForm((prev) => ({ ...prev, altEn: event.target.value }))}
              />
            </div>
          </div>

          <Button type="button" onClick={onCreateSlide} disabled={isCreating || !selectedFile}>
            {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Добавить слайд
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-xl uppercase tracking-[0.1em]">Слайды</CardTitle>
            <Button variant="outline" onClick={onSaveOrder} disabled={!isOrderDirty || isSavingOrder}>
              {isSavingOrder ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpDown className="h-4 w-4" />}
              Сохранить порядок
            </Button>
          </div>
          <CardDescription>Перетаскивайте карточки для сортировки, затем сохраните порядок.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {slides.map((slide, index) => {
              const draft = drafts[slide.id] ?? slide;
              const isPending = pendingSlideId === slide.id;

              return (
                <article
                  key={slide.id}
                  draggable
                  onDragStart={() => setDraggedId(slide.id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => {
                    if (draggedId) {
                      moveSlide(draggedId, slide.id);
                    }
                    setDraggedId(null);
                  }}
                  className="rounded-xl border border-zinc-300 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">#{index + 1}</p>
                      <Badge variant={draft.isPublished ? "default" : "outline"}>
                        {draft.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span>Публикация</span>
                      <Switch
                        checked={draft.isPublished}
                        onCheckedChange={(value) => {
                          onDraftChange(slide.id, { isPublished: value });
                          void onTogglePublish(slide.id, value);
                        }}
                        disabled={isPending}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[280px_1fr]">
                    <div className="overflow-hidden rounded-lg border border-zinc-300 bg-zinc-100">
                      <img
                        src={slide.publicUrl}
                        alt={draft.altRu || draft.altEn}
                        className="h-44 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`title-ru-${slide.id}`}>Заголовок (RU)</Label>
                          <Input
                            id={`title-ru-${slide.id}`}
                            value={draft.titleRu ?? ""}
                            onChange={(event) => onDraftChange(slide.id, { titleRu: event.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`title-en-${slide.id}`}>Заголовок (EN)</Label>
                          <Input
                            id={`title-en-${slide.id}`}
                            value={draft.titleEn ?? ""}
                            onChange={(event) => onDraftChange(slide.id, { titleEn: event.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`alt-ru-${slide.id}`}>Alt (RU)</Label>
                          <Textarea
                            id={`alt-ru-${slide.id}`}
                            value={draft.altRu}
                            onChange={(event) => onDraftChange(slide.id, { altRu: event.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`alt-en-${slide.id}`}>Alt (EN)</Label>
                          <Textarea
                            id={`alt-en-${slide.id}`}
                            value={draft.altEn}
                            onChange={(event) => onDraftChange(slide.id, { altEn: event.target.value })}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="outline" onClick={() => onSaveSlide(slide.id)} disabled={isPending}>
                          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Сохранить
                        </Button>
                        <Button type="button" variant="destructive" onClick={() => onDeleteSlide(slide.id)} disabled={isPending}>
                          <Trash2 className="h-4 w-4" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {slides.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-10 text-sm text-zinc-500">
                Слайды еще не добавлены.
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
