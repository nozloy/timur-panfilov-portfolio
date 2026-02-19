import React from 'react';
import { ExperienceItem } from '../types';

const experienceData: ExperienceItem[] = [
  { icon: "fas fa-hammer", text: "10 + лет в производстве" },
  { icon: "fas fa-calendar-check", text: "5 + лет в ивенте" },
  { icon: "fas fa-map-marker-alt", text: "Формат: фестивали, конференции, ЭКСПО" },
  { icon: "fas fa-users", text: "Масштабы: от 500 до 5000 человек" }
];

const Experience: React.FC = () => {
  return (
    <section className="p-6 bg-card-light dark:bg-card-dark border-b dark:border-gray-800">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-primary dark:text-white">Опыт</h2>
        <div className="text-5xl font-display font-extrabold text-gray-100 dark:text-gray-800 select-none leading-none">01</div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-50 dark:bg-zinc-800/50 p-5 rounded-lg border border-gray-100 dark:border-zinc-800">
          <ul className="space-y-4">
            {experienceData.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <i className={`${item.icon} mt-1 text-xs text-primary dark:text-white`}></i>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-snug">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
