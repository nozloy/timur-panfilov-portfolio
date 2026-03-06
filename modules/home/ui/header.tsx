"use client";

import { useEffect } from "react";
import { Language, siteContent } from "@/content/siteContent";

interface HeaderProps {
  language: Language;
}

export default function Header({ language }: HeaderProps) {
  const content = siteContent[language];

  useEffect(() => {
    const darkImage = new Image();
    darkImage.src = "/images/dark.webp";
  }, []);

  return (
    <header className="relative">
      <div className="group relative h-[500px] w-full overflow-hidden">
        <img
          alt={content.hero.portraitAlt}
          className="absolute inset-0 h-full w-full scale-[1.04] transform-gpu object-cover object-top opacity-100 transition-[opacity,transform] duration-700 dark:opacity-0"
          decoding="async"
          loading="eager"
          src="/images/light.webp"
        />
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-100 transform-gpu object-cover object-top opacity-0 transition-[opacity,transform] duration-700 dark:opacity-100"
          decoding="async"
          loading="eager"
          src="/images/dark.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 z-10 w-full p-6 text-white">
          <h1 className="mb-2 font-display text-[3.15rem] font-extrabold leading-[0.92] tracking-[-0.015em] text-white">
            {content.hero.fullName}
          </h1>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-gray-300">{content.hero.subtitle}</p>
        </div>
      </div>
    </header>
  );
}
