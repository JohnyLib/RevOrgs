import React, { useState, useEffect } from 'react';
import RevOrgsLogo from './RevOrgsLogo';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div onClick={() => scrollToSection('home')} className="cursor-pointer block">
          <RevOrgsLogo className="h-10 w-auto text-brand-bronze" />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button onClick={() => scrollToSection('home')} className="hover:text-brand-bronze transition-colors">{t.nav.home}</button>
          
          <button onClick={() => scrollToSection('tech')} className="hover:text-brand-bronze transition-colors">{t.nav.stack}</button>

          <button onClick={() => scrollToSection('experience')} className="hover:text-brand-bronze transition-colors">{t.nav.experience}</button>

          <button onClick={() => scrollToSection('portfolio')} className="hover:text-brand-bronze transition-colors">{t.nav.portfolio}</button>
          
          <button 
            onClick={() => scrollToSection('contact')} 
            className="px-5 py-2 rounded-full border border-white/20 hover:bg-brand-bronze hover:border-brand-bronze hover:text-white transition-all duration-300"
          >
            {t.nav.cta}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center border border-white/10 rounded-full px-2 py-1 bg-black/20">
            <button 
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-full transition-colors ${lang === 'en' ? 'text-white bg-white/10' : 'text-gray-500 hover:text-white'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('rom')}
              className={`px-2 py-1 rounded-full transition-colors ${lang === 'rom' ? 'text-white bg-white/10' : 'text-gray-500 hover:text-white'}`}
            >
              RO
            </button>
            <button 
              onClick={() => setLang('ru')}
              className={`px-2 py-1 rounded-full transition-colors ${lang === 'ru' ? 'text-white bg-white/10' : 'text-gray-500 hover:text-white'}`}
            >
              RU
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;