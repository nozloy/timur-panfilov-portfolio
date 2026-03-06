"use client";

import { useEffect } from "react";
import { Language, siteContent } from "@/content/siteContent";
import HomeCarousel from "@/modules/carousel/ui/home-carousel";
import type { CarouselSlide } from "@/modules/carousel/types";

interface DesktopLayoutProps {
  language: Language;
  slides: CarouselSlide[];
}

export default function DesktopLayout({ language, slides }: DesktopLayoutProps) {
  const content = siteContent[language];

  useEffect(() => {
    const darkImage = new Image();
    darkImage.src = "/images/dark.webp";
  }, []);

  return (
    <div className="relative z-10 min-h-screen w-full px-4 py-6 lg:px-6 lg:py-8 xl:px-10 xl:py-10">
      <div className="mx-auto min-h-[calc(100vh-3rem)] w-full max-w-[1180px] overflow-hidden rounded-2xl border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] dark:border-white/10 lg:min-h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-5rem)]">
        <div className="flex min-h-full">
          <aside className="w-[320px] shrink-0 flex-col border-r border-black/30 bg-[#1a1a1a] text-white dark:border-white/10 lg:w-[360px] xl:flex xl:w-[420px]">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-800">
              <img
                alt={content.hero.portraitAlt}
                className="absolute inset-0 h-full w-full scale-100 transform-gpu object-cover object-top opacity-100 transition-[opacity,transform] duration-700 dark:opacity-0"
                decoding="async"
                loading="eager"
                src="/images/light.webp"
              />
              <img
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-[1.1] transform-gpu object-cover object-top opacity-0 transition-[opacity,transform] duration-700 dark:opacity-100"
                decoding="async"
                loading="eager"
                src="/images/dark.webp"
              />
            </div>

            <div className="bg-[#1a1a1a] p-10 xl:p-12">
              <h1 className="mb-4 text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.02em]">
                {content.hero.firstName}
                <br />
                {content.hero.lastName}
              </h1>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-zinc-400">{content.hero.subtitle}</p>
            </div>

            <div className="flex-grow bg-zinc-900 p-10 xl:p-12">
              <h2 className="mb-8 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">{content.desktop.experienceTitle}</h2>
              <ul className="space-y-6 text-base font-medium">
                {content.desktop.experienceItems.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="mr-4 mt-[0.45rem] h-2 w-2 shrink-0 rounded-full bg-white" />
                    <span className="leading-snug text-zinc-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="flex flex-grow flex-col">
            <section className="relative flex flex-grow border-b border-zinc-200/80 bg-white p-12 dark:border-zinc-700/80 dark:bg-zinc-900 xl:p-16">
              <div className="mr-12 hidden flex-col justify-center xl:flex">
                <span className="rotate-180 text-[0.68rem] font-extrabold uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-700 [writing-mode:vertical-rl]">
                  {content.desktop.servicesTitle}
                </span>
              </div>
              <div className="max-w-3xl">
                <h2 className="mb-8 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400 xl:hidden">
                  {content.desktop.servicesTitle}
                </h2>
                <div className="space-y-8">
                  {content.desktop.services.map((service) => (
                    <div key={service.title}>
                      <h3 className="mb-2 text-3xl font-semibold uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
                        {service.title}
                      </h3>
                      <p className="text-base font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <HomeCarousel slides={slides} language={language} />

            <section className="relative flex border-b border-zinc-200 bg-gray-100 p-12 dark:border-zinc-700 dark:bg-zinc-800 xl:p-16">
              <div className="mr-12 hidden flex-col justify-center xl:flex">
                <span className="rotate-180 text-[0.68rem] font-extrabold uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-600 [writing-mode:vertical-rl]">
                  {content.desktop.clientsTitle}
                </span>
              </div>
              <div className="w-full">
                <h2 className="mb-8 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400 xl:hidden">
                  {content.desktop.clientsTitle}
                </h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-7 xl:grid-cols-3 2xl:grid-cols-4">
                  {content.desktop.clients.map((client) => (
                    <div
                      className="min-w-0 whitespace-nowrap border-b border-zinc-300 pb-3 text-[0.95rem] font-semibold leading-tight tracking-[0.02em] text-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                      key={client}
                    >
                      {client}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative flex bg-zinc-300 p-12 dark:bg-zinc-700 xl:p-16">
              <div className="mr-12 hidden flex-col justify-center xl:flex">
                <span className="rotate-180 text-[0.68rem] font-extrabold uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-400 [writing-mode:vertical-rl]">
                  {content.desktop.contactsTitle}
                </span>
              </div>
              <div className="w-full">
                <h2 className="mb-8 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-600 dark:text-zinc-300 xl:hidden">
                  {content.desktop.contactsTitle}
                </h2>
                <div className="space-y-6">
                  {content.contacts.map((contact) => (
                    <a
                      className="pressable group flex items-center"
                      href={contact.href}
                      key={contact.value}
                      target={contact.target}
                      rel={contact.target ? "noopener noreferrer" : undefined}
                    >
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-500/70 bg-white/45 text-zinc-800 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white dark:border-zinc-300/35 dark:bg-zinc-800/70 dark:text-zinc-100">
                        <i className={`${contact.icon} text-[0.95rem]`} aria-hidden="true" />
                      </div>
                      <span className="text-lg font-semibold tracking-[0.01em] text-zinc-800 dark:text-zinc-100">{contact.value}</span>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
