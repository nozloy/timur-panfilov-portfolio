import React from 'react';
import { ServiceItem } from '../types';

const servicesData: ServiceItem[] = [
  {
    title: "Смета для тендера",
    description: "Быстрый и точный расчет стоимости застройки для участия в тендере."
  },
  {
    title: "Реализация «под ключ»",
    description: "Полный цикл производства: от идеи и чертежей до монтажа и демонтажа."
  },
  {
    title: "Шеф-монтаж",
    description: "Профессиональный контроль и руководство монтажными работами на площадке."
  },
  {
    title: "Стенды и ЭКСПО",
    description: "Разработка и застройка выставочных стендов любой сложности."
  }
];

const Services: React.FC = () => {
  return (
    <section className="p-6 bg-card-light dark:bg-card-dark">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-primary dark:text-white">Услуги</h2>
        <div className="text-5xl font-display font-extrabold text-gray-100 dark:text-gray-800 select-none leading-none">02</div>
      </div>
      <div className="space-y-6">
        {servicesData.map((service, index) => (
          <div 
            key={index}
            className="group relative pl-4 border-l-2 border-gray-200 dark:border-zinc-700 hover:border-primary dark:hover:border-white transition-colors duration-300"
          >
            <h3 className="font-semibold text-primary dark:text-white text-[0.83rem] uppercase tracking-[0.08em] mb-1">{service.title}</h3>
            <p className="text-[0.78rem] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
