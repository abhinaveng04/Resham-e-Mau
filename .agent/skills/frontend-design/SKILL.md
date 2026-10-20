---
name: frontend-design
description: Strict luxury Indian heritage D2C frontend design rules and aesthetic guidelines for Resham-e-Mau (handloom & silk weaving legacy of Mau, UP). Use whenever designing, styling, reviewing, or refactoring UI components, pages, typography, colors, layouts, product cards, or mobile shopping experiences.
---

# Luxury Indian Heritage D2C Frontend Design Guide (Resham-e-Mau)

This skill governs the aesthetic, structural, and interaction design of the **Resham-e-Mau** storefront. The brand celebrates the centuries-old handloom, Katan silk, and jacquard weaving legacy of **Mau (Maunath Bhanjan), Uttar Pradesh**. Every component must reflect imperial textile heritage, tactile silk richness, and high-converting Indian ethnic D2C commerce practices.

---

## 1. Strict Design Rules

### Rule 1: NO GENERIC AI UI
* **NEVER** use default Tailwind blues, purples, or indigos (`bg-blue-600`, `text-indigo-500`, `border-sky-400`, etc.).
* **NEVER** use generic grey SaaS drop-shadows or stark corporate minimalism.
* **NEVER** render raw, unstyled square buttons or cold monospace numbers for currency.
* **ALWAYS** adhere strictly to the royal Resham-e-Mau heritage palette:
  - **Royal Ivory Background**: `#FAF6F0` (warm unbleached silk ground)
  - **Deep Maroon / Wine Primary**: `#5A1827` (regal bridal & pit-loom warp tone)
  - **Antique Zari Gold Accent**: `#C59B27` (metallic sona-rupa brocade highlight)
  - **Charcoal Text**: `#1F1A1C` (rich readable contrast; never pure `#000000`)
  - **Emerald Green Badges**: `#1B5E20` (trust seals, Silk Mark verification, discount tags)
  - **Warm Gold/Ivory Borders**: `#E6DEC8` / `#E8DEC8` (crisp 1px boundary)
* **Shadows**: Use tinted, warm ambient shadows (e.g., `0 10px 30px -10px rgba(90, 24, 39, 0.12)`).

---

### Rule 2: HERITAGE TYPOGRAPHY & HIERARCHY
* **Headings, Collection Titles, & Editorial Banners**:
  - Font: `'Cormorant Garamond'` or `'Playfair Display'` (`font-serif`).
  - Styling: Wide tracking (`tracking-wide`, `tracking-wider`), font weights 600–700, graceful line heights.
  - Accentuate with subtle italicized highlights (e.g., *Mau, Uttar Pradesh*).
* **Pricing, Discount Pills, Specs Tables, & Navigation**:
  - Font: `'Jost'` (`font-sans`).
  - Clean, legible sans-serif weights for rapid scannability.
  - Format Indian Rupee currency with standard Indian numbering (`₹2,899`, `₹12,499`).
  - Always pair sale price in bold Maroon with strike-through MRP and savings tags in Emerald.

| UI Element | Font Family | Size & Weight | Tracking & Color |
| :--- | :--- | :--- | :--- |
| Hero Headline | `Cormorant Garamond` | `text-3xl` to `text-6xl`, Bold | `tracking-tight text-maroon` |
| Collection / Weave Title | `Cormorant Garamond` | `text-lg` to `text-2xl`, Bold | `tracking-wide text-maroon` |
| Saree Card Title | `Cormorant Garamond` | `text-sm` to `text-base`, Bold | `leading-snug text-charcoal` |
| Price & Strike-Through | `Jost` | `text-base` to `text-xl`, Bold | `text-maroon` / `text-charcoal-light` |
| Trust / Discount Pills | `Jost` | `text-[10px]` to `text-xs`, Bold | `bg-emerald-trust text-white` |
| Specs Table Data | `Jost` | `text-xs`, Medium / SemiBold | `text-charcoal` on `#FAF6F0` |

---

### Rule 3: LUXURY SAREE CARD ARCHITECTURE
Sarees are 5.5-meter drapes with elaborate pallus, borders, and pleats. Landscape or 1:1 square crop cuts off the drape and kills buyer conversion.
* **Mandatory 3:4 Vertical Aspect Ratio**: Every product image container **MUST** use `aspect-[3/4]`.
* **Smooth Hover Zoom**: Apply `group-hover:scale-105 transition-transform duration-500 ease-out` with `overflow-hidden`.
* **Floating Top-Left Badges**:
  - Deep Maroon (`#5A1827`) for Mau Handloom Origin / GI Weave seal.
  - Antique Gold (`#C59B27`) for Bestseller tags.
