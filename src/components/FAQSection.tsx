import React, { useState } from 'react';
import db from '../data/db.json';
import { Plus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 border-t border-line scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid gap-12 lg:grid-cols-[5fr_7fr]">
        <h2 className="font-serif text-5xl sm:text-6xl tracking-tight">Questions</h2>

        <div className="border-t border-line">
          {db.faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-6 text-left flex items-start justify-between gap-6"
                >
                  <span className="text-lg">{item.question}</span>
                  <Plus
                    className={`w-5 h-5 mt-1 shrink-0 text-muted transition-transform ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
                {isOpen && <p className="pb-6 pr-10 text-muted leading-relaxed">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
