import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language, Translations } from '../i18n/types';
import { he } from '../i18n/he';
import { en } from '../i18n/en';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => any;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const translations: Record<Language, Translations> = {
  he,
  en,
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('cs-planner-lang');
    return (saved === 'he' || saved === 'en') ? saved : 'he';
  });

  useEffect(() => {
    localStorage.setItem('cs-planner-lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: keyof Translations): any => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
