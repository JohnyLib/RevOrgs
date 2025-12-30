import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { shouldAnimate, isMobile } from '../utils/performance';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: t.faq.items.process.question,
      answer: t.faq.items.process.answer
    },
    {
      id: '2',
      question: t.faq.items.timeline.question,
      answer: t.faq.items.timeline.answer
    },
    {
      id: '3',
      question: t.faq.items.pricing.question,
      answer: t.faq.items.pricing.answer
    },
    {
      id: '4',
      question: t.faq.items.support.question,
      answer: t.faq.items.support.answer
    },
    {
      id: '5',
      question: t.faq.items.technologies.question,
      answer: t.faq.items.technologies.answer
    },
    {
      id: '6',
      question: t.faq.items.revisions.question,
      answer: t.faq.items.revisions.answer
    }
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  useEffect(() => {
    const animate = shouldAnimate();
    const mobile = isMobile();

    const ctx = gsap.context(() => {
      if (!animate || mobile) {
        // Simple display for mobile
        gsap.set('.faq-item', { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo('.faq-item',
        {
          y: 50,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section id="faq" className="py-24 bg-brand-dark relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-bronze text-sm font-bold tracking-widest uppercase mb-2 block">
            {t.faq.kicker}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.faq.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="faq-item bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-brand-bronze/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-semibold text-white pr-4 group-hover:text-brand-bronze transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180 text-brand-bronze' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">{t.faq.ctaText}</p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-brand-bronze text-white font-bold rounded-xl hover:bg-amber-700 transition-all duration-300 shadow-lg shadow-brand-bronze/30 hover:shadow-brand-bronze/50 hover:scale-105"
          >
            {t.faq.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

