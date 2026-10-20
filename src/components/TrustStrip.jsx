import React from 'react';
import { Truck, Banknote, ShieldCheck, RefreshCw } from 'lucide-react';

export default function TrustStrip() {
  const trustItems = [
    {
      id: 1,
      icon: <Truck className="w-5 h-5 text-maroon" />,
      title: "Free Shipping in India",
      sub: "On orders above ₹1,999"
    },
    {
      id: 2,
      icon: <Banknote className="w-5 h-5 text-emerald-trust" />,
      title: "COD & UPI Available",
      sub: "Extra ₹100 Off on UPI"
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-5 h-5 text-gold-600" />,
      title: "Assured Fabric Quality",
      sub: "100% Silk Mark certified"
    },
    {
      id: 4,
      icon: <RefreshCw className="w-5 h-5 text-charcoal" />,
      title: "Easy Exchange",
      sub: "7-day doorstep replacement"
    }
  ];

  return (
    <section className="bg-[#FAF6F0] border-b border-[#E8DEC8] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white border border-[#E8DEC8] shadow-xs flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 hover:border-gold transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#E8DEC8] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-maroon leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-charcoal-muted mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
