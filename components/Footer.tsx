import React from 'react';
import { ContactItem } from '../types';

const contactData: ContactItem[] = [
  { 
    icon: "fas fa-phone", 
    value: "+7 999 164 99 19", 
    href: "tel:+79991649919" 
  },
  { 
    icon: "fab fa-telegram-plane", 
    value: "@timur_panfilovich", 
    href: "https://t.me/timur_panfilovich",
    target: "_blank"
  },
  { 
    icon: "fas fa-envelope", 
    value: "panfilov.timur@gmail.com", 
    href: "mailto:panfilov.timur@gmail.com" 
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-zinc-950 text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="20" id="grid" patternUnits="userSpaceOnUse" width="20">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%"></rect>
        </svg>
      </div>
      <div className="relative z-10">
        <h2 className="text-[0.72rem] font-semibold tracking-[0.24em] uppercase mb-8 border-b border-white/20 pb-4">Контакты</h2>
        <div className="space-y-6">
          {contactData.map((contact, index) => (
            <a 
              key={index}
              className="pressable flex items-center gap-4 group hover:opacity-80 transition-opacity" 
              href={contact.href}
              target={contact.target}
              rel={contact.target ? "noopener noreferrer" : undefined}
            >
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <i className={`${contact.icon} text-sm`}></i>
              </div>
              <span className="text-[0.96rem] font-medium tracking-[0.01em]">{contact.value}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-6 opacity-10 text-8xl font-display font-extrabold tracking-tight pointer-events-none select-none">
        TP
      </div>
    </footer>
  );
};

export default Footer;
