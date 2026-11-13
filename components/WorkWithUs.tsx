'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export function WorkWithUs() {
  const { t } = useLanguage();

  return (
    <section
      id="trabaja-con-nosotros"
      className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background-elevated"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-pretty">
          {t.workWithUs.headline}
        </h2>

        <p className="reveal text-muted mt-4 max-w-2xl mx-auto text-lg">
          {t.workWithUs.subtitle}
        </p>

        {/* CTA Button */}
        <motion.a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd3FMiFQe2Sa3SoDkkA1jJImbQIxIkMlV2sF8qocpoYUsGVXg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal group inline-flex items-center gap-3 bg-primary-dark hover:bg-primary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-lg transition-colors duration-300 mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          <span>{t.workWithUs.buttonText}</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}
