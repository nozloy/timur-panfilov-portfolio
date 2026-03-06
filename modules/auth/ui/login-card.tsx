"use client";

import { useMemo, useState } from "react";
import { KeyRound, Loader2, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/modules/auth/auth-client";

interface LoginCardProps {
  errorCode?: string;
}

const errorMap: Record<string, string> = {
  forbidden: "Ваша учетная запись не имеет доступа к админке.",
  oauth: "Не удалось выполнить вход через Yandex. Попробуйте снова.",
};

export default function LoginCard({ errorCode }: LoginCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const errorMessage = useMemo(() => {
    if (!errorCode) {
      return null;
    }

    return errorMap[errorCode] ?? "Ошибка авторизации.";
  }, [errorCode]);

  const signInWithYandex = async () => {
    setIsLoading(true);

    try {
      await authClient.signIn.oauth2({
        providerId: "yandex",
        callbackURL: "/admin/carousel",
        errorCallbackURL: "/admin/login?error=oauth",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-white/20 bg-white/95 shadow-[0_24px_70px_rgba(4,10,30,0.45)] backdrop-blur">
      <CardHeader className="space-y-4">
        <p className="inline-flex w-fit rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-zinc-700">
          Secure Login
        </p>
        <CardTitle className="text-3xl font-extrabold uppercase tracking-[-0.01em] text-zinc-900">Admin Panel</CardTitle>
        <CardDescription className="text-sm leading-relaxed text-zinc-600">
          Вход выполняется через Yandex OAuth. После авторизации система проверит, что ваш email присутствует в таблице{" "}
          <span className="font-semibold text-zinc-700">admins</span>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {errorMessage ? (
          <div
            className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
            role="alert"
            aria-live="polite"
          >
            {errorMessage}
          </div>
        ) : null}

        <div className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
          <div className="flex items-start gap-2 text-sm text-zinc-700">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>Сессия защищена, пароль в системе не хранится.</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-zinc-700">
            <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden="true" />
            <span>Если доступ отклонен, проверьте email в таблице admins.</span>
          </div>
        </div>

        <Button
          type="button"
          className="h-11 w-full text-[0.78rem] uppercase tracking-[0.14em]"
          onClick={signInWithYandex}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
          {isLoading ? "Переход к Yandex..." : "Войти через Yandex"}
        </Button>

        <p className="text-center text-xs leading-relaxed text-zinc-500">
          Нажимая кнопку, вы подтверждаете вход в административную зону управления контентом.
        </p>
      </CardContent>
    </Card>
  );
}
