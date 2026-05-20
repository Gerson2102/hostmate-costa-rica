// components/TeamSection.tsx
'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { useIsMobile } from '@/lib/useIsMobile';

// ============================================
// TYPES
// ============================================
interface TeamMember {
  id: string;
  name: string;
  photo: string;
  alt: string;
}

// ============================================
// STATIC DATA
// ============================================
const teamMembers: TeamMember[] = [
  {
    id: 'vanessa',
    name: 'Vanessa',
    photo: '/assets/Vanessa.webp',
    alt: 'Vanessa - Co-founder of Hostmate Costa Rica',
  },
  {
    id: 'julian',
    name: 'Julian',
    photo: '/assets/Julian.webp',
    alt: 'Julian - Co-founder of Hostmate Costa Rica',
  },
];

// ============================================
// SUB-COMPONENT: TeamMemberCard
// ============================================
interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isMobile: boolean | undefined;
}

const TeamMemberCard = memo(function TeamMemberCard({ member, index, isMobile }: TeamMemberCardProps) {
  const { t } = useLanguage();
  const memberTranslation = t.team[member.id as keyof typeof t.team];

  // Type guard to ensure we have the expected member translation structure
  if (typeof memberTranslation === 'string') {
    return null;
  }

  // Simplified animations for mobile
  const cardVariants = isMobile !== false
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3 } }
    : { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: index * 0.15, duration: 0.8, ease: [0.19, 1, 0.22, 1] } };

  return (
    <motion.article
      className="flex flex-col items-center text-center"
      initial={cardVariants.initial}
      whileInView={cardVariants.whileInView}
      viewport={{ once: true }}
      transition={cardVariants.transition}
    >
      {/* Photo Container */}
      <div className="relative mb-6">
        {/* Decorative rings - hidden on mobile for performance */}
        {isMobile === false && (
          <>
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-full" />
            <div className="absolute -inset-8 border border-primary/10 rounded-full hidden sm:block" />
          </>
        )}

        {/* Circular photo frame */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary/30">
          <Image
            src={member.photo}
            alt={member.alt}
            fill
            sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
            className="object-cover"
            priority={false}
            loading="lazy"
          />
        </div>

        {/* Name badge overlay - no animation on mobile */}
        {isMobile !== false ? (
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg shadow-black/10 border border-black/5">
            <p className="text-foreground font-bold text-lg" suppressHydrationWarning>{memberTranslation.name}</p>
          </div>
        ) : (
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg shadow-black/10 border border-black/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            <p className="text-foreground font-bold text-lg" suppressHydrationWarning>{memberTranslation.name}</p>
          </motion.div>
        )}
      </div>

      {/* Role label */}
      <p className="text-primary text-xs uppercase tracking-[0.2em] font-semibold mt-8 mb-3" suppressHydrationWarning>
        {memberTranslation.role}
      </p>

      {/* Greeting - simplified on mobile */}
      <p className="text-foreground font-semibold text-lg mb-4" suppressHydrationWarning>
        {memberTranslation.greeting}
      </p>

      {/* Bio description */}
      <p className="text-muted text-base lg:text-lg leading-relaxed max-w-md whitespace-pre-line" suppressHydrationWarning>
        {memberTranslation.bio}
      </p>
    </motion.article>
  );
});

// ============================================
// MAIN COMPONENT: TeamSection
// ============================================
export function TeamSection() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section
      id="equipo"
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decorative elements - hidden on mobile for performance */}
      {isMobile === false && (
        <>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px]" />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - simplified on mobile */}
        <div className="text-center mb-16">
          {isMobile !== false ? (
            <>
              <span className="text-primary font-medium text-sm uppercase tracking-[0.2em]" suppressHydrationWarning>
                {t.team.overline}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 text-foreground leading-[1.1] text-pretty" suppressHydrationWarning>
                {t.team.headline}{' '}
                <span className="text-primary" suppressHydrationWarning>{t.team.headlineHighlight}</span>
              </h2>
            </>
          ) : (
            <>
              <motion.span
                className="text-primary font-medium text-sm uppercase tracking-[0.2em]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                suppressHydrationWarning
              >
                {t.team.overline}
              </motion.span>
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 text-foreground leading-[1.1] text-pretty"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                suppressHydrationWarning
              >
                {t.team.headline}{' '}
                <span className="text-primary" suppressHydrationWarning>{t.team.headlineHighlight}</span>
              </motion.h2>
            </>
          )}
        </div>

        {/* Team Members Grid - 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
