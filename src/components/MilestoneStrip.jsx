import React from 'react';
import { Award, Users, MapPin, CheckCircle } from 'lucide-react';

export default function MilestoneStrip() {
  const milestones = [
    {
      id: 1,
      icon: <Award className="w-5 h-5 text-gold-600" />,
      title: "100% Authentic Looms",
      desc: "Traditional wooden pit-looms"
    },
    {
      id: 2,
      icon: <Users className="w-5 h-5 text-maroon" />,
      title: "Direct From Mau Weavers",
      desc: "Zero middleman markups"
    },
    {
      id: 3,
      icon: <MapPin className="w-5 h-5 text-emerald-trust" />,
      title: "15,000+ Pincodes Served",
      desc: "Pan-India express dispatch"
    },
    {
      id: 4,
      icon: <CheckCircle className="w-5 h-5 text-gold-600" />,
      title: "3-Step Quality Check",
      desc: "Silk Mark & zari certified"
    }
  ];

  return (
    <section className="bg-white border-y border-[#E8DEC8] py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DEC8]">
          {milestones.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3.5 pt-3 sm:pt-0 ${
                idx !== 0 ? 'sm:pl-6' : ''
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-[#FAF6F0] border border-gold/40 flex items-center justify-center shadow-xs shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="font-serif text-sm sm:text-base font-bold text-maroon truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-charcoal-muted truncate">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
