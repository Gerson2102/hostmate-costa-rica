'use client';

import { motion } from 'framer-motion';
import { Check, Calendar, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export function Booking() {
  const { t } = useLanguage();

  return (
    <section
      id="agendar"
      className="relative flex items-center justify-center py-24 lg:py-32 bg-primary/5"
    >
      <div className="text-center px-4 max-w-4xl mx-auto">
        <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-[1.1] text-pretty">
          {t.booking.headline}{' '}
          <br />
          <span className="text-primary-dark">{t.booking.headlineHighlight}</span>
        </h2>

        <p className="reveal text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8">
          {t.booking.subtitle}
        </p>

        {/* Benefits */}
        <ul className="reveal flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
          {t.booking.benefits.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary-dark" aria-hidden="true" />
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href="https://calendly.com/hostmatecostarica-info/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal group inline-flex items-center gap-3 bg-primary-dark hover:bg-primary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-lg sm:text-xl transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          <span>{t.booking.cta}</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </motion.a>

        {/* Alternative Contact */}
        <div className="reveal mt-12 pt-12 border-t border-black/10">
          <p className="text-muted mb-4 max-w-2xl mx-auto">{t.booking.altContact}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/50683083634"
              className="bg-white hover:bg-background-elevated px-6 py-3 rounded-full flex items-center gap-2 transition-colors shadow-md shadow-black/5 border border-black/5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
              <span className="text-foreground">Vanessa</span>
            </a>
            <a
              href="mailto:info@hostmatecostarica.com"
              className="bg-white hover:bg-background-elevated px-6 py-3 rounded-full flex items-center gap-2 transition-colors shadow-md shadow-black/5 border border-black/5"
            >
              <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-foreground">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
