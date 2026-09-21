import React from 'react';
import db from '../data/db.json';
import { ArrowUpRight } from 'lucide-react';

const stores = [
  {
    key: 'appStore',
    config: db.stores.appStore,
    blurb: 'Everything we make for iPhone and iPad, in one place.',
  },
  {
    key: 'googlePlay',
    config: db.stores.googlePlay,
    blurb: 'The same apps, built natively for Android.',
  },
];

export const StorePresence: React.FC = () => {
  return (
    <section id="stores" className="bg-ink text-paper scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {db.metrics.map((metric) => (
            <div key={metric.id} className="pr-6">
              <p className="font-serif text-5xl sm:text-6xl tracking-tight">{metric.value}</p>
              <p className="mt-2 text-sm text-paper/60">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 border-t border-paper/15">
          {stores.map(({ key, config, blurb }, i) => (
            <a
              key={key}
              href={config.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-start justify-between gap-6 py-8 border-b border-paper/15 md:border-b-0 ${
                i === 1 ? 'md:pl-10 md:border-l' : 'md:pr-10'
              }`}
            >
              <div>
                <p className="text-sm text-paper/60">{config.storePlatform}</p>
                <h3 className="font-serif text-3xl mt-1">{config.name}</h3>
                <p className="mt-2 text-paper/70">{blurb}</p>
              </div>
              <ArrowUpRight className="w-6 h-6 shrink-0 mt-1 text-paper/50 group-hover:text-paper group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
