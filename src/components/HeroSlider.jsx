import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HeroSlider() {
  const { storeConfig } = useStore();
  const banners = storeConfig.banners && storeConfig.banners.length > 0
    ? storeConfig.banners
    : [
        {
          id: 1,
          image: "/banner/banner1.png",
          title: "The Living Looms of Mau",
          subtitle: "Direct from master weavers in Maunath Bhanjan, Uttar Pradesh. Authentic pit-loom sarees crafted with generational pride.",
          ctaText: "Explore 17 Saree Weaves",
          ctaLink: "#catalog-grid"
        }
      ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = banners.length;

  useEffect(() => {
    if (isPaused || slideCount <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slideCount]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const handleCtaClick = (link) => {
    if (link.startsWith('#')) {
      const el = document.querySelector(link);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = link;
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-maroon-900 select-none min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {banners.map((banner, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={banner.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Banner Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Gradient Overlays for Luxury Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/90 via-maroon-900/65 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-black/30" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl sm:max-w-2xl space-y-3 sm:space-y-4">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-gold/40 text-gold-300 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Mau Handloom Pit-Loom Weaves</span>
                  </div>

                  {/* Title */}
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory font-bold tracking-tight leading-[1.1] drop-shadow-md">
                    {banner.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-base text-gold-100/90 max-w-lg leading-relaxed font-sans font-normal drop-shadow-xs">
                    {banner.subtitle}
                  </p>

                  {/* CTA Button */}
                  <div className="pt-2 sm:pt-4 flex items-center gap-3">
                    <button
                      onClick={() => handleCtaClick(banner.ctaLink || '#catalog-grid')}
                      className="min-h-[44px] px-6 py-3 bg-gradient-to-r from-gold to-gold-400 hover:from-gold-400 hover:to-gold text-maroon-900 font-serif font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-gold-glow active:scale-95 transition-all flex items-center gap-2 group"
                    >
                      <span>{banner.ctaText || "Explore 17 Saree Weaves"}</span>
                      <ArrowRight className="w-4 h-4 text-maroon-900 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        );
      })}

      {/* Navigation Arrows */}
      {slideCount > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-gold/40 text-gold hover:text-white flex items-center justify-center transition active:scale-90"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-gold/40 text-gold hover:text-white flex items-center justify-center transition active:scale-90"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentSlide
                    ? 'w-8 h-2.5 bg-gold border border-gold-300 shadow-xs'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}
