'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { useId } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const id = useId();

  return (
    <div className="flex items-center gap-1 bg-background-elevated rounded-full p-1 border border-black/5">
      <button
        onClick={() => setLanguage('en')}
        className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
          language === 'en' ? 'text-white' : 'text-muted hover:text-foreground'
        }`}
      >
        {language === 'en' && (
          <motion.div
            layoutId={`language-indicator-${id}`}
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
          language === 'es' ? 'text-white' : 'text-muted hover:text-foreground'
        }`}
      >
        {language === 'es' && (
          <motion.div
            layoutId={`language-indicator-${id}`}
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">ES</span>
      </button>
    </div>
  );
}
