import type { NextConfig } from "next";

const resolveRemotePatterns = () => {
  const patterns: Array<{ protocol: "http" | "https"; hostname: string; pathname: string }> = [
    {
      protocol: "https",
      hostname: "s3.twcstorage.ru",
      pathname: "/**",
    },
  ];

  const cdnUrl = process.env.CAROUSEL_CDN_URL;
  if (!cdnUrl) {
    return patterns;
  }

  try {
    const url = new URL(cdnUrl);
    const protocol = url.protocol.replace(":", "") as "http" | "https";
    const exists = patterns.some(
      (pattern) => pattern.hostname === url.hostname && pattern.protocol === protocol,
    );

    if (!exists) {
      patterns.push({
        protocol,
        hostname: url.hostname,
        pathname: "/**",
      });
    }
  } catch {
    return patterns;
  }

  return patterns;
};

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: resolveRemotePatterns(),
  },
};

export default nextConfig;
