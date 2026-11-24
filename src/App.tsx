import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PageRoute } from './types';
import db from './data/db.json';
import { SHOW_OUR_APPS, appsSection } from './config';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { StorePresence } from './components/StorePresence';
import { EngineeringPillars } from './components/EngineeringPillars';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { LegalPage } from './components/LegalPage';
import { Footer } from './components/Footer';
import {
  yesteroDocumentNav,
  yesteroPolicyDocument,
  yesteroSupportDocument,
  yesteroTermsDocument,
} from './data/yestero';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('/');
  const reduceMotion = useReducedMotion();

  // Initialize and listen to route changes (supporting both pathname and hash for robust previewing)
  useEffect(() => {
    const parseRoute = (): PageRoute => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const location = `${path}${hash}`;

      if (location.includes('yestero/support')) {
        return '/yestero/support';
      }
      if (location.includes('yestero/policy')) {
        return '/yestero/policy';
      }
      if (location.includes('yestero/terms')) {
        return '/yestero/terms';
      }

      if (location.includes('/child-safety-standards') || hash.includes('child-safety-standards')) {
        return '/child-safety-standards';
      }
      if (location.includes('/policy') || hash.includes('policy')) {
        return '/policy';
      }
      if (location.includes('/terms') || hash.includes('terms')) {
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

      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentRoute}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentRoute === '/' && (
              <>
                <Hero onExploreApps={() => scrollToSection(appsSection.id)} />
                {SHOW_OUR_APPS && <ProductSection />}
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

            {currentRoute === '/child-safety-standards' && (
              <LegalPage
                title="Child Safety Standards"
                document={db.childSafetyStandardsDocument}
                navigate={navigate}
              />
            )}

            {currentRoute === '/yestero/support' && (
              <LegalPage
                title="Support"
                eyebrow="Yestero"
                document={yesteroSupportDocument}
                documentNav={yesteroDocumentNav}
                currentRoute={currentRoute}
                navigate={navigate}
              />
            )}

            {currentRoute === '/yestero/policy' && (
              <LegalPage
                title="Privacy Policy"
                eyebrow="Yestero"
                document={yesteroPolicyDocument}
                documentNav={yesteroDocumentNav}
                currentRoute={currentRoute}
                navigate={navigate}
              />
            )}

            {currentRoute === '/yestero/terms' && (
              <LegalPage
                title="Terms of Use"
                eyebrow="Yestero"
                document={yesteroTermsDocument}
                documentNav={yesteroDocumentNav}
                currentRoute={currentRoute}
                navigate={navigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer currentRoute={currentRoute} navigate={navigate} scrollToSection={scrollToSection} />
    </div>
  );
}
