'use client';

import { useLanguage } from '@/lib/LanguageContext';

/**
 * Lightweight LanguageSwitcher without Framer Motion.
 * Uses CSS transitions for the sliding indicator effect.
 */
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="relative flex items-center gap-1 bg-background-elevated rounded-full p-1 border border-black/5"
      role="group"
      aria-label="Language selection"
    >
      {/* Sliding indicator - CSS animated */}
      <div
        className={`absolute top-1 h-[calc(100%-8px)] w-[calc(50%-2px)] bg-primary-dark rounded-full transition-transform duration-300 ease-out ${
          language === 'es' ? 'translate-x-full' : 'translate-x-0'
        }`}
        aria-hidden="true"
      />

      <button
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label="Switch to English"
        className={`relative z-10 px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
          language === 'en' ? 'text-white' : 'text-muted hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        aria-label="Switch to Spanish"
        className={`relative z-10 px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
          language === 'es' ? 'text-white' : 'text-muted hover:text-foreground'
        }`}
      >
        ES
      </button>
    </div>
  );
}
