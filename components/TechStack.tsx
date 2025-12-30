import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STACK } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { shouldAnimate, isMobile } from '../utils/performance';

gsap.registerPlugin(ScrollTrigger);

const TechStack: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Reset refs array
    itemsRef.current = itemsRef.current.slice(0, STACK.length);

    const animate = shouldAnimate();
    const mobile = isMobile();

    const ctx = gsap.context(() => {
      if (!animate || mobile) {
        // Simple fade-in for mobile
        gsap.set(".tech-item", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Clear any existing props to prevent conflicts
      gsap.set(".tech-item", { clearProps: "all" });

      // Staggered Entrance with explicit visibility control
      gsap.fromTo(".tech-item", 
        { 
          y: 50, 
          autoAlpha: 0, 
          scale: 0.9 
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.2)"
        }
      );

      // Continuous Floating Effect (desktop only)
      if (!mobile) {
        itemsRef.current.forEach((item, i) => {
          if (!item) return;
          
          gsap.to(item, {
            y: "+=10",
            rotation: "random(-2, 2)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.6 + (i * 0.1)
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section id="tech" ref={sectionRef} className="py-24 bg-brand-charcoal border-y border-white/5 relative overflow-hidden min-h-[500px]">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-bronze/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-bronze text-sm font-bold tracking-widest uppercase">{t.tech.kicker}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-white">{t.tech.title}</h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">{t.tech.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {STACK.map((tech, index) => (
            <div 
              key={index} 
              ref={addToRefs}
              className="tech-item flex flex-col items-center justify-center gap-4 group p-6 bg-white/5 hover:bg-white/10 rounded-2xl backdrop-blur-sm border border-white/5 hover:border-brand-bronze/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(139,90,43,0.3)] cursor-pointer"
              style={{ opacity: 0, visibility: 'hidden' }} // Initial state for hydration matching GSAP
            >
              <div className="text-gray-400 group-hover:text-brand-bronze transition-colors duration-300 transform group-hover:scale-125 group-hover:rotate-6">
                {tech.icon}
              </div>
              <span className="font-medium text-sm text-gray-300 group-hover:text-white tracking-wide">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;