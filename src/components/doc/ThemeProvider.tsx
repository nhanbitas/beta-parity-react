'use client';

import { MoonIcon, Sun } from 'lucide-react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  initialTheme: 'light' | 'dark';
};

const ThemeProvider = (props: Props) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(props.initialTheme);

  React.useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? match[2] : null;
    };

    const cookieTheme = getCookie('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = cookieTheme || localStorage.getItem('theme') || systemTheme;

    setTheme(savedTheme as 'light' | 'dark');
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      const newTheme = event.matches ? 'dark' : 'light';
      setTheme(newTheme);
      document.cookie = `theme=${newTheme}; path=/; max-age=31536000;`;
      localStorage.setItem('theme', newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000;`;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <body className={`relative flex bg-[var(--par-color-bg)] text-[var(--par-color-text-primary)]`} data-scheme={theme}>
      <button
        className={`fixed bottom-12 right-4 z-10 cursor-pointer rounded-full bg-gray-100 p-2 text-gray-900 hover:bg-gray-200`}
        onClick={toggleTheme}
        aria-label='Toggle theme'
      >
        {theme === 'light' ? <MoonIcon /> : <Sun />}
      </button>
      {props.children}
    </body>
  );
};

export default ThemeProvider;
