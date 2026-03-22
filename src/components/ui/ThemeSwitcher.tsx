'use client';

import { useEffect, useState } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

const THEMES = [
  { id: 'lime', color: '#b8ff00', label: 'Lime Elektrik' },
  { id: 'cyan', color: '#00f0ff', label: 'Neon Cyan' },
  { id: 'magenta', color: '#ff0055', label: 'Cyber Magenta' },
  { id: 'orange', color: '#ff5500', label: 'Solar Orange' },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState('lime');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load saved accent theme
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      const theme = THEMES.find((t) => t.id === saved);
      if (theme) {
        setActiveTheme(saved);
        document.documentElement.style.setProperty('--accent', theme.color);
      }
    }

    // Load saved dark mode
    const savedMode = localStorage.getItem('portfolio-mode');
    if (savedMode === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.add('light');
    }
  }, []);

  const changeTheme = (id: string, color: string) => {
    setActiveTheme(id);
    document.documentElement.style.setProperty('--accent', color);
    localStorage.setItem('portfolio-theme', id);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (!newMode) {
      document.documentElement.classList.add('light');
      localStorage.setItem('portfolio-mode', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('portfolio-mode', 'dark');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 pt-0">
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="flex items-center justify-center w-full max-w-[120px] gap-2 py-2 text-xs font-medium rounded-full border border-neutral-800 hover:bg-neutral-800/50 transition-colors text-[var(--text-primary)]"
        aria-label="Toggle Dark/Light Mode"
      >
        {isDarkMode ? (
          <>
            <HiOutlineSun className="text-lg" /> <span className="opacity-80">Light Mode</span>
          </>
        ) : (
          <>
            <HiOutlineMoon className="text-lg" /> <span className="opacity-80">Dark Mode</span>
          </>
        )}
      </button>

      {/* Accent Colors */}
      <div className="flex items-center gap-2 justify-center">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => changeTheme(theme.id, theme.color)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              activeTheme === theme.id ? 'scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-[var(--bg)]' : 'opacity-50 hover:opacity-100 hover:scale-110'
            }`}
            style={{ backgroundColor: theme.color }}
            title={theme.label}
            aria-label={`Switch to ${theme.label} theme`}
          />
        ))}
      </div>
    </div>
  );
}
