'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useIsMobile } from '@/lib/useIsMobile';

export function About() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  // Only use scroll-linked animation on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Reduced parallax effect (disable on mobile by returning 0)
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile === false ? [50, -50] : [0, 0]
  );

  // Colors pass WCAG contrast on the light stat tiles (large text)
  const stats = [
    { icon: Users, number: '98%', label: t.about.stats.satisfaction, color: '#2D5BFF' },
    { icon: Clock, number: '24/7', label: t.about.stats.support, color: '#047857' },
  ];

  return (
    <section
      id="nosotros"
      ref={containerRef}
      className="py-24 lg:py-32 bg-background relative overflow-clip"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-8 text-pretty">
              {t.about.headline1}{' '}
              <br />
              <span className="text-primary">{t.about.headline2}</span>
            </h2>

            <div className="reveal space-y-6 mb-10">
              <p className="text-muted text-lg leading-relaxed">
                {t.about.paragraph1}{' '}
                <span className="text-foreground font-medium">
                  {t.about.paragraph1Highlight}
                </span>{' '}
                {t.about.paragraph1End}
              </p>
              <p className="text-muted text-lg leading-relaxed">
                {t.about.paragraph2}{' '}
                <span className="text-foreground font-medium">{t.about.paragraph2Highlight}</span>{' '}
                {t.about.paragraph2End}
              </p>
            </div>

            <a
              href="#servicios"
              className="reveal inline-flex items-center gap-2 text-primary-dark font-semibold hover:gap-3 transition-[gap] group py-3"
            >
              {t.about.link}
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column - Stats */}
          <motion.div className="relative" style={{ y }}>
            <div className="reveal relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-black/5 border border-black/5">
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-background-elevated rounded-2xl p-6 border border-black/5"
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <stat.icon
                        className="w-6 h-6"
                        style={{ color: stat.color }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Number */}
                    <div
                      className="text-4xl lg:text-5xl font-bold mb-1"
                      style={{ color: stat.color }}
                    >
                      {stat.number}
                    </div>

                    {/* Label */}
                    <div className="text-sm text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA inside stats box */}
              <div className="mt-8 pt-8 border-t border-black/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-semibold">
                      {t.about.cta.title}
                    </p>
                    <p className="text-sm text-muted">
                      {t.about.cta.subtitle}
                    </p>
                  </div>
                  <a
                    href="https://calendly.com/hostmatecostarica-info/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.a11y.bookOnCalendly}
                    className="w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <ArrowUpRight className="w-5 h-5 text-white" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
