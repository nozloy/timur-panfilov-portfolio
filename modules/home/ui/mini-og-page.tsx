"use client";

import { SiteLanguageContent } from "@/content/siteContent";

interface MiniOgPageProps {
  content: SiteLanguageContent;
}

export default function MiniOgPage({ content }: MiniOgPageProps) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#0b0d11] p-4 md:p-8">
      <section className="relative aspect-[1200/630] w-full max-w-[1200px] overflow-hidden rounded-[28px] border border-white/10 bg-[#13161d] shadow-[0_28px_100px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(157,164,179,0.22),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(96,106,124,0.18),transparent_44%)]" />
        <div className="relative z-10 grid h-full grid-cols-[37%_63%]">
          <div className="relative overflow-hidden border-r border-white/10">
            <img alt={content.hero.portraitAlt} src="/images/light.webp" className="h-full w-full object-cover object-top" decoding="async" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-12">
            <h1 className="text-[5rem] font-extrabold leading-[0.86] tracking-[-0.02em] text-zinc-100">
              {content.hero.firstName}
              <br />
              {content.hero.lastName}
            </h1>

            <p className="mt-4 text-[1.02rem] font-semibold uppercase tracking-[0.08em] text-zinc-300">{content.mini.subtitle}</p>

            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1 text-[1rem] font-medium text-zinc-300/95">
              <p>{content.mini.experiencePrimary}</p>
              <p>{content.mini.experienceSecondary}</p>
              <p className="col-span-2">{content.mini.format}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {content.mini.highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.86rem] font-semibold tracking-[0.03em] text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-9 text-zinc-200">
              <div className="flex items-center gap-3 text-[1.03rem] font-semibold">
                <i className="fas fa-phone text-sm opacity-80" aria-hidden="true" />
                <span>+7 999 164 99 19</span>
              </div>
              <div className="flex items-center gap-3 text-[1.03rem] font-semibold">
                <i className="fab fa-telegram-plane text-sm opacity-80" aria-hidden="true" />
                <span>@timur_panfilovich</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
