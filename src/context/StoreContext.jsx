import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import initialCatalog from '../data/sarees.json';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Catalog state allows live local editing via Admin Panel
  const [catalog, setCatalog] = useState(initialCatalog);
  const { storeConfig, products } = catalog;

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('rem_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Customer checkout details inside WhatsApp Drawer
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: '',
    address: '',
    pincode: '',
    paymentMethod: 'upi' // 'upi' (Save ₹100) | 'cod'
  });

  // Catalog search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFabricFilter, setSelectedFabricFilter] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('rem_cart_v2', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Add to Cart with SKU, stockName, and exact selected Color Variant
  const addToCart = (product, selectedVariant = null, quantity = 1) => {
    const variant = selectedVariant || (product.variants && product.variants[0]) || {
      colorName: 'Standard',
      colorHex: '#5A1827',
      images: product.variants?.[0]?.images || []
    };

    const cartItemId = `${product.id}-${variant.colorName}`;
    const displayImage = variant.images?.[0] || product.variants?.[0]?.images?.[0] || '';

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          id: product.id,
          sku: product.sku,
          stockName: product.stockName || product.title,
          title: product.title,
          slug: product.slug,
          price: product.price,
          selectedColor: variant.colorName,
          selectedColorHex: variant.colorHex,
          image: displayImage,
          quantity
        }
      ];
    });

    showToast(`Added "${product.stockName || product.title}" (${variant.colorName}) to Bag`);
    setIsCartOpen(true);
  };

  // Update item quantity
  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove from cart
  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Removed item from Bag', 'info');
  };

  const clearCart = () => setCart([]);

  // Reset search and catalog filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFabricFilter('');
  };

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Honest UPI Discount
  const upiDiscount = checkoutDetails.paymentMethod === 'upi' && cart.length > 0 ? (storeConfig.upiDiscount || 100) : 0;
  const shippingFee = 0; // Free Pan-India Shipping
  const grandTotal = Math.max(0, cartSubtotal - upiDiscount);

  // Filtered 17 sarees on homepage
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchStock = (p.stockName || '').toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchFabric = (p.fabric || '').toLowerCase().includes(q);
        const matchWork = (p.workType || '').toLowerCase().includes(q);
        const matchColor = p.variants?.some(v => v.colorName.toLowerCase().includes(q));
        if (!matchTitle && !matchStock && !matchSku && !matchFabric && !matchWork && !matchColor) {
          return false;
        }
      }

      if (selectedFabricFilter && p.fabric.toLowerCase() !== selectedFabricFilter.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedFabricFilter]);

  // Formatted WhatsApp order message generator
  const generateWhatsAppOrderLink = (directProduct = null, directVariant = null, directOptions = {}) => {
    const phone = storeConfig.whatsappNumber || '919643825049';
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://reshame-mau.com';

    let text = `Namaste Resham-e-Mau! 🙏\n\nI want to place an order directly from your handloom workshop:\n`;

    if (directProduct) {
      const variant = directVariant || directProduct.variants?.[0] || { colorName: 'Standard' };
      const paymentPref = directOptions.paymentMethod || 'Prepaid UPI (Save ₹100)';
      const isUpi = paymentPref.toLowerCase().includes('upi');
      const discount = isUpi ? 100 : 0;
      const finalPrice = Math.max(0, directProduct.price - discount);

      text += `\n*Product:* ${directProduct.title}`;
      text += `\n*SKU:* ${directProduct.sku} (${directProduct.stockName || directProduct.title})`;
      text += `\n*Color Variant:* ${variant.colorName}`;
      text += `\n*Price:* ₹${directProduct.price.toLocaleString('en-IN')}`;
      text += `\n*Product Link:* ${baseUrl}/product/${directProduct.slug}`;
      text += `\n*Payment Preference:* ${paymentPref}`;
      if (directOptions.pincode) {
        text += `\n*Delivery Pincode:* ${directOptions.pincode}`;
      }
      text += `\n\n*Total Payable:* ₹${finalPrice.toLocaleString('en-IN')}\n`;
    } else {
      if (cart.length === 0) {
        text += `\nI would like to inquire about your Mau Handloom sarees.\n`;
      } else {
        itemsCount:
        cart.forEach((item, index) => {
          text += `\n${index + 1}. *${item.title}* (${item.sku})`;
          text += `\n   - Stock: ${item.stockName}`;
          text += `\n   - Color: ${item.selectedColor}`;
          text += `\n   - Qty: ${item.quantity} x ₹${item.price.toLocaleString('en-IN')}`;
          text += `\n   - Link: ${baseUrl}/product/${item.slug}`;
        });

        text += `\n\n*Customer Details:*`;
        if (checkoutDetails.name) text += `\n- Name: ${checkoutDetails.name}`;
        if (checkoutDetails.address) text += `\n- Address: ${checkoutDetails.address}`;
        if (checkoutDetails.pincode) text += `\n- Pincode: ${checkoutDetails.pincode}`;
        text += `\n- Payment: ${
          checkoutDetails.paymentMethod === 'upi' ? 'Prepaid UPI (Extra ₹100 Off Applied)' : 'Cash on Delivery (COD)'
        }`;

        text += `\n\n*Price Breakdown:*`;
        text += `\n- Total: ₹${cartSubtotal.toLocaleString('en-IN')}`;
        if (upiDiscount > 0) text += `\n- UPI Discount: -₹${upiDiscount}`;
        text += `\n- Delivery: FREE`;
        text += `\n*Final Total Payable:* ₹${grandTotal.toLocaleString('en-IN')}\n`;
      }
    }

    text += `\nPlease confirm saree availability and share payment/dispatch tracking details. Dhanyavaad!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Save updated catalog to disk via Vite dev server API
  const saveCatalogToDisk = async (newCatalog) => {
    try {
      const res = await fetch('/api/save-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCatalog)
      });
      const result = await res.json();
      if (result.success) {
        setCatalog(newCatalog);
        showToast('✓ Catalog successfully saved to disk!');
        return { success: true };
      } else {
        showToast('Error saving catalog: ' + (result.error || 'Failed'), 'error');
        return { success: false, error: result.error };
      }
    } catch (err) {
      // Fallback: update React state
      setCatalog(newCatalog);
      showToast('Catalog updated in live state!', 'info');
      return { success: true, localOnly: true };
    }
  };

  return (
    <StoreContext.Provider
      value={{
        catalog,
        setCatalog,
        storeConfig,
        products,
        filteredProducts,
        cart,
        cartItemCount,
        cartSubtotal,
        upiDiscount,
        shippingFee,
        grandTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkoutDetails,
        setCheckoutDetails,
        // UI states
        isCartOpen,
        setIsCartOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        // Search & Filters
        searchQuery,
        setSearchQuery,
        selectedFabricFilter,
        setSelectedFabricFilter,
        resetFilters,
        generateWhatsAppOrderLink,
        saveCatalogToDisk,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
