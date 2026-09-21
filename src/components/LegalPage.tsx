import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { LegalDocument, PageRoute } from '../types';
import { Reveal } from './Reveal';

interface LegalPageProps {
  title: string;
  document: LegalDocument;
  navigate: (route: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, document: doc, navigate }) => {
  const reduceMotion = useReducedMotion();

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="no-print inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <motion.header
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 pb-10 border-b border-line"
        >
          <h1 className="font-serif text-5xl sm:text-7xl tracking-tight">{title}</h1>
          <p className="mt-4 text-sm text-muted">
            Last updated {doc.lastUpdated} · Effective {doc.effectiveDate}
          </p>
        </motion.header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[14rem_1fr]">
          <nav className="no-print hidden lg:block">
            <ul className="sticky top-24 space-y-2 text-sm text-muted">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="hover:text-ink transition-colors">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Reveal className="max-w-2xl">
            <p className="text-lg leading-relaxed">{doc.introduction}</p>

            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className="mt-12 scroll-mt-24">
                <h2 className="text-xl font-medium">{section.title}</h2>
                <div className="mt-3 text-muted leading-relaxed whitespace-pre-line">{section.content}</div>
              </section>
            ))}

            <p className="mt-16 pt-8 border-t border-line text-muted">
              Questions about this document? Email{' '}
              <a href={`mailto:${doc.contactEmail}`} className="text-ink underline underline-offset-4">
                {doc.contactEmail}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </article>
  );
};
