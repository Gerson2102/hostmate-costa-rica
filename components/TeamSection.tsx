// components/TeamSection.tsx
'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

interface TeamMember {
  id: 'vanessa' | 'julian';
  photo: string;
  alt: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 'vanessa',
    photo: '/assets/Vanessa.webp',
    alt: 'Vanessa - Co-founder of Hostmate Costa Rica',
  },
  {
    id: 'julian',
    photo: '/assets/Julian.webp',
    alt: 'Julian - Co-founder of Hostmate Costa Rica',
  },
];

export function TeamSection() {
  const { t } = useLanguage();

  return (
    <section id="equipo" className="py-24 lg:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] text-pretty text-center mb-16">
          {t.team.headline}{' '}
          <span className="text-primary">{t.team.headlineHighlight}</span>
        </h2>

        {/* Team Members Grid - 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-12">
          {teamMembers.map((member) => {
            const person = t.team[member.id];
            return (
              <article key={member.id} className="reveal flex flex-col items-center text-center">
                {/* Photo with name badge */}
                <div className="relative mb-6">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.alt}
                      fill
                      sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg shadow-black/10 border border-black/5">
                    <p className="text-foreground font-bold text-lg">{person.name}</p>
                  </div>
                </div>

                <p className="text-primary-dark text-sm font-semibold mt-8 mb-3">
                  {person.role}
                </p>

                <p className="text-foreground font-semibold text-lg mb-4">
                  {person.greeting}
                </p>

                <p className="text-muted text-base lg:text-lg leading-relaxed max-w-md whitespace-pre-line">
                  {person.bio}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
