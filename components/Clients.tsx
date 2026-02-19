import React from 'react';
import { ClientItem } from '../types';

const clientData: ClientItem[] = [
  { name: "Yandex Eda" },
  { name: "Yandex Market" },
  { name: "Yandex Cloud" },
  { name: "OTP Bank" },
  { name: "T-Bank" },
  { name: "Gazprombank" },
  { name: "HH.ru" },
  { name: "T1" }
];

const Clients: React.FC = () => {
  return (
    <section className="bg-gray-100 dark:bg-zinc-900 p-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-primary dark:text-white">Клиенты</h2>
        <div className="h-px bg-gray-300 dark:bg-gray-700 flex-grow ml-4"></div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {clientData.map((client, index) => (
          <div 
            key={index}
            className="flex items-center justify-center p-4 rounded bg-white dark:bg-zinc-800 shadow-sm border border-transparent hover:border-gray-300 dark:hover:border-zinc-600 transition-all"
          >
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-gray-800 dark:text-gray-200">{client.name}</span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <a 
          className="pressable inline-block px-10 py-4 bg-primary dark:bg-white text-white dark:text-primary text-[0.72rem] font-semibold uppercase tracking-[0.22em] hover:bg-black dark:hover:bg-gray-200 transition-colors rounded shadow-lg" 
          href="#"
        >
          Презентация
        </a>
      </div>
    </section>
  );
};

export default Clients;
