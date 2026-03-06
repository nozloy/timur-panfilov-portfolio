import LoginCard from "@/modules/auth/ui/login-card";

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#0b111d] text-zinc-100">
      <div
        className="absolute inset-0 opacity-90"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 10% 14%, rgba(120, 170, 255, 0.28), transparent 35%), radial-gradient(circle at 86% 84%, rgba(255, 145, 92, 0.24), transparent 42%), linear-gradient(125deg, #0e1420 0%, #080b12 52%, #0b111d 100%)",
        }}
      />
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <section className="hidden lg:block">
          <div className="max-w-xl space-y-7">
            <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/80">
              Timur Portfolio
            </p>
            <h1 className="text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-white">
              Admin Access
              <br />
              Control Center
            </h1>
            <p className="max-w-lg text-base font-medium leading-relaxed text-zinc-300">
              Управляйте каруселью главной страницы: загружайте изображения в S3, редактируйте локализацию RU/EN и
              публикуйте изменения без редеплоя сайта.
            </p>
            <div className="grid max-w-lg gap-3 text-sm text-zinc-200/90">
              <div className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">OAuth через Yandex ID</div>
              <div className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">Доступ только для email из таблицы admins</div>
              <div className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">Безопасная загрузка файлов через presigned URL</div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-md">
          <LoginCard errorCode={params.error} />
        </div>
      </div>
    </main>
  );
}
