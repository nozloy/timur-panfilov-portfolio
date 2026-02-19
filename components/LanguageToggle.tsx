import React from 'react';
import { Language } from '../content/siteContent';

interface LanguageToggleProps {
  language: Language;
  onChange: (language: Language) => void;
  ariaLabel: string;
  switchToRussianAria: string;
  switchToEnglishAria: string;
  positionClassName?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  onChange,
  ariaLabel,
  switchToRussianAria,
  switchToEnglishAria,
  positionClassName = 'bottom-4 right-20'
}) => {
  return (
    <div
      className={`fixed ${positionClassName} flex items-center gap-1 rounded-full bg-primary/90 text-white p-1 shadow-lg z-50 backdrop-blur-sm`}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => onChange('ru')}
        aria-label={switchToRussianAria}
        className={`pressable px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] rounded-full transition-colors ${
          language === 'ru' ? 'bg-white text-primary' : 'bg-transparent text-white'
        }`}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => onChange('en')}
        aria-label={switchToEnglishAria}
        className={`pressable px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] rounded-full transition-colors ${
          language === 'en' ? 'bg-white text-primary' : 'bg-transparent text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
