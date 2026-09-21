import React, { useEffect, useState } from 'react';
import db from '../data/db.json';
import { AppProduct } from '../types';
import { ArrowUpRight, Star, X } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'Productivity & Utility', label: 'Productivity' },
  { id: 'Business & Utilities', label: 'Utilities' },
  { id: 'Health & Lifestyle', label: 'Lifestyle' },
  { id: 'Photo & Video', label: 'Photo' },
];

const StoreLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 hover:text-accent transition-colors"
  >
    {children}
    <ArrowUpRight className="w-3.5 h-3.5" />
  </a>
);

export const ProductSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeApp, setActiveApp] = useState<AppProduct | null>(null);

  useEffect(() => {
    if (!activeApp) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActiveApp(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeApp]);

  const filteredProducts = db.products.filter(
    (app) => selectedCategory === 'all' || app.category.includes(selectedCategory)
  );

  return (
    <section id="products" className="py-20 md:py-28 border-t border-line scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-5xl sm:text-6xl tracking-tight">Our apps</h2>
            <p className="text-muted mt-3 max-w-md">
              A handful of apps we design, build and keep updating ourselves.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`pb-0.5 border-b transition-colors ${
                  selectedCategory === cat.id
                    ? 'border-ink text-ink'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {filteredProducts.map((app) => (
            <article key={app.id}>
              <button
                type="button"
                onClick={() => setActiveApp(app)}
                className="block w-full aspect-[4/3] rounded-lg overflow-hidden bg-paper-2"
                aria-label={`More about ${app.name}`}
              >
                <img
                  src={app.coverImage}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </button>

              <div className="mt-5 flex items-start gap-4">
                <img
                  src={app.icon}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-[12px] object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-xl font-medium">{app.name}</h3>
                    <span className="flex items-center gap-1 text-sm text-muted shrink-0">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {app.rating}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{app.category}</p>
                </div>
              </div>

              <p className="mt-4 leading-relaxed">{app.tagline}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <StoreLink href={app.appStoreUrl}>App Store</StoreLink>
                <StoreLink href={app.googlePlayUrl}>Google Play</StoreLink>
                <button
                  type="button"
                  onClick={() => setActiveApp(app)}
                  className="text-muted hover:text-ink underline underline-offset-4 decoration-line"
                >
                  Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeApp && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-ink/40"
          onClick={() => setActiveApp(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeApp.name}
            onClick={(e) => e.stopPropagation()}
            className="bg-paper w-full sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 relative"
          >
            <button
              type="button"
              onClick={() => setActiveApp(null)}
              className="absolute top-4 right-4 p-2 text-muted hover:text-ink"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 pr-8">
              <img
                src={activeApp.icon}
                alt=""
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-[14px] object-cover"
              />
              <div>
                <h3 className="font-serif text-3xl leading-tight">{activeApp.name}</h3>
                <p className="text-sm text-muted">{activeApp.category}</p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-3 border-y border-line text-sm">
              <div className="py-3">
                <dt className="text-muted">Rating</dt>
                <dd>
                  {activeApp.rating} <span className="text-muted">({activeApp.reviewsCount})</span>
                </dd>
              </div>
              <div className="py-3 border-l border-line pl-4">
                <dt className="text-muted">Version</dt>
                <dd>{activeApp.version}</dd>
              </div>
              <div className="py-3 border-l border-line pl-4">
                <dt className="text-muted">Size</dt>
                <dd>{activeApp.size}</dd>
              </div>
            </dl>

            <p className="mt-6 leading-relaxed">{activeApp.description}</p>

            <ul className="mt-6 space-y-2 text-[15px]">
              {activeApp.highlights.map((hl) => (
                <li key={hl} className="flex gap-3">
                  <span className="text-accent">—</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={activeApp.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-ink text-paper text-sm hover:bg-accent transition-colors"
              >
                App Store
              </a>
              <a
                href={activeApp.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-ink text-sm hover:bg-ink hover:text-paper transition-colors"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
