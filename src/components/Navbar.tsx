import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import db from '../data/db.json';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  navigate: (route: PageRoute) => void;
  scrollToSection: (id: string) => void;
}

const sections = [
  { id: 'products', label: 'Apps' },
  { id: 'approach', label: 'How we work' },
  { id: 'faq', label: 'FAQ' },
];

export const Navbar: React.FC<NavbarProps> = ({ navigate, scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-paper/95 backdrop-blur-sm transition-colors ${
        scrolled || mobileMenuOpen ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            navigate('/');
          }}
          className="font-serif text-2xl leading-none tracking-tight"
        >
          {db.company.name}
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[15px]">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => goTo(e, s.id)}
              className="text-muted hover:text-ink transition-colors"
            >
              {s.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => goTo(e, 'contact')}
            className="px-4 py-2 rounded-full bg-ink text-paper hover:bg-accent transition-colors"
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden px-5 pb-6 pt-2 flex flex-col text-lg">
          {[...sections, { id: 'contact', label: 'Get in touch' }].map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => goTo(e, s.id)}
              className="py-3 border-b border-line last:border-0"
            >
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
