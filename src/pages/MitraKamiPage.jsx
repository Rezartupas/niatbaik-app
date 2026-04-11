import { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import BackButton from '../components/BackButton';
import { PARTNER_LOGOS, PARTNER_CATEGORIES } from '../data';


// ─── Category colour map ──────────────────────────────────────────────────────
// Maps each category to a Tailwind colour pair [badge bg, badge text].
const CATEGORY_COLORS = {
  'Lembaga Zakat':       ['bg-amber-100',   'text-amber-700'],
  'NGO Sosial':          ['bg-emerald-100',  'text-emerald-700'],
  'Lembaga Internasional':['bg-blue-100',    'text-blue-700'],
  'Yayasan Panti Asuhan':['bg-purple-100',   'text-purple-700'],
  'Kesehatan':           ['bg-rose-100',     'text-rose-700'],
  'Pendidikan':          ['bg-sky-100',      'text-sky-700'],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Category badge pill */
function CategoryBadge({ category }) {
  const [bg, text] = CATEGORY_COLORS[category] ?? ['bg-slate-100', 'text-slate-600'];
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
      {category}
    </span>
  );
}

/**
 * Individual partner card.
 * The entire card is wrapped in an <a> for keyboard/click accessibility,
 * but the logo image itself gets a descriptive alt text.
 */
function PartnerCard({ partner }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">

      {/* Logo area */}
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Kunjungi situs web ${partner.name} (membuka tab baru)`}
        className="flex items-center justify-center bg-slate-50 group-hover:bg-sky-50 transition-colors px-10 py-8 border-b border-slate-100"
      >
        {/* Skeleton shimmer while image loads */}
        {!imgLoaded && (
          <div className="w-36 h-12 rounded-md bg-slate-200 animate-pulse" aria-hidden="true" />
        )}
        <img
          src={partner.logoUrl}
          alt={`Logo ${partner.name}`}
          loading="lazy"
          width={144}
          height={48}
          onLoad={() => setImgLoaded(true)}
          className={`h-12 w-auto max-w-[144px] object-contain transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
        />
      </a>

      {/* Info area */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <CategoryBadge category={partner.category} />
        </div>
        <h2 className="text-base font-bold text-slate-900 mb-2 leading-snug">
          {partner.name}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed flex-1">
          {partner.description}
        </p>

        {/* CTA link */}
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Kunjungi ${partner.name}`}
          className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors group/link"
        >
          Kunjungi Website
          <ExternalLink
            size={14}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>
    </article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

/**
 * Mitra Kami page — showcases all partner organisations with filtering.
 *
 * Features:
 *  - Live search by partner name
 *  - Category filter bar
 *  - Lazy-loaded logos with skeleton placeholder
 *  - Accessible: descriptive alt texts, ARIA labels, keyboard-navigable links
 */
export default function MitraKamiPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [query, setQuery] = useState('');

  const filtered = PARTNER_LOGOS.filter((p) => {
    const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchesQuery    = p.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 mb-4">
        <BackButton />
      </div>

      {/* ── Page Header ── */}
      <header className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold mb-4 uppercase tracking-wider">
          Mitra Kami
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          Bersama Lembaga{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
            Terpercaya
          </span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          NiatBaik bermitra resmi dengan lembaga-lembaga sosial, NGO, dan yayasan terkurasi yang memiliki rekam jejak transparan dan amanah di seluruh Indonesia.
        </p>
      </header>

      {/* ── Trust Stats Bar ── */}
      <div className="max-w-4xl mx-auto mb-14">
        <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-sky-600 to-emerald-500 rounded-2xl p-6 text-white text-center shadow-lg shadow-sky-500/20">
          {[
            { value: `${PARTNER_LOGOS.length}+`, label: 'Mitra Aktif' },
            { value: '15+',  label: 'Provinsi Terjangkau' },
            { value: '100%', label: 'Terverifikasi Resmi' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl md:text-3xl font-extrabold">{value}</p>
              <p className="text-sky-100 text-xs md:text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* ── Filters & Search ── */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10">

          {/* Category Filter */}
          <div role="group" aria-label="Filter kategori mitra" className="flex flex-wrap gap-2">
            {PARTNER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                  activeCategory === cat
                    ? 'bg-sky-500 border-sky-500 text-white shadow-md shadow-sky-500/30'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Cari nama lembaga…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Cari mitra berdasarkan nama"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow"
            />
          </div>
        </div>

        {/* ── Partner Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="py-24 text-center">
            <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
            <p className="text-lg font-semibold text-slate-700 mb-2">Lembaga tidak ditemukan</p>
            <p className="text-slate-500 text-sm">
              Coba kata kunci lain atau pilih kategori yang berbeda.
            </p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('Semua'); }}
              className="mt-6 px-5 py-2.5 rounded-full bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* ── CTA — Become a Partner ── */}
        <div className="mt-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" aria-hidden="true" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Ingin Lembaga Anda Bergabung?
            </h2>
            <p className="text-slate-300 leading-relaxed max-w-xl mx-auto mb-8">
              Daftarkan lembaga Anda sebagai mitra resmi NiatBaik dan jangkau ribuan donatur yang siap menyalurkan bantuan melalui program Anda.
            </p>
            <a
              href="mailto:mitra@niatbaik.id"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg shadow-sky-500/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              Hubungi Kami untuk Bermitra
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
