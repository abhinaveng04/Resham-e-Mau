import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  Banknote, 
  ArrowRight
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartItemCount,
    cartSubtotal,
    upiDiscount,
    grandTotal,
    updateQuantity,
    removeFromCart,
    checkoutDetails,
    setCheckoutDetails,
    generateWhatsAppOrderLink,
    storeConfig
  } = useStore();

  if (!isCartOpen) return null;

  const handleDetailChange = (field, value) => {
    setCheckoutDetails((prev) => ({ ...prev, [field]: value }));
  };

  const whatsappCheckoutUrl = generateWhatsAppOrderLink();

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF6F0] h-full flex flex-col shadow-2xl z-50 overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 bg-maroon text-ivory flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-lg font-bold tracking-wide">
              Your Saree Bag
            </h3>
            <span className="bg-gold text-maroon-900 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {cartItemCount} {cartItemCount === 1 ? 'saree' : 'sarees'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full hover:bg-maroon-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center text-ivory"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Strip */}
        <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-semibold">Free Pan-India Delivery on all handloom orders</span>
        </div>

        {/* Cart Item List & Customer Form */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-maroon-50 border border-maroon/20 mx-auto flex items-center justify-center text-maroon">
                <ShoppingBag className="w-8 h-8 text-maroon" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-charcoal">
                  Your bag is empty
                </h4>
                <p className="text-xs text-charcoal-muted mt-1 max-w-xs mx-auto">
                  Explore our authentic handloom Katan silk, Satin, and Organza treasures from Mau.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="min-h-[44px] px-6 py-2.5 bg-maroon text-ivory text-xs font-serif font-bold rounded-full hover:bg-maroon-800 transition shadow-sm"
              >
                Explore Sarees
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Product Items */}
              <div className="divide-y divide-[#E8DEC8] space-y-3">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="pt-3 first:pt-0 space-y-2">
                    <div className="flex gap-3">
                      <img
                        src={item.image || '/products/Elegant Cream and Red Banarasi Saree.png'}
                        alt={item.title}
                        className="w-18 h-24 sm:w-20 sm:h-26 object-cover rounded-xl border border-[#E8DEC8] shadow-2xs shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-serif font-bold text-charcoal truncate">
                              {item.title}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-charcoal-light hover:text-maroon p-1 -mr-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-maroon font-semibold font-serif">
                            {item.sku} • {item.stockName}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/20"
                              style={{ backgroundColor: item.selectedColorHex || '#5A1827' }}
                            />
                            <span className="text-[11px] text-charcoal-muted font-medium">
                              Color: {item.selectedColor}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          {/* Price */}
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-bold text-maroon font-serif">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center border border-[#E8DEC8] rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="px-2 py-1 hover:bg-[#FAF6F0] text-charcoal min-h-[32px] min-w-[32px] flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                              className="px-2 py-1 hover:bg-[#FAF6F0] text-charcoal min-h-[32px] min-w-[32px] flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Delivery Details for WhatsApp Order */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E8DEC8] space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-maroon uppercase tracking-wider font-serif">
                    Delivery Details for WhatsApp
                  </h4>
                  <span className="text-[10px] text-charcoal-light">For Quick Dispatch</span>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Full Name (e.g. Priya Sharma)"
                    value={checkoutDetails.name}
                    onChange={(e) => handleDetailChange('name', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />

                  <input
                    type="text"
                    placeholder="Delivery Address (House/Flat, Street, City)"
                    value={checkoutDetails.address}
                    onChange={(e) => handleDetailChange('address', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />

                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Delivery Pincode (6 digits)"
                    value={checkoutDetails.pincode}
                    onChange={(e) => handleDetailChange('pincode', e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Payment Preference Selector */}
                <div className="pt-2 border-t border-[#F5EFEB]">
                  <span className="text-[11px] font-bold text-charcoal block mb-1.5 font-serif">
                    Select Payment Preference:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleDetailChange('paymentMethod', 'upi')}
                      className={`p-2.5 rounded-lg border text-left flex items-start gap-1.5 transition ${
                        checkoutDetails.paymentMethod === 'upi'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600'
                          : 'border-[#E8DEC8] bg-[#FAF6F0] text-charcoal'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs block leading-tight font-serif font-bold">Prepaid UPI (Extra ₹100 Off)</span>
                        <span className="text-[10px] text-emerald-700 font-medium">Automatic ₹100 discount applied</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDetailChange('paymentMethod', 'cod')}
                      className={`p-2.5 rounded-lg border text-left flex items-start gap-1.5 transition ${
                        checkoutDetails.paymentMethod === 'cod'
                          ? 'border-maroon bg-maroon-50 text-maroon font-bold ring-1 ring-maroon'
                          : 'border-[#E8DEC8] bg-[#FAF6F0] text-charcoal'
                      }`}
                    >
                      <Banknote className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs block leading-tight font-serif font-bold">Cash on Delivery (COD)</span>
                        <span className="text-[10px] text-charcoal-muted font-medium">Pay cash at doorstep</span>
                      </div>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Footer / Summary / WhatsApp Checkout */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E8DEC8] space-y-3">
            
            {/* Bill Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-charcoal-muted">
                <span>Bag Total ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {upiDiscount > 0 && (
                <div className="flex justify-between text-emerald-trust font-bold">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                    Instant UPI Prepaid Discount
                  </span>
                  <span>-₹{upiDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-charcoal-muted">
                <span>Pan-India Delivery</span>
                <span className="text-emerald-trust font-bold">FREE</span>
              </div>

              <div className="flex justify-between text-base font-bold text-maroon pt-1.5 border-t border-[#E8DEC8] font-serif">
                <span>Final Total Payable</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* High-Contrast Button: "Place Order on WhatsApp" */}
            <div className="space-y-2 pt-1">
              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-98 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  Place Order on WhatsApp {upiDiscount > 0 ? '(Save ₹100 on UPI)' : ''}
                </span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </a>

              <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal-light">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pre-filled with Saree links, SKUs, and Delivery details</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
