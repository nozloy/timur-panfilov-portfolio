"use client";

import { Language, siteContent } from "@/content/siteContent";

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const content = siteContent[language];

  return (
    <footer className="bg-[#0b1020] px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 text-white dark:bg-[#070b16]">
      <div className="mb-7 flex items-center gap-4">
        <h2 className="shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/95">{content.mobile.contactsTitle}</h2>
        <div className="h-px w-full bg-white/20" />
      </div>

      <div className="space-y-1">
        {content.contacts.map((contact) => (
          <a
            key={contact.value}
            className="pressable group flex items-center gap-4 rounded-xl px-1 py-3 transition-colors hover:bg-white/5"
            href={contact.href}
            target={contact.target}
            rel={contact.target ? "noopener noreferrer" : undefined}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors group-hover:bg-white/10">
              <i className={`${contact.icon} text-[0.86rem]`} aria-hidden="true" />
            </div>
            <span className="break-all text-[0.98rem] font-medium leading-tight tracking-[0.01em] text-white/95">{contact.value}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}
