import React from 'react';
import { Language, siteContent } from '../content/siteContent';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const content = siteContent[language];

  return (
    <footer className="bg-[#0b1020] dark:bg-[#070b16] text-white px-6 pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <div className="mb-7 flex items-center gap-4">
        <h2 className="shrink-0 text-[0.72rem] font-semibold tracking-[0.24em] uppercase text-white/95">
          {content.mobile.contactsTitle}
        </h2>
        <div className="h-px w-full bg-white/20"></div>
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
              <i className={`${contact.icon} text-[0.86rem]`} aria-hidden="true"></i>
            </div>
            <span className="break-all text-[0.98rem] font-medium tracking-[0.01em] leading-tight text-white/95">
              {contact.value}
            </span>
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
