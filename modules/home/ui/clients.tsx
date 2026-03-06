"use client";

import { Language, siteContent } from "@/content/siteContent";

interface ClientsProps {
  language: Language;
}

export default function Clients({ language }: ClientsProps) {
  const content = siteContent[language].mobile;

  return (
    <section className="bg-gray-100 p-6 pb-12 dark:bg-zinc-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary dark:text-white">{content.clientsTitle}</h2>
        <div className="ml-4 h-px flex-grow bg-gray-300 dark:bg-gray-700" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {content.clients.map((client, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded border border-transparent bg-white p-4 shadow-sm transition-all hover:border-gray-300 dark:bg-zinc-800 dark:hover:border-zinc-600"
          >
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-gray-800 dark:text-gray-200">{client.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
