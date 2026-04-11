/**
 * PartnerMarquee — dual-row infinite scroll partner showcase.
 *
 * Mobile improvements:
 *  - Header row wraps on xs (flex-col on xs, row on sm+)
 *  - "Lihat Semua" button is full-width on xs
 *  - Logo card heights and widths scaled down on mobile
 *  - Edge fade gradients narrowed on xs so logos aren't hidden too early
 *  - Section padding reduced on mobile
 */
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PARTNER_LOGOS } from '../../data';

export default function PartnerMarquee() {
  const row1 = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  const row2 = [...[...PARTNER_LOGOS].reverse(), ...[...PARTNER_LOGOS].reverse()];

  return (
    <section
      id="mitra"
      aria-label="Mitra resmi kami"
      className="py-12 sm:py-16 relative overflow-hidden border-y border-slate-200"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}
    >
      {/* Section header — stack on mobile, row on sm+ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div>
          <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">Ekosistem Kami</p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Mitra Resmi Kami</h2>
        </div>
        <Link
          to="/mitra-kami"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-slate-600 hover:text-sky-600 border border-slate-200 hover:border-sky-300 bg-white hover:bg-sky-50 px-4 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95 sm:w-auto w-full"
        >
          Lihat Semua <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {/* Dual-row marquee */}
      <div className="marquee-wrapper space-y-3 sm:space-y-4">
        {[row1, row2].map((row, rowIdx) => (
          <div key={rowIdx} className="relative w-full overflow-hidden">
            {/* Edge fades — narrower on mobile */}
            <div className="absolute left-0 top-0 h-full w-12 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute right-0 top-0 h-full w-12 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" aria-hidden="true" />

            <div className={`flex gap-3 sm:gap-4 w-max px-3 sm:px-4 ${rowIdx === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
              {row.map((logo, i) => (
                <a
                  key={`r${rowIdx}-${logo.id}-${i}`}
                  href={logo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Kunjungi situs web ${logo.name}`}
                  className="partner-logo-card shrink-0 flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-sm"
                  style={{ minWidth: '120px', height: '60px', '@media (min-width: 640px)': { minWidth: '160px', height: '72px' } }}
                >
                  <img
                    src={logo.logoUrl}
                    alt={`Logo ${logo.name}`}
                    loading="lazy"
                    className="h-6 sm:h-8 w-auto max-w-[90px] sm:max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 mt-6 sm:mt-8 px-4">
        ✦ Semua mitra telah melalui proses verifikasi ketat oleh tim NiatBaik
      </p>
    </section>
  );
}
