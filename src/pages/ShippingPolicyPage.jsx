import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Clock, 
  Banknote, 
  ShieldCheck, 
  MapPin, 
  Package, 
  MessageCircle, 
  Home, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { usePageSEO } from '../utils/seo';

export default function ShippingPolicyPage() {
  const { storeConfig } = useStore();

  usePageSEO(
    'Shipping & Pan-India Delivery Policy | Resham-e-Mau',
    'Fast express dispatch within 24-48 hours directly from Mau, UP. Free Pan-India shipping across 26,000+ pincodes via trusted couriers.'
  );

  return (
    <div className="bg-[#FAF6F0] min-h-screen pb-16">
      
      {/* Breadcrumb Header */}
      <div className="border-b border-[#E8DEC8] bg-white/70 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-charcoal-muted font-medium">
            <Link to="/" className="hover:text-maroon flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
            <span className="text-maroon font-semibold">Shipping Policy</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center space-y-2">
        <span className="text-xs font-serif font-bold text-gold-700 uppercase tracking-widest block">
          Fast & Safe Pan-India Logistics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon">
          Pan-India Shipping & Delivery Policy
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto font-sans">
          From the master pit-looms of Maunath Bhanjan, Uttar Pradesh to your celebration doorstep with speed and security.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* KEY HIGHLIGHTS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] shadow-card text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-maroon-100 text-maroon mx-auto flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-maroon">24–48 Hours Dispatch</h3>
            <p className="text-xs text-charcoal-muted font-sans">
              Orders are packaged and dispatched from Mau within 24 to 48 hours of order confirmation.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] shadow-card text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-800 mx-auto flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-maroon">4–7 Working Days</h3>
            <p className="text-xs text-charcoal-muted font-sans">
              Reliable door-to-door transit across all Indian states and union territories via air courier partners.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] shadow-card text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-maroon">FREE on ₹1,999+</h3>
            <p className="text-xs text-charcoal-muted font-sans">
              Zero shipping fee on all handloom orders above ₹1,999. Flat ₹99 on orders below.
            </p>
          </div>
        </div>

        {/* DETAILED TRANSIT TIMELINES TABLE */}
        <div className="p-6 bg-white rounded-3xl border border-[#E8DEC8] shadow-card space-y-4">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon">
            Estimated Delivery Timelines by Region
          </h3>
          <p className="text-xs text-charcoal-muted font-sans">
            All shipments originate from our artisan hub in <strong>Mau, Uttar Pradesh (PIN: 275101)</strong>.
          </p>

          <div className="border border-[#E8DEC8] rounded-xl overflow-hidden text-xs">
            <div className="bg-[#FAF6F0] grid grid-cols-12 p-3 font-serif font-bold text-maroon border-b border-[#E8DEC8]">
              <div className="col-span-6 sm:col-span-7">Destination Region</div>
              <div className="col-span-6 sm:col-span-5 text-right sm:text-left">Transit Duration</div>
            </div>

            <div className="divide-y divide-[#F5EFEB]">
              <div className="grid grid-cols-12 p-3 items-center">
                <div className="col-span-6 sm:col-span-7 font-medium text-charcoal">
                  Uttar Pradesh, Delhi NCR, Lucknow, Varanasi, Patna
                </div>
                <div className="col-span-6 sm:col-span-5 text-right sm:text-left font-bold text-emerald-trust">
                  2 – 4 Working Days
                </div>
              </div>

              <div className="grid grid-cols-12 p-3 items-center">
                <div className="col-span-6 sm:col-span-7 font-medium text-charcoal">
                  Tier-1 Metros (Mumbai, Bengaluru, Kolkata, Hyderabad, Chennai, Ahmedabad)
                </div>
                <div className="col-span-6 sm:col-span-5 text-right sm:text-left font-bold text-charcoal">
                  3 – 5 Working Days
                </div>
              </div>

              <div className="grid grid-cols-12 p-3 items-center">
                <div className="col-span-6 sm:col-span-7 font-medium text-charcoal">
                  Rest of India (Tier-2 & Tier-3 Cities, Rural Towns)
                </div>
                <div className="col-span-6 sm:col-span-5 text-right sm:text-left font-bold text-charcoal">
                  4 – 7 Working Days
                </div>
              </div>

              <div className="grid grid-cols-12 p-3 items-center">
                <div className="col-span-6 sm:col-span-7 font-medium text-charcoal">
                  North-East States, Jammu & Kashmir, Remote Island Pincodes
                </div>
                <div className="col-span-6 sm:col-span-5 text-right sm:text-left font-bold text-charcoal">
                  5 – 8 Working Days
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CASH ON DELIVERY & PACKAGING POLICY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* COD Terms */}
          <div className="p-6 bg-white rounded-3xl border border-[#E8DEC8] shadow-card space-y-3">
            <div className="flex items-center gap-2 text-maroon font-serif font-bold text-base">
              <Banknote className="w-5 h-5 text-emerald-trust" />
              <span>Cash on Delivery (COD) Rules</span>
            </div>
            <ul className="text-xs text-charcoal-muted space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Available for over <strong>26,000+ PIN codes</strong> across India.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Our courier partners accept Cash or instant UPI QR code scan on delivery.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Kindly ensure someone is available at the provided address to receive and inspect the sealed parcel.</span>
              </li>
            </ul>
          </div>

          {/* Tamper-Proof Packaging */}
          <div className="p-6 bg-white rounded-3xl border border-[#E8DEC8] shadow-card space-y-3">
            <div className="flex items-center gap-2 text-maroon font-serif font-bold text-base">
              <Package className="w-5 h-5 text-gold-600" />
              <span>Luxury Tamper-Evident Packaging</span>
            </div>
            <ul className="text-xs text-charcoal-muted space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                <span>Wrapped in delicate acid-free butter paper to preserve pure silk sheen.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                <span>Encased in an authentic gold-foil embossed handloom cloth pouch.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                <span>Shipped in high-grade weatherproof, tamper-evident outer security polybags.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* TRACKING SUPPORT CTA */}
        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-sm text-emerald-950">
              Need Dispatch or Tracking Updates for Your Order?
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              Message your Order ID on WhatsApp to receive real-time courier tracking details.
            </p>
          </div>
          <a
            href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Namaste Resham-e-Mau, please share tracking status for my saree order.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Track via WhatsApp</span>
          </a>
        </div>

      </div>

    </div>
  );
}
