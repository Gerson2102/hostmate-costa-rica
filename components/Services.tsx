'use client';

import {
  Globe,
  Calendar,
  Palette,
  Megaphone,
  MessageCircle,
  TrendingUp,
  Camera,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

// Same order as t.services.items
const serviceIcons = [
  Globe,
  Calendar,
  Palette,
  Megaphone,
  MessageCircle,
  TrendingUp,
  Camera,
  Sparkles,
];

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="servicios"
      className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background-elevated"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-center text-pretty mb-12 sm:mb-16">
          {t.services.headline}
        </h2>

        <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <li key={service.title} className="reveal flex gap-4">
                <Icon className="w-6 h-6 mt-1 flex-shrink-0 text-primary-dark" aria-hidden="true" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-muted leading-relaxed">{service.description}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="reveal mt-12 sm:mt-16 text-center">
          <a
            href="https://calendly.com/hostmatecostarica-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-dark text-white font-medium rounded-full hover:bg-primary transition-colors"
          >
            {t.about.cta.subtitle}
          </a>
        </div>
      </div>
    </section>
  );
}
