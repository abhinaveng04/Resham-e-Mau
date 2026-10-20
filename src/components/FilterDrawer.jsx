import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Check, RotateCcw, Filter } from 'lucide-react';

export default function FilterDrawer() {
  const {
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    products,
    selectedFabricFilter,
    setSelectedFabricFilter,
    resetFilters
  } = useStore();

  if (!isFilterDrawerOpen) return null;

  // Extract unique fabrics from catalog
  const fabrics = Array.from(new Set(products.map((p) => p.fabric).filter(Boolean)));

  const handleFabricSelect = (fabric) => {
    setSelectedFabricFilter(selectedFabricFilter === fabric ? '' : fabric);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsFilterDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-sm bg-[#FAF6F0] h-full flex flex-col shadow-2xl z-50 overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 bg-maroon text-ivory flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-bold tracking-wide">
              Filter Handloom Sarees
            </h3>
            {selectedFabricFilter && (
              <span className="bg-gold text-maroon-900 text-xs px-2 py-0.5 rounded-full font-bold">
                1 Active
              </span>
            )}
          </div>
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="p-1 rounded-full hover:bg-maroon-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center text-ivory"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Options */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Fabric Filter */}
          <div>
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2.5 flex items-center justify-between font-serif">
              <span>Pure Fabric Quality</span>
              {selectedFabricFilter && (
                <button
                  onClick={() => setSelectedFabricFilter('')}
                  className="text-[10px] text-maroon font-semibold hover:underline"
                >
                  Clear
                </button>
              )}
            </h4>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedFabricFilter('')}
                className={`w-full py-2 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition min-h-[40px] ${
                  !selectedFabricFilter
                    ? 'bg-maroon text-ivory border-maroon font-bold'
                    : 'bg-white border-[#E8DEC8] text-charcoal hover:border-gold'
                }`}
              >
                <span>All Handloom Fabrics ({products.length} Sarees)</span>
                {!selectedFabricFilter && <Check className="w-3.5 h-3.5 text-gold" />}
              </button>

              {fabrics.map((fabric) => (
                <button
                  key={fabric}
                  onClick={() => handleFabricSelect(fabric)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition min-h-[40px] ${
                    selectedFabricFilter === fabric
                      ? 'bg-maroon text-ivory border-maroon font-bold'
                      : 'bg-white border-[#E8DEC8] text-charcoal hover:border-gold'
                  }`}
                >
                  <span>{fabric}</span>
                  {selectedFabricFilter === fabric && <Check className="w-3.5 h-3.5 text-gold" />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 bg-white border-t border-[#E8DEC8] flex items-center gap-3">
          <button
            onClick={() => {
              resetFilters();
            }}
            className="px-4 py-2.5 border border-[#E8DEC8] rounded-xl text-xs font-semibold text-charcoal hover:bg-ivory flex items-center gap-1.5 transition min-h-[44px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="flex-1 py-2.5 bg-maroon text-ivory rounded-xl text-xs sm:text-sm font-serif font-bold tracking-wide hover:bg-maroon-800 transition shadow-md min-h-[44px]"
          >
            Apply & View Sarees
          </button>
        </div>

      </div>
    </div>
  );
}
