import React from 'react';
import db from '../data/db.json';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal } from './Reveal';

export const EngineeringPillars: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="approach" className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid gap-12 lg:grid-cols-[5fr_7fr]">
        <Reveal>
          <h2 className="font-serif text-5xl sm:text-6xl tracking-tight">How we work</h2>
          <p className="text-muted mt-4 max-w-sm leading-relaxed">
            We're a small team, so we keep the list of things we care about short.
          </p>
        </Reveal>

        <ol className="border-t border-line">
          {db.pillars.map((pillar, idx) => (
            <motion.li
              key={pillar.title}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-[2.5rem_1fr] gap-2 py-7 border-b border-line"
            >
              <span className="font-serif text-xl text-muted">{idx + 1}.</span>
              <div>
                <h3 className="text-xl font-medium transition-colors group-hover:text-accent">{pillar.title}</h3>
                <p className="mt-2 text-muted leading-relaxed">{pillar.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
