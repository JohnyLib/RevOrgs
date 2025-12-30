import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPortfolio } from '../constants';
import { Project } from '../types';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getScreenshotUrl, getScreenshotGallery, getPortfolioScreenshot } from '../utils/screenshot';
import { shouldAnimate, isMobile } from '../utils/performance';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

gsap.registerPlugin(ScrollTrigger);

// Component for handling real-time image loading with fallback
const PortfolioImage: React.FC<{ 
  project: Project; 
  className?: string;
  loading?: 'lazy' | 'eager';
}> = ({ project, className = '', loading = 'lazy' }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(
    isMobile() 
      ? getOptimizedImageUrl(project.image, 800, 75) 
      : project.image
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(loading === 'eager');

  // Intersection Observer for lazy loading screenshots only when visible
  useEffect(() => {
    if (loading === 'eager' || isMobile() || !project.link) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { 
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01 
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, project.link]);

  // Load real-time screenshot when visible
  useEffect(() => {
    if (!isVisible) return;

    // On mobile, use optimized placeholder
    if (isMobile()) {
      setImageSrc(getOptimizedImageUrl(project.image, 800, 75));
      setIsLoading(false);
      return;
    }

    // Try to load high-quality screenshot from original link
    if (project.link) {
      setIsLoading(true);
      setHasError(false);
      
      // Use improved portfolio screenshot function with better quality
      const screenshotUrl = getPortfolioScreenshot(project.link, 1280, 720);
      const img = new Image();
      let timeoutId: NodeJS.Timeout;
      let isMounted = true;
      
      img.onload = () => {
        if (isMounted) {
          setImageSrc(screenshotUrl);
          setIsLoading(false);
        }
        if (timeoutId) clearTimeout(timeoutId);
      };
      
      img.onerror = () => {
        if (isMounted) {
          // Fallback to optimized original image if screenshot fails
          setImageSrc(project.image);
          setIsLoading(false);
          setHasError(true);
        }
        if (timeoutId) clearTimeout(timeoutId);
      };
      
      img.src = screenshotUrl;
      
      // Timeout fallback after 3 seconds (slightly increased for better quality)
      timeoutId = setTimeout(() => {
        if (isMounted && isLoading) {
          setImageSrc(project.image);
          setIsLoading(false);
          setHasError(true);
        }
      }, 3000);
      
      return () => {
        isMounted = false;
        if (timeoutId) clearTimeout(timeoutId);
      };
    } else {
      setIsLoading(false);
    }
  }, [project.link, project.image, isVisible]);

  return (
    <div ref={imageRef} className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-brand-bronze border-t-transparent rounded-full animate-spin"></div>
            <div className="text-gray-500 text-xs font-medium">Loading live preview...</div>
          </div>
        </div>
      )}
      <img 
        src={imageSrc} 
        alt={project.title}
        loading={loading}
        decoding="async"
        fetchpriority={loading === 'eager' ? 'high' : 'auto'}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 w-full h-full object-cover`}
        onLoad={() => {
          // Use requestAnimationFrame to avoid forced reflow
          requestAnimationFrame(() => setIsLoading(false));
        }}
        onError={() => {
          if (!hasError) {
            requestAnimationFrame(() => {
              setImageSrc(project.image);
              setHasError(true);
              setIsLoading(false);
            });
          }
        }}
      />
    </div>
  );
};

const Portfolio: React.FC = () => {
  const { lang, t } = useLanguage();
  const projectsData = getPortfolio(lang);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [displayProjects, setDisplayProjects] = useState<Project[]>(projectsData);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];

  // Update display projects when language changes
  useEffect(() => {
    setActiveCategory('All');
    setDisplayProjects(projectsData);
  }, [lang]);

  // Handle filtering with animation
  const handleCategoryChange = (category: string) => {
    if (category === activeCategory || isAnimating.current) return;
    
    isAnimating.current = true;
    
    const animate = shouldAnimate() && !isMobile();
    
    if (!animate) {
      // Instant update for mobile
      setActiveCategory(category);
      const nextProjects = category === 'All' 
        ? projectsData 
        : projectsData.filter(project => project.category === category);
      setDisplayProjects(nextProjects);
      isAnimating.current = false;
      return;
    }
    
    // 1. Animate Out (desktop only)
    gsap.to(".portfolio-card", {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // 2. Update State
        setActiveCategory(category);
        const nextProjects = category === 'All' 
          ? projectsData 
          : projectsData.filter(project => project.category === category);
        setDisplayProjects(nextProjects);
      }
    });
  };

  useEffect(() => {
    // Grid animation on filter change (Animate In)
    const animate = shouldAnimate();
    const mobile = isMobile();
    
    const ctx = gsap.context(() => {
      // Re-query cards as DOM has updated
      const cards = gsap.utils.toArray(".portfolio-card");
      
      if (cards.length > 0) {
        if (!animate || mobile) {
          // Simple display for mobile
          gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
          isAnimating.current = false;
        } else {
          gsap.fromTo(cards, 
            { 
              y: 50, 
              opacity: 0,
              scale: 0.95
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
              onComplete: () => {
                isAnimating.current = false;
                refreshParallax();
              }
            }
          );
        }
      } else {
        isAnimating.current = false;
      }

      function refreshParallax() {
        // Parallax Effect for Images (desktop only)
        if (isMobile() || !shouldAnimate()) return;
        
        const parallaxWrappers = gsap.utils.toArray('.parallax-wrapper');
        
        parallaxWrappers.forEach((wrapper: any) => {
           gsap.fromTo(wrapper, 
             { yPercent: -10 },
             {
               yPercent: 10,
               ease: "none",
               scrollTrigger: {
                 trigger: wrapper.parentElement,
                 start: "top bottom",
                 end: "bottom top",
                 scrub: true
               }
             }
           );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [displayProjects, lang]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  return (
    <section id="portfolio" className="relative bg-brand-light text-brand-dark py-24 min-h-screen" ref={containerRef}>
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 md:flex justify-between items-end">
          <div>
            <span className="text-brand-bronze font-bold tracking-widest uppercase mb-4 block">{t.portfolio.kicker}</span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              {t.portfolio.title}
            </h2>
          </div>
          <div className="mt-4 md:mt-0 max-w-md text-gray-600">
             {t.portfolio.subtitle}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-brand-bronze border-brand-bronze text-white shadow-lg shadow-brand-bronze/20'
                  : 'bg-transparent border-gray-300 text-gray-500 hover:border-brand-bronze hover:text-brand-dark'
              }`}
            >
              {category === 'All' ? t.portfolio.all : category}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {displayProjects.map((project) => (
            <div 
              key={project.id} 
              className="portfolio-card group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container with Parallax Structure */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 mb-4 shadow-lg border border-transparent group-hover:border-brand-bronze/50 transition-all duration-300">
                
                {/* Parallax Wrapper - Moves up/down (desktop only) */}
                <div className={`parallax-wrapper w-full ${isMobile() ? 'h-full' : 'h-[120%] -mt-[10%]'} relative`}>
                  <PortfolioImage 
                    project={project}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                   <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-75">
                      <Maximize2 size={24} />
                   </div>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-brand-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                  {project.category}
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-brand-bronze transition-colors">{project.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{project.client}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 group-hover:bg-brand-bronze group-hover:border-brand-bronze group-hover:text-white transition-all">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

interface ModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ModalProps> = ({ project, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [gallery, setGallery] = useState<string[]>(project.gallery || [project.image]);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const { t } = useLanguage();

  // Generate real-time screenshots for gallery with multiple viewport sizes
  useEffect(() => {
    if (project.link && !isMobile()) {
      setImageLoading(true);
      
      // Get responsive screenshots for different viewports
      const screenshotGallery = getScreenshotGallery(project.link);
      
      // Combine screenshot URLs with fallback to original gallery
      const newGallery = screenshotGallery.length > 0 
        ? screenshotGallery.map((url, idx) => url || (project.gallery?.[idx] || project.image))
        : (project.gallery || [project.image]);
      
      setGallery(newGallery);
      
      // Preload all images in parallel for better performance
      let loadedCount = 0;
      let isMounted = true;
      const imagesToLoad = newGallery.map((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          if (!isMounted) return;
          loadedCount++;
          if (loadedCount === newGallery.length || loadedCount === 1) {
            setImageLoading(false);
          }
        };
        img.onerror = () => {
          if (!isMounted) return;
          loadedCount++;
          if (loadedCount === newGallery.length) {
            // Fallback to original gallery if all screenshots fail
            setGallery(project.gallery || [project.image]);
            setImageLoading(false);
          }
        };
        return img;
      });
      
      // Timeout fallback
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          setGallery(project.gallery || [project.image]);
          setImageLoading(false);
        }
      }, 4000);
      
      return () => {
        isMounted = false;
        imagesToLoad.forEach(img => {
          img.onload = null;
          img.onerror = null;
        });
        clearTimeout(timeoutId);
      };
    } else {
      // On mobile or no link, use original gallery
      setGallery(project.gallery || [project.image]);
      setImageLoading(false);
    }
  }, [project.link, project.gallery, project.image]);

  useEffect(() => {
    // Modal Entrance Animation
    gsap.fromTo(modalRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(contentRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, delay: 0.1, ease: "back.out(1.1)" }
    );
  }, []);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        ref={contentRef}
        className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur transition-colors"
        >
          <X size={20} />
        </button>

        {/* Slider Section */}
        <div className="w-full md:w-2/3 bg-gray-100 relative h-[40vh] md:h-auto">
          <div className="absolute inset-0">
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-brand-bronze border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-gray-500 text-xs font-medium">Loading live preview...</div>
                </div>
              </div>
            )}
            <img 
              src={isMobile() ? getOptimizedImageUrl(gallery[currentSlide], 1200, 80) : gallery[currentSlide]} 
              alt={`${project.title} slide ${currentSlide + 1}`}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => {
                requestAnimationFrame(() => setImageLoading(false));
              }}
              onError={() => {
                // Fallback to original gallery image
                const fallbackGallery = project.gallery || [project.image];
                requestAnimationFrame(() => {
                  setGallery(fallbackGallery.map(img => 
                    isMobile() ? getOptimizedImageUrl(img, 1200, 80) : img
                  ));
                  setImageLoading(false);
                });
              }}
            />
          </div>
          
          {/* Slider Controls */}
          {gallery.length > 1 && (
            <>
              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors">
                <ChevronRight size={24} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {gallery.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-white w-4' : 'bg-white/50'}`} 
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 p-8 md:p-10 overflow-y-auto bg-white text-brand-dark custom-scrollbar">
          <div className="mb-6">
            <span className="text-brand-bronze text-xs font-bold uppercase tracking-widest">{project.category}</span>
            <h2 className="text-3xl font-bold mt-2">{project.title}</h2>
            <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                <span>{project.year}</span>
                <span>•</span>
                <span>{project.client}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-2">{t.portfolio.about}</h3>
              <p className="text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.tags && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">{t.portfolio.technologies}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-gray-100">
              {project.link && (
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-brand-bronze transition-colors flex items-center justify-center gap-2"
                 >
                    {t.portfolio.viewLive} <ArrowUpRight size={18} />
                 </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Portfolio;