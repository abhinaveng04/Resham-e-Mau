import React, { useState } from 'react';
import { Star, ShieldCheck, ChevronDown, MessageCircle, Heart, Quote } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function TrustAndReviewsSection() {
  const { storeConfig } = useStore();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Ananya Srivastava",
      city: "Lucknow, UP",
      saree: "Shahi Nazakat Mau Handloom Katan Silk",
      rating: 5,
      date: "Verified Buyer • 4 days ago",
      comment: "I was searching for authentic Mau Katan silk for my daughter's wedding trousseau. The zari work is exceptionally fine—it doesn't scratch or feel synthetic at all. Knowing it directly came from Mau weavers made it all the more sacred."
    },
    {
      id: 2,
      name: "Meenakshi Iyer",
      city: "Bengaluru, Karnataka",
      saree: "Sindoori Dulhan Banarasi Kadwa Silk",
      rating: 5,
      date: "Verified Buyer • 1 week ago",
      comment: "The fall and lustre of this pure silk drape are unmatched. Arrived in Bengaluru within 3 days via express shipping. The blouse piece has ample fabric with rich zari borders. Will definitely order again!"
    },
    {
      id: 3,
      name: "Dr. Rohini Verma",
      city: "New Delhi",
      saree: "Chandrakala Kora Organza Silk Saree",
      rating: 5,
      date: "Verified Buyer • 2 weeks ago",
      comment: "The cutwork scalloped borders on the organza are so delicate! Everyone at our Diwali gala inquired where I found this masterpiece. Kudos to the weavers of Resham-e-Mau."
    }
  ];

  const faqs = [
    {
      question: "Does each saree come with an unstitched blouse piece?",
      answer: "Yes, absolutely! Every Resham-e-Mau saree includes an attached 0.80-meter running unstitched blouse piece woven in matching or contrasting pure silk with elaborate jacquard zari borders."
    },
    {
      question: "How do I verify the authenticity of the Mau handloom and silk?",
      answer: "All our sarees carry the official Handloom & Silk Mark certification labels. We source directly from registered master weaver clusters in Maunath Bhanjan, Uttar Pradesh. Each package includes an authenticity guarantee card."
    },
    {
      question: "Is Cash on Delivery (COD) available for my pincode?",
      answer: "Yes, Cash on Delivery is available across 26,000+ PIN codes in India. You can test your exact PIN code using the delivery checker on any saree page."
    },
    {
      question: "How long does Pan-India delivery take?",
      answer: "Orders are dispatched within 24 hours from our Mau artisan centre. Deliveries across Uttar Pradesh & Delhi NCR typically take 2-3 business days, and metro/pan-India deliveries take 3-5 business days."
    },
    {
      question: "Can I customize blouse stitching, fall, or pico before dispatch?",
      answer: "Yes! Simply click the 'WhatsApp Help' or 'Weaver Concierge' button after placing your order or message our master tailor team at +91 98765 43210. We will gladly coordinate fall, edging, and pico services."
    },
    {
      question: "What is your return or exchange policy?",
      answer: "We offer a 7-day hassle-free return and exchange guarantee. If you are not completely enchanted by your saree, our courier partner will pick it up from your doorstep at zero extra cost."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF6F0] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Social Proof Reviews Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
            ))}
            <span className="text-xs font-bold text-charcoal ml-1.5">4.9 / 5 Overall Rating</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon">
            Cherished by Saree Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1 font-sans">
            Stories of celebrations draped in the pure heritage weaves of Mau, UP.
          </p>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E8DEC8] shadow-card hover:shadow-luxury transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-trust font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-charcoal leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5EFEB] mt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-serif font-bold text-maroon">{rev.name}</h4>
                  <p className="text-[10px] text-charcoal-muted">{rev.city}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gold-700 bg-gold/15 px-2 py-0.5 rounded font-semibold block truncate max-w-[140px]">
                    {rev.saree}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-[#E8DEC8]">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-charcoal-muted mt-1">
              Everything you need to know about purchasing authentic Mau handloom sarees.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#E8DEC8] overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF6F0] transition"
                  >
                    <span className="text-xs sm:text-sm font-serif font-bold text-charcoal">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-maroon' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-charcoal-muted leading-relaxed border-t border-[#F5EFEB]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need help banner */}
          <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-left">
              <span className="font-bold text-emerald-900 block font-serif text-sm">
                Have questions regarding drape, color, or blouse customisation?
              </span>
              <span className="text-emerald-700">
                Our Mau Handloom Master Weavers are available 7 days a week on WhatsApp.
              </span>
            </div>
            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Namaste Resham-e-Mau, I have a question regarding saree weaving & customisation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1.5 shrink-0 shadow-xs hover:bg-emerald-800 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
