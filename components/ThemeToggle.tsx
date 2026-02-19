import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button 
      className="pressable fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg z-50 hover:bg-black transition-colors" 
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
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
