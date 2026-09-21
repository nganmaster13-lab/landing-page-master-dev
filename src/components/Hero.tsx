import React from 'react';
import { ArrowDown } from 'lucide-react';
import { StoreBadges } from './StoreBadges';
import db from '../data/db.json';

interface HeroProps {
  onExploreApps: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreApps }) => {
  return (
    <section className="pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-sm text-muted mb-8">
          {db.company.badge} · since {db.company.founded}
        </p>

        <h1 className="font-serif text-[44px] leading-[1.02] sm:text-7xl lg:text-[88px] tracking-tight max-w-4xl">
          {db.company.tagline}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl">
            {db.company.subtagline}
          </p>

          <div className="flex flex-col gap-4 md:items-end">
            <StoreBadges />
            <button
              type="button"
              onClick={onExploreApps}
              className="inline-flex items-center gap-2 text-[15px] underline underline-offset-4 decoration-line hover:decoration-ink transition-colors"
            >
              See what we've made
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
