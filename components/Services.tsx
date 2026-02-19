import React from 'react';
import { Language, siteContent } from '../content/siteContent';

interface ServicesProps {
  language: Language;
}

const Services: React.FC<ServicesProps> = ({ language }) => {
  const content = siteContent[language].mobile;

  return (
    <section className="p-6 bg-card-light dark:bg-card-dark">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-primary dark:text-white">{content.servicesTitle}</h2>
        <div className="text-5xl font-display font-extrabold text-gray-100 dark:text-gray-800 select-none leading-none">02</div>
      </div>
      <div className="space-y-6">
        {content.services.map((service, index) => (
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
