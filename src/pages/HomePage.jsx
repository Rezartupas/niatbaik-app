import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent, trackDonateClick, trackViewPrograms } from '../utils/analytics';
import {
  Heart, ShieldCheck, TrendingUp, ChevronRight,
  Zap, Users, Globe, ArrowRight, Star, Quote,
} from 'lucide-react';
import { HOME_FEATURES, HOME_STATS, HOME_TESTIMONIALS } from '../data';
import { useReveal } from '../hooks/useReveal';
import { useCounter } from '../hooks/useCounter';
import HeroCarousel from '../components/home/HeroCarousel';
import PartnerMarquee from '../components/home/PartnerMarquee';

// ─── Feature colour map ───────────────────────────────────────────────────────
const FEATURE_COLOR_MAP = {
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-600', border: 'border-emerald-100' },
  sky:     { bg: 'bg-sky-50',     icon: 'bg-sky-100 text-sky-600',         border: 'border-sky-100' },
  violet:  { bg: 'bg-violet-50',  icon: 'bg-violet-100 text-violet-600',   border: 'border-violet-100' },
};

const FEATURE_ICON_MAP = { ShieldCheck, Zap, Globe, TrendingUp };

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * StatCard — animated counter card. Mobile-first padding & font sizing.
 */
function StatCard({ value, suffix, label, prefix, delay }) {
  const { count, ref } = useCounter(value);
  return (
    <div
      ref={ref}
      className={`reveal feature-card bg-white rounded-2xl p-5 sm:p-6 text-center border border-slate-100 shadow-sm ${delay}`}
    >
      <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 gradient-text-animate leading-none">
        {prefix}{count}{suffix}
      </p>
      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">{label}</p>
    </div>
  );
}

/**
 * TestimonialCard — quote card with author info and star rating.
 * Uses full width on mobile, column grid on md+.
 */
