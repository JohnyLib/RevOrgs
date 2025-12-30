import React, { createContext, useContext, ReactNode } from 'react';
import { Lang, translations } from '../translations';
import { useLocation } from 'wouter';

interface LanguageContextType {
  lang: Lang;
  t: typeof translations['en'];
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  lang: Lang;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, lang }) => {
  const [, setLocation] = useLocation();
  const t = translations[lang];

  const setLang = (newLang: Lang) => {
    // Preserve hash if exists, though wouter setLocation might clear it. 
    // For this simple app, we just switch the path.
    setLocation(`/${newLang}`);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
