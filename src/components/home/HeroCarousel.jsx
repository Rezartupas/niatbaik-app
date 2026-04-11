/**
 * HeroCarousel — auto-advancing image slideshow for the hero section.
 *
 * Mobile improvements:
 *  - Height is responsive: shorter on mobile (h-60 sm), taller on md+
 *  - Floating stat badge repositioned so it doesn't clip off-screen on mobile
 *  - Verified badge hidden on xs to reduce clutter
 *  - touch-friendly dot indicators (larger tap targets)
 */
import { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle } from 'lucide-react';
import { HERO_IMAGES } from '../../data';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Decorative rotated background */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 rounded-3xl transform rotate-2 scale-105 opacity-60 float-slow"
        aria-hidden="true"
      />

      {/* Main image frame — responsive height */}
      <div className="relative rounded-3xl shadow-2xl h-60 sm:h-80 md:h-[420px] lg:h-[480px] w-full overflow-hidden ring-1 ring-slate-200">
        {HERO_IMAGES.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
              ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          />
        ))}

        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"
          aria-hidden="true"
        />

        {/* Dot indicators — larger tap target on mobile */}
        <div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10"
          role="tablist"
          aria-label="Slide indicators"
        >
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              /* Larger invisible hit area for touch */
              className={`h-2.5 sm:h-2 rounded-full transition-all duration-300 touch-manipulation
                ${index === currentSlide ? 'w-7 bg-white' : 'w-2.5 sm:w-2 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>

      {/* Floating stat badge — inset on mobile to avoid overflow */}
      <div
        className="absolute bottom-0 left-0 translate-y-4 -translate-x-1 sm:-translate-x-5 sm:-bottom-5 sm:-left-5 bg-white p-3 sm:p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 sm:gap-3 z-20 max-w-[180px] sm:max-w-none"
        aria-label="Total donasi tersalurkan lebih dari Rp 50 Miliar"
      >
        <div className="bg-emerald-100 p-2 sm:p-2.5 rounded-xl text-emerald-600 flex-shrink-0" aria-hidden="true">
          <TrendingUp size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Tersalurkan</p>
          <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-none">Rp 50+ Miliar</p>
        </div>
      </div>

      {/* Floating "Verified" badge — hidden on xs to reduce clutter */}
      <div className="hidden sm:flex absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg items-center gap-1.5 z-20 float-medium">
        <CheckCircle size={13} aria-hidden="true" />
        Terverifikasi Resmi
      </div>
    </div>
  );
}
