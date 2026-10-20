import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { usePageSEO } from '../utils/seo';
import { 
  Save, 
  Download, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Sparkles, 
  Image as ImageIcon, 
  Layers, 
  Sliders, 
  Globe, 
  MessageCircle, 
  Instagram, 
  Zap, 
  AlertCircle,
  Eye,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search
} from 'lucide-react';

export default function AdminPage() {
  const { catalog, setCatalog, saveCatalogToDisk, showToast } = useStore();

  usePageSEO(
    'Visual Admin Dashboard | Resham-e-Mau',
    'Internal visual inventory and catalog management system for Resham-e-Mau handloom sarees.'
  );

  // Active tab state: 'sarees' | 'banners_store' | 'publish'
  const [activeTab, setActiveTab] = useState('sarees');

  // Working copy of catalog to edit before saving to disk
  const [workingCatalog, setWorkingCatalog] = useState(() => JSON.parse(JSON.stringify(catalog)));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Available local images from /api/local-images
  const [availableProductImages, setAvailableProductImages] = useState([]);
  const [availableBannerImages, setAvailableBannerImages] = useState([]);

  // Search inside Sarees Tab
  const [sareeSearch, setSareeSearch] = useState('');
  const [editingSareeId, setEditingSareeId] = useState(null);

  // Modal / picker state for selecting images
  const [imagePickerTarget, setImagePickerTarget] = useState(null); // { type: 'variant', sareeIndex, variantIndex } or { type: 'banner', bannerIndex }

  // Sync workingCatalog if catalog changes from external
  useEffect(() => {
    // Fetch local images from vite server endpoint
    fetch('/api/local-images')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          setAvailableProductImages(data.products);
        }
        if (data.banners && Array.isArray(data.banners)) {
          setAvailableBannerImages(data.banners);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch local images list:', err);
      });
  }, []);

  // Update a field in storeConfig
  const handleConfigChange = (field, value) => {
    setWorkingCatalog((prev) => ({
      ...prev,
      storeConfig: {
        ...prev.storeConfig,
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Update a field in a Saree product
  const handleProductChange = (index, field, value) => {
    setWorkingCatalog((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value
      };
      return { ...prev, products: updatedProducts };
    });
    setHasUnsavedChanges(true);
  };

  // Add a new empty Saree SKU
  const handleAddNewSaree = () => {
    const nextNum = workingCatalog.products.length + 1;
    const skuCode = `REM-${String(nextNum).padStart(3, '0')}`;
    const newSaree = {
      id: Date.now(),
      sku: skuCode,
      stockName: `New Weave ${nextNum}`,
      title: `${skuCode} Handloom Saree`,
      slug: `rem-${String(nextNum).padStart(3, '0')}-new-weave`,
      price: 2450,
      fabric: "Pure Katan Silk",
      workType: "Zari Jacquard Weaving",
      description: "Authentic handloom saree woven on wooden pit-looms in Mau, Uttar Pradesh.",
      sareeLength: "5.50 Meters",
      blouseLength: "0.80 Meters Unstitched",
      weight: "600 Grams",
      care: "Dry Clean Only",
      inStock: true,
      variants: [
        {
          colorName: "Standard",
          colorHex: "#5A1827",
          inStock: true,
          images: [availableProductImages[0] || "/products/Elegant Cream and Red Banarasi Saree.png"]
        }
      ]
    };

    setWorkingCatalog((prev) => ({
      ...prev,
      products: [...prev.products, newSaree]
    }));
    setEditingSareeId(newSaree.id);
    setHasUnsavedChanges(true);
    showToast(`Added new Saree: ${skuCode}`);
  };

  // Delete a Saree
  const handleDeleteSaree = (id, sku) => {
    if (window.confirm(`Are you sure you want to delete saree ${sku}? This cannot be undone once saved.`)) {
      setWorkingCatalog((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.id !== id)
      }));
      setHasUnsavedChanges(true);
      showToast(`Removed Saree: ${sku}`, 'info');
    }
  };

  // Add Variant to a Saree
  const handleAddVariant = (sareeIndex) => {
    setWorkingCatalog((prev) => {
      const updatedProducts = [...prev.products];
      const targetSaree = { ...updatedProducts[sareeIndex] };
      const currentVars = targetSaree.variants || [];
      const newVar = {
        colorName: `Color ${currentVars.length + 1}`,
        colorHex: '#C59B27',
        inStock: true,
        images: [availableProductImages[0] || targetSaree.variants?.[0]?.images?.[0] || '/products/Elegant Cream and Red Banarasi Saree.png']
      };
      targetSaree.variants = [...currentVars, newVar];
      updatedProducts[sareeIndex] = targetSaree;
      return { ...prev, products: updatedProducts };
    });
    setHasUnsavedChanges(true);
  };

  // Delete Variant from a Saree
  const handleDeleteVariant = (sareeIndex, varIndex) => {
    setWorkingCatalog((prev) => {
      const updatedProducts = [...prev.products];
      const targetSaree = { ...updatedProducts[sareeIndex] };
      if (targetSaree.variants.length <= 1) {
        showToast('Each saree must have at least one color variant', 'error');
        return prev;
      }
      targetSaree.variants = targetSaree.variants.filter((_, idx) => idx !== varIndex);
      updatedProducts[sareeIndex] = targetSaree;
      return { ...prev, products: updatedProducts };
    });
    setHasUnsavedChanges(true);
  };

  // Update a variant field
  const handleVariantChange = (sareeIndex, varIndex, field, value) => {
    setWorkingCatalog((prev) => {
      const updatedProducts = [...prev.products];
      const targetSaree = { ...updatedProducts[sareeIndex] };
      const updatedVariants = [...targetSaree.variants];
      updatedVariants[varIndex] = {
        ...updatedVariants[varIndex],
        [field]: value
      };
      targetSaree.variants = updatedVariants;
      updatedProducts[sareeIndex] = targetSaree;
      return { ...prev, products: updatedProducts };
    });
    setHasUnsavedChanges(true);
  };

  // Update banner field
  const handleBannerChange = (bIndex, field, value) => {
    setWorkingCatalog((prev) => {
      const updatedBanners = [...(prev.storeConfig.banners || [])];
      updatedBanners[bIndex] = {
        ...updatedBanners[bIndex],
        [field]: value
      };
      return {
        ...prev,
        storeConfig: {
          ...prev.storeConfig,
          banners: updatedBanners
        }
      };
    });
    setHasUnsavedChanges(true);
  };

  // Add banner
  const handleAddBanner = () => {
    const newBanner = {
      id: Date.now(),
      image: availableBannerImages[0] || '/banner/banner1.png',
      title: 'New Heritage Collection',
      subtitle: 'Handwoven in Mau with generational artistry and genuine Silk Mark guarantee.',
      ctaText: 'Explore Catalog',
      ctaLink: '#catalog-grid'
    };
    setWorkingCatalog((prev) => ({
      ...prev,
      storeConfig: {
        ...prev.storeConfig,
        banners: [...(prev.storeConfig.banners || []), newBanner]
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Remove banner
  const handleRemoveBanner = (bIndex) => {
    setWorkingCatalog((prev) => {
      const updatedBanners = prev.storeConfig.banners.filter((_, i) => i !== bIndex);
      return {
        ...prev,
        storeConfig: {
          ...prev.storeConfig,
          banners: updatedBanners
        }
      };
    });
    setHasUnsavedChanges(true);
  };

  // Save to Disk via Vite Dev Server API
  const handleSaveToDisk = async () => {
    setIsSaving(true);
    const result = await saveCatalogToDisk(workingCatalog);
    setIsSaving(false);
    if (result.success) {
      setHasUnsavedChanges(false);
      setLastSavedTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  };

  // Download sarees.json as local file export
  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(workingCatalog, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sarees-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Downloaded backup sarees.json');
  };

  // Reset to original
  const handleReset = () => {
    if (window.confirm('Discard all unsaved changes and reload original catalog?')) {
      setWorkingCatalog(JSON.parse(JSON.stringify(catalog)));
      setHasUnsavedChanges(false);
      showToast('Changes reverted', 'info');
    }
  };

  // Filtered sarees list for search
  const filteredSarees = workingCatalog.products.filter((p) => {
    if (!sareeSearch.trim()) return true;
    const q = sareeSearch.toLowerCase();
    return (
      p.sku.toLowerCase().includes(q) ||
      (p.stockName || '').toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      (p.fabric || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#FAF6F0] min-h-screen pb-24 text-charcoal">
      
      {/* Admin Top Header */}
      <div className="bg-maroon text-ivory border-b border-gold/30 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="p-2 bg-maroon-800 rounded-xl border border-gold/40 text-gold">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-ivory">
                  Resham-e-Mau Visual Admin
                </h1>
                <span className="bg-gold text-maroon-900 text-[10px] font-bold px-2 py-0.5 rounded-full font-serif">
                  Live Editor
                </span>
              </div>
              <p className="text-[11px] text-ivory/80">
                Directly manage your 17 sarees, color variants, banners & store settings
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <span className="text-xs text-gold-300 font-bold flex items-center gap-1 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                Unsaved Changes
              </span>
            )}

            <button
              onClick={handleSaveToDisk}
              disabled={isSaving}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 active:scale-95 transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save to Website'}</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-ivory rounded-xl text-xs font-semibold flex items-center gap-1 border border-white/20 transition"
              title="Open storefront in new tab"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Store</span>
            </a>
          </div>

        </div>

        {/* 3 Tab Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex border-t border-maroon-800">
          <button
            onClick={() => setActiveTab('sarees')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'sarees'
                ? 'border-gold text-gold bg-maroon-800/60'
                : 'border-transparent text-ivory/70 hover:text-ivory'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Edit Sarees & Variants ({workingCatalog.products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners_store')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'banners_store'
                ? 'border-gold text-gold bg-maroon-800/60'
                : 'border-transparent text-ivory/70 hover:text-ivory'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>2. Banners & Store Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('publish')}
            className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'publish'
                ? 'border-gold text-gold bg-maroon-800/60'
                : 'border-transparent text-ivory/70 hover:text-ivory'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>3. Save & Publish</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: SAREES & VARIANTS MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'sarees' && (
          <div className="space-y-6">
            
            {/* Action Bar: Search & "+ Add New Saree SKU" */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by SKU, Stock Name, or Fabric..."
                  value={sareeSearch}
                  onChange={(e) => setSareeSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-charcoal-muted">
                  Showing <strong>{filteredSarees.length}</strong> of {workingCatalog.products.length} Sarees
                </span>
                <button
                  onClick={handleAddNewSaree}
                  className="px-4 py-2 bg-maroon hover:bg-maroon-800 text-ivory text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition active:scale-95"
                >
                  <Plus className="w-4 h-4 text-gold" />
                  <span>+ Add New Saree SKU</span>
                </button>
              </div>
            </div>

            {/* List of Sarees */}
            <div className="space-y-4">
              {filteredSarees.map((saree) => {
                const sareeIndex = workingCatalog.products.findIndex((p) => p.id === saree.id);
                const isExpanded = editingSareeId === saree.id;
                const totalVariants = saree.variants?.length || 0;
                const leadImage = saree.variants?.[0]?.images?.[0] || '/products/Elegant Cream and Red Banarasi Saree.png';

                return (
                  <div
                    key={saree.id}
                    className={`bg-white rounded-2xl border transition-all shadow-card overflow-hidden ${
                      isExpanded ? 'border-maroon ring-1 ring-maroon' : 'border-[#E8DEC8] hover:border-gold'
                    }`}
                  >
                    
                    {/* Collapsed Header Summary */}
                    <div
                      onClick={() => setEditingSareeId(isExpanded ? null : saree.id)}
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6F0]/60 select-none"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={leadImage}
                          alt={saree.title}
                          className="w-12 h-16 object-cover rounded-lg border border-[#E8DEC8] shadow-2xs shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs font-serif bg-maroon-50 text-maroon px-2 py-0.5 rounded border border-maroon/20">
                              {saree.sku}
                            </span>
                            <span className="text-xs font-serif font-bold text-charcoal truncate">
                              {saree.stockName}
                            </span>
                            {!saree.inStock && (
                              <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-charcoal-muted truncate mt-0.5">
                            {saree.title} • {saree.fabric} • ₹{saree.price?.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Variant Color Dots */}
                        <div className="hidden sm:flex items-center gap-1">
                          {saree.variants?.slice(0, 4).map((v, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: v.colorHex || '#5A1827' }}
                              title={v.colorName}
                            />
                          ))}
                          {totalVariants > 4 && (
                            <span className="text-[10px] text-charcoal-muted font-bold">+{totalVariants - 4}</span>
                          )}
                        </div>

                        <span className="text-xs font-serif font-bold text-maroon hidden md:inline">
                          ₹{saree.price?.toLocaleString('en-IN')}
                        </span>

                        <span className="p-1 rounded-full text-charcoal-muted hover:text-maroon">
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-maroon" /> : <ChevronDown className="w-5 h-5" />}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Detail Editor */}
                    {isExpanded && (
                      <div className="p-4 sm:p-6 border-t border-[#E8DEC8] bg-[#FAF6F0]/40 space-y-6">
                        
                        {/* 1. Basic Saree Details */}
                        <div>
                          <h4 className="font-serif text-sm font-bold text-maroon mb-3 flex items-center gap-1.5">
                            <Edit3 className="w-4 h-4 text-gold-600" />
                            <span>Basic Saree Information</span>
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            
                            <div>
                              <label className="text-xs font-bold text-charcoal block mb-1">
                                SKU Code
                              </label>
                              <input
                                type="text"
                                value={saree.sku}
                                onChange={(e) => handleProductChange(sareeIndex, 'sku', e.target.value)}
                                className="w-full bg-white border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs font-mono font-bold text-charcoal focus:outline-none focus:border-gold"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-charcoal block mb-1">
                                Internal Stock Name
                              </label>
                              <input
                                type="text"
                                value={saree.stockName}
                                onChange={(e) => handleProductChange(sareeIndex, 'stockName', e.target.value)}
                                placeholder="e.g. Cream Stone, English Banarasi"
                                className="w-full bg-white border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs font-serif font-bold text-charcoal focus:outline-none focus:border-gold"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-charcoal block mb-1">
                                Storefront Title
                              </label>
                              <input
                                type="text"
                                value={saree.title}
                                onChange={(e) => handleProductChange(sareeIndex, 'title', e.target.value)}
                                className="w-full bg-white border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-charcoal block mb-1">
                                Honest Selling Price (₹)
                              </label>
                              <input
                                type="number"
                                value={saree.price}
                                onChange={(e) => handleProductChange(sareeIndex, 'price', Number(e.target.value))}
                                className="w-full bg-white border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs font-bold text-maroon focus:outline-none focus:border-gold"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-charcoal block mb-1">
                                Fabric Type
                              </label>
                              <input
                                type="text"
                                value={saree.fabric}
                                onChange={(e) => handleProductChange(sareeIndex, 'fabric', e.target.value)}
                                placeholder="e.g. Pure Katan Silk, Organza"
                                className="w-full bg-white border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-charcoal block mb-1">
                                Work / Weave Details
                              </label>
                              <input
                                type="text"
                                value={saree.workType}
                                onChange={(e) => handleProductChange(sareeIndex, 'workType', e.target.value)}
                                placeholder="e.g. Pure Zari Jacquard Weaving"
                                className="w-full bg-white border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-charcoal block mb-1">
                                Saree Length
                              </label>
                              <input
                                type="text"
                                value={saree.sareeLength || "5.50 Meters"}
                                onChange={(e) => handleProductChange(sareeIndex, 'sareeLength', e.target.value)}
                                className="w-full bg-white border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-charcoal block mb-1">
                                Blouse Piece
                              </label>
                              <input
                                type="text"
                                value={saree.blouseLength || "0.80 Meters Unstitched"}
                                onChange={(e) => handleProductChange(sareeIndex, 'blouseLength', e.target.value)}
                                className="w-full bg-white border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                              />
                            </div>

                          </div>

                          {/* Description */}
                          <div className="mt-3">
                            <label className="text-xs font-bold text-charcoal block mb-1">
                              Artisan Craft Description
                            </label>
                            <textarea
                              rows={2}
                              value={saree.description}
                              onChange={(e) => handleProductChange(sareeIndex, 'description', e.target.value)}
                              className="w-full bg-white border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                            />
                          </div>

                          {/* In Stock toggle */}
                          <div className="mt-3 flex items-center gap-3">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={saree.inStock}
                                onChange={(e) => handleProductChange(sareeIndex, 'inStock', e.target.checked)}
                                className="w-4 h-4 rounded text-maroon accent-maroon"
                              />
                              <span className="text-xs font-bold text-charcoal">
                                Saree In Stock & Available for Order
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* 2. Color Variants Manager */}
                        <div className="pt-4 border-t border-[#E8DEC8]">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-serif text-sm font-bold text-maroon flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-gold-600" />
                                <span>Multi-Color Variants & Photos ({saree.variants?.length || 0})</span>
                              </h4>
                              <p className="text-[11px] text-charcoal-muted">
                                When shoppers click these swatches, the photo switches and orders include exact color details.
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddVariant(sareeIndex)}
                              className="px-3 py-1.5 bg-gold-600 hover:bg-gold-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>+ Add Color Variant</span>
                            </button>
                          </div>

                          {/* Variants Cards Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {saree.variants?.map((v, vIdx) => {
                              const variantImg = v.images?.[0] || '/products/Elegant Cream and Red Banarasi Saree.png';
                              return (
                                <div
                                  key={vIdx}
                                  className="p-3 bg-white rounded-xl border border-[#E8DEC8] shadow-2xs space-y-3"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="w-5 h-5 rounded-full border border-black/20 shrink-0"
                                        style={{ backgroundColor: v.colorHex || '#5A1827' }}
                                      />
                                      <span className="font-serif font-bold text-xs text-charcoal">
                                        Variant #{vIdx + 1}: {v.colorName}
                                      </span>
                                    </div>

                                    {saree.variants.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteVariant(sareeIndex, vIdx)}
                                        className="text-rose-600 hover:text-rose-800 p-1"
                                        title="Delete variant"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                      <label className="text-[10px] font-bold text-charcoal block mb-0.5">
                                        Color Name
                                      </label>
                                      <input
                                        type="text"
                                        value={v.colorName}
                                        onChange={(e) => handleVariantChange(sareeIndex, vIdx, 'colorName', e.target.value)}
                                        placeholder="e.g. Royal Cream, Rani Pink"
                                        className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-lg px-2 py-1 text-xs text-charcoal focus:outline-none focus:border-gold"
                                      />
                                    </div>

                                    <div>
                                      <label className="text-[10px] font-bold text-charcoal block mb-0.5">
                                        Hex Swatch Color
                                      </label>
                                      <div className="flex items-center gap-1.5">
                                        <input
                                          type="color"
                                          value={v.colorHex || '#5A1827'}
                                          onChange={(e) => handleVariantChange(sareeIndex, vIdx, 'colorHex', e.target.value)}
                                          className="w-7 h-7 p-0.5 rounded cursor-pointer border border-[#E8DEC8] bg-[#FAF6F0]"
                                        />
                                        <input
                                          type="text"
                                          value={v.colorHex || '#5A1827'}
                                          onChange={(e) => handleVariantChange(sareeIndex, vIdx, 'colorHex', e.target.value)}
                                          className="flex-1 bg-[#FAF6F0] border border-[#E8DEC8] rounded-lg px-2 py-1 text-xs font-mono text-charcoal focus:outline-none focus:border-gold"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Photo selection */}
                                  <div className="pt-2 border-t border-[#F5EFEB]">
                                    <label className="text-[10px] font-bold text-charcoal block mb-1">
                                      Primary Photo for this Color:
                                    </label>
                                    
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={variantImg}
                                        alt={v.colorName}
                                        className="w-12 h-16 object-cover rounded-lg border border-[#E8DEC8] shrink-0"
                                      />
                                      <div className="flex-1 space-y-1">
                                        <input
                                          type="text"
                                          value={variantImg}
                                          onChange={(e) => handleVariantChange(sareeIndex, vIdx, 'images', [e.target.value])}
                                          placeholder="/products/Photo.png"
                                          className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-lg px-2 py-1 text-[11px] font-mono text-charcoal focus:outline-none focus:border-gold"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => setImagePickerTarget({ type: 'variant', sareeIndex, variantIndex: vIdx })}
                                          className="text-[10px] text-maroon hover:text-gold-700 font-bold flex items-center gap-1"
                                        >
                                          <ImageIcon className="w-3 h-3" />
                                          <span>Choose from local /products/ folder ({availableProductImages.length})</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Footer delete saree */}
                        <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleDeleteSaree(saree.id, saree.sku)}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold border border-rose-200 flex items-center gap-1.5 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete this Saree SKU ({saree.sku})</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingSareeId(null)}
                            className="px-4 py-1.5 bg-white border border-[#E8DEC8] text-xs font-bold rounded-lg text-charcoal hover:bg-[#FAF6F0]"
                          >
                            Close Editor
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: HERO BANNERS & STORE SETTINGS */}
        {/* ========================================================================= */}
        {activeTab === 'banners_store' && (
          <div className="space-y-8">
            
            {/* 1. Hero Banners Slider Editor */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DEC8] shadow-card space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-maroon flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-gold-600" />
                    <span>Homepage Hero Slider Banners</span>
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Slides rotate on the homepage. Pick banner images from your <code>public/banners</code> folder.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddBanner}
                  className="px-3.5 py-2 bg-maroon text-ivory text-xs font-bold rounded-xl shadow-xs hover:bg-maroon-800 transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-gold" />
                  <span>+ Add Banner Slide</span>
                </button>
              </div>

              {/* Banners List */}
              <div className="space-y-4">
                {(workingCatalog.storeConfig.banners || []).map((banner, bIdx) => (
                  <div
                    key={banner.id || bIdx}
                    className="p-4 bg-[#FAF6F0] rounded-xl border border-[#E8DEC8] flex flex-col md:flex-row gap-4 items-start"
                  >
                    <div className="w-full md:w-56 space-y-2 shrink-0">
                      <div className="aspect-[16/9] rounded-lg overflow-hidden border border-[#E8DEC8] bg-charcoal/10 relative">
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                          Slide #{bIdx + 1}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={banner.image}
                        onChange={(e) => handleBannerChange(bIdx, 'image', e.target.value)}
                        className="w-full bg-white border border-[#E8DEC8] rounded-lg px-2 py-1 text-[11px] font-mono text-charcoal"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePickerTarget({ type: 'banner', bannerIndex: bIdx })}
                        className="text-[10px] text-maroon hover:text-gold-700 font-bold flex items-center gap-1"
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>Pick Banner from local images</span>
                      </button>
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-charcoal block mb-0.5">
                            Slide Headline
                          </label>
                          <input
                            type="text"
                            value={banner.title}
                            onChange={(e) => handleBannerChange(bIdx, 'title', e.target.value)}
                            className="w-full bg-white border border-[#E8DEC8] rounded-lg px-3 py-1.5 text-xs font-serif font-bold text-charcoal focus:outline-none focus:border-gold"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-charcoal block mb-0.5">
                            Button CTA Text
                          </label>
                          <input
                            type="text"
                            value={banner.ctaText}
                            onChange={(e) => handleBannerChange(bIdx, 'ctaText', e.target.value)}
                            className="w-full bg-white border border-[#E8DEC8] rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-charcoal block mb-0.5">
                          Slide Subtitle
                        </label>
                        <input
                          type="text"
                          value={banner.subtitle}
                          onChange={(e) => handleBannerChange(bIdx, 'subtitle', e.target.value)}
                          className="w-full bg-white border border-[#E8DEC8] rounded-lg px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-charcoal-muted">
                          Target Anchor: <code>{banner.ctaLink || '#catalog-grid'}</code>
                        </span>
                        
                        {(workingCatalog.storeConfig.banners || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveBanner(bIdx)}
                            className="text-xs text-rose-700 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Slide</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Store Details & Social Links */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DEC8] shadow-card space-y-5">
              <h3 className="font-serif text-lg font-bold text-maroon flex items-center gap-2">
                <Globe className="w-5 h-5 text-gold-600" />
                <span>Storefront Config, WhatsApp & Social Links</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={workingCatalog.storeConfig.brandName}
                    onChange={(e) => handleConfigChange('brandName', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs font-serif font-bold text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Official Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={workingCatalog.storeConfig.tagline || 'The Heritage of Mau Silk'}
                    onChange={(e) => handleConfigChange('tagline', e.target.value)}
                    placeholder="The Heritage of Mau Silk"
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Official Brand Address
                  </label>
                  <input
                    type="text"
                    value={workingCatalog.storeConfig.officialAddress || 'Steller Jeevan, Greater Noida (W) - 201318'}
                    onChange={(e) => handleConfigChange('officialAddress', e.target.value)}
                    placeholder="Steller Jeevan, Greater Noida (W) - 201318"
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1 flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Order Number (Country + Digits)</span>
                  </label>
                  <input
                    type="text"
                    value={workingCatalog.storeConfig.whatsappNumber}
                    onChange={(e) => handleConfigChange('whatsappNumber', e.target.value)}
                    placeholder="919643825049"
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs font-mono font-bold text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    WhatsApp Display Number
                  </label>
                  <input
                    type="text"
                    value={workingCatalog.storeConfig.whatsappDisplay}
                    onChange={(e) => handleConfigChange('whatsappDisplay', e.target.value)}
                    placeholder="+91 96438 25049"
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1 flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Community Group Link</span>
                  </label>
                  <input
                    type="text"
                    value={workingCatalog.storeConfig.whatsappGroupUrl}
                    onChange={(e) => handleConfigChange('whatsappGroupUrl', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs font-mono text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1 flex items-center gap-1">
                    <Instagram className="w-3.5 h-3.5 text-rose-600" />
                    <span>Instagram Profile URL</span>
                  </label>
                  <input
                    type="text"
                    value={workingCatalog.storeConfig.instagramUrl}
                    onChange={(e) => handleConfigChange('instagramUrl', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs font-mono text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1 flex items-center gap-1">
                    <Instagram className="w-3.5 h-3.5 text-rose-600" />
                    <span>Instagram Handle</span>
                  </label>
                  <input
                    type="text"
                    value={workingCatalog.storeConfig.instagramHandle}
                    onChange={(e) => handleConfigChange('instagramHandle', e.target.value)}
                    placeholder="@resham.e.mau"
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant UPI Discount Amount (₹)</span>
                  </label>
                  <input
                    type="number"
                    value={workingCatalog.storeConfig.upiDiscount || 100}
                    onChange={(e) => handleConfigChange('upiDiscount', Number(e.target.value))}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs font-bold text-emerald-800 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={workingCatalog.storeConfig.supportEmail}
                    onChange={(e) => handleConfigChange('supportEmail', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal block mb-1">
                    Logo Image URL
                  </label>
                  <input
                    type="text"
                    value={workingCatalog.storeConfig.logoUrl || '/logo.png'}
                    onChange={(e) => handleConfigChange('logoUrl', e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs font-mono text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>

              </div>

              {/* Announcement marquee text */}
              <div>
                <label className="text-xs font-bold text-charcoal block mb-1">
                  Top Header Announcement Marquee Text
                </label>
                <input
                  type="text"
                  value={workingCatalog.storeConfig.announcementText}
                  onChange={(e) => handleConfigChange('announcementText', e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#E8DEC8] rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SAVE & PUBLISH */}
        {/* ========================================================================= */}
        {activeTab === 'publish' && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-card text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                <Save className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-maroon">
                  Save All Changes to Website
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 max-w-md mx-auto">
                  Clicking save writes all edits directly into <code>src/data/sarees.json</code> on your computer. Your website updates instantly without any code editing.
                </p>
              </div>

              {/* Status Badge */}
              <div className="p-4 bg-[#FAF6F0] rounded-xl border border-[#E8DEC8] inline-flex flex-col items-center gap-1 text-xs">
                {hasUnsavedChanges ? (
                  <span className="font-bold text-amber-700 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    You have unsaved changes in your working copy
                  </span>
                ) : (
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    All changes are up to date with disk
                  </span>
                )}
                {lastSavedTime && (
                  <span className="text-[11px] text-charcoal-muted">
                    Last saved at: {lastSavedTime}
                  </span>
                )}
              </div>

              {/* Big Green Save Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveToDisk}
                  disabled={isSaving}
                  className="w-full min-h-[52px] py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-serif font-bold text-base tracking-wide shadow-lg active:scale-98 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5 text-emerald-100" />
                  <span>{isSaving ? 'Writing to disk...' : 'Save All Changes to Website'}</span>
                </button>
              </div>

              {/* Backup / Export Buttons */}
              <div className="pt-4 border-t border-[#F5EFEB] flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  className="px-4 py-2 bg-white border border-[#E8DEC8] text-xs font-bold rounded-xl text-charcoal hover:bg-[#FAF6F0] flex items-center gap-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-gold-600" />
                  <span>Download Backup (sarees.json)</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-rose-50 border border-rose-200 text-xs font-bold rounded-xl text-rose-700 hover:bg-rose-100 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Discard & Reset Changes</span>
                </button>
              </div>

            </div>

            {/* Catalog Statistics Strip */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2">
                <span className="font-serif text-xl font-bold text-maroon block">
                  {workingCatalog.products.length}
                </span>
                <span className="text-[11px] text-charcoal-muted">Sarees in Catalog</span>
              </div>
              <div className="p-2 border-x border-[#E8DEC8]">
                <span className="font-serif text-xl font-bold text-gold-700 block">
                  {workingCatalog.products.reduce((acc, p) => acc + (p.variants?.length || 1), 0)}
                </span>
                <span className="text-[11px] text-charcoal-muted">Total Color Variants</span>
              </div>
              <div className="p-2">
                <span className="font-serif text-xl font-bold text-emerald-700 block">
                  {workingCatalog.storeConfig.banners?.length || 0}
                </span>
                <span className="text-[11px] text-charcoal-muted">Active Hero Banners</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* LOCAL IMAGE PICKER MODAL */}
      {/* ========================================================================= */}
      {imagePickerTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs select-none">
          <div className="bg-[#FAF6F0] rounded-2xl border border-[#E8DEC8] max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            <div className="p-4 bg-maroon text-ivory flex items-center justify-between border-b border-gold/30">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gold" />
                <h4 className="font-serif font-bold text-sm">
                  {imagePickerTarget.type === 'variant' ? 'Select Saree Image from public/products' : 'Select Banner from public/banners'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setImagePickerTarget(null)}
                className="text-ivory hover:text-gold text-xs font-bold px-2 py-1"
              >
                Cancel
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {(imagePickerTarget.type === 'variant' ? availableProductImages : availableBannerImages).map((imgPath, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (imagePickerTarget.type === 'variant') {
                        handleVariantChange(imagePickerTarget.sareeIndex, imagePickerTarget.variantIndex, 'images', [imgPath]);
                      } else if (imagePickerTarget.type === 'banner') {
                        handleBannerChange(imagePickerTarget.bannerIndex, 'image', imgPath);
                      }
                      setImagePickerTarget(null);
                      showToast('Photo selected!');
                    }}
                    className="group cursor-pointer rounded-xl border border-[#E8DEC8] overflow-hidden bg-white hover:border-maroon hover:shadow-md transition active:scale-95 flex flex-col"
                  >
                    <div className="aspect-[3/4] bg-charcoal/5 relative overflow-hidden">
                      <img
                        src={imgPath}
                        alt="Local asset"
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <span className="p-1.5 text-[9px] text-charcoal font-mono truncate text-center bg-white border-t border-[#E8DEC8]">
                      {imgPath.split('/').pop()}
                    </span>
                  </div>
                ))}
              </div>

              {(imagePickerTarget.type === 'variant' ? availableProductImages : availableBannerImages).length === 0 && (
                <div className="text-center py-12 text-xs text-charcoal-muted">
                  No images found in public directory. You can enter the image path directly in the text input box.
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
