import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Home, Grid, Search, MessageCircle, ShoppingBag } from 'lucide-react';

export default function MobileBottomBar() {
  const navigate = useNavigate();
  const {
    cartItemCount,
    setIsCartOpen,
    setIsMobileMenuOpen,
    setIsSearchOpen,
    resetFilters,
    storeConfig
  } = useStore();

  const handleHomeClick = () => {
    resetFilters();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoriesClick = () => {
    setIsMobileMenuOpen(true);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber || '919876543210'}?text=${encodeURIComponent(
    'Namaste Resham-e-Mau, I need assistance choosing an authentic handloom saree.'
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E8DEC8] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[calc(0.4rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-5 items-center justify-around text-center">
        
        {/* 1. Home (Min 44px touch target) */}
        <button
          onClick={handleHomeClick}
          className="min-h-[44px] flex flex-col items-center justify-center py-1 text-charcoal-muted hover:text-maroon active:scale-95 transition"
        >
          <Home className="w-5 h-5 text-maroon" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Home</span>
        </button>

        {/* 2. Categories (Min 44px touch target) */}
        <button
          onClick={handleCategoriesClick}
          className="min-h-[44px] flex flex-col items-center justify-center py-1 text-charcoal-muted hover:text-maroon active:scale-95 transition"
        >
          <Grid className="w-5 h-5 text-charcoal" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Categories</span>
        </button>

        {/* 3. Search (Min 44px touch target) */}
        <button
          onClick={handleSearchClick}
          className="min-h-[44px] flex flex-col items-center justify-center py-1 text-charcoal-muted hover:text-maroon active:scale-95 transition"
        >
          <Search className="w-5 h-5 text-charcoal" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Search</span>
        </button>

        {/* 4. WhatsApp Help (Min 44px touch target) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] flex flex-col items-center justify-center py-1 text-charcoal-muted hover:text-emerald-700 active:scale-95 transition"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5 text-emerald-700">WhatsApp</span>
        </a>

        {/* 5. Cart (Min 44px touch target with badge) */}
        <button
          onClick={handleCartClick}
          className="min-h-[44px] flex flex-col items-center justify-center py-1 text-charcoal-muted hover:text-maroon active:scale-95 transition relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-maroon" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-white text-[9px] font-bold px-1.5 py-0.2 min-w-[16px] h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5 font-bold text-maroon">Cart</span>
        </button>

      </div>
    </div>
  );
}
