'use client';

import { useLanguage } from '@/lib/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="relative flex items-center bg-black/[0.04] rounded-full p-0.5"
      role="group"
      aria-label="Language selection"
    >
      {/* Sliding indicator */}
      <div
        className={`absolute top-0.5 h-[calc(100%-4px)] w-[calc(50%-1px)] bg-primary-dark rounded-full transition-transform duration-300 ease-out ${
          language === 'es' ? 'translate-x-full' : 'translate-x-0'
        }`}
        aria-hidden="true"
      />

      <button
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label="Switch to English"
        className={`relative z-10 px-2.5 py-1 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer ${
          language === 'en' ? 'text-white' : 'text-muted hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        aria-label="Switch to Spanish"
        className={`relative z-10 px-2.5 py-1 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer ${
          language === 'es' ? 'text-white' : 'text-muted hover:text-foreground'
        }`}
      >
        ES
      </button>
    </div>
  );
}
