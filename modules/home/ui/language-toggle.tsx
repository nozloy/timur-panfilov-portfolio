"use client";

import { Language } from "@/content/siteContent";

interface LanguageToggleProps {
  language: Language;
  onChange: (language: Language) => void;
  ariaLabel: string;
  switchToRussianAria: string;
  switchToEnglishAria: string;
  positionClassName?: string;
}

export default function LanguageToggle({
  language,
  onChange,
  ariaLabel,
  switchToRussianAria,
  switchToEnglishAria,
  positionClassName = "bottom-4 right-20",
}: LanguageToggleProps) {
  return (
    <div
      className={`fixed ${positionClassName} z-50 flex items-center gap-1 rounded-full bg-zinc-900/90 p-1 text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm`}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => onChange("ru")}
        aria-label={switchToRussianAria}
        className={`pressable rounded-full px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
          language === "ru" ? "bg-white text-zinc-900 shadow-sm" : "bg-transparent text-zinc-100 hover:bg-white/10"
        }`}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-label={switchToEnglishAria}
        className={`pressable rounded-full px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
          language === "en" ? "bg-white text-zinc-900 shadow-sm" : "bg-transparent text-zinc-100 hover:bg-white/10"
        }`}
      >
        EN
      </button>
    </div>
  );
}
