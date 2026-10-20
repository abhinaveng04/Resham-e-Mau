import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export default function LoomHeritageBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#FAF6F0] via-white to-[#FAF6F0] border-t border-b border-[#E8DEC8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="bg-maroon rounded-3xl p-6 sm:p-10 lg:p-12 text-ivory border border-gold/40 shadow-2xl relative overflow-hidden">
          
          {/* Subtle gold watermark pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none hidden lg:block">
            <svg viewBox="0 0 200 200" className="w-full h-full fill-gold">
              <path d="M100 0 C150 50 150 150 100 200 C50 150 50 50 100 0 Z" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Weaver to Wardrobe Movement</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory leading-tight">
                Our Heritage: The Living Looms of <span className="text-gold italic">Mau</span>
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-gold-100/90 leading-relaxed font-sans">
                For over five centuries, the historic town of <strong>Maunath Bhanjan</strong> in eastern Uttar Pradesh has been the beating heart of India's handloom tapestry. Here, master Julaha and Ansari artisans hand-twist pure mulberry katan silk filaments and guide intricate wooden pit-looms pass by pass.
              </p>

              {/* Direct vs Middlemen Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                <div className="p-3.5 bg-maroon-800/80 rounded-xl border border-gold/25 space-y-1.5">
                  <span className="text-[10px] text-rose-300 uppercase tracking-widest font-bold block">
                    Conventional Middlemen Model
                  </span>
                  <p className="text-xs text-gold-100/70">
                    ❌ 3 to 4 trader markups (up to 300% added).<br />
                    ❌ Artisans receive under 15% of retail price.<br />
                    ❌ Synthetic blends mislabeled as pure silk.
                  </p>
                </div>

                <div className="p-3.5 bg-gold-900/40 rounded-xl border border-gold/50 space-y-1.5">
                  <span className="text-[10px] text-gold-300 uppercase tracking-widest font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Resham-e-Mau Direct Model
                  </span>
                  <p className="text-xs text-gold-100/90">
                    ✓ Straight from pit-looms of Mau to your home.<br />
                    ✓ Fair wages directly to 350+ weaver families.<br />
                    ✓ 100% Silk Mark certified genuine heritage weaves.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => {
                    navigate('/collections/mau-katan-silk');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="min-h-[44px] px-6 py-3 bg-gradient-to-r from-gold to-gold-400 hover:from-gold-400 hover:to-gold text-maroon-900 font-serif font-bold text-xs sm:text-sm rounded-full shadow-lg active:scale-95 transition flex items-center gap-2"
                >
                  <span>Explore The Mau Looms Collection</span>
                  <ArrowRight className="w-4 h-4 text-maroon-900" />
                </button>

                <div className="flex items-center gap-2 text-gold-200 text-xs font-serif font-bold">
                  <Award className="w-4 h-4 text-gold" />
                  <span>District Mau, Uttar Pradesh GI Craft</span>
                </div>
              </div>

            </div>

            {/* Right Graphic Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden border-2 border-gold/40 shadow-2xl bg-maroon-800">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                  alt="Authentic Handloom Pit-Loom Weaving Mau"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-transparent to-transparent flex flex-col justify-end p-4 text-center">
                  <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-gold/30">
                    <span className="text-[10px] uppercase tracking-widest text-gold-300 font-bold block">
                      Maunath Bhanjan, UP
                    </span>
                    <h4 className="font-serif text-base font-bold text-ivory">
                      Pure Katan Silk Jacquard Loom
                    </h4>
                    <p className="text-[11px] text-gold-100/80 mt-0.5">
                      14 days of dedicated handcrafting per 5.5-meter drape.
                    </p>
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
