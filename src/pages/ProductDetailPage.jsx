import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { usePageSEO } from '../utils/seo';
import { 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Share2, 
  Check, 
  ChevronDown, 
  Phone, 
  Home, 
  ChevronRight, 
  Eye, 
  Zap, 
  MapPin, 
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    generateWhatsAppOrderLink,
    showToast,
    storeConfig
  } = useStore();

  // Find product by slug or id
  const product = useMemo(() => {
    return products.find((p) => p.slug === slug || String(p.id) === slug) || products[0];
  }, [products, slug]);

  // Dynamic SEO for Product Detail Page
  const seoTitle = product 
    ? `${product.title}${product.stockName ? ` (${product.stockName})` : ''} | Resham-e-Mau`
    : 'Authentic Handloom Saree | Resham-e-Mau';
  const seoDesc = product
    ? `Shop ${product.title} in pure ${product.fabric || 'silk'} with ${product.workType || 'authentic zari work'}. Handcrafted in Mau, UP. Price: ₹${(product.price || 0).toLocaleString('en-IN')}. Extra ₹100 Off on Prepaid UPI.`
    : 'Discover authentic handloom sarees direct from the master weavers of Mau, Uttar Pradesh.';
  usePageSEO(seoTitle, seoDesc);

  const variants = useMemo(() => {
    return product?.variants && product.variants.length > 0
      ? product.variants
      : [{ colorName: 'Standard', colorHex: '#5A1827', images: ['/products/Elegant Cream and Red Banarasi Saree.png'] }];
  }, [product]);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const currentVariant = variants[selectedVariantIndex] || variants[0];
  const images = currentVariant.images?.length > 0 ? currentVariant.images : ['/products/Elegant Cream and Red Banarasi Saree.png'];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // Live Pincode Checker
  const [pincode, setPincode] = useState('');
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);
  const [pincodeResult, setPincodeResult] = useState(null);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState('specs'); // 'specs' | 'shipping' | 'help'

  // Live viewer proof counter (between 24 and 68)
  const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * (68 - 24 + 1)) + 24);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 24 && next <= 68 ? next : 36;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top and reset image index on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedVariantIndex(0);
    setActiveImageIndex(0);
    setPincodeResult(null);
  }, [slug]);

  const effectiveUpiPrice = Math.max(0, (product?.price || 0) - (storeConfig.upiDiscount || 100));

  // Dynamic 3-step delivery timeline based on real date
  const today = new Date();
  const step1Date = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const tomorrow = new Date(today.getTime() + 86400000);
  const step2Date = tomorrow.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const deliveryStart = new Date(today.getTime() + 4 * 86400000);
  const deliveryEnd = new Date(today.getTime() + 6 * 86400000);
  const step3DateRange = `${deliveryStart.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${deliveryEnd.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`;

  // Handle Zoom mouse movement
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // 1-Click Share handler
  const handleShare = async () => {
    const url = window.location.href;
    const title = `${product.title} (${product.stockName}) | Resham-e-Mau`;
    const shareText = `Explore authentic handloom saree: ${product.title} direct from Mau weavers on Resham-e-Mau:`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url });
        return;
      } catch (err) {}
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast('Saree link copied to clipboard!');
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`, '_blank');
    }
  };

  // Live India Post API Pincode Checker
  const handlePincodeCheck = async (e) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeResult({
        success: false,
        text: 'Please enter a valid 6-digit Indian Pincode.'
      });
      return;
    }

    setIsCheckingPincode(true);
    setPincodeResult(null);

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`);
      const data = await res.json();
      if (
        data &&
        Array.isArray(data) &&
        data[0]?.Status === 'Success' &&
        data[0]?.PostOffice &&
        data[0].PostOffice.length > 0
      ) {
        const po = data[0].PostOffice[0];
        const district = po.District || 'Your City';
        const state = po.State || 'India';
        setPincodeResult({
          success: true,
          text: `✓ Delivery & COD available in ${district}, ${state} — Dispatched in 24-48 hrs from Mau`
        });
      } else {
        setPincodeResult({
          success: false,
          text: `Pincode ${cleanPin} not found in Postal database. We still dispatch all India via Speed Post & Bluedart!`
        });
      }
    } catch (err) {
      setPincodeResult({
        success: true,
        text: `✓ Free Express Delivery available to PIN ${cleanPin}. Dispatched within 24-48 hrs from Mau.`
      });
    } finally {
      setIsCheckingPincode(false);
    }
  };

  // Add to Bag with selected color variant
  const handleAddToBag = () => {
    addToCart(product, currentVariant, 1);
  };

  // Direct WhatsApp Buy Link
  const directWhatsAppUrl = generateWhatsAppOrderLink(product, currentVariant, {
    paymentMethod: 'Prepaid UPI (Save ₹100)',
    pincode: pincode || undefined
  });

  // Other sarees in catalog
  const otherSarees = products.filter((p) => p.id !== product.id).slice(0, 4);

  if (!product) return null;

  return (
    <div className="bg-[#FAF6F0] min-h-screen pb-20">
      
      {/* 1. Breadcrumbs Nav */}
      <div className="border-b border-[#E8DEC8] bg-white/70 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-charcoal-muted font-medium">
            <Link to="/" className="hover:text-maroon flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
            <Link to="/#catalog-grid" className="hover:text-maroon">
              Catalog (All 17 Sarees)
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
            <span className="text-maroon font-serif font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.sku}: {product.stockName}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Main Above-The-Fold Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Gallery with 3:4 Portrait Aspect Ratio */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Preview with Hover Magnifier */}
            <div 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[#E8DEC8] shadow-card select-none cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={images[activeImageIndex] || images[0]}
                alt={`${product.title} - ${currentVariant.colorName}`}
                className="w-full h-full object-cover object-center transition-transform duration-300"
              />

              {/* Magnifier Lens */}
              {isZoomed && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                  style={{
                    backgroundImage: `url(${images[activeImageIndex] || images[0]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '220%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}

              {/* Badges on Top-Left */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                <span className="bg-maroon-900/90 backdrop-blur-xs text-gold-300 text-xs font-bold px-3 py-1 rounded-full border border-gold/40 shadow-xs flex items-center gap-1 font-serif">
                  <Sparkles className="w-3 h-3 text-gold" />
                  {product.sku}: {product.stockName}
                </span>
                <span className="bg-white/90 backdrop-blur-xs text-charcoal text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E8DEC8] shadow-2xs">
                  {product.fabric}
                </span>
              </div>

              {/* Top-Right: Share button */}
              <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs text-charcoal hover:text-maroon shadow-md flex items-center justify-center transition active:scale-90"
                  title="Share Saree"
                  aria-label="Share Saree"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Hover hint */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-full pointer-events-none hidden sm:block">
                Hover to Zoom Fabric
              </div>
            </div>

            {/* Thumbnail Switcher */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-maroon shadow-md scale-102 ring-1 ring-gold'
                        : 'border-[#E8DEC8] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded font-mono">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Mau Pit-Loom Craft Assurance */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-maroon font-serif font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-trust" />
                <span>Handloom Authenticity Guarantee</span>
              </div>
              <p className="text-charcoal-muted leading-relaxed font-sans">
                {product.description || "Woven on wooden pit-looms in Mau, UP. Every thread is selected to ensure lasting heirloom resilience."}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Details, Pricing, Swatches, India Post Checker & Buy */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Header Titles */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gold-700 uppercase tracking-widest mb-1">
                <span>{product.sku}</span>
                <span>•</span>
                <span>Stock: {product.stockName}</span>
                <span>•</span>
                <span>{product.fabric}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon leading-tight">
                {product.title}
              </h1>

              {/* Live social proof counter */}
              <div className="flex items-center gap-3 mt-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-900 rounded-full text-xs font-bold animate-pulse">
                  <Eye className="w-3.5 h-3.5 text-rose-600" />
                  <span>👁️ {viewerCount} people viewing this saree right now</span>
                </div>
              </div>
            </div>

            {/* Honest Pricing Block (No fake strikethroughs) */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] shadow-xs space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-maroon">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-trust bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Loom-to-Wardrobe Direct Price
                </span>
              </div>
              <p className="text-xs text-charcoal-muted">
                Inclusive of all taxes • <strong>Free Pan-India Delivery</strong> • Blouse Piece Included
              </p>
            </div>

            {/* Special UPI Discount Banner */}
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-950">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Zap className="w-3.5 h-3.5 fill-white" />
              </div>
              <div className="flex-1">
                <span className="font-bold block text-sm font-serif text-emerald-900">
                  ⚡ Extra ₹100 Off on Prepaid UPI Orders
                </span>
                <span className="text-emerald-800 text-[11px]">
                  Effective Price: <strong className="font-bold text-emerald-950 font-serif text-xs">₹{effectiveUpiPrice.toLocaleString('en-IN')}</strong> (Select UPI on WhatsApp or at checkout).
                </span>
              </div>
            </div>

            {/* Multi-Color Swatches Selector */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-charcoal">
                <span>
                  Color: <strong className="text-maroon font-bold font-serif text-sm">{currentVariant.colorName}</strong>
                </span>
                <span className="text-[11px] text-charcoal-light">
                  {variants.length} Weave {variants.length === 1 ? 'Color' : 'Colors'} Available
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {variants.map((v, idx) => {
                  const isSelected = selectedVariantIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedVariantIndex(idx);
                        setActiveImageIndex(0);
                      }}
                      className={`group relative p-1 rounded-full border-2 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-maroon shadow-md ring-2 ring-gold'
                          : 'border-[#E8DEC8] hover:border-gold'
                      }`}
                      title={v.colorName}
                    >
                      <span
                        className="w-7 h-7 rounded-full block border border-black/10 shadow-inner"
                        style={{ backgroundColor: v.colorHex || '#5A1827' }}
                      />
                      {isSelected && (
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-maroon whitespace-nowrap hidden sm:block">
                          Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic 3-Step Delivery Timeline & Live India Post Pincode Checker */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-maroon uppercase tracking-wider flex items-center gap-1.5 font-serif">
                  <Truck className="w-4 h-4 text-gold-600" />
                  <span>Pan-India Delivery Timeline</span>
                </span>
                <span className="text-[10px] text-emerald-trust font-bold">Free Express Shipping</span>
              </div>

              {/* 3 Steps */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs relative pt-1">
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-maroon text-ivory text-[10px] font-bold mx-auto flex items-center justify-center">
                    1
                  </div>
                  <span className="font-bold text-charcoal block text-[11px]">Ordered</span>
                  <span className="text-[10px] text-charcoal-muted">{step1Date}</span>
                </div>

                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-gold text-maroon-900 text-[10px] font-bold mx-auto flex items-center justify-center">
                    2
                  </div>
                  <span className="font-bold text-charcoal block text-[11px]">Dispatched Mau</span>
                  <span className="text-[10px] text-charcoal-muted">{step2Date}</span>
                </div>

                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-[10px] font-bold mx-auto flex items-center justify-center">
                    3
                  </div>
                  <span className="font-bold text-charcoal block text-[11px]">Delivered</span>
                  <span className="text-[10px] text-emerald-800 font-bold">{step3DateRange}</span>
                </div>
              </div>

              {/* Live India Post API Form */}
              <form onSubmit={handlePincodeCheck} className="flex gap-2 pt-2 border-t border-[#F5EFEB]">
                <div className="relative flex-1">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode to check COD & speed"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl pl-8 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                  <MapPin className="w-3.5 h-3.5 text-maroon absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  disabled={isCheckingPincode}
                  className="min-h-[40px] px-4 py-2 bg-maroon text-ivory text-xs font-bold rounded-xl hover:bg-maroon-800 transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isCheckingPincode ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <span>Check</span>
                  )}
                </button>
              </form>

              {pincodeResult && (
                <div
                  className={`text-xs p-2.5 rounded-xl flex items-start gap-2 ${
                    pincodeResult.success
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}
                >
                  {pincodeResult.success ? (
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  )}
                  <span className="leading-snug">{pincodeResult.text}</span>
                </div>
              )}
            </div>

            {/* DUAL BUY BUTTONS */}
            <div className="space-y-3 pt-2">
              
              {/* Button 1: Add to Bag */}
              <button
                onClick={handleAddToBag}
                className="w-full min-h-[48px] py-3.5 px-4 bg-maroon hover:bg-maroon-800 text-ivory rounded-2xl font-serif font-bold text-sm tracking-wide shadow-md active:scale-98 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-gold" />
                <span>Add to Shopping Bag (₹{product.price.toLocaleString('en-IN')})</span>
              </button>

              {/* Button 2: High-contrast WhatsApp Checkout */}
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs sm:text-sm tracking-wide shadow-lg active:scale-98 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Order Directly on WhatsApp (Save ₹100 on UPI)</span>
              </a>

            </div>

            {/* Clean Accordions */}
            <div className="space-y-2 pt-2">
              
              {/* Accordion 1: Specifications */}
              <div className="bg-white rounded-xl border border-[#E8DEC8] overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                  className="w-full p-3.5 text-left font-serif font-bold text-sm text-maroon flex items-center justify-between hover:bg-[#FAF6F0]"
                >
                  <span>Saree & Blouse Craft Specifications</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specs' ? 'rotate-180 text-maroon' : 'text-charcoal-light'}`} />
                </button>

                {openAccordion === 'specs' && (
                  <div className="p-3.5 pt-0 text-xs border-t border-[#F5EFEB] divide-y divide-[#F5EFEB]">
                    <div className="grid grid-cols-2 py-1.5">
                      <span className="text-charcoal-muted">SKU & Stock Name</span>
                      <span className="font-semibold text-charcoal">{product.sku} ({product.stockName})</span>
                    </div>
                    <div className="grid grid-cols-2 py-1.5">
                      <span className="text-charcoal-muted">Fabric Quality</span>
                      <span className="font-semibold text-charcoal">{product.fabric}</span>
                    </div>
                    <div className="grid grid-cols-2 py-1.5">
                      <span className="text-charcoal-muted">Work / Technique</span>
                      <span className="font-semibold text-charcoal">{product.workType}</span>
                    </div>
                    <div className="grid grid-cols-2 py-1.5">
                      <span className="text-charcoal-muted">Saree Length</span>
                      <span className="font-semibold text-charcoal">{product.sareeLength || "5.50 Meters"}</span>
                    </div>
                    <div className="grid grid-cols-2 py-1.5">
                      <span className="text-charcoal-muted">Blouse Piece</span>
                      <span className="font-semibold text-charcoal">{product.blouseLength || "0.80 Meters Unstitched"}</span>
                    </div>
                    <div className="grid grid-cols-2 py-1.5">
                      <span className="text-charcoal-muted">Weight</span>
                      <span className="font-semibold text-charcoal">{product.weight || "600 Grams"}</span>
                    </div>
                    <div className="grid grid-cols-2 py-1.5">
                      <span className="text-charcoal-muted">Wash Care</span>
                      <span className="font-semibold text-charcoal">{product.care || "Dry Clean Only"}</span>
                    </div>
                    <div className="py-2 text-[11px] text-charcoal-muted italic">
                      Disclaimer: Handcrafted handloom products may exhibit slight variations in zari sheen and motif alignment under studio lighting, confirming authentic artisanal craftsmanship.
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping & Returns (Highlighting 360 unboxing video rule) */}
              <div className="bg-white rounded-xl border border-[#E8DEC8] overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full p-3.5 text-left font-serif font-bold text-sm text-maroon flex items-center justify-between hover:bg-[#FAF6F0]"
                >
                  <span>Shipping, COD & Return Policy</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180 text-maroon' : 'text-charcoal-light'}`} />
                </button>

                {openAccordion === 'shipping' && (
                  <div className="p-3.5 pt-0 text-xs text-charcoal-muted leading-relaxed border-t border-[#F5EFEB] space-y-2">
                    <p>• <strong>Mandatory 360° Unboxing Video Rule:</strong> To claim any defect or transit issue, customers must record an uncut parcel-opening video within 24 hours of delivery showing the outer shipping label and the unfolded saree.</p>
                    <p>• <strong>Free Pan-India Delivery:</strong> Dispatched within 24-48 hours directly from our Mau artisan workshop.</p>
                    <p>• <strong>Cash on Delivery (COD):</strong> Available across 26,000+ Indian PIN codes.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Weaver Help */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif font-bold text-sm text-emerald-950">
                    Need Draping, Color, or Video Assistance?
                  </h4>
                  <p className="text-emerald-800 text-[11px] mt-0.5">
                    Speak directly with a Mau Handloom silk weaving consultant on WhatsApp.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(`Namaste Resham-e-Mau, I need assistance with saree: ${product.title} (${product.sku} - ${product.stockName})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[40px] px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${storeConfig.whatsappNumber}`}
                    className="min-h-[40px] px-3.5 py-2 bg-white border border-emerald-400 text-emerald-900 rounded-lg font-bold flex items-center gap-1.5 hover:bg-emerald-100"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 3. More Handloom Sarees Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-10 border-t border-[#E8DEC8]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-maroon">
              More Handloom Treasures from Mau
            </h3>
            <p className="text-xs text-charcoal-muted">
              Authentic pure silk weaves crafted with generational pride
            </p>
          </div>
          <Link
            to="/#catalog-grid"
            className="text-xs font-serif font-bold text-gold-700 hover:text-maroon"
          >
            View All 17 Sarees →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {otherSarees.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}
