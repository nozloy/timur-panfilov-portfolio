export type CarouselSlide = {
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
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type SlideLanguage = "ru" | "en";

export type LocalizedSlideText = {
  title: string | null;
  alt: string;
};

export type CreateCarouselSlideInput = {
  objectKey: string;
  publicUrl: string;
  width?: number | null;
  height?: number | null;
  titleRu?: string | null;
  titleEn?: string | null;
  altRu: string;
  altEn: string;
  isPublished?: boolean;
};

export type UpdateCarouselSlideInput = {
  id: string;
  titleRu?: string | null;
  titleEn?: string | null;
  altRu?: string;
  altEn?: string;
  isPublished?: boolean;
};

export type ReorderSlidesInput = {
  slideIds: string[];
};
