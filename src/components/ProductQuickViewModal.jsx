import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Sparkles, 
  MapPin, 
  Check, 
  Plus, 
  Minus,
  Zap
} from 'lucide-react';

export default function ProductQuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    generateWhatsAppOrderLink
  } = useStore();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const variants = product.variants && product.variants.length > 0
    ? product.variants
    : [{ colorName: 'Standard', colorHex: '#5A1827', images: ['/products/Elegant Cream and Red Banarasi Saree.png'] }];

  const currentVariant = variants[selectedVariantIdx] || variants[0];
  const images = currentVariant.images?.length > 0 ? currentVariant.images : ['/products/Elegant Cream and Red Banarasi Saree.png'];

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setDeliveryStatus({
        success: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
      return;
    }

    const isMauRegion = pincode.startsWith('275') || pincode.startsWith('221');
    const days = isMauRegion ? '2-3 Days' : '3-5 Days';
    setDeliveryStatus({
      success: true,
      message: `Verified! Free Express Delivery in ${days} to PIN ${pincode.trim()}. Cash on Delivery (COD) Available.`
    });
  };

  const handleAddToCart = () => {
    addToCart(product, currentVariant, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#E8DEC8] overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-150">
        
        {/* Sticky Modal Header on Mobile */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#E8DEC8] bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif font-bold text-maroon uppercase tracking-wider">
              {product.fabric || "Handloom Pure Silk"}
            </span>
            <span className="text-charcoal-light">•</span>
            <span className="text-xs text-charcoal-muted font-mono font-bold">SKU: {product.sku}</span>
          </div>
          <button
            onClick={() => setQuickViewProduct(null)}
            className="p-1 rounded-full text-charcoal-muted hover:text-maroon hover:bg-ivory transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left Column: Saree Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-[#E8DEC8] shadow-sm">
                <img
                  src={images[selectedImgIndex] || images[0]}
                  alt={`${product.title} - ${currentVariant.colorName}`}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Handloom Stamp */}
                <div className="absolute top-3 left-3 bg-maroon/90 backdrop-blur-xs text-ivory text-[11px] px-2.5 py-1 rounded-full border border-gold/40 flex items-center gap-1 font-serif">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>Handcrafted in Mau, UP</span>
                </div>

                <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {currentVariant.colorName}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition ${
                        selectedImgIndex === idx
                          ? 'border-maroon shadow-xs scale-98'
                          : 'border-[#E8DEC8] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Angle ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Color swatches in quick view */}
              {variants.length > 1 && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-charcoal">Colors:</span>
                  {variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedVariantIdx(i);
                        setSelectedImgIndex(0);
                      }}
                      className={`w-6 h-6 rounded-full border-2 transition ${
                        selectedVariantIdx === i ? 'border-maroon ring-1 ring-gold' : 'border-black/20'
                      }`}
                      style={{ backgroundColor: v.colorHex || '#5A1827' }}
                      title={v.colorName}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Saree Details, Specs Table, Delivery Check & Actions */}
            <div className="md:col-span-6 space-y-4">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase font-bold text-gold-700 bg-gold/15 px-2 py-0.5 rounded font-mono">
                    {product.sku}
                  </span>
                  <span className="text-xs uppercase font-bold text-maroon font-serif">
                    {product.stockName}
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon leading-tight">
                  {product.title}
                </h2>

                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-emerald-trust font-semibold">
                    ✓ 100% Handloom Silk Mark Verified
                  </span>
                </div>
              </div>

              {/* Honest Price Box */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E8DEC8] space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-maroon">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-emerald-trust bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-emerald-600" />
                    Extra ₹100 Off on UPI
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-muted">
                  Inclusive of all taxes • <strong>Free Pan-India Delivery</strong>
                </p>
              </div>

              {/* Central Specifications Table */}
              <div className="border border-[#E8DEC8] rounded-xl overflow-hidden bg-white text-xs">
                <div className="bg-[#FAF6F0] px-3.5 py-1.5 font-serif font-bold text-maroon border-b border-[#E8DEC8]">
                  Saree Craft & Measurement Specifications
                </div>
                <div className="divide-y divide-[#F5EFEB]">
                  <div className="grid grid-cols-2 px-3.5 py-1.5">
                    <span className="text-charcoal-muted">Fabric Quality</span>
                    <span className="font-semibold text-charcoal">{product.fabric}</span>
                  </div>
                  <div className="grid grid-cols-2 px-3.5 py-1.5">
                    <span className="text-charcoal-muted">Work / Technique</span>
                    <span className="font-semibold text-charcoal">{product.workType}</span>
                  </div>
                  <div className="grid grid-cols-2 px-3.5 py-1.5">
                    <span className="text-charcoal-muted">Saree Length</span>
                    <span className="font-semibold text-charcoal">{product.sareeLength || "5.50 Meters"}</span>
                  </div>
                  <div className="grid grid-cols-2 px-3.5 py-1.5">
                    <span className="text-charcoal-muted">Blouse Piece</span>
                    <span className="font-semibold text-charcoal">{product.blouseLength || "0.80 Meters Unstitched"}</span>
                  </div>
                  <div className="grid grid-cols-2 px-3.5 py-1.5">
                    <span className="text-charcoal-muted">Care Instructions</span>
                    <span className="font-semibold text-charcoal">{product.care || "Dry Clean Only"}</span>
                  </div>
                </div>
              </div>

              {/* Pincode Delivery Check Simulator */}
              <div className="p-3 bg-white rounded-xl border border-[#E8DEC8] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-charcoal">
                  <MapPin className="w-3.5 h-3.5 text-maroon" />
                  <span>Check Delivery & Cash on Delivery (COD)</span>
                </div>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-[#FAF6F0] border border-[#E8DEC8] rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-maroon text-ivory text-xs font-bold rounded-lg hover:bg-maroon-800 transition"
                  >
                    Check
                  </button>
                </form>

                {deliveryStatus && (
                  <div
                    className={`text-xs p-2 rounded-lg flex items-start gap-1.5 ${
                      deliveryStatus.success
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {deliveryStatus.success ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-rose-600 mt-0.5 shrink-0" />
                    )}
                    <span>{deliveryStatus.message}</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-charcoal">Quantity:</span>
                  <div className="flex items-center border border-[#E8DEC8] rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 hover:bg-[#FAF6F0] text-charcoal"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-charcoal">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 hover:bg-[#FAF6F0] text-charcoal"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="py-3 px-4 bg-maroon text-ivory rounded-xl font-serif font-bold text-sm hover:bg-maroon-800 active:scale-95 transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-gold" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  <a
                    href={generateWhatsAppOrderLink(product, currentVariant, { paymentMethod: 'Prepaid UPI (Save ₹100)' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-emerald-600 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-emerald-700 active:scale-95 transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Guarantees strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-charcoal-muted">
                <div className="p-2 bg-white rounded-lg border border-[#E8DEC8]">
                  <ShieldCheck className="w-4 h-4 text-emerald-trust mx-auto mb-1" />
                  <span>100% Genuine Handloom</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#E8DEC8]">
                  <Truck className="w-4 h-4 text-maroon mx-auto mb-1" />
                  <span>Free Pan-India Delivery</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#E8DEC8]">
                  <RefreshCw className="w-4 h-4 text-gold-600 mx-auto mb-1" />
                  <span>360° Unboxing Video Exchange</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
