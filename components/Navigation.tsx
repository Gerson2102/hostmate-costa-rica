'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Planes', href: '#planes' },
  { label: 'Testimonios', href: '#testimonios' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        {/* Always solid background - better contrast */}
        <div
          className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 bg-background-elevated border border-border ${
            scrolled ? 'shadow-lg shadow-black/20' : ''
          }`}
        >
          {/* Logo - HM Monogram + Text */}
          <a href="#" className="flex items-center gap-3">
            {/* Logo Icon - White version for dark background */}
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src="/assets/logos/logo_643e.png"
                alt="Hostmate"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Logo Text */}
            <span className="text-xl font-bold text-foreground tracking-tight hidden sm:block">
              host<span className="text-primary">mate</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#agendar"
              className="bg-primary hover:bg-primary-glow text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-glow-primary"
            >
              Agendar Consulta
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-background-elevated border border-border mt-2 mx-4 rounded-2xl overflow-hidden"
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
                Agendar Consulta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
