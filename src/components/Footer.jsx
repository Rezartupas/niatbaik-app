import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { FOOTER_LINKS, SOCIAL_LINKS, CONTACT_LINKS } from '../data';

/** SVG icon paths for social media — keyed by `SOCIAL_LINKS[].id` */
const SOCIAL_ICONS = {
  facebook: (
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  ),
  instagram: (
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  ),
  tiktok: (
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
  ),
};

/**
 * Global site footer — rendered on all pages via the layout.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4" aria-label="NiatBaik – Halaman Utama">
              <img src="/src/assets/Logo-02.png" alt="NiatBaik" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Menghubungkan kebaikan Anda dengan mereka yang membutuhkan. Transparan, aman, dan berdampak.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ id, label, href, hoverColor }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={label}
                  className={`group w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 ${hoverColor} hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1`}
                >
                  <span className="sr-only">{label}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {SOCIAL_ICONS[id]}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Platform</h3>
            <nav className="space-y-3">
              <Link to="/" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Beranda
              </Link>
              <Link to="/mitra-kami" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Mitra Kami
              </Link>
              <Link to="/tentang-kami" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Tentang Kami
              </Link>
              <Link to="/pusat-bantuan" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Pusat Bantuan
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Legal</h3>
            <nav className="space-y-3">
              <Link to="/syarat-ketentuan" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Syarat & Ketentuan
              </Link>
              <Link to="/legalitas" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Legalitas
              </Link>
              <a href="#privacy" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                Kebijakan Privasi
              </a>
              <a href="#faq" className="block text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                FAQ
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Hubungi Kami</h3>
            <div className="space-y-4">
              <a
                href={CONTACT_LINKS.whatsapp}
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200 group"
              >
                <Phone size={16} className="flex-shrink-0 group-hover:animate-bounce" />
                <span>+62 811 223 344 55</span>
              </a>
              <a
                href={CONTACT_LINKS.email}
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200 group"
              >
                <Mail size={16} className="flex-shrink-0" />
                <span>halo@niatbaik.id</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} <span className="font-semibold text-slate-400">Yayasan Niat Baik Indonesia</span>. Semua hak dilindungi.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Dibuat dengan</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>untuk Indonesia</span>
          </div>

          <div className="text-xs text-slate-600">
            v1.0.0
          </div>
        </div>
      </div>

      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </footer>
  );
}
