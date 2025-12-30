import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from "wouter";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { LanguageProvider } from './contexts/LanguageContext';
import { Lang } from './translations';

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
          <TechStack />
          <Experience />
          <Portfolio />
          <Contact />
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