* **Floating Top-Right Badges**:
  - Emerald Green (`#1B5E20`) for exact discount percentage (e.g. `58% OFF`).
  - Floating circular Wishlist heart toggle with subtle backdrop blur.
* **Crisp 1px Boundaries**: Cards must be framed with `border border-[#E6DEC8]` (or `#E8DEC8`) on white or ivory ground.
* **Dual Action Buttons**:
  - Primary button: "Add to Bag" in Deep Maroon (`#5A1827`).
  - Secondary button: Direct "Buy via WhatsApp" / "WhatsApp Inquiry" in Emerald (`#1B5E20`).

---

### Rule 4: MOBILE-FIRST THUMB ERGONOMICS (Instagram Reels Audience)
Over 90% of Indian ethnic shoppers discover sarees via Instagram and mobile social links. UI must be thumb-friendly:
* **Minimum Touch Target**: Every interactive element (filter chips, swatches, cart counters, buttons) must meet or exceed **44px × 44px**.
* **Horizontal Carousels**:
  - Use `overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory`.
  - Provide visible peek of the adjacent item to cue scrolling.
* **Sticky Bottom Mobile Bar (`md:hidden`)**:
  - Persistent bottom app bar: **Home | Categories | Search | WhatsApp Help | Cart**.
  - Safe-area bottom padding: `pb-[calc(0.4rem+env(safe-area-inset-bottom))]`.
  - Backdrop blur glassmorphism: `bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E6DEC8]`.
  - Animated item count badge for Cart.
* **Drawers & Modals**:
  - Slide-in from right or bottom with `animate-in duration-200`.
  - Backdrop tap-to-dismiss with dark translucent overlay (`bg-charcoal/70 backdrop-blur-xs`).

---

## 2. Tailwind CSS Reference Cheat Sheet

```jsx
// 1. Luxury Saree Card Skeleton
<div className="group relative bg-white rounded-2xl border border-[#E6DEC8] overflow-hidden shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(90,24,39,0.12)] transition-all duration-300 flex flex-col">
  <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF6F0]">
    <img 
      src={saree.image} 
      alt={saree.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
    />
    {/* Floating Badges */}
    <span className="absolute top-2.5 left-2.5 bg-[#5A1827]/95 text-[#FAF6F0] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#C59B27]/40 shadow-xs">
      Mau Handloom
    </span>
    <span className="absolute top-2.5 right-2.5 bg-[#1B5E20] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
      {saree.discountPercent}% OFF
    </span>
  </div>
  
  <div className="p-3.5 flex-1 flex flex-col justify-between">
    <div className="text-[11px] text-[#C59B27] font-semibold">{saree.weave}</div>
    <h3 className="font-serif text-sm font-bold text-[#1F1A1C] group-hover:text-[#5A1827] line-clamp-2">
      {saree.title}
    </h3>
    <div className="flex items-baseline gap-2 pt-2 border-t border-[#F5EFEB]">
      <span className="font-serif font-bold text-base text-[#5A1827]">₹{saree.salePrice}</span>
      <span className="text-xs text-[#8E8588] line-through">₹{saree.mrp}</span>
    </div>
  </div>
</div>

// 2. Mobile Thumb-Friendly Quick Pill
<button className="min-h-[44px] px-4 py-2 rounded-full border border-[#E6DEC8] bg-white text-[#1F1A1C] text-xs font-medium active:scale-95 transition-transform flex items-center gap-2">
  <span className="w-2.5 h-2.5 rounded-full bg-[#5A1827]"></span>
  <span>Mau Katan Silk</span>
</button>

// 3. Sticky Bottom Mobile Bar
<nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#E6DEC8] px-2 py-1 pb-[calc(0.4rem+env(safe-area-inset-bottom))]">
  {/* 5-item grid with min 44px touch targets */}
</nav>
```

---

## 3. Review Checklist for New Components

Before shipping any new component or screen for Resham-e-Mau:
- [ ] Are all background, maroon, gold, and emerald hex codes compliant with the brand palette?
- [ ] Is Cormorant Garamond / Playfair Display used for headings and Jost for pricing/data?
- [ ] Do saree product cards strictly maintain the `aspect-[3/4]` portrait ratio?
- [ ] Are mobile touch targets `>= 44px`?
- [ ] Is 1-click WhatsApp order generation included for instant customer checkout?
- [ ] Is the Silk Mark / Mau pit-loom heritage badge prominent?
