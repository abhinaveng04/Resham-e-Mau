import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Sparkles, 
  Home, 
  ChevronRight, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { usePageSEO } from '../utils/seo';

export default function ContactPage() {
  const { storeConfig, showToast } = useStore();

  usePageSEO(
    'Contact Us & Artisan Studio | Resham-e-Mau',
    'Connect with Resham-e-Mau handloom silk consultants. Studio: Steller Jeevan, Greater Noida (W) - 201318. WhatsApp & Phone: +91 96438 25049. Email: resham.e.mau@gmail.com.'
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Bridal Saree Consultation',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const phone = storeConfig.whatsappNumber || '919876543210';
    const text = `Namaste Resham-e-Mau! 🙏\n\n*Name:* ${formData.name || 'Saree Patron'}\n*Phone:* ${formData.phone || 'N/A'}\n*Email:* ${formData.email || 'N/A'}\n*Inquiry:* ${formData.subject}\n*Message:* ${formData.message || 'I would like to inquire about your Mau Handloom sarees.'}\n\nPlease guide me. Thank you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received! Our Mau weaver team will reach out.');
  };

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
            <span className="text-maroon font-semibold">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center space-y-2">
        <span className="text-xs font-serif font-bold text-gold-700 uppercase tracking-widest block">
          Weaver Concierge & Support
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon">
          Connect with Resham-e-Mau
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto font-sans">
          Have questions regarding pure silk weaves, custom fall & pico, bridal trousseau orders, or dispatch tracking? Our artisan team is here to assist.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Contact Cards & Business Hours */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary WhatsApp Chat Card (Hero Action) */}
            <div className="p-6 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl border border-emerald-600/30 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-emerald-700 flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">
                    Instant WhatsApp Concierge
                  </h3>
                  <span className="text-xs text-emerald-200">
                    Average response in under 15 minutes
                  </span>
                </div>
              </div>

              <p className="text-xs text-emerald-100/90 leading-relaxed font-sans">
                Chat directly with our master handloom consultants for live video calls of saree drapes, fabric close-ups, and instant order placement.
              </p>

              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Namaste Resham-e-Mau! 🙏 I would like to consult with a saree specialist.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-3 px-4 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Start WhatsApp Conversation</span>
              </a>
            </div>

            {/* Business Hours Card */}
            <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] shadow-card flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-sm text-maroon">
                  Business & Support Hours
                </h4>
                <div className="text-xs text-charcoal">
                  <strong>Monday – Saturday:</strong> 11:00 AM – 8:00 PM IST
                </div>
                <div className="text-[11px] text-charcoal-muted">
                  Sunday: Closed (Emergency dispatch queries monitored via WhatsApp)
                </div>
              </div>
            </div>

            {/* Phone & Email Card */}
            <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] shadow-card space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-maroon-100 text-maroon flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-charcoal-muted block text-[11px]">Phone Support</span>
                  <a href={`tel:${storeConfig.supportPhone}`} className="font-bold text-maroon hover:underline">
                    {storeConfig.supportPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#F5EFEB]">
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-charcoal-muted block text-[11px]">Email Inquiries</span>
                  <a href={`mailto:${storeConfig.supportEmail}`} className="font-bold text-maroon hover:underline">
                    {storeConfig.supportEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Registered Artisan Studio Address */}
            <div className="p-5 bg-white rounded-2xl border border-[#E8DEC8] shadow-card flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-maroon-100 text-maroon flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-serif font-bold text-sm text-maroon">
                  Official Brand Office Address
                </h4>
                <p className="text-charcoal-muted leading-relaxed font-sans">
                  Resham-e-Mau,<br />
                  Steller Jeevan, Greater Noida (W) - 201318,<br />
                  Uttar Pradesh, India.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DEC8] shadow-card">
            
            <div className="mb-6 space-y-1">
              <span className="text-xs font-serif font-bold text-gold-700 uppercase tracking-widest block">
                Direct Communication
              </span>
              <h3 className="font-serif text-2xl font-bold text-maroon">
                Send Us a Message
              </h3>
              <p className="text-xs text-charcoal-muted font-sans">
                Fill out the details below and submit online or transmit directly to our WhatsApp support team.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-maroon">
                  Dhanyavaad! We Received Your Message.
                </h4>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                  Our Mau silk weaving coordinator will reach out to you within our operating hours (11:00 AM – 8:00 PM IST).
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-serif font-bold text-maroon hover:underline"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-charcoal block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-charcoal block mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-charcoal block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="yourname@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-charcoal block mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    >
                      <option value="Bridal Saree Consultation">Bridal Saree Consultation</option>
                      <option value="Order Tracking & Dispatch">Order Tracking & Dispatch</option>
                      <option value="Custom Fall, Pico & Blouse">Custom Fall, Pico & Blouse Stitching</option>
                      <option value="Bulk / Wedding Trousseau Order">Bulk / Wedding Trousseau Order</option>
                      <option value="Return / Exchange Query">Return / Exchange Query</option>
                      <option value="General Inquiry">General Handloom Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-charcoal block mb-1">
                    Your Message / Saree Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    placeholder="Tell us about the weave, occasion, color preference, or questions you have..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl p-3 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Dual Submit Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="min-h-[44px] py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    type="submit"
                    className="min-h-[44px] py-3 px-4 bg-maroon hover:bg-maroon-800 text-ivory rounded-xl text-xs font-serif font-bold tracking-wide flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                  >
                    <Send className="w-4 h-4 text-gold" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
