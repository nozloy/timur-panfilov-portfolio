import { carouselRepo } from "@/modules/carousel/repo";
import type {
  CarouselSlide,
  CreateCarouselSlideInput,
  LocalizedSlideText,
  ReorderSlidesInput,
  SlideLanguage,
  UpdateCarouselSlideInput,
} from "@/modules/carousel/types";
import { buildCarouselPublicUrl } from "@/shared/lib/s3";

const normalizeOptionalText = (value: string | null | undefined): string | null => {
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};

const withResolvedPublicUrl = <T extends CarouselSlide>(slide: T): T => ({
  ...slide,
  publicUrl: buildCarouselPublicUrl(slide.objectKey),
});

export const carouselService = {
  async getPublishedSlides(): Promise<CarouselSlide[]> {
    const slides = await carouselRepo.getPublishedSlides();
    return slides.map(withResolvedPublicUrl);
  },

  async getAllSlides(): Promise<CarouselSlide[]> {
    const slides = await carouselRepo.getAllSlides();
    return slides.map(withResolvedPublicUrl);
  },

  async createSlide(input: CreateCarouselSlideInput): Promise<CarouselSlide> {
    const altRu = input.altRu.trim();
    const altEn = input.altEn.trim();

    if (!altRu || !altEn) {
      throw new Error("Поля altRu и altEn обязательны.");
    }

    const nextOrder = (await carouselRepo.getMaxSortOrder()) + 1;

    const created = await carouselRepo.createSlide({
      objectKey: input.objectKey,
      publicUrl: input.publicUrl,
      width: input.width ?? null,
      height: input.height ?? null,
      titleRu: normalizeOptionalText(input.titleRu),
      titleEn: normalizeOptionalText(input.titleEn),
      altRu,
      altEn,
      isPublished: input.isPublished ?? false,
      sortOrder: nextOrder,
    });

    return withResolvedPublicUrl(created);
  },

  async updateSlide(input: UpdateCarouselSlideInput): Promise<CarouselSlide> {
    const existingSlide = await carouselRepo.getSlideById(input.id);
    if (!existingSlide) {
      throw new Error("Слайд не найден.");
    }

    const nextAltRu = input.altRu?.trim() ?? existingSlide.altRu;
    const nextAltEn = input.altEn?.trim() ?? existingSlide.altEn;

    if (!nextAltRu || !nextAltEn) {
      throw new Error("Поля altRu и altEn обязательны.");
    }

    const nextIsPublished = input.isPublished ?? existingSlide.isPublished;

    if (nextIsPublished && !existingSlide.publicUrl) {
      throw new Error("Нельзя опубликовать слайд без изображения.");
    }

    const updated = await carouselRepo.updateSlide(input.id, {
      titleRu: normalizeOptionalText(input.titleRu),
      titleEn: normalizeOptionalText(input.titleEn),
      altRu: nextAltRu,
      altEn: nextAltEn,
      isPublished: nextIsPublished,
    });

    return withResolvedPublicUrl(updated);
  },

  async deleteSlide(id: string): Promise<void> {
    await carouselRepo.deleteSlide(id);
  },

  async reorderSlides(input: ReorderSlidesInput): Promise<void> {
    const slides = await carouselRepo.getAllSlides();
    const currentIds = new Set(slides.map((slide) => slide.id));

    if (input.slideIds.length !== currentIds.size) {
      throw new Error("Передан неполный список слайдов для сортировки.");
    }

    const hasUnknown = input.slideIds.some((id) => !currentIds.has(id));
    if (hasUnknown) {
      throw new Error("Список сортировки содержит неизвестные слайды.");
    }

    await carouselRepo.reorderSlides(input.slideIds);
  },

  async togglePublish(id: string, isPublished: boolean): Promise<CarouselSlide> {
    const existingSlide = await carouselRepo.getSlideById(id);
    if (!existingSlide) {
      throw new Error("Слайд не найден.");
    }

    if (isPublished && !existingSlide.publicUrl) {
      throw new Error("Нельзя опубликовать слайд без изображения.");
    }

    const updated = await carouselRepo.updateSlide(id, { isPublished });
    return withResolvedPublicUrl(updated);
  },

  getLocalizedText(slide: CarouselSlide, language: SlideLanguage): LocalizedSlideText {
    if (language === "en") {
      return {
        title: slide.titleEn,
        alt: slide.altEn,
      };
    }

    return {
      title: slide.titleRu,
      alt: slide.altRu,
    };
  },
};
