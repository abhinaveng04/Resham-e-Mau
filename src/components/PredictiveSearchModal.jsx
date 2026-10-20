import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function PredictiveSearchModal() {
  const navigate = useNavigate();
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products
  } = useStore();

  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const quickTags = [
    'Katan Silk',
    'Cream Stone',
    'Satin',
    'Organza',
    'Linen',
    'Banarasi',
    'White Rose',
    'Softy'
  ];

  const q = searchQuery.toLowerCase().trim();
  const results = q
    ? products.filter((p) => {
        const matchTitle = (p.title || '').toLowerCase().includes(q);
        const matchSku = (p.sku || '').toLowerCase().includes(q);
        const matchStock = (p.stockName || '').toLowerCase().includes(q);
        const matchFabric = (p.fabric || '').toLowerCase().includes(q);
        const matchWork = (p.workType || '').toLowerCase().includes(q);
        const matchColor = p.variants?.some((v) => (v.colorName || '').toLowerCase().includes(q));
        return matchTitle || matchSku || matchStock || matchFabric || matchWork || matchColor;
      })
    : [];

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    navigate(`/product/${product.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-charcoal/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0" 
        onClick={() => setIsSearchOpen(false)} 
      />

      <div className="relative w-full max-w-2xl mx-auto bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#E8DEC8] overflow-hidden z-10 my-auto">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E8DEC8] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-gold-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Mau sarees by SKU, weave, color, fabric (e.g. REM-001, Katan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-charcoal placeholder-charcoal-light focus:outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-charcoal-light hover:text-charcoal"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold text-maroon hover:underline ml-2"
          >
            Done
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-4 py-3 bg-[#FAF6F0] border-b border-[#E8DEC8]">
          <div className="text-[11px] uppercase tracking-wider text-charcoal-muted font-semibold mb-2 flex items-center gap-1.5 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Popular Handloom Searches:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`text-xs px-2.5 py-1 rounded-full border transition ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-maroon text-ivory border-maroon'
                    : 'bg-white border-[#E8DEC8] text-charcoal hover:border-gold hover:text-maroon'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {searchQuery.trim() === '' ? (
            <div className="text-center py-8 text-charcoal-muted">
              <p className="text-sm font-serif">Search across all 17 authentic pit-loom sarees from Mau, UP.</p>
              <p className="text-xs text-gold-700 mt-1">Try "Katan Silk", "REM-001", "Cream Stone", or "Satin".</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs font-bold text-maroon flex items-center justify-between font-serif">
                <span>Matching Handloom Sarees ({results.length})</span>
                <span className="text-[10px] text-charcoal-muted font-sans uppercase">Tap to view saree</span>
              </div>
              <div className="divide-y divide-[#E8DEC8]">
                {results.map((product) => {
                  const leadImg = product.variants?.[0]?.images?.[0] || product.image || '/products/Elegant Cream and Red Banarasi Saree.png';
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center gap-3 py-2.5 px-2 hover:bg-white rounded-xl cursor-pointer transition group"
                    >
                      <img
                        src={leadImg}
                        alt={product.title}
                        className="w-14 h-18 object-cover rounded-lg border border-[#E8DEC8] shadow-xs shrink-0 group-hover:scale-102 transition"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gold-700 bg-gold/15 px-1.5 py-0.2 rounded font-mono">
                            {product.sku}
                          </span>
                          <span className="text-[10px] text-maroon font-serif font-bold truncate">
                            {product.stockName}
                          </span>
                        </div>
                        <h4 className="text-sm font-serif font-bold text-charcoal truncate mt-0.5 group-hover:text-maroon transition">
                          {product.title}
                        </h4>
                        <p className="text-xs text-charcoal-muted truncate">
                          {product.fabric} • {product.workType}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-serif font-bold text-maroon">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-emerald-trust font-bold flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5 fill-emerald-600" />
                            Extra ₹100 Off on UPI
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-charcoal-light group-hover:text-maroon shrink-0 transition" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm font-medium text-charcoal">
                No sarees found matching "{searchQuery}"
              </p>
              <p className="text-xs text-charcoal-muted">
                Try searching for "Katan", "Satin", "Cream", "Silver", or "Organza".
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
