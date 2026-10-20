import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, MessageCircle, Zap, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, generateWhatsAppOrderLink } = useStore();

  // Multi-color variant state
  const variants = product.variants && product.variants.length > 0
    ? product.variants
    : [{ colorName: 'Default', colorHex: '#5A1827', images: [product.image || '/products/placeholder.jpg'] }];

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const currentVariant = variants[selectedVariantIndex] || variants[0];
  const currentImage = currentVariant.images?.[0] || product.image || '/products/placeholder.jpg';

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVariantClick = (e, index) => {
    e.stopPropagation();
    setSelectedVariantIndex(index);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, currentVariant, 1);
  };

  const handleDirectWhatsApp = (e) => {
    e.stopPropagation();
    const url = generateWhatsAppOrderLink(product, currentVariant, {
      paymentMethod: 'Prepaid UPI (Save ₹100)'
    });
    window.open(url, '_blank');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      
      {/* 1. Image Container (Compulsory 3:4 Portrait Aspect Ratio) */}
      <div className="relative aspect-[3/4] bg-[#FAF6F0] overflow-hidden">
        <img
          src={currentImage}
          alt={`${product.title} - ${currentVariant.colorName}`}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top-Left: SKU & Mau Handloom Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          <span className="bg-maroon-900/90 backdrop-blur-xs text-gold-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gold/40 shadow-xs flex items-center gap-1 font-serif">
            <Sparkles className="w-2.5 h-2.5 text-gold" />
            {product.sku}
          </span>
          {product.fabric && (
            <span className="bg-white/90 backdrop-blur-xs text-charcoal text-[9px] font-medium px-2 py-0.5 rounded-full border border-[#E8DEC8] shadow-2xs">
              {product.fabric}
            </span>
          )}
        </div>

        {/* Selected Color Pill on Top-Right */}
        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
          <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
            {currentVariant.colorName}
          </span>
        </div>
      </div>

      {/* 2. Card Content & Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        
        <div>
          {/* Internal Stock Name & SKU Reference */}
          <div className="flex items-center justify-between text-[11px] text-charcoal-muted">
            <span className="font-bold text-maroon font-serif">{product.sku}: {product.stockName}</span>
            <span className="text-[10px] text-emerald-trust font-bold">In Stock</span>
          </div>

          {/* Saree Storefront Title */}
          <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal group-hover:text-maroon transition-colors line-clamp-2 mt-0.5 leading-snug">
            {product.title}
          </h3>

          {/* Multi-Color Swatches Selector */}
          {variants.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2 pt-1 border-t border-[#F5EFEB]">
              <span className="text-[10px] text-charcoal-muted mr-1 font-medium">Colors:</span>
              {variants.map((v, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleVariantClick(e, idx)}
                  className={`p-0.5 rounded-full transition-transform min-h-[26px] min-w-[26px] flex items-center justify-center ${
                    selectedVariantIndex === idx
                      ? 'ring-2 ring-maroon scale-110 shadow-xs'
                      : 'hover:scale-105'
                  }`}
                  title={`${v.colorName} - Click to switch photo`}
                >
                  <span
                    className="w-4 h-4 rounded-full block border border-black/15 shadow-inner"
                    style={{ backgroundColor: v.colorHex }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Honest UPI Discount Badge */}
        <div className="pt-2 border-t border-[#F5EFEB] space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-bold text-maroon font-serif">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-charcoal-muted font-medium">
              Free Pan-India Delivery
            </span>
          </div>

          {/* Honest UPI Discount Badge */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold w-full justify-center">
            <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
            <span>⚡ Extra ₹100 Off on Prepaid UPI Orders</span>
          </div>
        </div>

        {/* 3. Clean Responsive Dual Action Buttons (Sitting cleanly inside the card, min 44px touch targets) */}
        <div className="grid grid-cols-2 gap-2 pt-1.5 mt-auto">
          {/* Add to Bag */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="min-h-[44px] py-2.5 px-2 bg-maroon hover:bg-maroon-800 text-ivory rounded-xl text-xs font-serif font-bold active:scale-95 transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold" />
            <span>Add to Bag</span>
          </button>

          {/* WhatsApp Direct Buy */}
          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="min-h-[44px] py-2.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-medium active:scale-95 transition flex items-center justify-center gap-1.5 shadow-xs"
            title="Instant Order via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>

      </div>

    </div>
  );
}
