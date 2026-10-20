import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ReturnsPolicyPage from './pages/ReturnsPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import MobileMenuDrawer from './components/MobileMenuDrawer';
import PredictiveSearchModal from './components/PredictiveSearchModal';
import FilterDrawer from './components/FilterDrawer';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Toast from './components/Toast';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-charcoal font-sans selection:bg-maroon selection:text-ivory relative">
      {/* 1. Global Announcement Marquee Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header with 5-Way Mega Menu & Predictive Search */}
      <Header />

      {/* 3. Main Route Views */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<Navigate to="/collections/all" replace />} />
          <Route path="/collections/:category" element={<CollectionPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/returns-exchange" element={<ReturnsPolicyPage />} />
          <Route path="/returns" element={<Navigate to="/returns-exchange" replace />} />
          <Route path="/shipping" element={<ShippingPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 4. Footer with Dedicated Links */}
      <Footer />

      {/* 5. Sticky Bottom Mobile App Bar (Home | Categories | Search | WhatsApp | Cart) */}
      <MobileBottomBar />

      {/* 6. Floating WhatsApp Concierge Help Button */}
      <FloatingWhatsApp />

      {/* Drawers & Modals */}
      <MobileMenuDrawer />
      <PredictiveSearchModal />
      <FilterDrawer />
      <ProductQuickViewModal />
      <CartDrawer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppLayout />
      </StoreProvider>
    </BrowserRouter>
  );
}
