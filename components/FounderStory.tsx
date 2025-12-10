'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function FounderStory() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            className="text-primary font-medium text-sm uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nuestra Historia
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Conoce a la <span className="text-primary">Fundadora</span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Photo Column */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-full" />
              <div className="absolute -inset-8 border border-primary/10 rounded-full hidden sm:block" />

              {/* Photo container - placeholder */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  {/* Initials placeholder */}
                  <span className="text-6xl font-bold text-primary/30">V</span>
                </div>
              </div>

              {/* Name badge */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg shadow-black/10 border border-black/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-foreground font-bold text-lg">Vane</p>
                <p className="text-primary text-sm text-center">Fundadora</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Story Column */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Quote icon */}
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Story text */}
            <div className="space-y-6 text-muted text-lg leading-relaxed">
              <p>
                <span className="text-foreground font-semibold">Hola, mi nombre es Vane.</span> Más allá de los estudios y la formación que he realizado, lo que realmente me marcó desde niña fue crecer en una casa llena de libros de decoración y arquitectura. Pasaba horas hojeándolos, fascinada por los diseños y los espacios, y descubrí que allí encontraba un mundo de{' '}
                <span className="text-primary font-medium">creatividad sin límites</span>.
              </p>

              <p>
                Mis papás siempre fueron emprendedores y amantes de los libros, y aunque quizá nunca imaginaron el impacto que tendría en mí, esa exposición despertó una{' '}
                <span className="text-foreground font-medium">pasión que hoy guía mi vida</span>.
              </p>

              <p>
                Este proyecto nace con el propósito de ayudar a las personas a gestionar sus propiedades, hacerlas más atractivas y rentables, y al mismo tiempo{' '}
                <span className="text-primary font-medium">inspirar a quienes sueñan con emprender</span>{' '}
                en el sector de bienes raíces y turismo. Para mí, cada nuevo proyecto es también una oportunidad de darle voz a mi niña interior y seguir explorando la creatividad que tanto disfruto.
              </p>

              <p className="text-foreground font-medium italic">
                Me encanta descubrir alojamientos, estructuras, diseños y detalles, y compartir lo mejor de lo que he aprendido sin reservas. ¡Acompáñenme en este viaje!
              </p>
            </div>

            {/* Signature decoration */}
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              <span className="text-muted text-sm">Hostmate Costa Rica</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
