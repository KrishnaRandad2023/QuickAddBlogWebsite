import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Check for saved theme preference or use default dark theme
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'dark'
  );

  // Apply theme to document body
  useEffect(() => {
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(`${theme}-mode`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Using createElement to avoid JSX parsing issues
  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, toggleTheme } },
    children
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// CSS variables for theme modes
export const setupThemeVariables = () => {
  // Add base CSS variables to :root
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --primary: 270 100% 60%;
      --primary-light: 270 100% 70%;
      --primary-dark: 270 100% 50%;
      --secondary: 240 50% 35%;
      --secondary-light: 240 50% 50%;
      --secondary-dark: 240 50% 25%;
      --accent: 345 100% 60%;
      --accent-light: 345 100% 75%;
      --accent-dark: 345 100% 40%;
      --success: 145 100% 40%;
      --warning: 50 100% 50%;
      --error: 0 100% 60%;
      --radius: 0.5rem;
    }

    .dark-mode {
      --bg-primary: 0 0% 7%;
      --bg-secondary: 0 0% 12%;
      --text-primary: 0 0% 98%;
      --text-secondary: 0 0% 88%;
      --border-color: 0 0% 20%;
    }

    .light-mode {
      --bg-primary: 0 0% 98%;
      --bg-secondary: 0 0% 94%;
      --text-primary: 0 0% 7%;
      --text-secondary: 0 0% 12%;
      --border-color: 0 0% 88%;
    }
  `;
  document.head.appendChild(style);
};