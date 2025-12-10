'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const planes = [
  {
    nombre: 'HOSTMATE VIRTUAL',
    descripcion: 'Gestión digital completa',
    destacado: false,
    servicios: [
      'Publicación de la propiedad',
      'Comunicación con los huéspedes',
      'Estudio de mercado y actualización de precios',
      'Administración de calendarios',
      'Publicidad del alojamiento',
      'Gestión de reviews',
      'Reportes de reservas mensuales',
    ],
    cta: 'Elegir Virtual',
  },
  {
    nombre: 'HOSTMATE HÍBRIDO',
    descripcion: 'Servicio completo - Digital + Presencial',
    destacado: true,
    servicios: [
      'Publicación de la propiedad',
      'Comunicación con los huéspedes',
      'Estudio de mercado y actualización de precios',
      'Administración de calendarios',
      'Publicidad del alojamiento',
      'Gestión de reviews',
      'Reportes de reservas mensuales',
      'Asesoría de decoración',
      'Fotografías profesionales',
      'Housekeeping',
      'Welcome Kit',
    ],
    cta: 'Elegir Híbrido',
  },
  {
    nombre: 'HOSTMATE PERSONALIZADO',
    descripcion: 'Plan a tu medida',
    destacado: false,
    servicios: [
      'Agenda una sesión 1:1 gratuita',
      'Definimos tus necesidades específicas',
      'Creamos un plan personalizado',
      'Flexibilidad total en servicios',
    ],
    cta: 'Agendar Sesión',
  },
];

function PlanCard({
  plan,
  index,
  isHighlighted,
}: {
  plan: (typeof planes)[0];
  index: number;
  isHighlighted: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Max rotation of 8 degrees
    const rotateXValue = (mouseY / (rect.height / 2)) * -8;
    const rotateYValue = (mouseX / (rect.width / 2)) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-3xl p-8 flex flex-col ${
        isHighlighted
          ? 'bg-white shadow-2xl shadow-primary/10 border-2 border-primary/20 lg:scale-105 z-10'
          : 'bg-white shadow-lg shadow-black/5 border border-black/5'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      {/* Popular Badge */}
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-glow-primary">
            Más Popular
          </span>
        </div>
      )}

      {/* Glow Effect for Highlighted */}
      {isHighlighted && (
        <div className="absolute -inset-1 bg-primary/10 rounded-3xl blur-xl -z-10" />
      )}

      {/* Content with 3D depth */}
      <div style={{ transform: 'translateZ(20px)' }}>
        <h3
          className={`text-2xl font-bold text-center mb-2 ${
            isHighlighted ? 'text-primary' : 'text-foreground'
          }`}
        >
          {plan.nombre}
        </h3>
        <p className="text-muted text-center mb-8">{plan.descripcion}</p>

        <ul className="space-y-4 flex-grow mb-8">
          {plan.servicios.map((servicio, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 + index * 0.1 }}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isHighlighted ? 'bg-primary/20' : 'bg-black/5'
                }`}
              >
                <Check
                  className={`w-3 h-3 ${isHighlighted ? 'text-primary' : 'text-muted'}`}
                />
              </div>
              <span className="text-muted text-sm">{servicio}</span>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="#agendar"
          className={`block w-full py-4 rounded-xl font-semibold text-center transition-all ${
            isHighlighted
              ? 'bg-primary text-white hover:bg-primary-glow hover:shadow-glow-primary'
              : 'bg-background-elevated text-foreground hover:bg-black/5'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {plan.cta}
        </motion.a>
      </div>
    </motion.div>
  );
}

export function Plans() {
  return (
    <section id="planes" className="py-32 bg-background-elevated relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="text-primary font-medium text-sm uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Planes
          </motion.span>
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mt-2 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Elige el Plan Perfecto para Ti
          </motion.h2>
          <motion.p
            className="text-muted mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Elige el plan que más se ajuste a las necesidades tuyas y de tu
            alojamiento.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {planes.map((plan, index) => (
            <PlanCard
              key={plan.nombre}
              plan={plan}
              index={index}
              isHighlighted={index === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
