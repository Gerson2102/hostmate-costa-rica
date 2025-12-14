'use client';

import { useState } from 'react';
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

// Image carousel component for each property
function ImageCarousel({ images, propertyName }: { images: string[]; propertyName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const displayImages = images;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={displayImages[currentIndex]}
          alt={`${propertyName} - Image ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {/* Navigation arrows */}
      {displayImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
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
function PropertyCard({ property, index }: { property: Property; index: number }) {
  const { language, t } = useLanguage();

  const AccommodationIcon = getAccommodationIcon(property.accommodationType);
  const accommodationLabel =
    accommodationTypeLabels[property.accommodationType][language];

  return (
    <motion.div
      className="group bg-white rounded-2xl shadow-lg shadow-black/5 border border-black/5 overflow-hidden hover:shadow-xl hover:shadow-black/10 transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Image Carousel */}
      <ImageCarousel
        images={property.images}
        propertyName={property.name[language]}
      />

      {/* Content */}
      <div className="p-6">
        {/* Accommodation Type Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <AccommodationIcon className="w-3.5 h-3.5" />
            {accommodationLabel}
          </span>
          {property.rating && (
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {property.rating}
              {property.reviewCount && (
                <span className="text-xs">
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
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm">{property.location[language]}</span>
        </div>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-3">
          {property.description[language]}
        </p>

        {/* Features */}
        {property.features && (
          <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-black/5">
            {property.features.bedrooms && (
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Bed className="w-4 h-4" />
                <span>
                  {property.features.bedrooms} {t.properties.bedrooms}
                </span>
              </div>
            )}
            {property.features.bathrooms && (
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Bath className="w-4 h-4" />
                <span>
                  {property.features.bathrooms} {t.properties.bathrooms}
                </span>
              </div>
            )}
            {property.features.guests && (
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Users className="w-4 h-4" />
                <span>
                  {property.features.guests} {t.properties.guests}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">
              {property.monthlyPrice}
            </span>
            <span className="text-muted text-sm">{t.properties.perMonth}</span>
            {property.priceNotes && (
              <p className="text-xs text-muted mt-0.5">
                {property.priceNotes[language]}
              </p>
            )}
          </div>
          <a
            href={property.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-glow text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-glow-primary"
          >
            {property.externalPlatform === 'airbnb'
              ? t.properties.viewOnAirbnb
              : t.properties.viewListing}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

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
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isActive
          ? 'bg-primary text-white shadow-md'
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

  const filteredProperties =
    activeFilter === 'all'
      ? properties
      : properties.filter((p) => p.accommodationType === activeFilter);

  // Get unique accommodation types from properties
  const availableTypes = [...new Set(properties.map((p) => p.accommodationType))];

  return (
    <section
      id="propiedades"
      className="py-24 lg:py-32 bg-background-elevated relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            className="text-primary font-medium text-sm uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t.properties.overline}
          </motion.span>
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mt-2 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t.properties.headline}
          </motion.h2>
          <motion.p
            className="text-muted mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t.properties.subtitle}
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
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
        </motion.div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
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
