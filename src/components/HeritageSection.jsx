import React from 'react';
import { Sparkles, Award, ShieldCheck, Heart, MapPin, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function HeritageSection() {
  const { setSelectedWeave, resetFilters } = useStore();

  const handleExploreMauWeaves = () => {
    resetFilters();
    setSelectedWeave('Mau Handloom Katan Silk');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="mau-heritage" className="py-12 sm:py-20 bg-gradient-to-b from-[#FAF6F0] via-white to-[#FAF6F0] border-t border-b border-[#E8DEC8] relative overflow-hidden">
      
      {/* Subtle traditional motif backdrop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold/40 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>The Artisan Soul of Eastern UP</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-maroon leading-tight">
            The Living Handloom Legacy of <br className="hidden sm:inline" />
            <span className="text-gold-600 italic">Mau, Uttar Pradesh</span>
          </h2>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-sans">
            Known historically as <em>Maunath Bhanjan</em> along the ancient Ghaghara river, Mau is home to generations of master Julaha and Ansari weavers whose dexterous hands weave dreams into pure Katan silk and gossamer organza.
          </p>
        </div>

        {/* 3 Pillars of Mau Karigari */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">
          
          {/* Card 1: The Wooden Pit-Loom */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E8DEC8] shadow-sm hover:shadow-luxury transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-maroon text-ivory flex items-center justify-center font-serif text-xl font-bold shadow-xs">
              01
            </div>
            <h3 className="font-serif text-xl font-bold text-maroon">
              Generational Pit-Loom Craft
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Unlike industrial machines, Mau's heritage pit-looms allow weavers to control every warp tension. A single authentic Katan silk saree requires 12 to 18 days of relentless rhythm, rhythmic foot pedals, and hand-shuttle passes.
            </p>
            <div className="text-[11px] font-semibold text-gold-700 flex items-center gap-1 pt-2">
              <Award className="w-3.5 h-3.5" />
              <span>GI Craft Tradition of Uttar Pradesh</span>
            </div>
          </div>

          {/* Card 2: Pure Mulberry & Sona-Rupa Zari */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E8DEC8] shadow-sm hover:shadow-luxury transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gold-600 text-white flex items-center justify-center font-serif text-xl font-bold shadow-xs">
              02
            </div>
            <h3 className="font-serif text-xl font-bold text-maroon">
              Pure Silk & Metallic Brilliance
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Mau weavers exclusively select high-twist mulberry katan threads that drape with effortless grace. Interwoven with antique metallic zari bootas, the fabric reflects light softly without the stiffness of synthetic polyester.
            </p>
            <div className="text-[11px] font-semibold text-emerald-trust flex items-center gap-1 pt-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Silk Mark Certified Authenticity</span>
            </div>
          </div>

          {/* Card 3: Weaver to Wardrobe Fair Trade */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#E8DEC8] shadow-sm hover:shadow-luxury transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 text-ivory flex items-center justify-center font-serif text-xl font-bold shadow-xs">
              03
            </div>
            <h3 className="font-serif text-xl font-bold text-maroon">
              Direct Weaver Fair Trade
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Traditional retail channels burden sarees with 300% middleman markups while leaving artisans underpaid. Resham-e-Mau bridges the loom directly to your wardrobe, transferring maximum value back to artisan families in Mau.
            </p>
            <div className="text-[11px] font-semibold text-maroon flex items-center gap-1 pt-2">
              <Heart className="w-3.5 h-3.5 fill-maroon text-maroon" />
              <span>Sustaining 350+ Artisan Weaving Families</span>
            </div>
          </div>

        </div>

        {/* Story Banner */}
        <div className="mt-10 sm:mt-14 bg-maroon rounded-2xl p-6 sm:p-10 text-ivory border border-gold/40 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-serif font-bold tracking-widest text-gold-300 uppercase block">
              Origin: Maunath Bhanjan • District Mau, UP
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Wear the Pride of Uttar Pradesh Handloom
            </h3>
            <p className="text-xs sm:text-sm text-gold-100/90 leading-relaxed">
              When you drape a Resham-e-Mau saree, you don't merely wear a garment—you wear six yards of poetry, resilience, and unadulterated Indian craftsmanship that outlasts transient fast-fashion trends.
            </p>
            <div className="pt-2">
              <button
                onClick={handleExploreMauWeaves}
                className="px-6 py-3 bg-gold text-maroon-900 rounded-full font-serif font-bold text-xs sm:text-sm tracking-wide hover:bg-gold-400 active:scale-95 transition shadow-md flex items-center gap-2"
              >
                <span>Shop the Mau Handloom Special Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Decorative crest badge */}
          <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-gold/30 items-center justify-center p-4 text-center">
            <div className="w-40 h-40 rounded-full border-2 border-gold/50 flex flex-col items-center justify-center p-2 text-gold-200">
              <MapPin className="w-6 h-6 text-gold mb-1" />
              <span className="font-serif text-lg font-bold">रेशम-ए-मऊ</span>
              <span className="text-[10px] tracking-wider uppercase mt-0.5">Mau, UP</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
