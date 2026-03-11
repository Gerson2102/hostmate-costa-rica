'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

// All navigable section IDs in page order (kept full for IntersectionObserver)
const SECTION_IDS = [
  'nosotros',
  'equipo',
  'servicios',
  'propiedades',
  'testimonios',
  'agendar',
  'trabaja-con-nosotros',
];

export function Navigation() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hidden, setHidden] = useState(false);
  const visibleSections = useRef(new Set<string>());
  const lastScrollY = useRef(0);
  const isScrollingToSection = useRef(false);

  const navLinks = [
    { label: t.nav.about, href: '#nosotros' },
    { label: t.nav.services, href: '#servicios' },
    { label: t.nav.properties, href: '#propiedades' },
    { label: t.nav.testimonials, href: '#testimonios' },
    { label: t.nav.contact, href: '#agendar' },
  ];

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll handler: detect scrolled state + direction
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 50);

          if (!isScrollingToSection.current) {
            if (currentY > 300) {
              if (currentY - lastScrollY.current > 5) {
                setHidden(true);
              } else if (lastScrollY.current - currentY > 5) {
                setHidden(false);
              }
            } else {
              setHidden(false);
            }
          }

          lastScrollY.current = currentY;
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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.current.add(entry.target.id);
          } else {
            visibleSections.current.delete(entry.target.id);
          }
        }
        const topVisible = SECTION_IDS.find((id) => visibleSections.current.has(id));
        setActiveSection(topVisible ?? '');
      },
      { threshold: 0.05, rootMargin: '-80px 0px -35% 0px' }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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

  // Temporarily disable hide-on-scroll when a nav link is clicked
  const handleNavClick = useCallback(() => {
    isScrollingToSection.current = true;
    setHidden(false);
    setTimeout(() => {
      isScrollingToSection.current = false;
    }, 1200);
  }, []);

  const shouldHide = hidden && !mobileOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-transform duration-300 ease-out ${
        isVisible ? (shouldHide ? '-translate-y-full' : 'translate-y-0') : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 lg:px-6 py-3 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/[0.04] border border-black/[0.06]'
              : 'bg-white/70 backdrop-blur-md border border-white/60'
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center flex-shrink-0">
            <span className="text-xl font-bold text-foreground tracking-tight">
              host<span className="text-primary">mate</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`relative px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
                  }`}
                  suppressHydrationWarning
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                  />
                </a>
              );
            })}

            {/* Separator */}
            <div className="w-px h-4 bg-black/10 mx-2" />

            <LanguageSwitcher />

            <a
              href="https://calendly.com/hostmatecostarica-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-dark hover:bg-primary text-white px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 hover:shadow-glow-primary ml-2"
              suppressHydrationWarning
            >
              {t.nav.bookConsultation}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              className="text-foreground p-2 -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${
                    mobileOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                  aria-hidden="true"
                />
                <X
                  className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${
                    mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/40 z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden mt-2 mx-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="bg-white/95 backdrop-blur-xl border border-black/[0.06] rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 space-y-1">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                      className={`block font-medium py-3 px-3 rounded-xl transition-colors ${
                        isActive
                          ? 'text-foreground bg-black/[0.03]'
                          : 'text-muted hover:text-foreground hover:bg-black/[0.03]'
                      }`}
                      onClick={() => { handleNavClick(); closeMobileMenu(); }}
                      suppressHydrationWarning
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        )}
                        {link.label}
                      </span>
                    </motion.a>
                  );
                })}

                <motion.a
                  href="https://calendly.com/hostmatecostarica-info/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: navLinks.length * 0.05,
                    duration: 0.3,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className="block bg-primary-dark text-white px-6 py-3 rounded-full font-medium text-center mt-3"
                  onClick={closeMobileMenu}
                  suppressHydrationWarning
                >
                  {t.nav.bookConsultation}
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
