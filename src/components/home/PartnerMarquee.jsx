import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PARTNER_LOGOS } from '../../data';

/**
 * PartnerMarquee — dual-row infinite scroll partner showcase.
 *
 * - Row 1 scrolls left-to-right, Row 2 right-to-left for a layered effect.
 * - Hovering over the section pauses both rows (.marquee-wrapper in CSS).
 * - Each logo is wrapped in an <a> linking to the partner website.
 * - Images use loading="lazy" and grayscale-to-color on hover.
 */
export default function PartnerMarquee() {
  const row1 = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  const row2 = [...[...PARTNER_LOGOS].reverse(), ...[...PARTNER_LOGOS].reverse()];

  return (
    <section
      id="mitra"
      aria-label="Mitra resmi kami"
      className="py-16 relative overflow-hidden border-y border-slate-200"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div>
          <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">Ekosistem Kami</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Mitra Resmi Kami</h2>
        </div>
        <Link
          to="/mitra-kami"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-sky-600 border border-slate-200 hover:border-sky-300 bg-white hover:bg-sky-50 px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md"
        >
          Lihat Semua <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {/* Dual-row marquee — hover pauses via .marquee-wrapper in index.css */}
      <div className="marquee-wrapper space-y-4">
        {[row1, row2].map((row, rowIdx) => (
          <div key={rowIdx} className="relative w-full overflow-hidden">
            {/* Gradient edge fades */}
            <div className="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" aria-hidden="true" />

            <div className={`flex gap-4 w-max px-4 ${rowIdx === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
              {row.map((logo, i) => (
                <a
                  key={`r${rowIdx}-${logo.id}-${i}`}
                  href={logo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Kunjungi situs web ${logo.name}`}
                  className="partner-logo-card shrink-0 flex items-center justify-center px-8 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm"
                  style={{ minWidth: '160px', height: '72px' }}
                >
                  <img
                    src={logo.logoUrl}
                    alt={`Logo ${logo.name}`}
                    loading="lazy"
                    className="h-8 w-auto max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 mt-8">
        ✦ Semua mitra telah melalui proses verifikasi ketat oleh tim NiatBaik
      </p>
    </section>
  );
}
