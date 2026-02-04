'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export function WorkWithUs() {
  const { t } = useLanguage();

  return (
    <section
      id="trabaja-con-nosotros"
      className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background-elevated relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.span
          className="text-primary font-medium text-sm uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          suppressHydrationWarning
        >
          {t.workWithUs.overline}
        </motion.span>

        <motion.h2
          className="text-4xl lg:text-5xl font-bold mt-2 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          suppressHydrationWarning
        >
          {t.workWithUs.headline}
        </motion.h2>

        <motion.p
          className="text-muted mt-4 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          suppressHydrationWarning
        >
          {t.workWithUs.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd3FMiFQe2Sa3SoDkkA1jJImbQIxIkMlV2sF8qocpoYUsGVXg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-glow text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-glow-primary-intense mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          <span suppressHydrationWarning>{t.workWithUs.buttonText}</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
