const read = (key: string): string | undefined => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value : undefined;
};

export const runtimeEnv = {
  nodeEnv: read("NODE_ENV") ?? "development",
  appUrl: read("BETTER_AUTH_URL") ?? read("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000",
  betterAuthSecret: read("BETTER_AUTH_SECRET") ?? "change-me-in-production",
  databaseUrl: read("DATABASE_URL"),
  yandexClientId: read("YANDEX_CLIENT_ID"),
  yandexClientSecret: read("YANDEX_CLIENT_SECRET"),
  carouselBucket: read("CAROUSEL_S3_BUCKET"),
  carouselRegion: read("CAROUSEL_S3_REGION") ?? "us-east-1",
  carouselEndpoint: read("CAROUSEL_S3_ENDPOINT"),
  carouselAccessKeyId: read("CAROUSEL_S3_ACCESS_KEY_ID"),
  carouselSecretAccessKey: read("CAROUSEL_S3_SECRET_ACCESS_KEY"),
  carouselForcePathStyle: read("CAROUSEL_S3_FORCE_PATH_STYLE") === "true",
  carouselCdnUrl: read("CAROUSEL_CDN_URL"),
};

export const allowedUploadMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const maxUploadSizeBytes = 10 * 1024 * 1024;

export const assertRequiredEnv = (value: string | undefined, key: string) => {
  if (!value) {
    throw new Error(`Environment variable ${key} is required.`);
  }

  return value;
};
