import path from "node:path";
import { config as loadEnv } from "dotenv";
import { GetBucketCorsCommand, PutBucketCorsCommand, S3Client } from "@aws-sdk/client-s3";

loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv({ path: path.resolve(process.cwd(), ".env") });

const read = (key: string): string | undefined => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value : undefined;
};

const bucket = read("CAROUSEL_S3_BUCKET");
if (!bucket) {
  throw new Error("Environment variable CAROUSEL_S3_BUCKET is required.");
}
const region = read("CAROUSEL_S3_REGION") ?? "us-east-1";
const endpoint = read("CAROUSEL_S3_ENDPOINT");
const forcePathStyle = read("CAROUSEL_S3_FORCE_PATH_STYLE") === "true";
const accessKeyId = read("CAROUSEL_S3_ACCESS_KEY_ID");
const secretAccessKey = read("CAROUSEL_S3_SECRET_ACCESS_KEY");
const appUrl = read("BETTER_AUTH_URL") ?? read("NEXT_PUBLIC_APP_URL");

const parseOrigins = (): string[] => {
  const fromArgs = process.argv.slice(2).map((value) => value.trim()).filter(Boolean);
  const defaults = [appUrl, "http://localhost:3000"].filter((value): value is string => Boolean(value));
  const unique = new Set<string>([...fromArgs, ...defaults].map((origin) => origin.replace(/\/$/, "")));
  return Array.from(unique);
};

const origins = parseOrigins();

if (origins.length === 0) {
  console.error("No origins provided. Pass at least one origin, e.g. npm run s3:cors:apply -- https://example.com");
  process.exit(1);
}

const credentials =
  accessKeyId && secretAccessKey
    ? {
        accessKeyId,
        secretAccessKey,
      }
    : undefined;

const s3 = new S3Client({
  region,
  endpoint,
  forcePathStyle,
  credentials,
});

(async () => {
  await s3.send(
    new PutBucketCorsCommand({
      Bucket: bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedMethods: ["PUT", "GET", "HEAD"],
            AllowedOrigins: origins,
            AllowedHeaders: ["*"],
            ExposeHeaders: ["ETag", "x-amz-request-id"],
            MaxAgeSeconds: 3000,
          },
        ],
      },
    }),
  );

  const current = await s3.send(new GetBucketCorsCommand({ Bucket: bucket }));

  console.log(`CORS applied for bucket: ${bucket}`);
  console.log(`Origins: ${origins.join(", ")}`);
  console.log(JSON.stringify(current.CORSRules, null, 2));
})()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
