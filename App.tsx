import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Experience from './components/Experience';
import Services from './components/Services';
import Clients from './components/Clients';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import GridMotion from './components/GridMotion';
import DesktopLayout from './components/DesktopLayout';
import MiniOgPage from './components/MiniOgPage';

const App: React.FC = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isMiniPage = pathname.replace(/\/+$/, '') === '/mini';
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false
  );
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
    const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleViewportChange = () => {
      setIsDesktop(desktopMediaQuery.matches);
    };

    handleViewportChange();
    desktopMediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      desktopMediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isMiniPage) {
    return <MiniOgPage />;
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
        <DesktopLayout />
      ) : (
        <div className="max-w-md mx-auto min-h-screen shadow-2xl overflow-hidden bg-card-light dark:bg-card-dark relative z-10">
          <Header />
          <div className="flex flex-col">
            <Experience />
            <Services />
          </div>
          <Clients />
          <Footer />
        </div>
      )}

      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
};

export default App;
