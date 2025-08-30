import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Save theme preference and apply to document
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const lightTheme = {
    token: {
      colorPrimary: '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#13c2c2',
      fontSize: 16,
      borderRadius: 8,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      colorBgBase: '#ffffff',
      colorTextBase: '#000000',
      colorBgContainer: '#ffffff',
      colorBorder: '#d9d9d9',
      colorBgLayout: '#f5f5f5',
    },
  };

  const darkTheme = {
    token: {
      colorPrimary: '#4c6ef5',
      colorSuccess: '#51cf66',
      colorWarning: '#ffd43b',
      colorError: '#ff6b6b',
      colorInfo: '#74c0fc',
      fontSize: 16,
      borderRadius: 8,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      colorBgBase: '#0f0f1a',
      colorTextBase: '#ffffff',
      colorBgContainer: '#1a1a2e',
      colorBorder: '#2d3748',
      colorBgLayout: '#0f0f1a',
      colorBgElevated: '#16213e',
    },
    algorithm: 'dark',
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? darkTheme : lightTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
