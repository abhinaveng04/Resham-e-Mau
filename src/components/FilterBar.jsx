import React from 'react';
import { useStore } from '../context/StoreContext';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';

export default function FilterBar() {
  const {
    filteredProducts,
    activeFilterCount,
    setIsFilterDrawerOpen,
    sortBy,
    setSortBy,
    selectedWeave,
    setSelectedWeave,
    selectedFabric,
    setSelectedFabric,
    selectedColor,
    setSelectedColor,
    selectedOccasion,
    setSelectedOccasion,
    selectedPriceMax,
    setSelectedPriceMax,
    searchQuery,
    setSearchQuery,
    onlyBestsellers,
    setOnlyBestsellers,
    onlyNewArrivals,
    setOnlyNewArrivals,
    resetFilters
  } = useStore();

  return (
    <div className="space-y-3 pt-2 pb-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DEC8] pb-3">
        
        {/* Count & Summary */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg sm:text-xl font-bold text-maroon">
            The Handloom Collection
          </span>
          <span className="text-xs text-charcoal-muted">
            ({filteredProducts.length} {filteredProducts.length === 1 ? 'Saree' : 'Sarees'})
          </span>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex items-center gap-2.5">
          {/* Filter Drawer Trigger */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E8DEC8] hover:border-gold rounded-lg text-xs font-semibold text-charcoal transition shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-maroon" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-maroon text-ivory text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#E8DEC8] hover:border-gold rounded-lg text-xs font-medium text-charcoal py-2 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-gold transition shadow-2xs cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-charcoal-light absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-charcoal-muted font-medium text-[11px] uppercase tracking-wider">
            Active Filters:
          </span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-maroon/10 text-maroon border border-maroon/20">
              Keyword: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:opacity-75">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedWeave && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/15 text-gold-800 border border-gold/30">
              Weave: {selectedWeave}
              <button onClick={() => setSelectedWeave('')} className="hover:opacity-75">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedFabric && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-charcoal border border-[#E8DEC8]">
              Fabric: {selectedFabric}
              <button onClick={() => setSelectedFabric('')} className="hover:opacity-75">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedColor && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-charcoal border border-[#E8DEC8]">
              Color: {selectedColor}
              <button onClick={() => setSelectedColor('')} className="hover:opacity-75">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedOccasion && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
              Occasion: {selectedOccasion}
              <button onClick={() => setSelectedOccasion('')} className="hover:opacity-75">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedPriceMax && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Max ₹{selectedPriceMax.toLocaleString('en-IN')}
              <button onClick={() => setSelectedPriceMax(null)} className="hover:opacity-75">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyBestsellers && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Bestsellers Only
              <button onClick={() => setOnlyBestsellers(false)} className="hover:opacity-75">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {onlyNewArrivals && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              New Arrivals
              <button onClick={() => setOnlyNewArrivals(false)} className="hover:opacity-75">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[11px] font-bold text-maroon hover:underline ml-1"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
