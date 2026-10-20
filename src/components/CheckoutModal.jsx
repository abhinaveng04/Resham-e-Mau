import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  MessageCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    grandTotal,
    clearCart,
    storeConfig,
    appliedCoupon,
    shippingFee
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: '',
    paymentMethod: 'cod' // 'cod' | 'upi'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderId = `RM-${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    setIsSubmitted(true);
    clearCart();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsCheckoutOpen(false);
  };

  const generateWhatsAppConfirmationLink = () => {
    const text = `Namaste Resham-e-Mau! 🙏\n\nI just placed order *#${orderId}* on your website.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n*Payment Method:* ${formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'UPI'}\n*Total Amount:* ₹${grandTotal.toLocaleString('en-IN')}\n\nPlease share dispatch updates. Thank you!`;
    return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#E8DEC8] overflow-hidden z-10 my-auto">
        
        {/* Header */}
        <div className="p-4 bg-maroon text-ivory flex items-center justify-between border-b border-gold/30">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold tracking-wide">
              {isSubmitted ? 'Order Confirmed!' : 'Express Checkout'}
            </h3>
          </div>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-maroon-800 transition">
            <X className="w-5 h-5 text-ivory" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[82vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 mx-auto flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-serif font-bold text-gold-700 uppercase tracking-widest block">
                  Mau Handloom Order Placed
                </span>
                <h3 className="text-2xl font-serif font-bold text-maroon mt-1">
                  Dhanyavaad, {formData.name}!
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Order ID: <strong className="text-charcoal font-mono">{orderId}</strong>
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#E8DEC8] text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#F5EFEB] pb-1.5">
                  <span className="text-charcoal-muted">Delivery Address:</span>
                  <span className="font-medium text-charcoal text-right max-w-xs">
                    {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#F5EFEB] pb-1.5">
                  <span className="text-charcoal-muted">Payment:</span>
                  <span className="font-bold text-charcoal">
                    {formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'UPI / Online'}
                  </span>
                </div>
                <div className="flex justify-between font-serif font-bold text-sm text-maroon pt-1">
                  <span>Total Payable:</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={generateWhatsAppConfirmationLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Receive Live Tracking on WhatsApp</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 bg-maroon text-ivory rounded-xl text-xs font-serif font-bold hover:bg-maroon-800 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Order total teaser */}
              <div className="p-3 bg-white rounded-xl border border-[#E8DEC8] flex items-center justify-between text-xs">
                <div>
                  <span className="text-charcoal-muted block">Total Payable:</span>
                  <span className="text-lg font-serif font-bold text-maroon">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right text-[11px] text-emerald-trust font-medium">
                  <span>✓ Free Delivery</span>
                  {appliedCoupon && <span className="block text-gold-700 font-bold">{appliedCoupon.code} applied</span>}
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  1. Shipping Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-charcoal-muted font-medium block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-charcoal-muted font-medium block mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-charcoal-muted font-medium block mb-1">
                    Street Address / Flat / Landmark *
                  </label>
                  <textarea
                    required
                    rows={2}
                    name="address"
                    placeholder="House no., apartment, street, landmark"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-charcoal-muted font-medium block mb-1">
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      name="city"
                      placeholder="e.g. Lucknow"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-charcoal-muted font-medium block mb-1">
                      State *
                    </label>
                    <input
                      required
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-charcoal-muted font-medium block mb-1">
                      Pincode *
                    </label>
                    <input
                      required
                      type="text"
                      name="pincode"
                      maxLength={6}
                      placeholder="6 digits"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E8DEC8] rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
                <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  2. Choose Payment Method
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                      formData.paymentMethod === 'cod'
                        ? 'border-maroon bg-maroon-50 text-maroon font-bold ring-1 ring-maroon'
                        : 'border-[#E8DEC8] bg-white text-charcoal'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="accent-maroon"
                    />
                    <div className="flex items-center gap-1.5 text-xs">
                      <Banknote className="w-4 h-4 text-emerald-700" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition ${
                      formData.paymentMethod === 'upi'
                        ? 'border-maroon bg-maroon-50 text-maroon font-bold ring-1 ring-maroon'
                        : 'border-[#E8DEC8] bg-white text-charcoal'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="accent-maroon"
                    />
                    <div className="flex items-center gap-1.5 text-xs">
                      <CreditCard className="w-4 h-4 text-maroon" />
                      <span>UPI / Net Banking</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-maroon hover:bg-maroon-800 text-ivory rounded-xl font-serif font-bold text-sm tracking-wide shadow-lg active:scale-98 transition flex items-center justify-center gap-2"
              >
                <span>Confirm Order (₹{grandTotal.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

              <div className="text-center text-[10px] text-charcoal-muted">
                By placing this order, you support generational handloom artisans of Mau, UP.
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
