import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, MessageCircle, Mail, Heart } from 'lucide-react';
import { NAV_LINKS, CONTACT_LINKS } from '../data';

/**
 * Global navigation bar — fixed at the top of every page.
 *
 * Enhancements:
 *  - Scroll-aware: compact/shrinks after 60px scroll with subtle shadow
 *  - Active NavLink with gradient underline slide animation
 *  - CTA button with shimmer sweep effect
 *  - Hamburger ↔ X icon animated crossfade
 *  - Mobile menu slides in smoothly
 *  - Dropdown with scale + opacity spring, richer sub-labels
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink navbar after 60px scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileContactOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out
        ${scrolled
          ? 'h-14 bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-900/5 border-b border-slate-100'
          : 'h-20 bg-white/90 backdrop-blur-md border-b border-slate-100/80'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">

          {/* ── Logo ── */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            aria-label="NiatBaik – Halaman Utama"
            className="flex-shrink-0 flex items-center group"
          >
            <img
              src="src/assets/Logo-02.png"
              alt="NiatBaik"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'} group-hover:opacity-80`}
            />
          </Link>

          {/* ── Desktop Menu ── */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link-underline text-sm font-semibold transition-colors duration-200 pb-1
                   ${isActive ? 'text-sky-600 active' : 'text-slate-600 hover:text-slate-900'}`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Hubungi Kami Dropdown */}
            <div className="relative group">
              <button
                className="nav-link-underline flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900 py-1 transition-colors focus:outline-none"
                aria-haspopup="true"
              >
                Hubungi Kami
                <ChevronDown
                  size={15}
                  className="transition-transform duration-300 group-hover:rotate-180 text-slate-400"
                />
              </button>

              {/* Dropdown panel */}
              <div
                role="menu"
                className="absolute left-0 top-full pt-3 w-60 pointer-events-none group-hover:pointer-events-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 overflow-hidden
                                opacity-0 invisible translate-y-1 scale-95
                                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100
                                transition-all duration-200 ease-out origin-top">
                  <a
                    role="menuitem"
                    href={CONTACT_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex-shrink-0">
                      <MessageCircle size={16} />
                    </span>
                    <span>
                      <span className="block font-semibold">WhatsApp Admin</span>
                      <span className="block text-xs text-slate-400">Chat langsung</span>
                    </span>
                  </a>
                  <div className="h-px bg-slate-50 mx-4" />
                  <a
                    role="menuitem"
                    href={CONTACT_LINKS.email}
                    className="flex items-center gap-3 px-4 py-3.5 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex-shrink-0">
                      <Mail size={16} />
                    </span>
                    <span>
                      <span className="block font-semibold">Email Kami</span>
                      <span className="block text-xs text-slate-400">halo@niatbaik.id</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Button with shimmer */}
            <a
              href="https://niatbaik.id/campaign/djaz8mlwi9c"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-600 hover:to-sky-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-px"
            >
              <Heart size={14} fill="currentColor" className="animate-pulse" aria-hidden="true" />
              Donasi Sekarang
            </a>
          </div>

          {/* ── Mobile Hamburger (crossfade icon) ── */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-all focus:outline-none"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <span className={`absolute transition-all duration-200 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`}>
              <X size={22} />
            </span>
            <span className={`absolute transition-all duration-200 ${isMobileMenuOpen ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}>
              <Menu size={22} />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Panel ── */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu-enter md:hidden absolute top-full w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl"
        >
          <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-1">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all
                   ${isActive
                     ? 'text-sky-600 bg-sky-50 border border-sky-100'
                     : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                   }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Mobile Hubungi Kami accordion */}
            <div>
              <button
                onClick={() => setIsMobileContactOpen((prev) => !prev)}
                aria-expanded={isMobileContactOpen}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-xl transition-all focus:outline-none"
              >
                Hubungi Kami
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-300 ${isMobileContactOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileContactOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="mx-4 mb-2 rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                  <a
                    href={CONTACT_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex-shrink-0">
                      <MessageCircle size={15} />
                    </span>
                    WhatsApp Admin
                  </a>
                  <a
                    href={CONTACT_LINKS.email}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex-shrink-0">
                      <Mail size={15} />
                    </span>
                    halo@niatbaik.id
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="pt-3 px-1">
              <a
                href="https://niatbaik.id/campaign/djaz8mlwi9c"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="btn-shimmer flex items-center justify-center gap-2 w-full bg-gradient-to-r from-sky-500 to-sky-400 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-md shadow-sky-500/25"
              >
                <Heart size={15} fill="currentColor" aria-hidden="true" />
                Donasi Sekarang
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
