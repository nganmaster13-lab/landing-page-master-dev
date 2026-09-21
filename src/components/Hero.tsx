import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { StoreBadges } from './StoreBadges';
import db from '../data/db.json';

interface HeroProps {
  onExploreApps: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreApps }) => {
  const reduceMotion = useReducedMotion();
  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="pt-36 pb-20 md:pt-44 md:pb-28">
      <motion.div
        className="max-w-6xl mx-auto px-5 sm:px-8"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: reduceMotion ? 0 : 0.11 }}
      >
        <motion.p
          variants={item}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm text-muted mb-8"
        >
          {db.company.badge} · since {db.company.founded}
        </motion.p>

        <motion.h1
          variants={item}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[44px] leading-[1.02] sm:text-7xl lg:text-[88px] tracking-tight max-w-4xl"
        >
          {db.company.tagline}
        </motion.h1>

        <motion.div
          variants={item}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"
        >
          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl">
            {db.company.subtagline}
          </p>

          <div className="flex flex-col gap-4 md:items-end">
            <StoreBadges />
            <motion.button
              type="button"
              onClick={onExploreApps}
              whileHover={reduceMotion ? undefined : { y: 2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex items-center gap-2 text-[15px] underline underline-offset-4 decoration-line hover:decoration-ink transition-colors"
            >
              See what we've made
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <ArrowDown className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
