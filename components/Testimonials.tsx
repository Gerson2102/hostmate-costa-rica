'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section
      id="testimonios"
      className="py-32 bg-background-elevated relative overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <motion.span
          className="text-primary font-medium text-sm uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.testimonials.overline}
        </motion.span>
        <motion.h2
          className="text-4xl lg:text-5xl font-bold mt-2 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {t.testimonials.headline}
        </motion.h2>
      </div>

      {/* Infinite Marquee */}
      <div className="relative mb-16">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background-elevated to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background-elevated to-transparent z-10" />

        {/* Marquee Track */}
        <div className="flex gap-6 animate-marquee">
          {[...t.testimonials.items, ...t.testimonials.items].map((testimonial, i) => (
            <div key={i} className="flex-shrink-0 bg-white rounded-2xl p-6 w-[350px] shadow-lg shadow-black/5 border border-black/5">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted text-sm line-clamp-3">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="mt-4">
                <p className="text-foreground font-medium text-sm">{testimonial.name}</p>
                <p className="text-muted text-xs">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Testimonial */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="bg-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl shadow-black/5 border border-black/5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Large Quote Mark */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-7xl sm:text-9xl font-serif text-primary/10">
            &ldquo;
          </div>

          <div className="relative z-10">
            <div className="flex gap-1 mb-6">
              {[...Array(t.testimonials.featured.stars)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl text-foreground leading-relaxed mb-8">
              &ldquo;{t.testimonials.featured.text}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  {t.testimonials.featured.initials}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">
                  {t.testimonials.featured.name}
                </p>
                <p className="text-muted">{t.testimonials.featured.location}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
