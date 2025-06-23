import React, { createContext, useContext, useEffect, useState } from "react";

type Language = 'en' | 'tr';

interface AppContextProps {
  isDark: boolean;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true); 
  const [language, setLanguage] = useState<Language>('en'); 

  // Update HTML class for dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'tr' : 'en'));

  return (
    <AppContext.Provider value={{
      isDark,
      toggleTheme,
      language,
      toggleLanguage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
