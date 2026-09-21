import React from 'react';
import db from '../data/db.json';
import { PageRoute } from '../types';

interface FooterProps {
  navigate: (route: PageRoute) => void;
  scrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, scrollToSection }) => {
  const year = new Date().getFullYear();

  const nav = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    navigate(route);
  };

  const section = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const linkClass = 'hover:text-ink transition-colors';

  return (
    <footer className="border-t border-line text-sm text-muted">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-serif text-3xl text-ink">{db.company.name}</p>
          <a href={`mailto:${db.company.email}`} className={`block mt-3 ${linkClass}`}>
            {db.company.email}
          </a>
        </div>

        <ul className="space-y-2">
          <li>
            <a href="#products" onClick={(e) => section(e, 'products')} className={linkClass}>
              Apps
            </a>
          </li>
          <li>
            <a href={db.stores.appStore.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              App Store
            </a>
          </li>
          <li>
            <a href={db.stores.googlePlay.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Google Play
            </a>
          </li>
        </ul>

        <ul className="space-y-2">
          <li>
            <a href="/policy" onClick={(e) => nav(e, '/policy')} className={linkClass}>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" onClick={(e) => nav(e, '/terms')} className={linkClass}>
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => section(e, 'contact')} className={linkClass}>
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-10 text-xs leading-relaxed space-y-2">
        <p>
          © {year} {db.company.legalName}
        </p>
        <p className="max-w-3xl opacity-80">
          Apple, the Apple logo, iPhone, iPad and App Store are trademarks of Apple Inc., registered in the U.S.
          and other countries. Google Play and the Google Play logo are trademarks of Google LLC.
        </p>
      </div>
    </footer>
  );
};
