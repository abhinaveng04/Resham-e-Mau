import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';

export default function AnnouncementBar() {
  const { storeConfig } = useStore();
  const text = storeConfig.announcementText || "✨ Handcrafted in Mau, UP • Zero Middlemen • Extra ₹100 Off on Prepaid UPI Orders • Free Pan-India Delivery";

  return (
    <div className="relative bg-maroon-900 border-b border-gold/30 text-gold-200 text-xs py-2 px-3 overflow-hidden select-none z-50">
      <div className="flex items-center">
        {/* Scrolling text marquee */}
        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] w-max font-medium tracking-wide">
          <div className="flex items-center space-x-8 px-4">
            <span className="flex items-center gap-1.5 text-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
              {text}
            </span>
            <span className="text-gold/50">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Genuine Handloom Silk Mark Verified
            </span>
            <span className="text-gold/50">•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-gold" />
              Direct from Mau Weavers • Zero Middlemen
            </span>
            <span className="text-gold/50">•</span>
            <span>COD Available Across 26,000+ Pincodes</span>
            <span className="text-gold/50">•</span>
          </div>

          <div className="flex items-center space-x-8 px-4">
            <span className="flex items-center gap-1.5 text-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
              {text}
            </span>
            <span className="text-gold/50">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Genuine Handloom Silk Mark Verified
            </span>
            <span className="text-gold/50">•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-gold" />
              Direct from Mau Weavers • Zero Middlemen
            </span>
            <span className="text-gold/50">•</span>
            <span>COD Available Across 26,000+ Pincodes</span>
            <span className="text-gold/50">•</span>
          </div>
        </div>
      </div>
    </div>
  );
}
