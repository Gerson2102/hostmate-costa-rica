import dynamic from 'next/dynamic';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';

// Dynamically import below-the-fold sections with loading states
// These components won't be included in the initial JS bundle
const About = dynamic(() => import('@/components/About').then(mod => ({ default: mod.About })), {
  loading: () => <SectionSkeleton id="nosotros" />,
  ssr: true, // Keep SSR for SEO
});

const TeamSection = dynamic(() => import('@/components/TeamSection').then(mod => ({ default: mod.TeamSection })), {
  loading: () => <SectionSkeleton id="equipo" />,
  ssr: true,
});

const Services = dynamic(() => import('@/components/Services').then(mod => ({ default: mod.Services })), {
  loading: () => <SectionSkeleton id="servicios" />,
  ssr: true,
});

const Properties = dynamic(() => import('@/components/Properties').then(mod => ({ default: mod.Properties })), {
  loading: () => <SectionSkeleton id="propiedades" minHeight="800px" />,
  ssr: true,
});

const Testimonials = dynamic(() => import('@/components/Testimonials').then(mod => ({ default: mod.Testimonials })), {
  loading: () => <SectionSkeleton id="testimonios" />,
  ssr: true,
});

const Booking = dynamic(() => import('@/components/Booking').then(mod => ({ default: mod.Booking })), {
  loading: () => <SectionSkeleton id="agendar" />,
  ssr: true,
});

const WorkWithUs = dynamic(() => import('@/components/WorkWithUs').then(mod => ({ default: mod.WorkWithUs })), {
  loading: () => <SectionSkeleton id="trabaja-con-nosotros" minHeight="400px" />,
  ssr: true,
});

const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-64 bg-white" />,
  ssr: true,
});

// Lightweight skeleton component for loading states
function SectionSkeleton({ id, minHeight = '100vh' }: { id: string; minHeight?: string }) {
  return (
    <section
      id={id}
      className="bg-background-elevated"
      style={{ minHeight }}
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="animate-pulse space-y-8">
          <div className="h-4 w-24 bg-primary/10 rounded mx-auto" />
          <div className="h-12 w-64 bg-black/5 rounded mx-auto" />
          <div className="h-4 w-96 max-w-full bg-black/5 rounded mx-auto" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Skip Link for keyboard accessibility (WCAG 2.4.1) */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Header with Navigation */}
      <header>
        <Navigation />
      </header>

      {/* Main Content */}
      <main id="main">
        {/* Hero Section - 100vh - Critical path, loads immediately */}
        <Hero />

        {/* Below-the-fold sections - Dynamically imported */}
        {/* About Section */}
        <About />

        {/* Team Section */}
        <TeamSection />

        {/* Services Section */}
        <Services />

        {/* Properties Section */}
        <Properties />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Booking/Calendly Section */}
        <Booking />

        {/* Work With Us Section */}
        <WorkWithUs />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
