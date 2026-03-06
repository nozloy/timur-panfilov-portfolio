import { z } from "zod";
import { allowedUploadMimeTypes, maxUploadSizeBytes } from "@/shared/lib/env";

const trimmedNullableString = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .optional()
  .nullable()
  .transform((value) => (value && value.length > 0 ? value : null));

export const createPresignedUploadSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(allowedUploadMimeTypes),
  size: z.number().int().positive().max(maxUploadSizeBytes),
});

export const createSlideSchema = z.object({
  objectKey: z.string().trim().min(1),
  publicUrl: z.string().trim().url(),
  width: z.number().int().positive().optional().nullable(),
  height: z.number().int().positive().optional().nullable(),
  titleRu: trimmedNullableString,
  titleEn: trimmedNullableString,
  altRu: z.string().trim().min(1).max(300),
  altEn: z.string().trim().min(1).max(300),
  isPublished: z.boolean().optional(),
});

export const updateSlideSchema = z.object({
  id: z.string().trim().min(1),
  titleRu: trimmedNullableString,
  titleEn: trimmedNullableString,
  altRu: z.string().trim().min(1).max(300).optional(),
  altEn: z.string().trim().min(1).max(300).optional(),
  isPublished: z.boolean().optional(),
});

export const deleteSlideSchema = z.object({
  id: z.string().trim().min(1),
});

export const toggleSlidePublishSchema = z.object({
  id: z.string().trim().min(1),
  isPublished: z.boolean(),
});

export const reorderSlidesSchema = z.object({
  slideIds: z.array(z.string().trim().min(1)).min(1),
});
