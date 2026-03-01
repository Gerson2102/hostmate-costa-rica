'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useShouldReduceAnimations } from '@/lib/useIsMobile';
import { fetchApprovedTestimonials, submitTestimonial } from '@/lib/testimonials';
import type { Testimonial } from '@/lib/testimonials';
import {
  ContainerScroll,
  CardsContainer,
  CardTransformed,
} from '@/components/ui/animated-cards-stack';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FieldErrors {
  name?: string;
  country?: string;
  email?: string;
  review?: string;
}

export function Testimonials() {
  const { t, language } = useLanguage();
  const shouldReduceAnimations = useShouldReduceAnimations();

  // --- Reviews state ---
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Form state ---
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formLoadTime] = useState(Date.now());
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // --- Fetch reviews on mount ---
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const data = await fetchApprovedTestimonials();
      if (!cancelled) {
        setReviews(data);
        setIsLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // --- Form submit handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot checks
    if (honeypot) return;
    if (Date.now() - formLoadTime < 3000) return;

    // Per-field validation
    const errors: FieldErrors = {};
    if (name.trim().length < 2) errors.name = language === 'en' ? 'Name must be at least 2 characters.' : 'El nombre debe tener al menos 2 caracteres.';
    if (country.trim().length < 2) errors.country = language === 'en' ? 'City & Country must be at least 2 characters.' : 'Ciudad y País debe tener al menos 2 caracteres.';
    if (review.trim().length < 10) errors.review = language === 'en' ? 'Review must be at least 10 characters.' : 'La reseña debe tener al menos 10 caracteres.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = language === 'en' ? 'Please enter a valid email address.' : 'Ingresa un correo electrónico válido.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setFormState('submitting');

    const result = await submitTestimonial({
      name: name.trim(),
      country: country.trim(),
      review: review.trim(),
      language,
      email: email.trim() || undefined,
    });

    if (result.success) {
      setFormState('success');
      setName('');
      setCountry('');
      setEmail('');
      setReview('');
    } else {
      setFormState('error');
    }
  };

  // --- Animation presets ---
  const noMotion = { opacity: 1, y: 0 };
  const fadeUp = { opacity: 0, y: 20 };
  const visible = { opacity: 1, y: 0 };

  return (
    <section id="testimonios" className="py-24 lg:py-32 bg-background relative overflow-clip">
      {/* ===== Part A: Section Header ===== */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-16"
        initial={shouldReduceAnimations ? noMotion : fadeUp}
        whileInView={visible}
        viewport={{ once: true, amount: 0.3 }}
        transition={shouldReduceAnimations ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
      >
        <span
          className="inline-block text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-4"
          suppressHydrationWarning
        >
          {t.testimonials.overline}
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground" suppressHydrationWarning>
          {t.testimonials.headline}{' '}
          <span className="text-primary">{t.testimonials.headlineHighlight}</span>
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto mt-4" suppressHydrationWarning>
          {t.testimonials.subtitle}
        </p>
      </motion.div>

      {/* ===== Part B: Reviews — Animated Stacked Cards ===== */}

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center gap-4 px-4 sm:px-6 py-12">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-[340px] sm:w-[380px] lg:w-[400px] bg-background-elevated rounded-2xl p-6 lg:p-8"
              style={{ opacity: 1 - i * 0.2 }}
            >
              <div className="w-8 h-8 bg-border/50 rounded mx-auto mb-4 animate-pulse" />
              <div className="space-y-3 w-4/5 mx-auto">
                <div className="h-4 bg-border/50 rounded w-full animate-pulse" />
                <div className="h-4 bg-border/50 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-border/50 rounded w-4/6 animate-pulse" />
              </div>
              <div className="mt-6 pt-4 border-t border-border text-center">
                <div className="h-4 bg-border/50 rounded w-1/3 mx-auto mb-2 animate-pulse" />
                <div className="h-3 bg-border/50 rounded w-1/4 mx-auto animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && reviews.length === 0 && (
        <p className="text-center text-muted py-12" suppressHydrationWarning>
          {t.testimonials.noReviews}
        </p>
      )}

      {/* Reduced motion fallback — static card list */}
      {!isLoading && reviews.length > 0 && shouldReduceAnimations && (
        <div className="max-w-md mx-auto px-4 sm:px-6 space-y-6">
          {reviews.map((reviewItem, index) => (
            <div
              key={`${reviewItem.name}-${index}`}
              className="card-light rounded-2xl p-6 lg:p-8 flex flex-col items-center"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4 flex-shrink-0" />
              <blockquote className="text-foreground text-base leading-relaxed text-center w-4/5 mx-auto">
                {reviewItem.review}
              </blockquote>
              <footer className="mt-6 pt-4 border-t border-border text-center w-full">
                <cite className="not-italic">
                  <span className="font-semibold text-foreground text-lg block">{reviewItem.name}</span>
                  <span className="text-muted text-sm">{reviewItem.country}</span>
                </cite>
              </footer>
            </div>
          ))}
        </div>
      )}

      {/* Full animation — scroll-driven stacked cards */}
      {!isLoading && reviews.length > 0 && !shouldReduceAnimations && (
        <ContainerScroll className="h-[300vh]">
          <div className="sticky left-0 top-0 h-svh w-full py-12 flex items-center justify-center">
            <CardsContainer className="mx-auto h-[400px] w-[340px] sm:h-[420px] sm:w-[380px] lg:h-[450px] lg:w-[400px]">
              {reviews.map((reviewItem, index) => (
                <CardTransformed
                  key={`${reviewItem.name}-${index}`}
                  arrayLength={reviews.length}
                  index={index + 2}
                  variant="light"
                  role="article"
                  className="border-border bg-white/90 backdrop-blur-md"
                >
                  <Quote className="w-8 h-8 text-primary/20 flex-shrink-0" />
                  <blockquote className="text-foreground text-base lg:text-lg leading-relaxed text-center w-4/5 mx-auto">
                    {reviewItem.review}
                  </blockquote>
                  <footer className="pt-4 border-t border-border text-center w-full">
                    <cite className="not-italic">
                      <span className="font-semibold text-foreground text-lg block">{reviewItem.name}</span>
                      <span className="text-muted text-sm">{reviewItem.country}</span>
                    </cite>
                  </footer>
                </CardTransformed>
              ))}
            </CardsContainer>
          </div>
        </ContainerScroll>
      )}

      {/* ===== Part C: Submission Form ===== */}
      <motion.div
        className="max-w-2xl mx-auto mt-16 lg:mt-20 px-4 sm:px-6"
        initial={shouldReduceAnimations ? noMotion : fadeUp}
        whileInView={visible}
        viewport={{ once: true }}
        transition={shouldReduceAnimations ? { duration: 0 } : { duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center" suppressHydrationWarning>
          {t.testimonials.formTitle}
        </h3>
        <p className="text-muted text-center mt-2 mb-8" suppressHydrationWarning>
          {t.testimonials.formSubtitle}
        </p>

        <div className="bg-background-elevated rounded-2xl p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
                role="status"
              >
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-foreground mb-2" suppressHydrationWarning>
                  {t.testimonials.successTitle}
                </h4>
                <p className="text-muted" suppressHydrationWarning>
                  {t.testimonials.successMessage}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Name field */}
                <div className="mb-4">
                  <label
                    htmlFor="testimonial-name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                    suppressHydrationWarning
                  >
                    {t.testimonials.nameLabel}
                  </label>
                  <input
                    id="testimonial-name"
                    type="text"
                    required
                    aria-required="true"
                    minLength={2}
                    maxLength={100}
                    value={name}
                    onChange={(e) => { setName(e.target.value); setFieldErrors(prev => ({ ...prev, name: undefined })); }}
                    placeholder={t.testimonials.namePlaceholder}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${fieldErrors.name ? 'border-red-400' : 'border-border'}`}
                    disabled={formState === 'submitting'}
                    suppressHydrationWarning
                  />
                  {fieldErrors.name && <p className="text-red-500 text-sm mt-1" role="alert">{fieldErrors.name}</p>}
                </div>

                {/* Country field */}
                <div className="mb-4">
                  <label
                    htmlFor="testimonial-country"
                    className="block text-sm font-medium text-foreground mb-1.5"
                    suppressHydrationWarning
                  >
                    {t.testimonials.countryLabel}
                  </label>
                  <input
                    id="testimonial-country"
                    type="text"
                    required
                    aria-required="true"
                    minLength={2}
                    maxLength={100}
                    value={country}
                    onChange={(e) => { setCountry(e.target.value); setFieldErrors(prev => ({ ...prev, country: undefined })); }}
                    placeholder={t.testimonials.countryPlaceholder}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${fieldErrors.country ? 'border-red-400' : 'border-border'}`}
                    disabled={formState === 'submitting'}
                    suppressHydrationWarning
                  />
                  {fieldErrors.country && <p className="text-red-500 text-sm mt-1" role="alert">{fieldErrors.country}</p>}
                </div>

                {/* Email field */}
                <div className="mb-4">
                  <label
                    htmlFor="testimonial-email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                    suppressHydrationWarning
                  >
                    {t.testimonials.emailLabel}
                  </label>
                  <input
                    id="testimonial-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: undefined })); }}
                    placeholder={t.testimonials.emailPlaceholder}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${fieldErrors.email ? 'border-red-400' : 'border-border'}`}
                    disabled={formState === 'submitting'}
                    suppressHydrationWarning
                  />
                  {fieldErrors.email && <p className="text-red-500 text-sm mt-1" role="alert">{fieldErrors.email}</p>}
                </div>

                {/* Review textarea */}
                <div className="mb-4">
                  <label
                    htmlFor="testimonial-review"
                    className="block text-sm font-medium text-foreground mb-1.5"
                    suppressHydrationWarning
                  >
                    {t.testimonials.reviewLabel}
                  </label>
                  <textarea
                    id="testimonial-review"
                    required
                    aria-required="true"
                    aria-describedby="char-count"
                    minLength={10}
                    maxLength={300}
                    rows={4}
                    value={review}
                    onChange={(e) => { setReview(e.target.value.slice(0, 300)); setFieldErrors(prev => ({ ...prev, review: undefined })); }}
                    placeholder={t.testimonials.reviewPlaceholder}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none ${fieldErrors.review ? 'border-red-400' : 'border-border'}`}
                    disabled={formState === 'submitting'}
                    suppressHydrationWarning
                  />
                  {fieldErrors.review && <p className="text-red-500 text-sm mt-1" role="alert">{fieldErrors.review}</p>}
                  <p
                    id="char-count"
                    className={`text-right text-sm mt-1 ${
                      300 - review.length > 50
                        ? 'text-muted'
                        : 300 - review.length > 10
                          ? 'text-amber-500'
                          : 'text-red-500'
                    }`}
                    suppressHydrationWarning
                  >
                    {300 - review.length} {t.testimonials.charCount}
                  </p>
                </div>

                {/* Honeypot field (anti-bot) */}
                <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  whileHover={shouldReduceAnimations ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceAnimations ? {} : { scale: 0.98 }}
                  suppressHydrationWarning
                >
                  <Send className="w-4 h-4" />
                  {formState === 'submitting' ? t.testimonials.submitting : t.testimonials.submit}
                </motion.button>

                {/* Server error message */}
                {formState === 'error' && (
                  <p className="text-red-500 text-sm mt-3" role="alert" suppressHydrationWarning>
                    {t.testimonials.errorMessage}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
