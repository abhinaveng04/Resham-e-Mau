import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function FloatingWhatsApp() {
  const { storeConfig } = useStore();
  const [showTooltip, setShowTooltip] = useState(true);

  const phone = storeConfig.whatsappNumber || '919876543210';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    'Namaste Resham-e-Mau! 🙏 I am looking at sarees on your website and would love expert assistance.'
  )}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex items-end flex-col gap-2 pointer-events-auto select-none">
      
      {/* Interactive Tooltip Callout */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-charcoal px-3.5 py-2 rounded-2xl shadow-luxury border border-[#E8DEC8] text-xs max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span className="font-medium">
            Namaste! Need saree draping or fabric guidance?
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-charcoal-light hover:text-charcoal p-0.5 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Circular WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300 ring-4 ring-emerald-600/20"
        title="Chat with Mau Weaver Specialist on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        
        {/* Pulsing Green Indicator Ring */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-gold-400 rounded-full border-2 border-white animate-pulse" />
      </a>
    </div>
  );
}
