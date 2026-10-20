import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Award, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const { setSelectedWeave, setSelectedOccasion, setOnlyBestsellers, resetFilters } = useStore();

  const handleCta = (action) => {
    resetFilters();
    if (action === 'mau') {
      setSelectedWeave('Mau Handloom Katan Silk');
    } else if (action === 'bestseller') {
      setOnlyBestsellers(true);
    } else if (action === 'wedding') {
      setSelectedOccasion('Wedding');
    }
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#F5EAE0] to-[#FAF6F0] pt-6 pb-10 sm:pt-10 sm:pb-16 border-b border-[#E8DEC8]">
      {/* Decorative Traditional Zari Mandala Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg className="w-[800px] h-[800px]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#5A1827" strokeWidth="1" />
          <polygon points="50,5 63,38 98,38 70,59 81,93 50,72 19,93 30,59 2,38 37,38" fill="none" stroke="#C59B27" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#5A1827" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand Story & Conversion CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-maroon/10 border border-gold/40 text-maroon text-xs font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Mau Weavers Direct • Zero Middlemen Markups</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-maroon font-bold leading-[1.15] tracking-tight">
              Celebrating the Silk & Handloom Legacy of <span className="text-gold-600 italic">Mau, Uttar Pradesh</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-charcoal-muted max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Every fold carries centuries of Julaha and Ansari weaver heritage from the sacred banks of the Tamsa and Ghaghara. Handcrafted pure Katan silks, Banarasi brocades, and luminous tissue drapes direct from the pit-looms of Maunath Bhanjan.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => handleCta('mau')}
                className="px-6 py-3.5 bg-maroon text-ivory rounded-full font-serif font-bold text-sm sm:text-base tracking-wide hover:bg-maroon-800 active:scale-95 transition shadow-lg shadow-maroon/20 flex items-center gap-2 group"
              >
                <span>Mau Handloom Special</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleCta('wedding')}
                className="px-6 py-3.5 bg-white text-maroon border border-gold hover:border-maroon rounded-full font-serif font-semibold text-sm sm:text-base tracking-wide hover:bg-[#FAF6F0] active:scale-95 transition shadow-sm"
              >
                Bridal & Wedding Edit
              </button>

              <button
                onClick={() => handleCta('bestseller')}
                className="px-5 py-3.5 bg-gold-50 text-gold-700 border border-gold/40 hover:bg-gold-100 rounded-full font-sans font-medium text-xs sm:text-sm tracking-wide transition"
              >
                🔥 Bestsellers (Under ₹2999)
              </button>
            </div>

            {/* Trust Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 sm:pt-6 border-t border-[#E8DEC8]/80 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white border border-gold/40 flex items-center justify-center text-gold-600 shadow-xs shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-trust" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal">Silk Mark Certified</h4>
                  <p className="text-[10px] text-charcoal-muted">100% Genuine Silk</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white border border-gold/40 flex items-center justify-center text-gold-600 shadow-xs shrink-0">
                  <Award className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal">Direct from Loom</h4>
                  <p className="text-[10px] text-charcoal-muted">Fair price to artisans</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white border border-gold/40 flex items-center justify-center text-gold-600 shadow-xs shrink-0">
                  <Truck className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal">Free Shipping</h4>
                  <p className="text-[10px] text-charcoal-muted">On orders over ₹1,999</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white border border-gold/40 flex items-center justify-center text-gold-600 shadow-xs shrink-0">
                  <RefreshCw className="w-5 h-5 text-charcoal" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal">7 Days Exchange</h4>
                  <p className="text-[10px] text-charcoal-muted">Hassle-free guarantee</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Saree Showcase Hero Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-gold/30 via-maroon/20 to-gold/30 blur-sm transform -rotate-1"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-gold/40">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                    alt="Royal Mau Handloom Katan Silk Saree"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
                  />
                  
                  {/* Floating Heritage Badge */}
                  <div className="absolute top-3 left-3 bg-maroon/90 backdrop-blur-md text-ivory text-xs px-3 py-1.5 rounded-full border border-gold/40 shadow-md flex items-center gap-1.5 font-serif">
                    <span className="text-gold">✨</span>
                    <span>Mau Signature Katan Pure Silk</span>
                  </div>

                  {/* Floating Discount Tag */}
                  <div className="absolute top-3 right-3 bg-emerald-trust text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    58% OFF
                  </div>

                  {/* Bottom glassmorphic info bar */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#FAF6F0]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E8DEC8] shadow-lg flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-gold-700">
                        Master Weaver Collection
                      </div>
                      <h3 className="font-serif text-sm font-bold text-maroon">
                        Shahi Nazakat Katan Saree
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-bold text-maroon">₹2,899</span>
                        <span className="text-xs text-charcoal-light line-through">₹6,999</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                          Free Express Delivery
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCta('mau')}
                      className="px-3.5 py-2 bg-maroon text-ivory text-xs font-serif font-bold rounded-lg hover:bg-maroon-800 active:scale-95 transition shadow-xs"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
