import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
  const reduceMotion = useReducedMotion();

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
    <motion.header
      initial={reduceMotion ? false : { y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 bg-paper/95 backdrop-blur-sm transition-colors ${
        scrolled || mobileMenuOpen ? 'border-b border-line shadow-[0_8px_30px_rgba(29,28,26,0.04)]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <motion.a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            navigate('/');
          }}
          className="inline-flex items-center gap-2.5 font-serif text-2xl leading-none tracking-tight"
          aria-label={`${db.company.name} home`}
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <img
            src="/brand/master-dev-mark.png"
            alt=""
            className="h-9 w-9 object-contain"
          />
          <span>{db.company.name}</span>
        </motion.a>

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
          <motion.a
            href="#contact"
            onClick={(e) => goTo(e, 'contact')}
            className="px-4 py-2 rounded-full bg-ink text-paper hover:bg-accent transition-colors"
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            Get in touch
          </motion.a>
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

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.nav
            initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden px-5 pb-6 pt-2 flex flex-col text-lg overflow-hidden"
          >
            {[...sections, { id: 'contact', label: 'Get in touch' }].map((s, index) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => goTo(e, s.id)}
                className="py-3 border-b border-line last:border-0"
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.045 }}
              >
                {s.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
