'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, Users, Star, Clock, ArrowUpRight } from 'lucide-react';

const stats = [
  { icon: Building2, number: '+50', label: 'Propiedades', color: '#E85D4C' },
  { icon: Users, number: '98%', label: 'Satisfacción', color: '#2D5BFF' },
  { icon: Star, number: '5.0', label: 'Rating', color: '#F59E0B' },
  { icon: Clock, number: '24/7', label: 'Soporte', color: '#10B981' },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="nosotros"
      ref={containerRef}
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <div>
            <motion.span
              className="inline-block text-primary font-medium text-sm uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Quiénes Somos
            </motion.span>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Tu Socio de
              <br />
              <span className="text-primary">Confianza</span>
            </motion.h2>

            <motion.div
              className="space-y-6 mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-muted text-lg leading-relaxed">
                Somos una empresa dedicada a la administración de alojamientos
                para Airbnb, Booking y otras aplicaciones. Nuestro principal
                objetivo es brindarle a inversionistas inmobiliarios y dueños
                independientes la oportunidad de{' '}
                <span className="text-foreground font-medium">
                  generar rentabilidad
                </span>{' '}
                con sus inversiones.
              </p>
              <p className="text-muted text-lg leading-relaxed">
                En Hostmate te brindamos el mejor co-anfitrión para tus
                propiedades, además te asesoramos en cómo llegar a ser un{' '}
                <span className="text-foreground font-medium">súper anfitrión</span>{' '}
                y te brindamos una variedad de servicios para que las propiedades
                se encuentren siempre en buen estado.
              </p>
            </motion.div>

            <motion.a
              href="#servicios"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Conoce nuestros servicios
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>

          {/* Right Column - Stats */}
          <motion.div className="relative" style={{ y }}>
            {/* Main Stats Container */}
            <div className="relative">
              {/* Decorative Border */}
              <div className="absolute -inset-4 border border-black/5 rounded-[2.5rem]" />
              <div className="absolute -inset-8 border border-black/[0.03] rounded-[3rem] hidden lg:block" />

              {/* Stats Grid */}
              <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-black/5 border border-black/5">
                <div className="grid grid-cols-2 gap-6 lg:gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="relative group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {/* Glow on hover */}
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ backgroundColor: stat.color }}
                      />

                      <div className="relative bg-background-elevated rounded-2xl p-6 border border-black/5 group-hover:border-black/10 transition-colors">
                        {/* Icon */}
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${stat.color}15` }}
                        >
                          <stat.icon
                            className="w-6 h-6"
                            style={{ color: stat.color }}
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
                    </motion.div>
                  ))}
                </div>

                {/* Bottom CTA inside stats box */}
                <motion.div
                  className="mt-8 pt-8 border-t border-black/5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-semibold">
                        ¿Listo para empezar?
                      </p>
                      <p className="text-sm text-muted">
                        Agenda una consulta gratuita
                      </p>
                    </div>
                    <a
                      href="#agendar"
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-glow hover:shadow-glow-primary transition-all"
                    >
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
