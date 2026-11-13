'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

const options = [
  { lang: 'en', label: 'EN', name: 'English', href: '/' },
  { lang: 'es', label: 'ES', name: 'Español', href: '/es/' },
] as const;

export function LanguageSwitcher() {
  const { language, t } = useLanguage();

  return (
    <div
      className="relative flex items-center bg-black/[0.04] rounded-full p-0.5"
      role="group"
      aria-label={t.a11y.languageSelection}
    >
      {/* Sliding indicator */}
      <div
        className={`absolute top-0.5 h-[calc(100%-4px)] w-[calc(50%-1px)] bg-primary-dark rounded-full transition-transform duration-300 ease-out ${
          language === 'es' ? 'translate-x-full' : 'translate-x-0'
        }`}
        aria-hidden="true"
      />

      {options.map((option) => (
        <Link
          key={option.lang}
          href={option.href}
          scroll={false}
          hrefLang={option.lang}
          lang={option.lang}
          aria-label={option.name}
          aria-current={language === option.lang ? 'page' : undefined}
          className={`relative z-10 px-2.5 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
            language === option.lang ? 'text-white' : 'text-muted hover:text-foreground'
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
