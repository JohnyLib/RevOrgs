import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { shouldAnimate, isMobile } from '../utils/performance';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const animate = shouldAnimate();
    const mobile = isMobile();
    
    const ctx = gsap.context(() => {
      if (!animate || mobile) {
        // No animations or very simple CSS animations for mobile
        // Batch DOM updates to avoid forced reflow
        requestAnimationFrame(() => {
          if (textRef.current) {
            textRef.current.style.opacity = '1';
            textRef.current.style.transform = 'translateY(0)';
          }
          if (subTextRef.current) {
            subTextRef.current.style.opacity = '1';
            subTextRef.current.style.transform = 'translateY(0)';
          }
          if (buttonsRef.current) {
            buttonsRef.current.style.opacity = '1';
            buttonsRef.current.style.transform = 'translateY(0)';
          }
        });
        return;
      }

      const tl = gsap.timeline();
        // Full animations for desktop
        tl.from(lineRef.current, {
          height: 0,
          duration: 1,
          ease: "power3.inOut"
        })
        .from(textRef.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          skewY: 5
        }, "-=0.5")
        .from(subTextRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.5")
        .from(buttonsRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3");

        // Parallax Effects (desktop only)
        gsap.to(blob1Ref.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(blob2Ref.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(textRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [t, mounted]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" ref={containerRef}>
      {/* Background Ambience - Reduced on mobile */}
      {!isMobile() && (
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div ref={blob1Ref} className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-bronze/10 rounded-full blur-[120px]" />
          <div ref={blob2Ref} className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="hidden md:flex md:col-span-1 justify-center relative">
          <div ref={lineRef} className="w-[1px] bg-gradient-to-b from-brand-bronze/0 via-brand-bronze to-brand-bronze/0 absolute top-0" style={{ height: '100%' }}></div>
        </div>
        
        <div className="col-span-1 md:col-span-11 flex flex-col justify-center">
          <h1 ref={textRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold leading-[1.1] tracking-tight mb-6 md:mb-8 will-change-transform">
            {t.hero.titlePre} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-bronze to-amber-200">{t.hero.titleHighlight}</span>
          </h1>
          
          <div className="md:max-w-2xl">
            <p ref={subTextRef} className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          <div ref={buttonsRef} className="mt-8 md:mt-12 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 relative z-20">
            <a 
              href="#contact" 
              className="group relative px-6 py-3 md:px-8 md:py-4 bg-brand-bronze text-white font-bold rounded-xl hover:bg-amber-700 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-brand-bronze/30 hover:shadow-brand-bronze/50 hover:scale-105 text-sm md:text-base"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-bronze to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </a>
            
            <a 
              href="#portfolio" 
              className="px-6 py-3 md:px-8 md:py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Sparkles size={16} className="md:w-[18px] md:h-[18px]" />
              <span>{t.hero.ctaSecondary}</span>
            </a>
            
            <a 
              href="#contact" 
              className="px-6 py-3 md:px-8 md:py-4 text-gray-300 font-medium rounded-xl hover:text-white active:scale-95 transition-colors duration-300 flex items-center justify-center gap-2 underline decoration-brand-bronze/50 hover:decoration-brand-bronze underline-offset-4 text-sm md:text-base"
            >
              {t.hero.ctaConsultation} →
            </a>
          </div>

          {/* Animated Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <span className="text-xs uppercase tracking-widest">{t.hero.scroll}</span>
            <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
              <div className="w-full h-full bg-brand-bronze animate-scrolldown"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;