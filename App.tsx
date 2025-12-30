import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from "wouter";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { LanguageProvider } from './contexts/LanguageContext';
import { Lang } from './translations';

// Lazy load components for better performance
const TechStack = lazy(() => import('./components/TechStack'));
const Experience = lazy(() => import('./components/Experience'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-brand-bronze border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const MainLayout: React.FC<{ lang: Lang }> = ({ lang }) => {
  return (
    <LanguageProvider lang={lang}>
      <div className="font-sans bg-brand-dark text-white selection:bg-brand-bronze selection:text-white">
        <style>{`
          @keyframes scrolldown {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-scrolldown {
            animation: scrolldown 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
          }
        `}</style>
        
        <Navbar />
        
        <main>
          <Hero />
          <Suspense fallback={<LoadingFallback />}>
            <TechStack />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <SocialProof />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Portfolio />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <FAQ />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        </main>
      </div>
    </LanguageProvider>
  );
};

const App: React.FC = () => {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Default redirect to English if root
    if (location === '/') {
      setLocation('/en');
    }
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path="/en"><MainLayout lang="en" /></Route>
      <Route path="/rom"><MainLayout lang="rom" /></Route>
      <Route path="/ru"><MainLayout lang="ru" /></Route>
      
      {/* Fallback to English for unknown routes */}
      <Route><MainLayout lang="en" /></Route>
    </Switch>
  );
};

export default App;