import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Video, 
  Scissors, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  Home, 
  ChevronRight, 
  ShieldAlert,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { usePageSEO } from '../utils/seo';

export default function ReturnsPolicyPage() {
  const { storeConfig } = useStore();

  usePageSEO(
    'Return & Exchange Policy — 360° Unboxing Video Rule | Resham-e-Mau',
    'Read our transparent return and exchange policy. Mandatory 360-degree continuous parcel unboxing video rule required within 24 hours of delivery.'
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
            <span className="text-maroon font-semibold">Return & Exchange Policy</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center space-y-2">
        <span className="text-xs font-serif font-bold text-gold-700 uppercase tracking-widest block">
          Transparent & Fair Policies
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon">
          Return, Replacement & Exchange Policy
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto font-sans">
          We take immense pride in the pure handloom craftsmanship of Mau, UP. Please review our guidelines to ensure a seamless exchange experience.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* MANDATORY 360-DEGREE UNBOXING VIDEO RULE CALLOUT */}
        <div className="p-6 sm:p-8 bg-amber-50 rounded-3xl border-2 border-amber-400/80 shadow-lg relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Video className="w-6 h-6" />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Strictly Enforced Policy</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                Mandatory 360-Degree Parcel Unboxing Video Rule
              </h2>

              <p className="text-xs sm:text-sm text-charcoal leading-relaxed font-sans">
                To protect both our artisan weavers and our patrons against in-transit mishandling or fraudulent claims, <strong>every customer must record an uncut, single-take 360-degree video while opening their sealed parcel</strong>.
              </p>

              <div className="p-4 bg-white rounded-xl border border-amber-300/80 space-y-2 text-xs text-charcoal">
                <span className="font-bold text-maroon block text-xs uppercase tracking-wide">
                  Your unboxing video MUST clearly show:
                </span>
                <ul className="space-y-1.5 pl-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Outer Packaging:</strong> All 6 sides of the outer courier tamper-proof bag before opening.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Shipping Label:</strong> Clearly legible AWB tracking barcode and customer address slip.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Uncut Opening:</strong> Slitting the package open and inspecting the saree without stopping, pausing, or editing the video.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-maroon mt-0.5 shrink-0" />
                    <span><strong>Timeframe:</strong> Video must be shared within <strong>24 hours of delivery</strong> to WhatsApp helpline.</span>
                  </li>
                </ul>
              </div>

              <p className="text-[11px] text-amber-900 font-semibold italic">
                * Claims for transit damage, missing items, or physical weaving defects will strictly NOT be entertained without this valid, uncut unboxing video.
              </p>
            </div>
          </div>
        </div>

        {/* CUSTOM FALL & PICO NON-RETURNABLE RULE */}
        <div className="p-6 bg-white rounded-3xl border border-[#E8DEC8] shadow-card space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Scissors className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon">
                Customized Sarees with Fall & Pico are Non-Returnable
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                When you select the <strong>"Add Fall & Pico / Edging (+₹150)"</strong> option or request custom blouse stitching, our master tailors stitch cotton fall and finish the pallu border specifically for you.
              </p>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 font-medium">
                ⚠️ As customized sarees cannot be re-inventoried or restocked for other patrons, <strong>sarees with Fall & Pico or stitched blouses are strictly non-returnable and non-exchangeable</strong>, except in verified cases of wrong product delivery backed by an unboxing video.
              </div>
            </div>
          </div>
        </div>

        {/* 7-DAY EXCHANGE POLICY SUMMARY */}
        <div className="p-6 bg-white rounded-3xl border border-[#E8DEC8] shadow-card space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon">
                Standard 7-Day Exchange Eligibility
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted font-sans leading-relaxed">
                For standard, uncustomized sarees, we provide a 7-day doorstep exchange window starting from the date of delivery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E8DEC8] space-y-1.5">
                  <span className="text-xs font-bold text-emerald-trust flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Eligible for Exchange
                  </span>
                  <ul className="text-xs text-charcoal-muted space-y-1">
                    <li>• Uncut, unstitched original 5.50m saree.</li>
                    <li>• Original brand tags and Silk Mark labels intact.</li>
                    <li>• Unwashed, unworn, in original cloth bag packaging.</li>
                    <li>• Color mismatch verified under standard daylight.</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#E8DEC8] space-y-1.5">
                  <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Ineligible for Exchange
                  </span>
                  <ul className="text-xs text-charcoal-muted space-y-1">
                    <li>• Sarees with Fall, Pico, or blouse cut/stitched.</li>
                    <li>• Perfumed, worn, draped, or washed items.</li>
                    <li>• Request raised after 7 days from delivery date.</li>
                    <li>• Defect claim without uncut 360° unboxing video.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP-BY-STEP EXCHANGE INITIATION */}
        <div className="p-6 bg-white rounded-3xl border border-[#E8DEC8] shadow-card space-y-4">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon text-center sm:text-left">
            How to Initiate an Exchange or Return
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DEC8] text-center space-y-1">
              <span className="w-6 h-6 rounded-full bg-maroon text-ivory text-xs font-bold mx-auto flex items-center justify-center">1</span>
              <strong className="block text-charcoal">Record Video</strong>
              <span className="text-[11px] text-charcoal-muted">360° uncut parcel opening video within 24 hrs.</span>
            </div>

            <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DEC8] text-center space-y-1">
              <span className="w-6 h-6 rounded-full bg-gold text-maroon-900 text-xs font-bold mx-auto flex items-center justify-center">2</span>
              <strong className="block text-charcoal">WhatsApp Us</strong>
              <span className="text-[11px] text-charcoal-muted">Share Order ID and video to +91 98765 43210.</span>
            </div>

            <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DEC8] text-center space-y-1">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold mx-auto flex items-center justify-center">3</span>
              <strong className="block text-charcoal">Doorstep Pickup</strong>
              <span className="text-[11px] text-charcoal-muted">Our courier picks up the parcel from your address.</span>
            </div>

            <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DEC8] text-center space-y-1">
              <span className="w-6 h-6 rounded-full bg-maroon text-ivory text-xs font-bold mx-auto flex items-center justify-center">4</span>
              <strong className="block text-charcoal">Replacement / Refund</strong>
              <span className="text-[11px] text-charcoal-muted">Dispatched within 24 hours of quality inspection.</span>
            </div>
          </div>

          {/* WhatsApp Support CTA */}
          <div className="pt-2 text-center">
            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Namaste Resham-e-Mau, I would like to request an exchange for my saree order. Here is my Order ID and unboxing video.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-bold text-xs sm:text-sm shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Initiate Exchange on WhatsApp Helpline</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
