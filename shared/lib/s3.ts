import { S3Client } from "@aws-sdk/client-s3";
import { runtimeEnv } from "@/shared/lib/env";

const credentials =
  runtimeEnv.carouselAccessKeyId && runtimeEnv.carouselSecretAccessKey
    ? {
        accessKeyId: runtimeEnv.carouselAccessKeyId,
        secretAccessKey: runtimeEnv.carouselSecretAccessKey,
      }
    : undefined;

export const s3Client = new S3Client({
  region: runtimeEnv.carouselRegion,
  endpoint: runtimeEnv.carouselEndpoint,
  forcePathStyle: runtimeEnv.carouselForcePathStyle,
  credentials,
});

const trimSlashes = (value: string): string => value.replace(/^\/+|\/+$/g, "");

const joinUrlPath = (base: string, ...parts: string[]): string => {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedParts = parts.map((part) => trimSlashes(part)).filter(Boolean);
  if (normalizedParts.length === 0) {
    return normalizedBase;
  }

  return `${normalizedBase}/${normalizedParts.join("/")}`;
};

const isSameOriginAsS3Endpoint = (url: URL): boolean => {
  if (!runtimeEnv.carouselEndpoint) {
    return false;
  }

  try {
    const endpointUrl = new URL(runtimeEnv.carouselEndpoint);
    return url.origin === endpointUrl.origin;
  } catch {
    return false;
  }
};

const resolveCdnBaseUrl = (): string | null => {
  if (!runtimeEnv.carouselCdnUrl) {
    return null;
  }

  const baseUrl = runtimeEnv.carouselCdnUrl.replace(/\/+$/, "");
  const bucket = runtimeEnv.carouselBucket;

  if (!bucket) {
    return baseUrl;
  }

  try {
    const parsed = new URL(baseUrl);
    const pathSegments = trimSlashes(parsed.pathname).split("/").filter(Boolean);
    const hasBucketSegment = pathSegments.includes(bucket);

    // For S3-compatible endpoints (like s3.twcstorage.ru), when CDN URL equals endpoint root,
    // automatically append bucket to avoid broken links.
    if (isSameOriginAsS3Endpoint(parsed) && !hasBucketSegment) {
      parsed.pathname = `/${[...pathSegments, bucket].join("/")}`;
      return parsed.toString().replace(/\/+$/, "");
    }
  } catch {
    return baseUrl;
  }

  return baseUrl;
};

export const buildCarouselPublicUrl = (objectKey: string): string => {
  const cdnBaseUrl = resolveCdnBaseUrl();
  if (cdnBaseUrl) {
    return joinUrlPath(cdnBaseUrl, objectKey);
  }

  if (!runtimeEnv.carouselBucket) {
    throw new Error("CAROUSEL_S3_BUCKET is required to build public URLs.");
  }

  if (runtimeEnv.carouselEndpoint) {
    return joinUrlPath(runtimeEnv.carouselEndpoint, runtimeEnv.carouselBucket, objectKey);
  }

  return joinUrlPath(
    `https://${runtimeEnv.carouselBucket}.s3.${runtimeEnv.carouselRegion}.amazonaws.com`,
    objectKey,
  );
};
