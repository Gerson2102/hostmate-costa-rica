import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { FounderStory } from '@/components/FounderStory';
import { Services } from '@/components/Services';
import { Properties } from '@/components/Properties';
import { Testimonials } from '@/components/Testimonials';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section - 100vh */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Founder Story Section */}
        <FounderStory />

        {/* Services Section */}
        <Services />

        {/* Properties Section */}
        <Properties />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Booking/Calendly Section */}
        <Booking />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
