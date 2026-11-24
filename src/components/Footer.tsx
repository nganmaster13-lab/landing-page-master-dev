import React from 'react';
import db from '../data/db.json';
import { appsSection } from '../config';
import { AppProduct, PageRoute } from '../types';
import { Reveal } from './Reveal';

const products = db.products as AppProduct[];

interface FooterProps {
  currentRoute: PageRoute;
  navigate: (route: PageRoute) => void;
  scrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentRoute, navigate, scrollToSection }) => {
  const year = new Date().getFullYear();
  const isYesteroRoute = currentRoute.startsWith('/yestero/');

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
      <Reveal className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4" distance={16}>
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src="/brand/master-dev-mark.png"
              alt=""
              className="h-11 w-11 object-contain"
            />
            <p className="font-serif text-3xl text-ink">{db.company.name}</p>
          </div>
          <a href={`mailto:${db.company.email}`} className={`block mt-3 ${linkClass}`}>
            {db.company.email}
          </a>
        </div>

        <div>
          <a
            href={`#${appsSection.id}`}
            onClick={(e) => section(e, appsSection.id)}
            className={`font-medium text-ink ${linkClass}`}
          >
            {appsSection.label}
          </a>
          <ul className="mt-3 space-y-2">
            {products.flatMap((app) => [
              app.googlePlayUrl ? (
                <li key={`${app.id}-google-play`}>
                  <a
                    href={app.googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {app.name} on Google Play
                  </a>
                </li>
              ) : null,
              app.appStoreUrl ? (
                <li key={`${app.id}-app-store`}>
                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {app.name} on App Store
                  </a>
                </li>
              ) : null,
            ])}
          </ul>
        </div>

        <ul className="space-y-2">
          {isYesteroRoute && (
            <li>
              <a
                href="/yestero/support"
                onClick={(e) => nav(e, '/yestero/support')}
                className={linkClass}
              >
                Yestero Support
              </a>
            </li>
          )}
          <li>
            <a
              href={isYesteroRoute ? '/yestero/policy' : '/policy'}
              onClick={(e) => nav(e, isYesteroRoute ? '/yestero/policy' : '/policy')}
              className={linkClass}
            >
              {isYesteroRoute ? 'Yestero Privacy Policy' : 'Privacy Policy'}
            </a>
          </li>
          <li>
            <a
              href={isYesteroRoute ? '/yestero/terms' : '/terms'}
              onClick={(e) => nav(e, isYesteroRoute ? '/yestero/terms' : '/terms')}
              className={linkClass}
            >
              {isYesteroRoute ? 'Yestero Terms of Use' : 'Terms of Service'}
            </a>
          </li>
          {!isYesteroRoute && (
            <li>
              <a
                href="/child-safety-standards"
                onClick={(e) => nav(e, '/child-safety-standards')}
                className={linkClass}
              >
                Child Safety Standards
              </a>
            </li>
          )}
          <li>
            <a href="#contact" onClick={(e) => section(e, 'contact')} className={linkClass}>
              Contact
            </a>
          </li>
        </ul>
      </Reveal>

      <Reveal className="max-w-6xl mx-auto px-5 sm:px-8 pb-10 text-xs leading-relaxed space-y-2" delay={0.06} distance={12}>
        <p>
          © {year} {db.company.legalName}
        </p>
        <p className="max-w-3xl opacity-80">
          Apple, the Apple logo, iPhone, iPad and App Store are trademarks of Apple Inc., registered in the U.S.
          and other countries. Google Play and the Google Play logo are trademarks of Google LLC.
        </p>
      </Reveal>
    </footer>
  );
};
