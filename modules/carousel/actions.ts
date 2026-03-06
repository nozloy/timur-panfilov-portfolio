"use server";

import path from "node:path";
import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { adminService } from "@/modules/auth/admin-service";
import { getServerSession } from "@/modules/auth/session";
import {
  createPresignedUploadSchema,
  createSlideSchema,
  deleteSlideSchema,
  reorderSlidesSchema,
  toggleSlidePublishSchema,
  updateSlideSchema,
} from "@/modules/carousel/schemas";
import { carouselService } from "@/modules/carousel/service";
import { assertRequiredEnv, runtimeEnv } from "@/shared/lib/env";
import { buildCarouselPublicUrl, s3Client } from "@/shared/lib/s3";

const fileExtensionByMimeType: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

const assertAdminEmail = async () => {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email) {
    throw new Error("Unauthorized");
  }

  const isAdmin = await adminService.assertAdmin(email);
  if (!isAdmin) {
    throw new Error("Forbidden");
  }

  return email;
};

export const createPresignedUploadUrl = async (input: {
  fileName: string;
  contentType: "image/jpeg" | "image/png" | "image/webp" | "image/avif";
  size: number;
}) => {
  await assertAdminEmail();

  const data = createPresignedUploadSchema.parse(input);
  const bucket = assertRequiredEnv(runtimeEnv.carouselBucket, "CAROUSEL_S3_BUCKET");

  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const extension = fileExtensionByMimeType[data.contentType] ?? path.extname(data.fileName).replace(".", "") ?? "bin";
  const objectKey = `carousel/home/${year}/${month}/${randomUUID()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: objectKey,
    ContentType: data.contentType,
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  return {
    objectKey,
    uploadUrl,
    publicUrl: buildCarouselPublicUrl(objectKey),
  };
};

export const createSlide = async (input: {
  objectKey: string;
  publicUrl: string;
  width?: number | null;
  height?: number | null;
  titleRu?: string | null;
  titleEn?: string | null;
  altRu: string;
  altEn: string;
  isPublished?: boolean;
}) => {
  await assertAdminEmail();

  const data = createSlideSchema.parse(input);
  const slide = await carouselService.createSlide(data);
  revalidatePath("/");
  revalidatePath("/admin/carousel");
  return slide;
};

export const updateSlide = async (input: {
  id: string;
  titleRu?: string | null;
  titleEn?: string | null;
  altRu?: string;
  altEn?: string;
  isPublished?: boolean;
}) => {
  await assertAdminEmail();

  const data = updateSlideSchema.parse(input);
  const slide = await carouselService.updateSlide(data);
  revalidatePath("/");
  revalidatePath("/admin/carousel");
  return slide;
};

export const deleteSlide = async (input: { id: string }) => {
  await assertAdminEmail();

  const data = deleteSlideSchema.parse(input);
  await carouselService.deleteSlide(data.id);
  revalidatePath("/");
  revalidatePath("/admin/carousel");
};

export const reorderSlides = async (input: { slideIds: string[] }) => {
  await assertAdminEmail();

  const data = reorderSlidesSchema.parse(input);
  await carouselService.reorderSlides(data);
  revalidatePath("/");
  revalidatePath("/admin/carousel");
};

export const toggleSlidePublish = async (input: { id: string; isPublished: boolean }) => {
  await assertAdminEmail();

  const data = toggleSlidePublishSchema.parse(input);
  const slide = await carouselService.togglePublish(data.id, data.isPublished);
  revalidatePath("/");
  revalidatePath("/admin/carousel");
  return slide;
};
