import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const categories = [
  {
    id: 'mau-specials',
    title: 'Mau Specials',
    badge: 'Heritage',
    route: '/collections/mau-katan-silk',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
    highlight: true
  },
  {
    id: 'bestsellers',
    title: 'Best Sellers',
    badge: 'Trending',
    route: '/collections/bestsellers',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    badge: 'Fresh Drop',
    route: '/collections/new-arrivals',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'wedding-edit',
    title: 'Wedding Edit',
    badge: 'Bridal',
    route: '/collections/wedding',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'under-1999',
    title: 'Under ₹1999',
    badge: 'Steal Deal',
    route: '/collections/under-1999',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
    highlight: true
  },
  {
    id: 'haldi-special',
    title: 'Haldi Edit',
    badge: 'Festive',
    route: '/collections/haldi',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'all-sarees',
    title: 'All Sarees',
    badge: 'Full Catalog',
    route: '/collections/all',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80'
  }
];

export default function CircularCategories() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (route) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-6 sm:py-8 bg-[#FAF6F0] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-maroon flex items-center gap-1.5">
              <span>Curated Quick Collections</span>
              <Sparkles className="w-4 h-4 text-gold" />
            </h2>
            <p className="text-[11px] text-charcoal-muted">
              Tap any category circle to explore authentic handloom weaves
            </p>
          </div>
          <button
            onClick={() => handleCategoryClick('/collections/all')}
            className="text-xs font-semibold text-gold-700 hover:text-maroon transition"
          >
            View All →
          </button>
        </div>

        {/* Circular Categories Scrollable Rail */}
        <div className="overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-4 sm:gap-6 min-w-max">
            {categories.map((cat) => {
              const isCurrent = location.pathname === cat.route;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.route)}
                  className="group flex flex-col items-center snap-start text-center focus:outline-none min-h-[44px]"
                >
                  {/* Ornate Circular Thumbnail Frame */}
                  <div className="relative">
                    {/* Golden decorative outer ring */}
                    <div
                      className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full p-[2.5px] transition-all duration-300 ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-maroon via-gold to-maroon shadow-gold-glow scale-105'
                          : cat.highlight
                          ? 'bg-gradient-to-tr from-gold to-maroon-700 hover:scale-105'
                          : 'bg-[#E8DEC8] group-hover:bg-gold hover:scale-105'
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1.5px]">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Small Badge */}
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-xs ${
                        cat.highlight
                          ? 'bg-maroon text-ivory border border-gold/40'
                          : 'bg-gold-500 text-maroon-900 border border-gold-300'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <span
                    className={`mt-2.5 text-xs font-serif font-bold tracking-tight transition-colors ${
                      isCurrent ? 'text-maroon underline underline-offset-4' : 'text-charcoal group-hover:text-maroon'
                    }`}
                  >
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
