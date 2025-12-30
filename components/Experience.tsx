import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProcess } from '../constants';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { shouldAnimate, isMobile } from '../utils/performance';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();
  
  const processSteps = getProcess(lang);

  useEffect(() => {
    const animate = shouldAnimate();
    const mobile = isMobile();

    const ctx = gsap.context(() => {
      if (!animate || mobile) {
        // Simple static display for mobile
        if (lineFillRef.current) {
          lineFillRef.current.style.height = '100%';
        }
        gsap.set('.process-card', { opacity: 1, x: 0 });
        gsap.set('.step-marker', { y: 0 });
        return;
      }

      // 1. Line Drawing Animation (desktop only)
      gsap.fromTo(lineFillRef.current, 
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center+=100',
            end: 'bottom center+=100',
            scrub: 0.5,
          }
        }
      );

      // 2. Card Entrance Animations (desktop only)
      const cards = gsap.utils.toArray('.process-card');
      cards.forEach((card: any, index) => {
        const isEven = index % 2 === 0;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          x: isEven ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

      // 3. Parallax for center markers (desktop only)
      const markers = gsap.utils.toArray('.step-marker');
      markers.forEach((marker: any) => {
        gsap.to(marker, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: marker.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section id="experience" className="py-32 relative bg-brand-dark overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-brand-bronze text-sm font-bold tracking-widest uppercase mb-2 block">{t.experience.kicker}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t.experience.title}</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Roadmap Container */}
        <div className="relative">
          
          {/* Central Line Background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
            {/* Filling Line */}
            <div ref={lineFillRef} className="w-full bg-brand-bronze relative shadow-[0_0_15px_rgba(139,90,43,0.8)]">
               {/* Arrow Head */}
               <div ref={arrowRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-brand-bronze filter drop-shadow-[0_0_8px_rgba(139,90,43,0.8)]">
                  <ChevronDown size={24} className="animate-bounce" />
               </div>
            </div>
          </div>

          <div className="space-y-16 md:space-y-32">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className={`process-card flex flex-col md:flex-row items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-brand-bronze">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Center Node (Marker) */}
                  <div className="step-marker absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-brand-dark border-2 border-brand-bronze z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                     <span className="text-[10px] font-bold text-brand-bronze">{step.id}</span>
                  </div>

                  {/* Empty Side for Layout Balance */}
                  <div className="hidden md:block w-1/2" />
                  
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;