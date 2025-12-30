import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Intro Animation
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
      }, "-=0.5");

      // Parallax Effects
      // Move blobs at different speeds
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
        yPercent: -20, // Move opposite direction
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Subtle Text Parallax
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

    }, containerRef);

    return () => ctx.revert();
  }, [t]); // Re-run when language changes

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div ref={blob1Ref} className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-bronze/10 rounded-full blur-[120px]" />
        <div ref={blob2Ref} className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="hidden md:flex md:col-span-1 justify-center relative">
          <div ref={lineRef} className="w-[1px] bg-gradient-to-b from-brand-bronze/0 via-brand-bronze to-brand-bronze/0 absolute top-0" style={{ height: '100%' }}></div>
        </div>
        
        <div className="col-span-1 md:col-span-11 flex flex-col justify-center">
          <h1 ref={textRef} className="text-5xl md:text-7xl lg:text-9xl font-bold leading-[1.1] tracking-tight mb-8">
            {t.hero.titlePre} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-bronze to-amber-200">{t.hero.titleHighlight}</span>
          </h1>
          
          <div className="md:max-w-2xl">
            <p ref={subTextRef} className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 relative z-20">
             {/* Animated Scroll Indicator */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                <span className="text-xs uppercase tracking-widest">{t.hero.scroll}</span>
                <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
                    <div className="w-full h-full bg-brand-bronze animate-scrolldown"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;