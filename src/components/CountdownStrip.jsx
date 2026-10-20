import React, { useState, useEffect } from 'react';
import { Timer, Sparkles, Copy, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CountdownStrip() {
  const { showToast } = useStore();
  const [copied, setCopied] = useState(false);

  // Auto-resetting 18-hour countdown
  const [timeLeft, setTimeLeft] = useState(() => {
    // 18 hours in seconds = 18 * 3600 = 64800 seconds
    const now = Date.now();
    const cycle = 18 * 3600 * 1000;
    const remainingMs = cycle - (now % cycle);
    return Math.floor(remainingMs / 1000);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 18 * 3600; // auto-reset
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n) => String(n).padStart(2, '0');

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('MAU10');
    setCopied(true);
    showToast('Coupon MAU10 copied to clipboard! (Extra 10% OFF)');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-r from-maroon-900 via-maroon to-maroon-900 border-y border-gold/40 text-ivory py-2.5 px-4 shadow-sm relative overflow-hidden">
      {/* Subtle gold sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left relative z-10">
        
        {/* Left: Message */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-serif tracking-wide">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
          </span>
          <span className="text-gold-300 font-bold uppercase tracking-widest text-[11px] sm:text-xs">
            Mau Festive Mahotsav:
          </span>
          <span className="text-ivory hidden sm:inline">
            Flat 10% OFF + ₹100 Extra on UPI Payments
          </span>
        </div>

        {/* Center: Live Timer Blocks */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-gold-200 uppercase tracking-wider font-sans font-medium">
            <Timer className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span className="text-[11px]">Ends In:</span>
          </div>

          <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-bold">
            {/* Hours */}
            <div className="bg-maroon-800/90 border border-gold/40 px-2 py-0.5 rounded shadow-inner text-gold-300 min-w-[28px] text-center">
              {pad(hours)}
            </div>
            <span className="text-gold">:</span>
            {/* Minutes */}
            <div className="bg-maroon-800/90 border border-gold/40 px-2 py-0.5 rounded shadow-inner text-gold-300 min-w-[28px] text-center">
              {pad(minutes)}
            </div>
            <span className="text-gold">:</span>
            {/* Seconds */}
            <div className="bg-maroon-800/90 border border-gold/40 px-2 py-0.5 rounded shadow-inner text-gold-300 min-w-[28px] text-center">
              {pad(seconds)}
            </div>
          </div>
        </div>

        {/* Right: Coupon Code Action */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] text-gold-200/80 hidden md:inline">Use Code:</span>
          <button
            onClick={handleCopyCode}
            className="group flex items-center gap-1.5 px-3 py-1 bg-gold/20 hover:bg-gold/30 border border-gold/50 rounded-full text-gold-300 text-xs font-bold font-mono tracking-wider transition active:scale-95"
            title="Click to copy coupon code"
          >
            <Sparkles className="w-3 h-3 text-gold" />
            <span>MAU10</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-gold-400 group-hover:text-gold" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
