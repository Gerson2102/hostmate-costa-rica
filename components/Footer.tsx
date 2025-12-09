'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, MapPin } from 'lucide-react';
import Image from 'next/image';

const contactLinks = [
  {
    icon: Phone,
    label: '+506 6260 9385',
    href: 'https://wa.me/50662609385',
    external: true,
  },
  {
    icon: Mail,
    label: 'info@hostmatecr.com',
    href: 'mailto:info@hostmatecr.com',
    external: false,
  },
  {
    icon: Instagram,
    label: '@hostmatecostarica',
    href: 'https://instagram.com/hostmatecostarica',
    external: true,
  },
];

const quickLinks = [
  { label: 'Sobre Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Planes', href: '#planes' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Agendar Consulta', href: '#agendar', highlight: true },
];

export function Footer() {
  return (
    <footer className="bg-background-elevated border-t border-white/5 py-16 relative overflow-hidden">
      {/* Decorative sticker in background */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10">
        <Image src="/assets/stickers/sticker_3.png" alt="" fill className="object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Logo - HM Monogram + Text */}
            <div className="flex items-center gap-3 mb-6">
              {/* Logo Icon - White version for dark background */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/assets/logos/logo_643e.png"
                  alt="Hostmate"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Logo Text */}
              <span className="text-2xl font-bold text-foreground tracking-tight">
                host<span className="text-primary">mate</span>
              </span>
            </div>
            <p className="text-muted leading-relaxed">
              Tu socio de confianza para la administración de propiedades en
              Costa Rica. Maximiza tu rentabilidad sin preocupaciones.
            </p>
            <div className="flex items-center gap-2 mt-4 text-muted">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Costa Rica</span>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 text-muted hover:text-primary transition-colors"
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Enlaces</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`transition-colors ${
                      link.highlight
                        ? 'text-primary hover:text-primary-glow'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Hostmate Costa Rica. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
              <Image
                src="/assets/logos/logo_7cf9.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <span className="text-muted text-sm">Pura Vida</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
