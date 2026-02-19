import React, { useEffect } from 'react';
import { Language, siteContent } from '../content/siteContent';

interface DesktopLayoutProps {
  language: Language;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ language }) => {
  const content = siteContent[language];

  useEffect(() => {
    const darkImage = new Image();
    darkImage.src = '/images/dark.png';
  }, []);

  return (
    <div className="relative z-10 min-h-screen w-full px-4 py-6 lg:px-6 lg:py-8 xl:px-10 xl:py-10">
      <div className="mx-auto w-full max-w-[1180px] min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-5rem)] overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] border border-black/10 dark:border-white/10">
        <div className="flex min-h-full">
        <aside className="w-[320px] lg:w-[360px] xl:w-[420px] bg-[#1a1a1a] text-white flex flex-col shrink-0 border-r border-black/30 dark:border-white/10">
          <div className="relative aspect-[4/5] w-full bg-zinc-800 overflow-hidden">
            <img
              alt={content.hero.portraitAlt}
              className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-125 transition-opacity duration-700 opacity-100 dark:opacity-0"
              decoding="async"
              loading="eager"
              src="/images/photo.jpeg"
            />
            <img
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-125 transition-opacity duration-700 opacity-0 dark:opacity-100"
              decoding="async"
              loading="eager"
              src="/images/dark.png"
            />
          </div>

          <div className="p-10 xl:p-12 bg-primary">
            <h1 className="text-5xl font-extrabold mb-4 uppercase tracking-[-0.02em] leading-[0.9]">
              {content.hero.firstName}
              <br />
              {content.hero.lastName}
            </h1>
            <p className="text-[0.72rem] tracking-[0.34em] uppercase font-semibold text-zinc-400">{content.hero.subtitle}</p>
          </div>

          <div className="p-10 xl:p-12 flex-grow bg-zinc-900">
            <h2 className="text-[0.68rem] font-semibold tracking-[0.24em] uppercase mb-8 text-zinc-500">{content.desktop.experienceTitle}</h2>
            <ul className="space-y-6 text-base font-medium">
              {content.desktop.experienceItems.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-white mt-[0.45rem] mr-4 shrink-0"></span>
                  <span className="leading-snug text-zinc-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-grow flex flex-col">
          <section className="flex-grow bg-white dark:bg-zinc-900 p-12 xl:p-16 flex relative border-b border-zinc-200/80 dark:border-zinc-700/80">
            <div className="hidden xl:flex flex-col justify-center mr-12">
              <span className="[writing-mode:vertical-rl] rotate-180 text-[0.68rem] font-extrabold tracking-[0.5em] uppercase text-zinc-300 dark:text-zinc-700">
                {content.desktop.servicesTitle}
              </span>
            </div>
            <div className="max-w-3xl">
              <h2 className="xl:hidden text-[0.68rem] font-semibold tracking-[0.24em] uppercase mb-8 text-zinc-500 dark:text-zinc-400">
                {content.desktop.servicesTitle}
              </h2>
              <div className="space-y-8">
                {content.desktop.services.map((service) => (
                  <div key={service.title}>
                    <h3 className="text-3xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100 uppercase tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-base font-medium">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gray-100 dark:bg-zinc-800 p-12 xl:p-16 flex relative border-b border-zinc-200 dark:border-zinc-700">
            <div className="hidden xl:flex flex-col justify-center mr-12">
              <span className="[writing-mode:vertical-rl] rotate-180 text-[0.68rem] font-extrabold tracking-[0.5em] uppercase text-zinc-400 dark:text-zinc-600">
                {content.desktop.clientsTitle}
              </span>
            </div>
            <div className="w-full">
              <h2 className="xl:hidden text-[0.68rem] font-semibold tracking-[0.24em] uppercase mb-8 text-zinc-500 dark:text-zinc-400">
                {content.desktop.clientsTitle}
              </h2>
              <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-7 mb-12">
                {content.desktop.clients.map((client) => (
                  <div
                    className="min-w-0 text-zinc-800 dark:text-zinc-200 font-semibold text-[0.95rem] leading-tight pb-3 border-b border-zinc-300 dark:border-zinc-600 whitespace-nowrap tracking-[0.02em]"
                    key={client}
                  >
                    {client}
                  </div>
                ))}
              </div>
              <a
                className="pressable inline-flex items-center text-primary dark:text-white font-semibold uppercase tracking-[0.22em] text-[0.72rem] border-b-2 border-primary dark:border-white pb-1 hover:opacity-70 transition-opacity"
                href="#"
              >
                {content.desktop.presentationLinkText}
                <i className="fas fa-arrow-right ml-3 text-sm" aria-hidden="true"></i>
              </a>
            </div>
          </section>

          <section className="bg-zinc-300 dark:bg-zinc-700 p-12 xl:p-16 flex relative">
            <div className="hidden xl:flex flex-col justify-center mr-12">
              <span className="[writing-mode:vertical-rl] rotate-180 text-[0.68rem] font-extrabold tracking-[0.5em] uppercase text-zinc-500 dark:text-zinc-400">
                {content.desktop.contactsTitle}
              </span>
            </div>
            <div className="w-full">
              <h2 className="xl:hidden text-[0.68rem] font-semibold tracking-[0.24em] uppercase mb-8 text-zinc-600 dark:text-zinc-300">
                {content.desktop.contactsTitle}
              </h2>
              <div className="space-y-6">
                {content.contacts.map((contact) => (
                  <a
                    className="pressable flex items-center group"
                    href={contact.href}
                    key={contact.value}
                    target={contact.target}
                    rel={contact.target ? 'noopener noreferrer' : undefined}
                  >
                    <div className="w-10 h-10 rounded-full border border-zinc-500/70 dark:border-zinc-300/35 bg-white/45 dark:bg-zinc-800/70 text-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-4 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors">
                      <i className={`${contact.icon} text-[0.95rem]`} aria-hidden="true"></i>
                    </div>
                    <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 tracking-[0.01em]">{contact.value}</span>
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
};

export default DesktopLayout;
