'use client';

import { Phone, Mail, Instagram, MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { settings } from '@/lib/content.generated';

// Removed Framer Motion from Footer for performance
// Footer animations provide minimal UX value but add to bundle size and CPU usage

const contactLinks = [
  {
    icon: Phone,
    label: settings.phone,
    sublabel: settings.phoneLabel,
    href: settings.phoneHref,
    external: false,
  },
  {
    icon: Mail,
    label: settings.email,
    href: `mailto:${settings.email}`,
    external: false,
  },
  {
    icon: Instagram,
    label: settings.instagramHandle,
    href: settings.instagramUrl,
    external: true,
  },
];

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t.footer.links.about, href: '#nosotros' },
    { label: t.footer.links.services, href: '#servicios' },
    { label: t.footer.links.properties, href: '#propiedades' },
    { label: t.footer.links.booking, href: 'https://calendly.com/hostmatecostarica-info/30min', highlight: true, external: true },
  ];

  return (
    <footer className="bg-white border-t border-black/5 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            {/* Logo Text */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-foreground tracking-tight">
                host<span className="text-primary">mate</span>
              </span>
            </div>
            <p className="text-muted leading-relaxed" suppressHydrationWarning>
              {t.footer.description}
            </p>
            <div className="flex items-center gap-2 mt-4 text-muted">
              <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Costa Rica</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4" suppressHydrationWarning>{t.footer.contact}</h3>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 text-muted hover:text-primary transition-colors py-1.5 break-all"
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    <link.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="flex flex-col">
                      <span>{link.label}</span>
                      {'sublabel' in link && link.sublabel && (
                        <span className="text-xs text-muted/70">{link.sublabel}</span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4" suppressHydrationWarning>{t.footer.linksTitle}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={'external' in link && link.external ? '_blank' : undefined}
                    rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                    className={`block py-1.5 transition-colors ${
                      link.highlight
                        ? 'text-primary hover:text-primary-glow'
                        : 'text-muted hover:text-foreground'
                    }`}
                    suppressHydrationWarning
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-black/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm" suppressHydrationWarning>
            © {new Date().getFullYear()} Hostmate Costa Rica. {t.footer.rights}
          </p>
          <div className="flex items-center gap-1.5 text-muted text-sm">
            <span>Made with</span>
            <span className="inline-block text-primary animate-[heartbeat_1s_ease-in-out_infinite]" aria-label="love">&#10084;</span>
            <span>by</span>
            <a
              href="https://www.instagram.com/websites_by_ger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium hover:text-primary transition-colors border-b border-foreground/20 hover:border-primary/40"
            >
              @websites_by_ger
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
