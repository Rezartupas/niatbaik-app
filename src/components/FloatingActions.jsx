/**
 * FloatingActions.jsx
 *
 * Renders two persistent floating action buttons (FABs) on the right side:
 *
 *  1. WhatsApp button  — links to the team's WA number, pulse ring + tooltip
 *  2. Scroll-to-top   — appears after 200 px of scroll; smooth-scrolls to top
 *
 * Both buttons:
 *  - Are hidden on the Admin pages (the component is only mounted inside the
 *    public layout in App.jsx)
 *  - Have 48 × 48 px touch targets (WCAG 2.5.5)
 *  - Avoid the bottom-safe-area on iOS via `pb-safe` / env(safe-area-inset-*)
 */

import { useState, useEffect, useCallback } from 'react';
import { CONTACT_LINKS } from '../data';

// ─── WhatsApp SVG (official brand icon) ──────────────────────────────────────
function WhatsAppIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.477 2 2 6.476 2 12c0 1.99.576 3.847 1.571 5.414L2 22l4.73-1.544A9.955 9.955 0 0012.004 22C17.528 22 22 17.524 22 12S17.528 2 12.004 2zm0 18.18a8.156 8.156 0 01-4.355-1.256l-.313-.185-3.204 1.047 1.075-3.091-.204-.32A8.147 8.147 0 013.82 12c0-4.513 3.672-8.18 8.184-8.18 4.512 0 8.18 3.667 8.18 8.18 0 4.514-3.668 8.18-8.18 8.18z" />
    </svg>
  );
}

// ─── Chevron-up SVG ───────────────────────────────────────────────────────────
function ChevronUpIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top after 200 px of scroll
  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 200);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Inline keyframes ── */}
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          50%       { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
        }
        .wa-pulse { animation: wa-pulse 2s ease-in-out infinite; }

        @keyframes fab-in {
          from { opacity: 0; transform: translateY(12px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fab-in { animation: fab-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }

        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
        .scroll-bounce:hover svg { animation: scroll-bounce 0.6s ease infinite; }
      `}</style>

      {/*
        Container — fixed to bottom-right, above mobile nav bars.
        Uses env(safe-area-inset-bottom) so it clears the iOS home indicator.
      */}
      <div
        className="fixed right-4 sm:right-6 z-50 flex flex-col items-center gap-3"
        style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
        aria-label="Floating action buttons"
      >

        {/* ── Scroll-to-top ── */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            title="Kembali ke atas"
            className="fab-in scroll-bounce w-12 h-12 rounded-full flex items-center justify-center
                       bg-white text-slate-600 border border-slate-200
                       shadow-lg hover:shadow-xl
                       hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300
                       transition-all duration-200 active:scale-90 touch-manipulation"
          >
            <ChevronUpIcon size={22} />
          </button>
        )}

        {/* ── WhatsApp FAB ── */}
        <div className="relative group">
          {/* Tooltip — appears to the left on hover/focus */}
          <div
            className="absolute right-14 top-1/2 -translate-y-1/2
                        bg-slate-900 text-white text-xs font-semibold
                        px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap
                        opacity-0 translate-x-2 pointer-events-none
                        group-hover:opacity-100 group-hover:translate-x-0
                        transition-all duration-200 ease-out"
            aria-hidden="true"
          >
            Ada Yang Mau Ditanyakan?
            {/* Arrow */}
            <span className="absolute right-[-5px] top-1/2 -translate-y-1/2
                              border-[5px] border-transparent border-l-slate-900" />
          </div>

          <a
            href={CONTACT_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat via WhatsApp"
            title="Hubungi kami via WhatsApp"
            className="wa-pulse w-14 h-14 rounded-full flex items-center justify-center
                       bg-[#25D366] text-white
                       shadow-[0_8px_24px_rgba(37,211,102,0.45)]
                       hover:bg-[#20bc5a] hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)]
                       hover:-translate-y-1
                       transition-all duration-200 active:scale-90 touch-manipulation"
          >
            <WhatsAppIcon size={28} />
          </a>
        </div>

      </div>
    </>
  );
}
