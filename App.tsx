import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Experience from './components/Experience';
import Services from './components/Services';
import Clients from './components/Clients';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import GridMotion from './components/GridMotion';
import DesktopLayout from './components/DesktopLayout';
import MiniOgPage from './components/MiniOgPage';
import { Language, siteContent } from './content/siteContent';

const LANGUAGE_STORAGE_KEY = 'preferred-language';

const resolveInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'ru';
  }

  const languageFromQuery = new URLSearchParams(window.location.search).get('lang');
  if (languageFromQuery === 'ru' || languageFromQuery === 'en') {
    return languageFromQuery;
  }

  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'ru' || savedLanguage === 'en') {
      return savedLanguage;
    }
  } catch {
    // Local storage can be blocked in private mode or strict browser settings.
  }

  return window.navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
};

const App: React.FC = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isMiniPage = pathname.replace(/\/+$/, '') === '/mini';
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>(() => resolveInitialLanguage());
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(min-width: 1024px)').matches;
  });
  const gridItems = useMemo(
    () =>
      Array.from(
        { length: 28 },
        () =>
          'https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      ),
    []
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const content = siteContent[language];
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage write errors and keep language in runtime state.
    }
    window.document.documentElement.lang = language;
    window.document.title = content.seo.title;

    const descriptionMeta = window.document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.content = content.seo.description;
    }
  }, [language]);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      setIsDesktop(false);
      return;
    }

    const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleViewportChange = () => {
      setIsDesktop(desktopMediaQuery.matches);
    };

    handleViewportChange();
    if (typeof desktopMediaQuery.addEventListener === 'function') {
      desktopMediaQuery.addEventListener('change', handleViewportChange);
      return () => {
        desktopMediaQuery.removeEventListener('change', handleViewportChange);
      };
    }

    desktopMediaQuery.addListener(handleViewportChange);
    return () => {
      desktopMediaQuery.removeListener(handleViewportChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  const languageTogglePositionClass = isDesktop
    ? 'bottom-4 right-20'
    : 'top-[calc(env(safe-area-inset-top)+0.75rem)] left-4';
  const themeTogglePositionClass = isDesktop
    ? 'bottom-4 right-4'
    : 'top-[calc(env(safe-area-inset-top)+0.75rem)] right-4';

  if (isMiniPage) {
    return <MiniOgPage language={language} />;
  }

  return (
    <div className="relative min-h-screen">
      {isDesktop ? (
        <div className="desktop-grid-background" aria-hidden="true">
          <GridMotion items={gridItems} gradientColor="black" />
        </div>
      ) : null}
      <div
        className={`fixed inset-0 pointer-events-none z-[5] transition-opacity duration-500 ${
          isDarkMode ? 'opacity-100 bg-black/45' : 'opacity-0 bg-black/0'
        }`}
        aria-hidden="true"
      />

      {isDesktop ? (
        <DesktopLayout language={language} />
      ) : (
        <div className="max-w-md mx-auto min-h-screen shadow-2xl overflow-hidden bg-card-light dark:bg-card-dark relative z-10">
          <Header language={language} />
          <div className="flex flex-col">
            <Experience language={language} />
            <Services language={language} />
          </div>
          <Clients language={language} />
          <Footer language={language} />
        </div>
      )}

      <LanguageToggle
        language={language}
        onChange={handleLanguageChange}
        ariaLabel={siteContent[language].ui.languageToggleAria}
        switchToRussianAria={siteContent[language].ui.switchToRussianAria}
        switchToEnglishAria={siteContent[language].ui.switchToEnglishAria}
        positionClassName={languageTogglePositionClass}
      />
      <ThemeToggle
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        ariaLabel={siteContent[language].ui.themeToggleAria}
        positionClassName={themeTogglePositionClass}
      />
    </div>
  );
};

export default App;
