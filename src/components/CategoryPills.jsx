import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Flame, Check } from 'lucide-react';

export default function CategoryPills() {
  const {
    selectedWeave,
    setSelectedWeave,
    selectedPriceMax,
    setSelectedPriceMax,
    selectedOccasion,
    setSelectedOccasion,
    onlyBestsellers,
    setOnlyBestsellers,
    onlyNewArrivals,
    setOnlyNewArrivals,
    resetFilters
  } = useStore();

  const isAllActive =
    !selectedWeave &&
    !selectedPriceMax &&
    !selectedOccasion &&
    !onlyBestsellers &&
    !onlyNewArrivals;

  const quickPills = [
    {
      id: 'all',
      label: 'All Sarees',
      active: isAllActive,
      onClick: () => resetFilters()
    },
    {
      id: 'mau-katan',
      label: 'Mau Handloom Katan',
      active: selectedWeave === 'Mau Handloom Katan Silk',
      onClick: () => {
        resetFilters();
        setSelectedWeave(
          selectedWeave === 'Mau Handloom Katan Silk' ? '' : 'Mau Handloom Katan Silk'
        );
      },
      badge: 'Heritage'
    },
    {
      id: 'banarasi',
      label: 'Banarasi Kadwa',
      active: selectedWeave === 'Banarasi Silk',
      onClick: () => {
        resetFilters();
        setSelectedWeave(selectedWeave === 'Banarasi Silk' ? '' : 'Banarasi Silk');
      }
    },
    {
      id: 'bestsellers',
      label: 'Bestsellers',
      active: onlyBestsellers,
      icon: <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />,
      onClick: () => {
        resetFilters();
        setOnlyBestsellers(!onlyBestsellers);
      }
    },
    {
      id: 'under-1999',
      label: 'Under ₹1,999',
      active: selectedPriceMax === 1999,
      onClick: () => {
        resetFilters();
        setSelectedPriceMax(selectedPriceMax === 1999 ? null : 1999);
      },
      badge: 'Steal Deal'
    },
    {
      id: 'wedding',
      label: 'Wedding & Bridal',
      active: selectedOccasion === 'Wedding',
      onClick: () => {
        resetFilters();
        setSelectedOccasion(selectedOccasion === 'Wedding' ? '' : 'Wedding');
      }
    },
    {
      id: 'haldi',
      label: 'Haldi Special',
      active: selectedOccasion === 'Haldi',
      onClick: () => {
        resetFilters();
        setSelectedOccasion(selectedOccasion === 'Haldi' ? '' : 'Haldi');
      }
    },
    {
      id: 'organza',
      label: 'Organza & Tissue',
      active: selectedWeave === 'Organza Silk' || selectedWeave === 'Tissue Silk',
      onClick: () => {
        resetFilters();
        setSelectedWeave(selectedWeave === 'Organza Silk' ? '' : 'Organza Silk');
      }
    },
    {
      id: 'new-arrivals',
      label: 'New Weaves',
      active: onlyNewArrivals,
      icon: <Sparkles className="w-3.5 h-3.5 text-gold-600" />,
      onClick: () => {
        resetFilters();
        setOnlyNewArrivals(!onlyNewArrivals);
      }
    }
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-3 px-4 sm:px-0">
      <div className="flex items-center gap-2 min-w-max">
        {quickPills.map((pill) => (
          <button
            key={pill.id}
            onClick={pill.onClick}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pill.active
                ? 'bg-maroon text-ivory shadow-md scale-102 ring-1 ring-gold/40'
                : 'bg-white border border-[#E8DEC8] text-charcoal hover:border-gold hover:bg-[#FAF6F0]'
            }`}
          >
            {pill.active && <Check className="w-3 h-3 text-gold" />}
            {pill.icon}
            <span>{pill.label}</span>
            {pill.badge && (
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                  pill.active
                    ? 'bg-gold text-maroon-900'
                    : 'bg-gold-100 text-gold-700'
                }`}
              >
                {pill.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
