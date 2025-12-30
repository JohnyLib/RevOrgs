import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, TrendingUp, Users, Award, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar?: string;
}

interface Stat {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
}

const SocialProof: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();

  const stats: Stat[] = [
    { id: '1', value: '50+', label: t.socialProof.stats.projects, icon: <TrendingUp size={32} /> },
    { id: '2', value: '98%', label: t.socialProof.stats.satisfaction, icon: <Star size={32} /> },
    { id: '3', value: '5+', label: t.socialProof.stats.years, icon: <Award size={32} /> },
    { id: '4', value: '24/7', label: t.socialProof.stats.support, icon: <Zap size={32} /> },
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Alexandru Popescu',
      role: 'CEO',
      company: 'Vendi Imobiliare',
      text: t.socialProof.testimonials.vendi,
      rating: 5
    },
    {
      id: '2',
      name: 'Maria Ionescu',
      role: 'Founder',
      company: 'Chirie Auto MD',
      text: t.socialProof.testimonials.chirie,
      rating: 5
    },
    {
      id: '3',
      name: 'Ivan Petrov',
      role: 'Director',
      company: 'LegalGrup SRL',
      text: t.socialProof.testimonials.legalgrup,
      rating: 5
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      gsap.fromTo('.stat-item', 
        { 
          y: 50, 
          opacity: 0,
          scale: 0.9
        },
        {
          scrollTrigger: {
            trigger: '.stats-container',
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)"
        }
      );

      // Testimonials animation
      gsap.fromTo('.testimonial-card',
        {
          x: (index) => index % 2 === 0 ? -50 : 50,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: '.testimonials-container',
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section id="social-proof" className="py-24 bg-brand-charcoal relative overflow-hidden" ref={containerRef}>
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-bronze/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-bronze text-sm font-bold tracking-widest uppercase mb-2 block">
            {t.socialProof.kicker}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.socialProof.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t.socialProof.subtitle}
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="stat-item bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-brand-bronze/50 transition-all duration-300 group"
            >
              <div className="text-brand-bronze mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-container">
          <h3 className="text-2xl font-bold text-white mb-12 text-center">
            {t.socialProof.testimonialsTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-bronze/50 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-brand-bronze text-brand-bronze"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-brand-bronze/20 flex items-center justify-center text-brand-bronze font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos Section */}
        <div className="mt-24 pt-12 border-t border-white/10">
          <p className="text-center text-gray-400 mb-8 text-sm uppercase tracking-widest">
            {t.socialProof.trustedBy}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity">
            {['Vendi', 'Chirie Auto', 'Himalaya Salt', 'LegalGrup', 'Servicii Juridice', 'VP Trokenbau'].map((client, index) => (
              <div
                key={index}
                className="text-2xl font-bold text-gray-500 hover:text-brand-bronze transition-colors cursor-pointer"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

