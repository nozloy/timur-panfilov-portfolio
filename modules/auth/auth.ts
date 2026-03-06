import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies, toNextJsHandler } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import { prisma } from "@/shared/lib/prisma";
import { runtimeEnv } from "@/shared/lib/env";

export const auth = betterAuth({
  baseURL: runtimeEnv.appUrl,
  secret: runtimeEnv.betterAuthSecret,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "yandex",
          clientId: runtimeEnv.yandexClientId ?? "",
          clientSecret: runtimeEnv.yandexClientSecret ?? "",
          authorizationUrl: "https://oauth.yandex.ru/authorize",
          tokenUrl: "https://oauth.yandex.ru/token",
          userInfoUrl: "https://login.yandex.ru/info?format=json",
          scopes: ["login:email"],
          getUserInfo: async (tokens) => {
            const accessToken = tokens.accessToken;
            const response = await fetch("https://login.yandex.ru/info?format=json", {
              headers: {
                Authorization: `OAuth ${accessToken}`,
              },
            });

            if (!response.ok) {
              throw new Error("Could not fetch Yandex user profile.");
            }

            const profile = (await response.json()) as {
              id?: string;
              default_email?: string;
              display_name?: string;
              real_name?: string;
              login?: string;
              default_avatar_id?: string;
            };

            const email = profile.default_email ?? `${profile.id}@yandex.oauth`;
            const name = profile.real_name ?? profile.display_name ?? profile.login ?? email;
            const image = profile.default_avatar_id
              ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
              : undefined;

            return {
              id: profile.id ?? email,
              email,
              name,
              emailVerified: true,
              image,
            };
          },
        },
      ],
    }),
    nextCookies(),
  ],
});

export const authHandler = toNextJsHandler(auth);
