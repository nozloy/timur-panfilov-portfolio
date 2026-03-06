"use client";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  ariaLabel: string;
  positionClassName?: string;
}

export default function ThemeToggle({
  isDarkMode,
  toggleTheme,
  ariaLabel,
  positionClassName = "bottom-4 right-4",
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      className={`pressable fixed ${positionClassName} z-50 rounded-full bg-zinc-900 p-3 text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900`}
      onClick={toggleTheme}
      aria-label={ariaLabel}
      aria-pressed={isDarkMode}
    >
      {isDarkMode ? <i className="fas fa-sun block" aria-hidden="true" /> : <i className="fas fa-moon block" aria-hidden="true" />}
    </button>
  );
}
