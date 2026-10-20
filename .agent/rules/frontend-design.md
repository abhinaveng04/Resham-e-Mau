# Resham-e-Mau — Luxury Indian Heritage D2C Frontend Design Rules

These rules are strictly enforced for all UI/UX design, component development, and styling in the Resham-e-Mau storefront.

## 1. NO GENERIC AI UI
- **Never** use default Tailwind blue/indigo/purple colors (`bg-blue-600`, `text-indigo-500`, etc.), generic SaaS grey shadows, or plain unstyled buttons.
- **Palette**:
  - Royal Ivory background: `#FAF6F0`
  - Deep Maroon/Wine primary: `#5A1827`
  - Antique Zari Gold accent: `#C59B27`
  - Charcoal text: `#1F1A1C`
  - Emerald Green for discount/trust badges: `#1B5E20`
  - Crisp boundary borders: `#E6DEC8` / `#E8DEC8`

## 2. HERITAGE TYPOGRAPHY & HIERARCHY
- **Headings & Titles**: Use Google Fonts `'Cormorant Garamond'` or `'Playfair Display'` with wide tracking (`tracking-wide` / `tracking-wider`) and refined weights (600–700).
- **Body, Pricing, Badges, & Specs**: Use `'Jost'` for clean pricing, discount pills, specification tables, and sticky mobile bars. Format currency in Indian numbering (`₹2,899`).

## 3. LUXURY SAREE CARD ARCHITECTURE
- **Portrait Aspect Ratio**: Use `aspect-[3/4]` for all saree product images to preserve full 5.5-meter drapes, borders, and pallu work without awkward cropping.
- **Hover Motion**: Subtle zoom-on-hover (`scale-105 duration-500`).
- **Floating Badges**: Top-left discount badge in Deep Maroon (`#5A1827`) or Emerald (`#1B5E20`), and Mau Handloom Origin / Bestseller tags.
- **Borders**: Crisp 1px borders in warm ivory/gold (`#E6DEC8`).

## 4. MOBILE-FIRST THUMB ERGONOMICS (Instagram Reels Traffic)
- **Touch Targets**: Minimum 44px × 44px for buttons, chips, filter toggles, swatches, and steppers.
- **Carousels**: Smooth CSS scroll-snap (`overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory`).
- **Sticky Bottom App Bar**: Fixed bottom navigation bar with safe-area padding (`pb-[calc(0.4rem+env(safe-area-inset-bottom))]`), backdrop blur glassmorphism, and smooth transitions.
- **WhatsApp Integration**: Instant 1-click WhatsApp order generation with pre-filled saree details.
