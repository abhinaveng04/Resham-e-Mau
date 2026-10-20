import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles, 
  MessageCircle, 
  Instagram
} from 'lucide-react';

export default function Header() {
  const {
    storeConfig,
    cartItemCount,
    setIsCartOpen
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToCatalog = () => {
    if (location.pathname !== '/') {
      navigate('/#catalog-grid');
    } else {
      document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8DEC8] transition-all">
      
      {/* Top Brand Notification Banner (Single clean announcement strip without duplicate WhatsApp buttons) */}
      <div className="bg-maroon-900 text-ivory text-[11px] py-1.5 px-4 text-center font-medium border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="hidden sm:inline text-gold-300 font-serif">
            मऊ हथकरघा • Direct from Handloom Pit-Looms
          </span>
          <span className="hidden sm:inline text-gold/40">•</span>
          <span className="truncate">
            {storeConfig.announcementText || "✨ Mau Handloom Direct from Weavers • Extra ₹100 Off on Prepaid UPI Orders • Free Pan-India Delivery"}
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-maroon hover:text-maroon-800 rounded-lg hover:bg-maroon-50 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo & Authentic Tagline */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              {!logoError && storeConfig.logoUrl ? (
                <img
                  src={storeConfig.logoUrl}
                  alt={storeConfig.brandName}
                  onError={() => setLogoError(true)}
                  className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-full border border-gold/40 shadow-xs shrink-0"
                />
              ) : null}

              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl tracking-wider text-maroon font-bold group-hover:text-maroon-800 transition leading-tight">
                  {storeConfig.brandName}
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.16em] text-gold-700 font-serif font-semibold">
                  {storeConfig.tagline || "The Heritage of Mau Silk"}
                </span>
              </div>
            </Link>
          </div>

          {/* Center / Desktop Clean Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium tracking-wide text-charcoal">
            
            {/* Catalog (All 17 Sarees) */}
            <button
              onClick={scrollToCatalog}
              className="hover:text-maroon transition font-semibold flex items-center gap-1.5 py-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Catalog (All 17 Sarees)</span>
            </button>

            {/* Our Heritage */}
            <Link
              to="/about"
              className="hover:text-maroon transition font-semibold py-1"
            >
              Our Heritage
            </Link>

            {/* Follow @resham.e.mau on Instagram (Single clean link) */}
            <a
              href={storeConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-rose-800 hover:text-rose-900 font-semibold transition py-1"
            >
              <Instagram className="w-4 h-4 text-rose-700" />
              <span>Follow {storeConfig.instagramHandle || "@resham.e.mau"}</span>
            </a>

            {/* Join WhatsApp Group (Single clean link) */}
            <a
              href={storeConfig.whatsappGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-900 font-semibold transition py-1"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Join WhatsApp Group</span>
            </a>

          </nav>

          {/* Right Action Icons: Shopping Bag Only */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Shopping Bag Button (Min 44px) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-charcoal hover:text-maroon transition rounded-full hover:bg-white flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-6 h-6 text-maroon" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Clean Mobile Slide Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DEC8] bg-[#FAF6F0] px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              scrollToCatalog();
            }}
            className="w-full text-left py-2.5 px-3 rounded-xl bg-white border border-[#E8DEC8] text-xs font-bold text-maroon flex items-center justify-between"
          >
            <span>Catalog (All 17 Sarees)</span>
            <Sparkles className="w-4 h-4 text-gold" />
          </button>

          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-left py-2 px-3 text-xs font-semibold text-charcoal block hover:text-maroon"
          >
            Our Heritage & Mau Looms
          </Link>

          <a
            href={storeConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 w-full py-2.5 px-3 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-950"
          >
            <Instagram className="w-4 h-4 text-rose-600" />
            <span>Follow {storeConfig.instagramHandle || "@resham.e.mau"}</span>
          </a>

          <a
            href={storeConfig.whatsappGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 w-full py-2.5 px-3 rounded-xl bg-white border border-emerald-300 text-xs font-bold text-emerald-950"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Join WhatsApp Group</span>
          </a>
        </div>
      )}

    </header>
  );
}
