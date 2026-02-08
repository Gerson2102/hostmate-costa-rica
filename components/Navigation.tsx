'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { label: t.nav.about, href: '#nosotros' },
    { label: t.nav.services, href: '#servicios' },
    { label: t.nav.properties, href: '#propiedades' },
  ];

  // Animate in on mount
  useEffect(() => {
    // Small delay for smoother entrance
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['nosotros', 'servicios', 'propiedades'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-transform duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
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
                className={`py-2 transition-colors font-medium ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary'
                    : 'text-muted hover:text-foreground'
                }`}
                suppressHydrationWarning
              >
                {link.label}
              </a>
            ))}

            <LanguageSwitcher />

            <a
              href="https://calendly.com/hostmatecostarica-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-dark hover:bg-primary text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-glow-primary"
              suppressHydrationWarning
            >
              {t.nav.bookConsultation}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              className="text-foreground p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-[-1]"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border border-black/5 mt-2 mx-4 rounded-2xl shadow-xl">
          <div className="p-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block font-medium py-3 ${
                  activeSection === link.href.slice(1)
                    ? 'text-primary'
                    : 'text-muted hover:text-foreground'
                }`}
                onClick={closeMobileMenu}
                suppressHydrationWarning
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://calendly.com/hostmatecostarica-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-primary-dark text-white px-6 py-3 rounded-full font-medium text-center mt-2"
              onClick={closeMobileMenu}
              suppressHydrationWarning
            >
              {t.nav.bookConsultation}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
