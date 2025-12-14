'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

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

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t.footer.links.about, href: '#nosotros' },
    { label: t.footer.links.services, href: '#servicios' },
    { label: t.footer.links.properties, href: '#propiedades' },
    { label: t.footer.links.testimonials, href: '#testimonios' },
    { label: t.footer.links.booking, href: '#agendar', highlight: true },
  ];

  return (
    <footer className="bg-white border-t border-black/5 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Logo Text */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-foreground tracking-tight">
                host<span className="text-primary">mate</span>
              </span>
            </div>
            <p className="text-muted leading-relaxed">
              {t.footer.description}
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
            <h4 className="font-semibold text-foreground mb-4">{t.footer.contact}</h4>
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
            <h4 className="font-semibold text-foreground mb-4">{t.footer.linksTitle}</h4>
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
          className="border-t border-black/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Hostmate Costa Rica. {t.footer.rights}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-muted text-sm">Pura Vida</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
