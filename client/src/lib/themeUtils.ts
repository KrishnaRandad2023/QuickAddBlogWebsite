import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Check for saved theme preference or use default dark theme
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });

  // Apply theme to HTML element instead of body
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(theme);
    
    // Also add legacy classes for backward compatibility
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
  // Add one-time theme setup
  const styleExists = document.getElementById('theme-variables');
  if (styleExists) return;
  
  // Add base CSS variables to :root
  const style = document.createElement('style');
  style.id = 'theme-variables';
  style.innerHTML = `
    :root {
      --primary: 264 80% 50%;
      --primary-light: 264 80% 60%;
      --primary-dark: 264 80% 40%;
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

    /* Dark mode - default */
    .dark {
      color-scheme: dark;
      
      /* Main colors */
      --background: 240 10% 4%;
      --foreground: 0 0% 98%;
      
      /* Card colors */
      --card: 240 10% 8%;
      --card-foreground: 0 0% 98%;
      
      /* Popover colors */
      --popover: 240 10% 8%;
      --popover-foreground: 0 0% 98%;
      
      /* UI element colors */
      --primary: 264 80% 50%;
      --primary-foreground: 0 0% 98%;
      --secondary: 240 4% 16%;
      --secondary-foreground: 0 0% 98%;
      --muted: 240 4% 16%;
      --muted-foreground: 240 5% 65%;
      --accent: 240 4% 16%;
      --accent-foreground: 0 0% 98%;
      --destructive: 0 84% 60%;
      --destructive-foreground: 0 0% 98%;
      
      /* Border, input and ring colors */
      --border: 240 4% 16%;
      --input: 240 4% 16%;
      --ring: 264 80% 50%;

      /* Legacy for backward compatibility */
      --bg-primary: 240 10% 4%;
      --bg-secondary: 240 10% 8%;
      --text-primary: 0 0% 98%;
      --text-secondary: 0 0% 88%;
      --border-color: 240 4% 20%;
    }

    /* Light mode */
    .light {
      color-scheme: light;
      
      /* Main colors */
      --background: 0 0% 98%;
      --foreground: 240 10% 4%;
      
      /* Card colors */
      --card: 0 0% 100%;
      --card-foreground: 240 10% 4%;
      
      /* Popover colors */
      --popover: 0 0% 100%;
      --popover-foreground: 240 10% 4%;
      
      /* UI element colors */
      --primary: 264 80% 50%;
      --primary-foreground: 0 0% 98%;
      --secondary: 240 5% 96%;
      --secondary-foreground: 240 6% 10%;
      --muted: 240 5% 96%;
      --muted-foreground: 240 4% 46%;
      --accent: 240 5% 96%;
      --accent-foreground: 240 6% 10%;
      --destructive: 0 84% 60%;
      --destructive-foreground: 0 0% 98%;
      
      /* Border, input and ring colors */
      --border: 240 6% 90%;
      --input: 240 6% 90%;
      --ring: 264 80% 50%;

      /* Legacy for backward compatibility */
      --bg-primary: 0 0% 98%;
      --bg-secondary: 0 0% 94%;
      --text-primary: 240 10% 4%;
      --text-secondary: 240 4% 16%;
      --border-color: 240 6% 90%;
    }
  `;
  
  document.head.appendChild(style);
  
  // Check system preference for theme
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem('theme');
  
  // If no theme is saved, set based on system preference
  if (!savedTheme) {
    document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
    document.body.classList.add(prefersDark ? 'dark-mode' : 'light-mode');
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
  }
};