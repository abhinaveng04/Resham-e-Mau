import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight, Home, ChevronRight, Users, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { usePageSEO } from '../utils/seo';

export default function AboutPage() {
  const { storeConfig } = useStore();

  usePageSEO(
    'Our Heritage: The Living Looms of Mau | Resham-e-Mau',
    'Discover the 500-year-old silk weaving legacy of Maunath Bhanjan, Uttar Pradesh. Direct weaver-to-wardrobe handloom sarees eliminating middleman markups.'
  );

  return (
    <div className="bg-[#FAF6F0] min-h-screen pb-16">
      
      {/* Breadcrumb Header */}
      <div className="border-b border-[#E8DEC8] bg-white/70 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-charcoal-muted font-medium">
            <Link to="/" className="hover:text-maroon flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
            <span className="text-maroon font-semibold">About Resham-e-Mau</span>
          </nav>
        </div>
      </div>

      {/* Hero Editorial Header */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-b from-maroon via-maroon-900 to-maroon text-ivory border-b border-gold/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>The Handloom Capital of Eastern Uttar Pradesh</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory leading-tight">
            Our Roots in the Sacred Looms of <br className="hidden sm:inline" />
            <span className="text-gold italic">Maunath Bhanjan</span>
          </h1>

          <p className="text-xs sm:text-base text-gold-100/90 leading-relaxed font-sans max-w-2xl mx-auto">
            Resham-e-Mau was born from a singular conviction: to preserve the centuries-old silk weaving legacy of Mau and bring authentic handwoven treasures straight from weaver pit-looms to your wardrobe, unadulterated by middlemen.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Story Section 1: The Legacy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-serif font-bold text-gold-700 uppercase tracking-widest block">
              Chapter I • 500 Years of Karigari
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon leading-tight">
              Where Every Saree Has a Heartbeat
            </h2>
            <p className="text-xs sm:text-sm text-charcoal leading-relaxed font-sans">
              Nestled along the serene banks of the Tamsa and Ghaghara rivers in eastern Uttar Pradesh lies <strong>Mau (historically Maunath Bhanjan)</strong>. Revered across the subcontinent alongside Varanasi and Mubarakpur, Mau has been home to master Julaha and Ansari weaving lineages for generations.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
              Unlike modern high-speed powerlooms that mass-produce synthetic fabric in minutes, Mau's traditional wooden pit-looms require human patience, foot-pedal rhythm, and relentless dexterity. A single pure Katan silk saree represents 12 to 18 days of patient craftsmanship.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold/40 shadow-xl aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                alt="Mau Handloom Weaver Crafting Pure Katan Silk"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-transparent to-transparent flex items-end p-4 text-center">
                <span className="text-[11px] text-gold-200 font-serif font-bold block w-full">
                  Master Artisan at Pit-Loom Workshop, Mau, UP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section 2: Middlemen Elimination */}
        <div className="p-6 sm:p-10 bg-white rounded-3xl border border-[#E8DEC8] shadow-card space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-serif font-bold text-gold-700 uppercase tracking-widest block">
              Chapter II • The Loom-To-Wardrobe Promise
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
              Eliminating the 300% Middleman Markups
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted">
              How our cooperative model restores dignity to artisans while offering unmatched value to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* The Old Commercial Route */}
            <div className="p-5 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-3">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>The Traditional Retail Route</span>
              </span>
              <ul className="text-xs text-charcoal-muted space-y-2">
                <li>❌ <strong>Layer 1:</strong> Local Sahukar / Moneylender buys at depressed prices.</li>
                <li>❌ <strong>Layer 2:</strong> Wholesale commission agent in Varanasi / Lucknow.</li>
                <li>❌ <strong>Layer 3:</strong> Luxury boutique retail store with 200–300% markups.</li>
                <li>❌ <strong>Result:</strong> Saree costs ₹8,000+ while the artisan earns less than ₹1,200.</li>
              </ul>
            </div>

            {/* The Resham-e-Mau Model */}
            <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>The Resham-e-Mau Direct Model</span>
              </span>
              <ul className="text-xs text-emerald-950 space-y-2">
                <li>✓ <strong>Direct Weavers:</strong> Directly sourced from 350+ pit-loom families in Mau.</li>
                <li>✓ <strong>Fair Living Wages:</strong> Artisans receive up to 60% of product value.</li>
                <li>✓ <strong>Honest Pricing:</strong> Authentic pure silk sarees starting from ₹1,499–₹3,499.</li>
                <li>✓ <strong>Pure Assurance:</strong> 100% Silk Mark certified with every dispatch.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4 Pillars of Resham-e-Mau */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 mx-auto flex items-center justify-center font-serif font-bold text-lg">
              350+
            </div>
            <h4 className="font-serif font-bold text-maroon text-sm">Artisan Families</h4>
            <p className="text-[11px] text-charcoal-muted">Supported with continuous loom orders year-round.</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-maroon-100 text-maroon mx-auto flex items-center justify-center font-serif font-bold text-lg">
              100%
            </div>
            <h4 className="font-serif font-bold text-maroon text-sm">Silk Mark Verified</h4>
            <p className="text-[11px] text-charcoal-muted">Authentic natural mulberry and katan silk filaments.</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center font-serif font-bold text-lg">
              26,000+
            </div>
            <h4 className="font-serif font-bold text-maroon text-sm">Pincodes Served</h4>
            <p className="text-[11px] text-charcoal-muted">Pan-India express delivery with Cash on Delivery.</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 mx-auto flex items-center justify-center font-serif font-bold text-lg">
              0%
            </div>
            <h4 className="font-serif font-bold text-maroon text-sm">Middleman Fees</h4>
            <p className="text-[11px] text-charcoal-muted">Every rupee of savings passed directly to you.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-maroon rounded-3xl text-ivory text-center space-y-4 border border-gold/40 shadow-xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Experience the Touch of Living Uttar Pradesh Heritage
          </h3>
          <p className="text-xs sm:text-sm text-gold-100/90 max-w-xl mx-auto">
            Explore our curated handloom weaves, bridal editions, and lightweight festive drapes woven with genuine love and heritage pride.
          </p>
          <div className="pt-2">
            <Link
              to="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gold to-gold-400 text-maroon-900 font-serif font-bold text-sm rounded-full shadow-lg hover:shadow-gold-glow active:scale-95 transition"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 text-maroon-900" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
