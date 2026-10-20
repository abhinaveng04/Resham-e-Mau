import React from 'react';
import { useStore } from '../context/StoreContext';
import { usePageSEO } from '../utils/seo';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import TrustStrip from '../components/TrustStrip';
import { 
  Sparkles, 
  Search, 
  Instagram, 
  MessageCircle, 
  Users, 
  X, 
  CheckCircle2 
} from 'lucide-react';

export default function HomePage() {
  const {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedFabricFilter,
    setSelectedFabricFilter,
    storeConfig
  } = useStore();

  usePageSEO(
    `${storeConfig.brandName} | The Heritage of Mau Silk — Authentic Handloom Sarees`,
    "Explore authentic handloom sarees direct from master pit-looms of Mau, Uttar Pradesh. Pure Katan silk, Satin, Organza, and Linen with zero middleman markups."
  );

  const fabrics = ['All', 'Pure Katan Silk', 'Pure Satin Silk', 'Kora Organza Silk', 'Pure Handloom Linen Silk', 'Soft Silk', 'Cotton Silk Blend'];

  return (
    <div className="bg-[#FAF6F0] min-h-screen">
      
      {/* 1. Clean Hero Banner Slider (using real banners) */}
      <HeroSlider />

      {/* 2. Prominent Social & WhatsApp Community Strip */}
      <section className="bg-gradient-to-r from-maroon-900 via-maroon to-maroon-900 text-ivory py-4 px-4 border-y border-gold/40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-serif text-sm sm:text-base font-bold text-gold-300">
              Join 15,000+ Saree Lovers in Our Handloom Community
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* Follow Instagram */}
            <a
              href={storeConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-md transition active:scale-95"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow {storeConfig.instagramHandle} on Instagram</span>
            </a>

            {/* Join WhatsApp Community */}
            <a
              href={storeConfig.whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-md transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join Official WhatsApp Community</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Unified 17-Saree Main Catalog Section */}
      <section id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Section Title & Description */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-maroon/10 border border-gold/40 text-maroon text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Direct Pit-Loom Inventory</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-maroon leading-tight">
            Complete Handloom Saree Catalog ({products.length} Weaves)
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted font-sans">
            Honest artisan prices with zero middleman markups. Handwoven in Maunath Bhanjan, Uttar Pradesh.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="max-w-2xl mx-auto mb-8 space-y-3">
          {/* Search Input Box */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search by saree name, SKU (e.g. REM-001, Cream Stone), fabric, or color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E8DEC8] focus:border-gold focus:ring-1 focus:ring-gold text-xs sm:text-sm rounded-full py-3 pl-11 pr-10 text-charcoal placeholder-charcoal-light shadow-xs transition"
            />
            <Search className="w-4 h-4 text-charcoal-light absolute left-4 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 text-charcoal-light hover:text-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Instant Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {fabrics.map((fab) => {
              const isSelected = (!selectedFabricFilter && fab === 'All') || selectedFabricFilter === fab;
              return (
                <button
                  key={fab}
                  onClick={() => setSelectedFabricFilter(fab === 'All' ? '' : fab)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                    isSelected
                      ? 'bg-maroon text-ivory font-bold shadow-xs'
                      : 'bg-white border border-[#E8DEC8] text-charcoal hover:border-gold hover:text-maroon'
                  }`}
                >
                  {fab}
                </button>
              );
            })}
          </div>

          {/* Showing Count */}
          <div className="text-center text-xs text-charcoal-muted">
            Showing <strong className="text-maroon font-serif">{filteredProducts.length}</strong> of {products.length} Sarees
            {(searchQuery || selectedFabricFilter) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFabricFilter('');
                }}
                className="text-gold-700 font-bold hover:underline ml-2"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* 17 Saree Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#E8DEC8] shadow-xs space-y-3">
            <h3 className="font-serif text-lg font-bold text-maroon">
              No Sarees Found Matching "{searchQuery}"
            </h3>
            <p className="text-xs text-charcoal-muted">
              Try searching by SKU (e.g. REM-001) or clear the search to view all 17 sarees.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFabricFilter('');
              }}
              className="min-h-[44px] px-6 py-2.5 bg-maroon text-ivory rounded-full text-xs font-serif font-bold"
            >
              Show All 17 Sarees
            </button>
          </div>
        )}

      </section>

      {/* 4. 4-Icon Trust Strip (Free Shipping, COD & UPI, Assured Fabric, Easy Exchange) */}
      <TrustStrip />

    </div>
  );
}
