import React, { useState, useEffect } from 'react';
import RevOrgsLogo from './RevOrgsLogo';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div onClick={() => scrollToSection('home')} className="cursor-pointer block">
            <RevOrgsLogo className="h-10 w-auto text-brand-bronze" />
          </div>
          
          {/* Desktop Menu */}
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
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-brand-dark border-l border-white/10 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <RevOrgsLogo className="h-8 w-auto text-brand-bronze" showText={true} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Menu Navigation */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              className="w-full text-left px-4 py-3 text-lg font-medium text-gray-300 hover:text-brand-bronze hover:bg-white/5 rounded-lg transition-all"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => scrollToSection('tech')}
              className="w-full text-left px-4 py-3 text-lg font-medium text-gray-300 hover:text-brand-bronze hover:bg-white/5 rounded-lg transition-all"
            >
              {t.nav.stack}
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="w-full text-left px-4 py-3 text-lg font-medium text-gray-300 hover:text-brand-bronze hover:bg-white/5 rounded-lg transition-all"
            >
              {t.nav.experience}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="w-full text-left px-4 py-3 text-lg font-medium text-gray-300 hover:text-brand-bronze hover:bg-white/5 rounded-lg transition-all"
            >
              {t.nav.portfolio}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-left px-4 py-3 text-lg font-bold text-white bg-brand-bronze hover:bg-amber-700 rounded-lg transition-all"
            >
              {t.nav.cta}
            </button>

            {/* Language Switcher in Mobile Menu */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <p className="px-4 mb-3 text-sm text-gray-500 uppercase tracking-wider">Language</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setLang('en');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    lang === 'en'
                      ? 'bg-brand-bronze/20 text-brand-bronze border border-brand-bronze/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => {
                    setLang('rom');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    lang === 'rom'
                      ? 'bg-brand-bronze/20 text-brand-bronze border border-brand-bronze/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Română (RO)
                </button>
                <button
                  onClick={() => {
                    setLang('ru');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    lang === 'ru'
                      ? 'bg-brand-bronze/20 text-brand-bronze border border-brand-bronze/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Русский (RU)
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;