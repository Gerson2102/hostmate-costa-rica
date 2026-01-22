import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { TeamSection } from '@/components/TeamSection';
import { Services } from '@/components/Services';
import { Properties } from '@/components/Properties';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';

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
        {/* Hero Section - 100vh */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Team Section */}
        <TeamSection />

        {/* Services Section */}
        <Services />

        {/* Properties Section */}
        <Properties />

        {/* Booking/Calendly Section */}
        <Booking />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
