import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  ariaLabel: string;
  positionClassName?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  toggleTheme,
  ariaLabel,
  positionClassName = 'bottom-4 right-4'
}) => {
  return (
    <button 
      className={`pressable fixed ${positionClassName} bg-primary text-white p-3 rounded-full shadow-lg z-50 hover:bg-black transition-colors`}
      onClick={toggleTheme}
      aria-label={ariaLabel}
    >
      {isDarkMode ? (
        <i className="fas fa-sun block"></i>
      ) : (
        <i className="fas fa-moon block"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
