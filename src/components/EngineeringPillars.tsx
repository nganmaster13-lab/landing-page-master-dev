import React from 'react';
import db from '../data/db.json';

export const EngineeringPillars: React.FC = () => {
  return (
    <section id="approach" className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid gap-12 lg:grid-cols-[5fr_7fr]">
        <div>
          <h2 className="font-serif text-5xl sm:text-6xl tracking-tight">How we work</h2>
          <p className="text-muted mt-4 max-w-sm leading-relaxed">
            We're a small team, so we keep the list of things we care about short.
          </p>
        </div>

        <ol className="border-t border-line">
          {db.pillars.map((pillar, idx) => (
            <li key={pillar.title} className="grid grid-cols-[2.5rem_1fr] gap-2 py-7 border-b border-line">
              <span className="font-serif text-xl text-muted">{idx + 1}.</span>
              <div>
                <h3 className="text-xl font-medium">{pillar.title}</h3>
                <p className="mt-2 text-muted leading-relaxed">{pillar.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
