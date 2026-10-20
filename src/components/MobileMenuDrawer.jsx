import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { X, ChevronRight, Sparkles, MessageCircle, ShieldCheck, Instagram, BookOpen, Truck, RotateCcw } from 'lucide-react';

export default function MobileMenuDrawer() {
  const navigate = useNavigate();
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    storeConfig,
    setSelectedFabricFilter,
    resetFilters
  } = useStore();

  if (!isMobileMenuOpen) return null;

  const fabrics = [
    'Pure Katan Silk',
    'Pure Satin Silk',
    'Kora Organza Silk',
    'Soft Silk',
    'Pure Handloom Linen Silk',
    'Cotton Silk Blend'
  ];

  const handleNavigate = (route) => {
    setIsMobileMenuOpen(false);
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFabricFilter = (fabric) => {
    setIsMobileMenuOpen(false);
    setSelectedFabricFilter(fabric);
    navigate('/#catalog-grid');
    setTimeout(() => {
      document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FAF6F0] h-full flex flex-col shadow-2xl z-50 overflow-y-auto">
        
        {/* Header */}
        <div className="p-4 bg-maroon text-ivory flex items-center justify-between border-b border-gold/30">
          <div>
            <h3 className="font-serif text-lg font-bold tracking-wide">
              {storeConfig.brandName}
            </h3>
            <p className="text-[10px] text-gold-300 font-serif font-semibold">
              {storeConfig.tagline || "The Heritage of Mau Silk"}
            </p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 rounded-full hover:bg-maroon-800 text-ivory transition min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 p-4 space-y-4">
          
          {/* Main Catalog Button */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block font-serif">
              Handloom Inventory
            </span>
            <button
              onClick={() => {
                resetFilters();
                handleNavigate('/#catalog-grid');
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-white border border-[#E8DEC8] hover:border-gold text-xs font-bold text-maroon flex items-center justify-between shadow-2xs min-h-[44px]"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Complete Catalog (All 17 Sarees)</span>
              </span>
              <ChevronRight className="w-4 h-4 text-gold-600" />
            </button>
          </div>

          {/* Shop by Weave / Fabric Type */}
          <div className="space-y-1.5 pt-2 border-t border-[#E8DEC8]">
            <span className="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block font-serif">
              Shop by Pure Fabric
            </span>
            <div className="space-y-1">
              {fabrics.map((fabric) => (
                <button
                  key={fabric}
                  onClick={() => handleFabricFilter(fabric)}
                  className="w-full text-left py-2 px-3 rounded-lg bg-white/70 hover:bg-white text-xs font-medium text-charcoal flex items-center justify-between border border-[#E8DEC8]/80 hover:border-gold min-h-[40px] transition"
                >
                  <span>{fabric}</span>
                  <span className="text-[10px] text-maroon font-serif font-bold">Explore →</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Pages & Policies */}
          <div className="space-y-1.5 pt-2 border-t border-[#E8DEC8]">
            <span className="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block font-serif">
              Heritage & Policies
            </span>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigate('/about')}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-charcoal flex items-center gap-2 hover:bg-white hover:text-maroon transition min-h-[40px]"
              >
                <BookOpen className="w-3.5 h-3.5 text-gold-700" />
                <span>Our Heritage & The Looms of Mau</span>
              </button>

              <button
                onClick={() => handleNavigate('/returns-exchange')}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-charcoal flex items-center gap-2 hover:bg-white hover:text-maroon transition min-h-[40px]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gold-700" />
                <span>Returns & 360° Unboxing Video Rule</span>
              </button>

              <button
                onClick={() => handleNavigate('/shipping')}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-charcoal flex items-center gap-2 hover:bg-white hover:text-maroon transition min-h-[40px]"
              >
                <Truck className="w-3.5 h-3.5 text-gold-700" />
                <span>Shipping & Delivery Policy</span>
              </button>

              <button
                onClick={() => handleNavigate('/contact')}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-charcoal flex items-center gap-2 hover:bg-white hover:text-maroon transition min-h-[40px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-gold-700" />
                <span>Contact Us & Studio Location</span>
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
            <a
              href={storeConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full py-2.5 px-3 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-950 shadow-2xs"
            >
              <Instagram className="w-4 h-4 text-rose-600" />
              <span>Follow {storeConfig.instagramHandle || "@resham.e.mau"}</span>
            </a>

            <a
              href={storeConfig.whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full py-2.5 px-3 rounded-xl bg-white border border-emerald-300 text-xs font-bold text-emerald-950 shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Join Official WhatsApp Community</span>
            </a>
          </div>

        </div>

        {/* Footer info in drawer */}
        <div className="p-4 bg-white border-t border-[#E8DEC8] space-y-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-trust font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Genuine Handloom Silk Mark</span>
          </div>
          <div className="text-[11px] text-charcoal-muted">
            {storeConfig.officialAddress || "Steller Jeevan, Greater Noida (W) - 201318"}
          </div>
        </div>

      </div>
    </div>
  );
}
