'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Calendar,
  Palette,
  Megaphone,
  MessageCircle,
  TrendingUp,
  Camera,
  Sparkles,
  LucideIcon,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const serviceIcons: LucideIcon[] = [
  Globe,
  Calendar,
  Palette,
  Megaphone,
  MessageCircle,
  TrendingUp,
  Camera,
  Sparkles,
];

const serviceColors = [
  '#E85D4C',
  '#2D5BFF',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#84CC16',
];

function ServiceAccordionItem({
  title,
  description,
  icon: Icon,
  color,
  index,
  isExpanded,
  onToggle,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
      className="group"
    >
      <div
        className={`
          bg-white rounded-2xl overflow-hidden
          shadow-sm shadow-black/5 border border-black/5
          transition-shadow duration-300
          ${isExpanded ? 'shadow-lg shadow-black/10' : 'hover:shadow-md'}
        `}
      >
        {/* Header - Always visible */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
          aria-expanded={isExpanded}
          aria-controls={`service-content-${index}`}
        >
          {/* Icon */}
          <div
            className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color }} />
          </div>

          {/* Title and Number */}
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${color}15`, color }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground truncate">
                {title}
              </h3>
            </div>
          </div>

          {/* Expand/Collapse Icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex-shrink-0"
          >
            <ChevronDown
              className="w-5 h-5 text-muted transition-colors group-hover:text-foreground"
            />
          </motion.div>
        </button>

        {/* Content - Expandable */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={`service-content-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-5 pb-5 pt-0">
                <div
                  className="h-px w-full mb-4"
                  style={{ backgroundColor: `${color}20` }}
                />
                <p className="text-muted leading-relaxed pl-16 sm:pl-[4.5rem]">
                  {description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Services() {
  const { t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="servicios"
      className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background-elevated"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            {t.services.overline}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-foreground">
            {t.services.headline}
          </h2>
        </motion.div>

        {/* Accordion Grid */}
        <div className="grid gap-3 sm:gap-4">
          {t.services.items.map((service, index) => (
            <ServiceAccordionItem
              key={index}
              title={service.title}
              description={service.description}
              icon={serviceIcons[index]}
              color={serviceColors[index]}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className="mt-12 sm:mt-16 text-center"
        >
          <a
            href="https://calendly.com/hostmatecostarica-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-glow transition-colors shadow-lg shadow-primary/25"
          >
            {t.about.cta.subtitle}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