function TestimonialCard({ t, delay }) {
  const ref = useReveal(0.1);
  return (
    <article
      ref={ref}
      className={`reveal feature-card bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col h-full ${delay}`}
    >
      <Quote size={24} className="text-sky-200 mb-3 flex-shrink-0" aria-hidden="true" />
      <p className="text-slate-600 text-sm leading-relaxed flex-1 italic">{t.text}</p>
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100">
        <img
          src={t.avatar}
          alt={t.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">{t.name}</p>
          <p className="text-xs text-slate-400 truncate">{t.role}</p>
        </div>
        <div className="ml-auto flex gap-0.5 flex-shrink-0" aria-label={`Rating ${t.rating} bintang`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={12} className="text-amber-400 fill-amber-400" aria-hidden="true" />
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

/**
 * HomePage — fully responsive landing experience for NiatBaik.
 *
 * Mobile improvements:
 *  - Hero: single-column stack; carousel moves below copy on mobile
 *  - Reduced top padding on mobile to prevent oversized empty space
 *  - All CTA buttons are full-width on mobile, auto-width on sm+
 *  - Social proof row wraps cleanly on xs
 *  - Stats grid: 2-col on xs, 4-col on md
 *  - Feature grid: 1-col xs, 3-col md
 *  - How-it-works: single column on mobile
 *  - Testimonials: 1-col xs, 3-col md, scrollable on xs via snap
 *  - CTA section vertical padding scaled down on mobile
 */
export default function HomePage() {
  const heroRef     = useReveal(0.05);
  const featuresRef = useReveal(0.1);
  const statsRef    = useReveal(0.1);
  const aboutRef    = useReveal(0.1);
  const testiRef    = useReveal(0.1);

  useEffect(() => {
    trackEvent('ViewPage', { page_name: 'Homepage NiatBaik' });
  }, []);

  return (
    <main className="overflow-x-hidden">

      {/* ═══════════ 1. HERO ═══════════ */}
      <section
        ref={heroRef}
        aria-labelledby="hero-heading"
        className="reveal relative pt-28 pb-14 sm:pt-36 md:pt-44 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Ambient blobs — smaller on mobile so they don't crowd content */}
        <div className="absolute top-20 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none" aria-hidden="true" />
        <div className="absolute top-40 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-delay pointer-events-none" aria-hidden="true" />

        {/*
          Two-column on md+; single column on mobile.
          On mobile the carousel renders BELOW the copy via flex-col-reverse (visual order).
        */}
        <div className="relative flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:gap-14 items-center">

          {/* ── Copy ── */}
          <div className="space-y-6 md:space-y-7">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-semibold shadow-sm">
              <ShieldCheck size={15} aria-hidden="true" />
              Platform Donasi Terpercaya #1 di Indonesia
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight"
            >
              Wujudkan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500 gradient-text-animate">
                Niat Baikmu
              </span>
              ,<br />
              Ubah Hidup Mereka<br className="hidden sm:block" /> Hari Ini.
            </h1>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-md">
              Setiap rupiah yang kamu donasikan menciptakan senyum nyata. Platform kami memastikan donasi tersalurkan dengan{' '}
              <strong className="text-slate-700 font-semibold">transparan, cepat, dan tepat sasaran</strong>.
            </p>

            {/* CTA buttons — stack on xs, row on sm+ */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="https://niatbaik.id/campaign/djaz8mlwi9c"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDonateClick('Hero Section')}
                className="btn-shimmer inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-extrabold text-base transition-all duration-300 shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/40 hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
              >
                <Heart size={20} fill="currentColor" className="animate-pulse" aria-hidden="true" />
                Donasi Sekarang
              </a>
              <a
                href="https://niatbaik.id/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackViewPrograms('Hero Section')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base text-slate-700 border border-slate-200 bg-white hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50 transition-all shadow-sm hover:shadow-md active:scale-95 w-full sm:w-auto"
              >
                Pilih Program <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            {/* Social proof avatars */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-4 border-t border-slate-100">
              <div className="flex -space-x-3 flex-shrink-0" aria-hidden="true">
                {[11, 12, 13, 14, 15].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white object-cover shadow-sm"
                    src={`https://i.pravatar.cc/80?img=${i}`}
                    alt=""
                  />
                ))}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 mb-0.5" aria-label="Rating 4.9 dari 5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">4.9/5</span>
                </div>
                <p className="text-sm font-bold text-slate-900">100.000+ Orang Baik</p>
                <p className="text-xs text-slate-400">Telah bergabung dan mempercayai kami</p>
              </div>
            </div>
          </div>

          {/* ── Carousel ── */}
          <HeroCarousel />
        </div>
      </section>

      {/* ═══════════ 2. FEATURE PILLARS ═══════════ */}
      <section
        ref={featuresRef}
        aria-labelledby="features-heading"
        className="reveal py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-2">Mengapa NiatBaik?</p>
            <h2
              id="features-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900"
            >
              Donasi yang Berdampak Nyata
            </h2>
          </div>

          {/* 1-col on mobile, 3-col on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {HOME_FEATURES.map((feat, i) => {
              const Icon   = FEATURE_ICON_MAP[feat.icon];
              const colors = FEATURE_COLOR_MAP[feat.color];
              return (
                <div
                  key={feat.title}
                  className={`feature-card reveal reveal-delay-${i + 1} rounded-2xl p-6 sm:p-7 border ${colors.border} ${colors.bg}`}
                >
                  <div className={`inline-flex p-3 rounded-xl ${colors.icon} mb-4 sm:mb-5`} aria-hidden="true">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ 3. IMPACT STATS ═══════════ */}
      <section
        ref={statsRef}
        aria-labelledby="stats-heading"
        className="reveal py-12 sm:py-16 bg-white border-y border-slate-100"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">Dampak NiatBaik dalam Angka</h2>
          {/* 2-col on xs, 4-col on md */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {HOME_STATS.map((s, i) => (
              <StatCard key={s.label} {...s} delay={`reveal-delay-${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4. HOW IT WORKS ═══════════ */}
      <section
        id="tentang-kami"
        ref={aboutRef}
        aria-labelledby="how-heading"
        className="reveal py-16 sm:py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Single column on mobile, two columns on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Steps */}
            <div className="space-y-7 sm:space-y-8">
              <div>
                <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-2">Cara Kerja</p>
                <h2
                  id="how-heading"
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight"
                >
                  3 Langkah Mudah untuk Berbagi Kebaikan
                </h2>
              </div>

              {[
                { step: '01', title: 'Pilih Program', desc: 'Telusuri ratusan program dari lembaga terverifikasi. Filter berdasarkan kategori atau lokasi.' },
                { step: '02', title: 'Tentukan Nominal', desc: 'Tidak ada minimum donasi. Donasi mulai Rp 5.000 sudah bisa memberikan dampak nyata.' },
                { step: '03', title: 'Pantau Dampaknya', desc: 'Terima laporan real-time dan foto dokumentasi langsung ke email atau WhatsApp Anda.' },
              ].map((item, idx) => (
                <div key={item.step} className={`reveal reveal-delay-${idx + 1} flex gap-4 sm:gap-5 items-start`}>
                  <div
                    className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-md shadow-sky-500/20"
                    aria-hidden="true"
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}

              {/* CTA link — full width on mobile */}
              <a
                href="https://niatbaik.id/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackViewPrograms('Langkah Mudah Section')}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-sky-500 text-sky-600 hover:bg-sky-50 hover:shadow-md px-7 py-3 rounded-full font-bold transition-all text-sm active:scale-95 w-full sm:w-auto"
              >
                Pilih Program Sekarang <ChevronRight size={16} aria-hidden="true" />
              </a>
            </div>

            {/* Campaign card preview — visible on md+, hidden on mobile */}
            <div className="relative hidden md:block" aria-hidden="true">
              <div className="absolute top-4 left-4 right-4 bottom-0 bg-gradient-to-br from-sky-100 to-emerald-50 rounded-3xl rotate-2" />
              <div className="relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80"
                  alt=""
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Kemanusiaan · Aktif</span>
                    <span className="text-xs text-slate-400 font-medium">12 hari lagi</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug">Bantu Perbaikan Gizi Untuk Anak Pelosok</h3>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span className="font-semibold text-slate-700">Rp 85.500.000</span>
                      <span>57% dari Rp 150jt</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[57%] bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users size={13} />
                    <span>1.240 donatur telah membantu</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ 5. PARTNER MARQUEE ═══════════ */}
      <PartnerMarquee />

      {/* ═══════════ 6. TESTIMONIALS ═══════════ */}
      <section
        ref={testiRef}
        aria-labelledby="testi-heading"
        className="reveal py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-2">Kata Mereka</p>
            <h2
              id="testi-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900"
            >
              Dipercaya oleh Ribuan Orang Baik
            </h2>
          </div>

          {/*
            Mobile: horizontal scroll snapping so all 3 cards are reachable.
            md+: regular 3-column grid.
          */}
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 scrollbar-hide">
            {HOME_TESTIMONIALS.map((t, i) => (
              <div key={t.id} className="snap-start flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-auto">
                <TestimonialCard t={t} delay={`reveal-delay-${i + 1}`} />
              </div>
            ))}
          </div>

          {/* Mobile scroll hint dots */}
          <div className="flex justify-center gap-1.5 mt-4 md:hidden" aria-hidden="true">
            {HOME_TESTIMONIALS.map((_, i) => (
              <span key={i} className={`block h-1.5 rounded-full ${i === 0 ? 'w-4 bg-sky-500' : 'w-1.5 bg-slate-300'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7. CTA BANNER ═══════════ */}
      <section aria-labelledby="cta-heading" className="py-20 sm:py-28 relative overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-500 to-emerald-500" aria-hidden="true" />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }}
          aria-hidden="true"
        />
        {/* Blobs — offset further so they don't clip on narrow screens */}
        <div className="absolute -top-20 -right-20 w-64 sm:w-80 h-64 sm:h-80 bg-white/10 animate-blob" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-400/20 animate-blob-delay" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs sm:text-sm font-semibold mb-5 sm:mb-6 border border-white/20">
            <Heart size={13} fill="currentColor" aria-hidden="true" />
            Bergabung bersama 100.000+ donatur
          </div>

          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight"
          >
            Jangan Tunda<br />Niat Baikmu.
          </h2>

          <p className="text-sky-100 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Setiap detik ada seseorang yang menunggu bantuan. Mulai dari Rp 5.000 — kebaikan Anda nyata dan terasa.
          </p>

          {/* Buttons — stacked on xs, row on sm+ */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <a
              href="https://niatbaik.id/campaign/djaz8mlwi9c"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDonateClick('Bottom CTA Banner')}
              className="btn-shimmer inline-flex items-center justify-center gap-2 bg-white text-sky-600 hover:bg-slate-50 px-10 py-4 rounded-full font-extrabold text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
            >
              <Heart size={18} fill="currentColor" aria-hidden="true" />
              Mulai Donasi Sekarang
            </a>
            <a
              href="https://niatbaik.id/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackViewPrograms('Bottom CTA Banner')}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/60 text-white hover:bg-white/10 hover:border-white px-10 py-4 rounded-full font-bold text-base transition-all active:scale-95 w-full sm:w-auto"
            >
              Lihat Program <ChevronRight size={18} aria-hidden="true" />
            </a>
          </div>

          {/* Trust micro-copy */}
          <div className="flex justify-center gap-4 sm:gap-8 mt-10 sm:mt-12 text-white/70 text-xs flex-wrap" role="list">
            {['🔒 Transaksi Aman SSL', '✓ 100% Dana Tersalurkan', '📋 Laporan Transparan'].map((item) => (
              <span key={item} className="font-medium" role="listitem">{item}</span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
