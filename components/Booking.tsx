'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, ArrowRight, MessageCircle, Mail } from 'lucide-react';

const benefits = [
  'Consulta 100% gratuita',
  'Análisis de tu propiedad',
  'Plan personalizado',
  'Sin compromiso',
];

export function Booking() {
  useEffect(() => {
    // Load Calendly popup widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const openCalendly = () => {
    // @ts-expect-error - Calendly is loaded externally
    if (typeof Calendly !== 'undefined') {
      // @ts-expect-error - Calendly is loaded externally
      Calendly.initPopupWidget({
        url: 'https://calendly.com/hostmatecr/consulta-gratuita?hide_gdpr_banner=1&primary_color=e85d4c',
      });
    }
  };

  return (
    <section
      id="agendar"
      className="min-h-screen relative flex items-center justify-center overflow-hidden py-24"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span
          className="text-primary font-medium text-sm uppercase tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Comienza Ahora
        </motion.span>

        <motion.h2
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mt-4 mb-6 text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Agenda tu Consulta
          <br />
          <span className="text-primary">Gratuita</span>
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Agenda una sesión 1:1 gratuita para definir tus necesidades y hacerte
          un plan a la medida. Sin compromiso, solo conversamos sobre cómo
          podemos ayudarte.
        </motion.p>

        {/* Benefits */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {benefits.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              <span className="text-muted">{item}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={openCalendly}
          className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-glow text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-lg sm:text-xl transition-all duration-300 hover:shadow-glow-primary-intense"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
          Agendar Consulta
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Alternative Contact */}
        <motion.div
          className="mt-12 pt-12 border-t border-black/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted mb-4">¿Prefieres contactarnos directamente?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/50662609385"
              className="bg-white hover:bg-background-elevated px-6 py-3 rounded-full flex items-center gap-2 transition-colors shadow-md shadow-black/5 border border-black/5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
              <span className="text-foreground">WhatsApp</span>
            </a>
            <a
              href="mailto:info@hostmatecr.com"
              className="bg-white hover:bg-background-elevated px-6 py-3 rounded-full flex items-center gap-2 transition-colors shadow-md shadow-black/5 border border-black/5"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-foreground">Email</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
