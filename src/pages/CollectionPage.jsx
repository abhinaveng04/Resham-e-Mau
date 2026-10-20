import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { usePageSEO } from '../utils/seo';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  X, 
  RotateCcw, 
  Home, 
  ChevronRight,
  Zap
} from 'lucide-react';

export default function CollectionPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const {
    products,
    storeConfig,
    setIsFilterDrawerOpen
  } = useStore();

  // Local filter states for this collection view
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedPriceMax, setSelectedPriceMax] = useState(null);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high'

  // Sync category param into filter states on route change
  useEffect(() => {
    setSelectedFabric('');
    setSelectedPriceMax(null);

    if (!category || category === 'all') {
      return;
    }

    if (category === 'katan-silk') {
      setSelectedFabric('Pure Katan Silk');
    } else if (category === 'soft-silk') {
      setSelectedFabric('Soft Silk');
    } else if (category === 'organza') {
      setSelectedFabric('Organza Silk');
    } else if (category === 'satin') {
      setSelectedFabric('Satin Silk');
    } else if (category === 'linen') {
      setSelectedFabric('Pure Linen');
    } else if (category === 'under-2000') {
      setSelectedPriceMax(2000);
    } else if (category === 'under-2500') {
      setSelectedPriceMax(2500);
    }
  }, [category]);

  // Collection Title & Description
  const collectionInfo = useMemo(() => {
    switch (category) {
      case 'katan-silk':
        return {
          title: "Mau Handloom Katan Silk Sarees",
          subtitle: "Historic pit-loom weaves handcrafted by master weavers in Maunath Bhanjan, UP with fine zari."
        };
      case 'soft-silk':
        return {
          title: "Soft Silk & Brocade Sarees",
          subtitle: "Delicate and butter-soft pure silk drapes woven with subtle metallic zari for timeless elegance."
        };
      case 'organza':
        return {
          title: "Organza & Sheer Silk Sarees",
          subtitle: "Featherlight translucent organza silks crafted with radiant handloom floral motifs."
        };
      case 'under-2000':
        return {
          title: "Handloom Sarees Under ₹2,000",
          subtitle: "Direct loom-to-wardrobe treasures offering authentic handloom artistry at accessible prices."
        };
      default:
        return {
          title: "The Handloom Silk Collection",
          subtitle: "Authentic pure Katan, Satin, Organza, and Linen handloom sarees direct from Mau weaver workshops."
        };
    }
  }, [category]);

  // Dynamic SEO for Collection Page
  usePageSEO(
    `${collectionInfo.title} | Resham-e-Mau`,
    `${collectionInfo.subtitle} Pure handloom silk weaves direct from Maunath Bhanjan artisan workshops with free Pan-India delivery.`
  );

  // Unique fabrics for filter buttons
  const availableFabrics = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.fabric) set.add(p.fabric);
    });
    return Array.from(set);
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedFabric && (p.fabric || '').toLowerCase() !== selectedFabric.toLowerCase()) {
          return false;
        }
        if (selectedPriceMax && p.price > selectedPriceMax) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return a.id - b.id;
      });
  }, [
    products,
    selectedFabric,
    selectedPriceMax,
    sortBy
  ]);

  const activeCount = (selectedFabric ? 1 : 0) + (selectedPriceMax ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedFabric('');
    setSelectedPriceMax(null);
    setSortBy('featured');
    navigate('/collections/all');
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen pb-16">
      
      {/* 1. Breadcrumbs & Collection Editorial Header */}
      <div className="border-b border-[#E8DEC8] bg-white/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          {/* Breadcrumb Nav */}
          <nav className="flex items-center gap-1.5 text-xs text-charcoal-muted font-medium">
            <Link to="/" className="hover:text-maroon flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
            <Link to="/collections/all" className="hover:text-maroon">
              Collections
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-charcoal-light" />
            <span className="text-maroon font-serif font-semibold truncate max-w-[200px] sm:max-w-none">
              {collectionInfo.title}
            </span>
          </nav>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-maroon">
                {collectionInfo.title}
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-2xl font-sans">
                {collectionInfo.subtitle}
              </p>
            </div>

            {/* Live product count badge */}
            <div className="bg-[#FAF6F0] border border-gold/40 px-3.5 py-1.5 rounded-full self-start md:self-auto text-xs font-serif font-bold text-maroon shadow-xs shrink-0">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Saree' : 'Sarees'}
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Filter Pills & Sort Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DEC8]">
          
          {/* Fabric Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedFabric('')}
              className={`px-3 py-1.5 rounded-full text-xs font-serif font-semibold transition ${
                !selectedFabric
                  ? 'bg-maroon text-ivory shadow-xs'
                  : 'bg-white border border-[#E8DEC8] text-charcoal hover:border-gold'
              }`}
            >
              All Fabrics
            </button>
            {availableFabrics.map((fabric) => (
              <button
                key={fabric}
                onClick={() => setSelectedFabric(selectedFabric === fabric ? '' : fabric)}
                className={`px-3 py-1.5 rounded-full text-xs font-serif font-semibold transition ${
                  selectedFabric === fabric
                    ? 'bg-maroon text-ivory shadow-xs'
                    : 'bg-white border border-[#E8DEC8] text-charcoal hover:border-gold'
                }`}
              >
                {fabric}
              </button>
            ))}

            {activeCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-bold text-maroon hover:underline flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <span className="text-xs text-charcoal-muted font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#E8DEC8] rounded-xl px-3 py-1.5 pr-8 text-xs font-medium text-charcoal focus:outline-none focus:border-gold shadow-2xs cursor-pointer"
              >
                <option value="featured">Featured Weaves</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-charcoal-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* 3. Saree Products Grid */}
        <div className="pt-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DEC8] p-8 space-y-4">
              <p className="font-serif text-lg font-bold text-maroon">
                No sarees found matching selected filters
              </p>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2.5 bg-maroon text-ivory text-xs font-bold rounded-xl hover:bg-maroon-800 transition shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
