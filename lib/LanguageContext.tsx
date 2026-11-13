'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { translations, Language, Translations } from './translations';

interface LanguageContextType {
  language: Language;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// The route decides the language: / is English, /es/ is Spanish.
// LanguageSwitcher navigates between them, so nothing is stored per visitor.
export function LanguageProvider({
  children,
  language,
}: {
  children: ReactNode;
  language: Language;
}) {
  // Client-side navigation between / and /es/ skips the inline lang script in layout.tsx
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
