import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 border border-blue-500/30 rounded-lg p-0.5 bg-[#0f213a]/50">
      <button
        onClick={() => setLanguage('he')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          language === 'he' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-900/40'
        }`}
      >
        עב
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          language === 'en' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-900/40'
        }`}
      >
        EN
      </button>
    </div>
  );
}
