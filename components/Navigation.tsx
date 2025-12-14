'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.about, href: '#nosotros' },
    { label: t.nav.services, href: '#servicios' },
    { label: t.nav.properties, href: '#propiedades' },
    { label: t.nav.testimonials, href: '#testimonios' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5 border border-black/5'
              : 'bg-white/80 backdrop-blur-md border border-black/5'
          }`}
        >
          {/* Logo Text */}
          <a href="#" className="flex items-center">
            <span className="text-xl font-bold text-foreground tracking-tight">
              host<span className="text-primary">mate</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}

            <LanguageSwitcher />

            <a
              href="#agendar"
              className="bg-primary hover:bg-primary-glow text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-glow-primary"
            >
              {t.nav.bookConsultation}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              className="text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-white border border-black/5 mt-2 mx-4 rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-muted hover:text-foreground font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#agendar"
                className="block bg-primary text-white px-6 py-3 rounded-full font-medium text-center"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.bookConsultation}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
