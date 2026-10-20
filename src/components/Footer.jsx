import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Instagram
} from 'lucide-react';

export default function Footer() {
  const { storeConfig } = useStore();

  return (
    <footer className="bg-maroon-900 text-ivory border-t-2 border-gold/40 pt-12 pb-24 md:pb-12 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Links Grid */}
        <div className="pb-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand Info & Official Studio Address */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <div>
              <Link to="/" className="font-serif text-2xl font-bold text-ivory tracking-wide block hover:text-gold transition">
                {storeConfig.brandName}
              </Link>
              <span className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-medium block mt-0.5 font-serif">
                {storeConfig.tagline || "The Heritage of Mau Silk"}
              </span>
            </div>

            <p className="text-gold-100/80 leading-relaxed font-sans pr-4">
              Celebrating the centuries-old handloom and silk weaving tradition of Mau, Uttar Pradesh. Bringing authentic pit-loom sarees directly from master weavers to your wardrobe without middlemen markups.
            </p>

            <div className="space-y-2 text-gold-200/90 pt-1 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>{storeConfig.officialAddress || "Steller Jeevan, Greater Noida (W) - 201318"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Support: 11:00 AM – 8:00 PM (Mon – Sat)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                <a href={`tel:${storeConfig.supportPhone || '+919643825049'}`} className="hover:text-gold transition">
                  {storeConfig.whatsappDisplay || storeConfig.supportPhone || "+91 96438 25049"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <a href={`mailto:${storeConfig.supportEmail || 'resham.e.mau@gmail.com'}`} className="hover:text-gold transition">
                  {storeConfig.supportEmail || "resham.e.mau@gmail.com"}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Handloom Weaves */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider">
              Handloom Weaves
            </h4>
            <ul className="space-y-2 text-gold-100/80">
              <li>
                <Link to="/#catalog-grid" className="hover:text-gold transition">
                  Mau Katan Silk
                </Link>
              </li>
              <li>
                <Link to="/#catalog-grid" className="hover:text-gold transition">
                  Banarasi Silk
                </Link>
              </li>
              <li>
                <Link to="/#catalog-grid" className="hover:text-gold transition">
                  Soft Silk
                </Link>
              </li>
              <li>
                <Link to="/#catalog-grid" className="hover:text-gold transition">
                  Organza Silk
                </Link>
              </li>
              <li>
                <Link to="/#catalog-grid" className="hover:text-gold transition">
                  Satin Silk
                </Link>
              </li>
              <li>
                <Link to="/#catalog-grid" className="hover:text-gold transition">
                  Linen Silk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Dedicated Policy Pages */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider">
              Patron Care & Policies
            </h4>
            <ul className="space-y-2 text-gold-100/80">
              <li>
                <Link to="/about" className="hover:text-gold transition font-medium flex items-center gap-1">
                  <span>About Resham-e-Mau</span>
                </Link>
              </li>
              <li>
                <Link to="/returns-exchange" className="hover:text-gold transition font-medium text-gold-200">
                  Return & Exchange Policy
                </Link>
                <span className="block text-[10px] text-gold-400">Mandatory 360° Unboxing Video</span>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-gold transition font-medium">
                  Shipping Policy (24-48h Dispatch)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition font-medium">
                  Contact Us (11AM - 8PM, Mon-Sat)
                </Link>
              </li>
              <li>
                <Link to="/#catalog-grid" className="hover:text-gold transition">
                  Explore Full 17 Sarees Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Artisan Guarantee, WhatsApp & Instagram */}
          <div className="col-span-2 lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider">
              Community & Guarantee
            </h4>
            <div className="p-4 bg-maroon-800/60 rounded-xl border border-gold/20 space-y-3">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">
                  100% Genuine Handloom Silk Mark verified with every order.
                </span>
              </div>
              <div className="space-y-2 pt-1">
                <a
                  href={storeConfig.whatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[40px] py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium flex items-center justify-center gap-1.5 transition shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Join Official WhatsApp Community</span>
                </a>
                <a
                  href={storeConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[40px] py-2 px-3 bg-rose-800 hover:bg-rose-900 text-white rounded-lg font-medium flex items-center justify-center gap-1.5 transition shadow-xs"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Follow {storeConfig.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Strict Payment Modes (COD & UPI Only) */}
        <div className="pt-8 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-gold-200/60 text-[11px]">
          <div>
            © {new Date().getFullYear()} {storeConfig.brandName}. All rights reserved. {storeConfig.tagline || "The Heritage of Mau Silk"}.
          </div>
          
          {/* Strictly COD & UPI Only */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-xs">
            <span className="border border-gold/40 bg-maroon-800/90 px-3 py-1 rounded-full font-serif font-bold text-gold-300 shadow-2xs">
              UPI (Extra ₹100 Off)
            </span>
            <span className="border border-gold/40 bg-maroon-800/90 px-3 py-1 rounded-full font-serif font-bold text-gold-300 shadow-2xs">
              Cash on Delivery (COD)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
