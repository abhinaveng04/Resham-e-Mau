import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-200">
      <div
        className={`p-3.5 rounded-xl shadow-xl border flex items-center gap-2.5 text-xs font-medium ${
          type === 'error'
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : type === 'info'
            ? 'bg-white border-[#E8DEC8] text-charcoal'
            : 'bg-emerald-50 border-emerald-300 text-emerald-950'
        }`}
      >
        {type === 'error' ? (
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
        ) : type === 'info' ? (
          <Info className="w-4 h-4 text-charcoal-muted shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        )}
        <span className="flex-1">{message}</span>
      </div>
    </div>
  );
}
