import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Theme types
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Initialize from localStorage or default to 'system'
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('mop_theme_mode');
    return (savedMode as ThemeMode) || 'light';
  });
  
  const [isDark, setIsDark] = useState<boolean>(false);

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('mop_theme_mode', mode);
    updateTheme();
  }, [mode]);

  // Handle system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initial check
    if (mode === 'system') {
      setIsDark(mediaQuery.matches);
    }
    
    // Add listener for changes
    const handleChange = (e: MediaQueryListEvent) => {
      if (mode === 'system') {
        setIsDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  // Apply theme to document
  const updateTheme = () => {
    const isDarkMode = 
      mode === 'dark' || 
      (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const value = {
    mode,
    setMode,
    isDark
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};