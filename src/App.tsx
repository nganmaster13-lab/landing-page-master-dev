import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import db from './data/db.json';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorePresence } from './components/StorePresence';
import { ProductSection } from './components/ProductSection';
import { EngineeringPillars } from './components/EngineeringPillars';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { LegalPage } from './components/LegalPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('/');

  // Initialize and listen to route changes (supporting both pathname and hash for robust previewing)
  useEffect(() => {
    const parseRoute = (): PageRoute => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.includes('/policy') || hash.includes('policy')) {
        return '/policy';
      }
      if (path.includes('/terms') || hash.includes('terms')) {
        return '/terms';
      }
      return '/';
    };

    setCurrentRoute(parseRoute());

    const handlePopState = () => {
      setCurrentRoute(parseRoute());
      window.scrollTo({ top: 0 });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (route: PageRoute) => {
    setCurrentRoute(route);
    try {
      window.history.pushState({}, '', route);
    } catch {
      // Fallback for sandboxed iframes that may restrict pushState
      window.location.hash = route === '/' ? '' : route.replace('/', '');
    }
    window.scrollTo({ top: 0 });
  };

  const scrollToSection = (id: string) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (currentRoute !== '/') {
      navigate('/');
      setTimeout(scroll, 100);
    } else {
      scroll();
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Navbar currentRoute={currentRoute} navigate={navigate} scrollToSection={scrollToSection} />

      <main className="flex-1">
        {currentRoute === '/' && (
          <>
            <Hero onExploreApps={() => scrollToSection('products')} />
            <ProductSection />
            <StorePresence />
            <EngineeringPillars />
            <FAQSection />
            <ContactSection />
          </>
        )}

        {currentRoute === '/policy' && (
          <LegalPage title="Privacy Policy" document={db.policyDocument} navigate={navigate} />
        )}

        {currentRoute === '/terms' && (
          <LegalPage title="Terms of Service" document={db.termsDocument} navigate={navigate} />
        )}
      </main>

      <Footer navigate={navigate} scrollToSection={scrollToSection} />
    </div>
  );
}
