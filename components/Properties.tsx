'use client';

import { useState, useMemo, useCallback, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Bed,
  Bath,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Home,
  Building2,
  DoorOpen,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import {
  properties,
  Property,
  AccommodationType,
  accommodationTypeLabels,
} from '@/lib/properties';

// Image carousel component for each property with lazy loading
function ImageCarousel({ images, propertyName, location }: { images: string[]; propertyName: string; location: string }) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const displayImages = images;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-100">
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <AnimatePresence mode="sync">
        <motion.img
          key={currentIndex}
          src={displayImages[currentIndex]}
          alt={`${propertyName} - ${t.a11y.vacationRentalIn} ${location} (${currentIndex + 1} ${t.a11y.of} ${displayImages.length})`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fetchPriority="low"
          onLoad={() => setIsLoaded(true)}
        />
      </AnimatePresence>

      {/* Navigation arrows */}
      {displayImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-[background-color,opacity] opacity-70 sm:opacity-0 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
            aria-label={`${t.a11y.previousImage} ${propertyName}`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" aria-hidden="true" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-[background-color,opacity] opacity-70 sm:opacity-0 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
            aria-label={`${t.a11y.nextImage} ${propertyName}`}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {displayImages.length > 1 && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"
          role="group"
          aria-label={propertyName}
        >
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-current={index === currentIndex ? 'true' : undefined}
              className="p-1.5 cursor-pointer"
              aria-label={`${t.a11y.viewImage} ${index + 1} ${t.a11y.of} ${displayImages.length}`}
            >
              <span className={`block rounded-full transition-[background-color,width,height] ${
                index === currentIndex ? 'bg-white w-4 h-2' : 'bg-white/60 hover:bg-white/80 w-2 h-2'
              }`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Get icon for accommodation type
function getAccommodationIcon(type: AccommodationType) {
  switch (type) {
    case 'entire_home':
      return Home;
    case 'apartment':
    case 'condo':
      return Building2;
    case 'private_room':
    case 'shared_room':
      return DoorOpen;
    default:
      return Home;
  }
}

// Property card component
const PropertyCard = memo(function PropertyCard({ property }: { property: Property }) {
  const { language, t } = useLanguage();

  const AccommodationIcon = getAccommodationIcon(property.accommodationType);
  const accommodationLabel =
    accommodationTypeLabels[property.accommodationType][language];

  return (
    <div className="group bg-white rounded-2xl shadow-lg shadow-black/5 border border-black/5 overflow-hidden hover:shadow-xl hover:shadow-black/10 transition-shadow duration-300">
      {/* Image Carousel */}
      <ImageCarousel
        images={property.images}
        propertyName={property.name[language]}
        location={property.location[language]}
      />

      {/* Content */}
      <div className="p-6">
        {/* Accommodation Type Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-sm font-medium">
            <AccommodationIcon className="w-3.5 h-3.5" aria-hidden="true" />
            {accommodationLabel}
          </span>
          {property.rating && (
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              {property.rating}
              {property.reviewCount && (
                <span>
                  ({property.reviewCount} {t.properties.reviews})
                </span>
              )}
            </span>
          )}
        </div>

        {/* Property Name */}
        <h3 className="text-xl font-bold text-foreground mb-2">
          {property.name[language]}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted mb-4">
          <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-sm">{property.location[language]}</span>
        </div>

        {/* Description */}
        <p className="text-muted leading-relaxed mb-4 line-clamp-3">
          {property.description[language]}
        </p>

        {/* Features */}
        {property.features && (
          <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-black/5">
            {property.features.bedrooms && (
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Bed className="w-4 h-4" aria-hidden="true" />
                <span>
                  {property.features.bedrooms} {t.properties.bedrooms}
                </span>
              </div>
            )}
            {property.features.bathrooms && (
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Bath className="w-4 h-4" aria-hidden="true" />
                <span>
                  {property.features.bathrooms} {t.properties.bathrooms}
                </span>
              </div>
            )}
            {property.features.guests && (
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>
                  {property.features.guests} {t.properties.guests}
                </span>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-end gap-4">
          <a
            href={property.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary-dark hover:bg-primary text-white px-4 py-3 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
          >
            {property.externalPlatform === 'airbnb'
              ? t.properties.viewOnAirbnb
              : t.properties.viewListing}
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
});

// Filter button component
function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-full text-sm font-medium transition-[background-color,color,box-shadow] cursor-pointer ${
        isActive
          ? 'bg-primary-dark text-white shadow-md'
          : 'bg-white text-muted hover:bg-gray-50 border border-black/10'
      }`}
    >
      {label}
    </button>
  );
}

export function Properties() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<AccommodationType | 'all'>('all');
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProperties = useMemo(
    () => activeFilter === 'all'
      ? properties
      : properties.filter((p) => p.accommodationType === activeFilter),
    [activeFilter]
  );

  // Get unique accommodation types from properties
  const availableTypes = useMemo(
    () => [...new Set(properties.map((p) => p.accommodationType))],
    []
  );

  // Track which property card is most visible during horizontal scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstElementChild?.firstElementChild?.clientWidth ?? 1;
      const gap = 20; // gap-5 = 1.25rem = 20px
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActivePropertyIndex(Math.min(index, filteredProperties.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [filteredProperties.length]);

  // Scroll to a specific card when dot is clicked
  const scrollToCard = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.firstElementChild?.clientWidth ?? 0;
    const gap = 20;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  // Reset scroll position when filter changes
  useEffect(() => {
    setActivePropertyIndex(0);
    scrollContainerRef.current?.scrollTo({ left: 0 });
  }, [activeFilter]);

  return (
    <section
      id="propiedades"
      className="py-24 lg:py-32 bg-background-elevated relative overflow-clip"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-pretty">
            {t.properties.headline}
          </h2>
          <p className="reveal text-muted text-lg mt-4 max-w-2xl mx-auto">
            {t.properties.subtitle}
          </p>
        </div>

        {/* Filters */}
        <div className="reveal flex flex-wrap justify-center gap-3 mb-12">
          <FilterButton
            label={t.properties.filterAll}
            isActive={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          />
          {availableTypes.includes('entire_home') && (
            <FilterButton
              label={t.properties.filterEntireHome}
              isActive={activeFilter === 'entire_home'}
              onClick={() => setActiveFilter('entire_home')}
            />
          )}
          {availableTypes.includes('condo') && (
            <FilterButton
              label={t.properties.filterCondo}
              isActive={activeFilter === 'condo'}
              onClick={() => setActiveFilter('condo')}
            />
          )}
          {availableTypes.includes('apartment') && (
            <FilterButton
              label={t.properties.filterApartment}
              isActive={activeFilter === 'apartment'}
              onClick={() => setActiveFilter('apartment')}
            />
          )}
          {availableTypes.includes('private_room') && (
            <FilterButton
              label={t.properties.filterPrivateRoom}
              isActive={activeFilter === 'private_room'}
              onClick={() => setActiveFilter('private_room')}
            />
          )}
        </div>

        {/* Properties: horizontal scroll on mobile, grid on md+ */}
        <div
          ref={scrollContainerRef}
          className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex gap-5 pb-4" style={{ width: 'max-content' }}>
            <AnimatePresence mode="popLayout">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div key={property.id} className="w-[85vw] max-w-[340px] flex-shrink-0 snap-center">
                    <PropertyCard property={property} />
                  </div>
                ))
              ) : (
                <motion.div
                  className="w-full text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-muted">{t.properties.noProperties}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dot indicators (mobile only) */}
        {filteredProperties.length > 1 && (
          <div className="md:hidden flex justify-center gap-1.5 mt-4" role="group" aria-label={t.a11y.propertyNavigation}>
            {filteredProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                aria-current={index === activePropertyIndex ? 'true' : undefined}
                className="p-1.5 cursor-pointer"
                aria-label={`${t.a11y.viewProperty} ${index + 1}`}
              >
                <span
                  className={`block rounded-full transition-[background-color,width] duration-300 ${
                    index === activePropertyIndex
                      ? 'bg-primary w-5 h-2'
                      : 'bg-black/15 hover:bg-black/25 w-2 h-2'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-muted">{t.properties.noProperties}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
