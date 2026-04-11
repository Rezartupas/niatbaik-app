# 🤍 NiatBaik — Platform Donasi Terpercaya

**Platform donasi online yang transparan, aman, dan berdampak nyata untuk Indonesia**

NiatBaik adalah solusi digital terpadu yang menghubungkan para donatur dengan program-program kemanusiaan terverifikasi. Dengan fokus pada transparansi, keamanan, dan dampak terukur — setiap rupiah yang didonasikan benar-benar sampai ke tangan yang membutuhkan.

🌐 **Live:** [niatbaik.id](https://niatbaik.id)

---

## ✨ Fitur Utama

- **Transparansi Penuh** — Laporan real-time dan dokumentasi langsung dari lapangan
- **Donasi Fleksibel** — Mulai dari Rp 5.000 tanpa minimum pemaksaan
- **Program Terverifikasi** — Ratusan program dari lembaga resmi dan terpercaya
- **Riwayat Dampak** — Pantau hasil donasi melalui email dan WhatsApp
- **Keamanan SSL** — Transaksi terenkripsi dan aman end-to-end
- **Responsif & Aksesibel** — Desain mobile-first dengan ARIA support

---

## 🎯 Platform Highlights

- **Mobile-first Design** — Hero berubah layout, teks & padding menyesuaikan di semua breakpoint
- **Animasi Scroll Reveal** — Elemen muncul elegan saat masuk viewport
- **Animated Counters** — Statistik dampak tampil dengan counter dinamis
- **HeroCarousel** — Slideshow gambar lokal (4 foto penerima manfaat asli)
- **Partner Marquee** — Dua baris logo mitra bergerak berlawanan arah, pause on hover
- **Admin CMS** — Halaman khusus admin dengan autentikasi SHA-256 + session TTL
- **Floating WhatsApp** — Tombol kontak WhatsApp mengambang dengan animasi pulse
- **Scroll-to-Top** — Tombol kembali ke atas muncul setelah scroll 200px
- **Donasi Sekarang** — Semua tombol diarahkan ke campaign niatbaik.id secara langsung

---

## 🛠️ Tech Stack

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **React** | 19.2.4 | Library UI modern dengan hooks |
| **React Router** | 7.14.0 | Client-side routing SPA |
| **Vite** | 8.0.4 | Build tool ultra-cepat dengan HMR |
| **Tailwind CSS** | 4.2.2 | Utility-first CSS framework (v4) |
| **Lucide React** | 1.8.0 | Icon library yang elegan & ringan |
| **ESLint** | 9.39.4 | Code quality & linting |
| **Web Crypto API** | Native | SHA-256 hashing untuk auth admin |

---

## 📁 Struktur Project

```
niatbaik-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navbar fixed, scroll-aware, mobile menu
│   │   ├── Footer.jsx              # Footer responsif 4-kolom
│   │   ├── BackButton.jsx          # Tombol kembali universal
│   │   ├── FloatingActions.jsx     # ★ WhatsApp FAB + Scroll-to-top FAB
│   │   ├── RequireAuth.jsx         # Route guard admin (redirect ke /admin/login)
│   │   └── home/
│   │       ├── HeroCarousel.jsx    # Carousel gambar lokal (gambar-1..4.jpg)
│   │       └── PartnerMarquee.jsx  # Dual-row marquee logo mitra
│   ├── context/
│   │   └── AuthContext.jsx         # React context autentikasi admin
│   ├── pages/
│   │   ├── HomePage.jsx            # Landing page utama (7 sections)
│   │   ├── TentangKamiPage.jsx     # Halaman Tentang Kami
│   │   ├── MitraKamiPage.jsx       # Halaman Mitra Kami
│   │   ├── LegalitasPage.jsx       # Legalitas
│   │   ├── SyaratKetentuanPage.jsx # Syarat & Ketentuan
│   │   ├── PusatBantuanPage.jsx    # Pusat Bantuan / FAQ
│   │   ├── AdminLoginPage.jsx      # ★ Halaman login CMS admin
│   │   └── AdminCMSPage.jsx        # ★ Dashboard CMS admin (protected)
│   ├── hooks/
│   │   ├── useReveal.js            # Intersection Observer → scroll animations
│   │   └── useCounter.js           # Animated number counter hook
│   ├── utils/
│   │   └── auth.js                 # ★ SHA-256 hashing, session, brute-force lock
│   ├── assets/
│   │   ├── Logo-02.png             # Logo NiatBaik
│   │   ├── gambar-1.jpg            # Foto hero carousel 1
│   │   ├── gambar-2.jpg            # Foto hero carousel 2
│   │   ├── gambar-3.jpg            # Foto hero carousel 3
│   │   └── gambar-4.jpg            # Foto hero carousel 4
│   ├── data/
│   │   └── index.js                # Static data (features, stats, testimonials, partners)
│   ├── App.jsx                     # Root router + layout wrapper
│   ├── main.jsx                    # Entry point aplikasi
│   └── index.css                   # Tailwind v4 + custom animations + utilities
├── public/
│   └── favicon.svg
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### Prasyarat
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Instalasi

```bash
# Clone repository
git clone https://github.com/Rezartupas/niatbaik-app.git
cd niatbaik-app

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:5173` dengan Hot Module Replacement (HMR) aktif.

### Production Build

```bash
npm run build
```

Output di folder `dist/` — siap untuk deployment.

### Preview Build

```bash
npm run preview
```

---

## 📋 Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan development server dengan HMR |
| `npm run build` | Build optimized untuk production |
| `npm run lint` | Jalankan ESLint untuk code quality |
| `npm run preview` | Preview production build secara lokal |

---

## 📄 Halaman Aplikasi

### Public Pages

| Path | Komponen | Deskripsi |
|------|----------|-----------|
| `/` | `HomePage` | Landing page — hero, features, stats, how-it-works, marquee, testimonials, CTA |
| `/tentang-kami` | `TentangKamiPage` | Visi misi, tim, nilai platform |
| `/mitra-kami` | `MitraKamiPage` | Daftar lembaga mitra dengan filter kategori |
| `/legalitas` | `LegalitasPage` | Dokumen legal & sertifikasi |
| `/syarat-ketentuan` | `SyaratKetentuanPage` | Terms & conditions, kebijakan privasi |
| `/pusat-bantuan` | `PusatBantuanPage` | FAQ & panduan donasi |

### Admin Pages (Protected)

| Path | Komponen | Deskripsi |
|------|----------|-----------|
| `/admin/login` | `AdminLoginPage` | Login form admin — SHA-256, brute-force lock 15 menit |
| `/admin` | `AdminCMSPage` | Dashboard CMS — stats, program table, activity feed |

**Kredensial admin:**
```
Username : bismillahcinta
Password : bismillahcinta123
```

> ⚠️ Untuk produksi, simpan credential di environment variable dan gunakan backend authentication yang proper.

---

## 🔒 Sistem Autentikasi Admin

Implementasi di `src/utils/auth.js`:

| Fitur | Detail |
|-------|--------|
| **Hashing** | SHA-256 via Web Crypto API (native, no dependency) |
| **Brute-force** | Lockout 15 menit setelah 5 percobaan gagal |
| **Session** | `sessionStorage` — mati ketika tab ditutup |
| **TTL** | Sesi berakhir otomatis setelah **2 jam** |
| **Route guard** | `RequireAuth` redirect ke `/admin/login` |
| **Countdown** | Timer lockout tampil live di halaman login |
| **Logout confirm** | Modal konfirmasi sebelum keluar |

---

## 🔘 FloatingActions Component

Dua tombol mengambang di kanan bawah layar (semua halaman publik):

### WhatsApp FAB
- Ikon WhatsApp resmi (SVG)
- Warna hijau `#25D366` dengan animasi **pulse ring** terus-menerus
- Tooltip "Hubungi Kami" muncul dari kiri saat hover
- Link langsung ke `https://wa.me/6281122334455`
- Bayangan hijau tonjolan shadow

### Scroll-to-Top FAB
- Muncul setelah scroll **200px** ke bawah (animasi slide-in)
- Hilang kembali saat scroll kembali ke atas
- Klik → `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Ikon chevron-up dengan animasi bounce saat hover

Keduanya:
- Touch target minimum **48×48px** (WCAG 2.5.5)
- Aman dari iOS home indicator via `env(safe-area-inset-bottom)`
- `active:scale-90` untuk feedback sentuhan

---

## 🎨 Animasi & Custom CSS (`index.css`)

| Class / Keyframe | Deskripsi |
|------------------|-----------|
| `animate-marquee` | Partner logos scroll kiri → kanan |
| `animate-marquee-reverse` | Partner logos scroll kanan → kiri |
| `.marquee-wrapper:hover` | Pause semua marquee saat hover |
| `nav-link-underline` | Underline gradient slide-in pada nav links |
| `btn-shimmer` | Efek shimmer sweep pada tombol CTA |
| `mobile-menu-enter` | Slide-down animasi mobile menu |
| `partner-logo-card` | Hover lift + glow pada logo mitra |
| `.reveal` / `.visible` | Fade-up scroll reveal per elemen |
| `float-slow` / `float-medium` | Floating orbs di hero |
| `animate-blob` | Breathing blob background |
| `gradient-text-animate` | Gradient text shift animation |
| `counter-pop` | Pop-in animasi pada angka statistik |
| `.scrollbar-hide` | Sembunyikan scrollbar (horizontal carousel) |
| `wa-pulse` | WhatsApp FAB ring pulse |
| `fab-in` | Entrance animation FAB |

---

## 🎭 Custom Hooks

### `useReveal(threshold)`
Intersection Observer yang menambahkan class `.visible` saat elemen masuk viewport:
```jsx
const ref = useReveal(0.1); // trigger saat 10% elemen terlihat
return <div ref={ref} className="reveal">...</div>;
```

### `useCounter(targetValue)`
Animated counter dari 0 ke target value saat masuk viewport:
```jsx
const { count, ref } = useCounter(50);
return <span ref={ref}>{count}+</span>; // count naik dari 0 → 50
```

---

## 📊 Data (`src/data/index.js`)

```javascript
HERO_IMAGES      // 4 foto lokal dari assets/
PARTNER_LOGOS    // 6 lembaga mitra dengan nama, logo, website
PARTNER_CATEGORIES // Filter kategori untuk MitraKamiPage
NAV_LINKS        // Link navigasi navbar
FOOTER_LINKS     // Link footer
CONTACT_LINKS    // { whatsapp: 'wa.me/...', email: 'mailto:...' }
SOCIAL_LINKS     // Facebook, Instagram, TikTok
HOME_FEATURES    // 3 pilar kepercayaan
HOME_STATS       // Statistik dampak (Rp 50M+, 100K+ donatur, dll)
HOME_TESTIMONIALS // 3 testimonial pengguna & penerima manfaat
```

---

## 📱 Responsive Design

| Breakpoint | Lebar | Perilaku |
|------------|-------|----------|
| `xs` (default) | < 640px | Hero stack, 1-col features, horizontal scroll testimonials |
| `sm` | ≥ 640px | CTA buttons row, marquee header row |
| `md` | ≥ 768px | Hero 2-col grid, 3-col features & testimonials, campaign card tampil |
| `lg` | ≥ 1024px | Footer 4-col, hero max font size |

Mobile-specific improvements:
- `flex-col-reverse` pada hero agar gambar tetap di atas konten
- `min-h-[48px]` pada semua item menu mobile
- Body scroll lock saat mobile menu terbuka
- Backdrop overlay untuk dismiss mobile menu via tap outside
- `env(safe-area-inset-bottom)` untuk iOS home indicator

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Self-Hosted
```bash
npm run build
# Upload folder dist/ ke web server
```

> **SPA Routing:** Pastikan server dikonfigurasi untuk mengarahkan semua request ke `index.html` (untuk React Router).

---

## 🌐 Environment Variables

Buat file `.env` di root jika diperlukan:

```env
VITE_API_URL=https://api.niatbaik.id
VITE_WA_NUMBER=6281122334455
```

Akses di kode: `import.meta.env.VITE_API_URL`

---

## 🧪 Code Quality

```bash
npm run lint   # ESLint dengan rules React Hooks + React Refresh
```

---

## 📱 Browser Support

| Browser | Versi Minimum |
|---------|---------------|
| Chrome | Last 2 |
| Firefox | Last 2 |
| Safari | Last 2 |
| Edge | Last 2 |
| Chrome Android | Last 2 |
| Safari iOS | Last 2 |

---

## 📝 Changelog

### v1.0.0 (April 2026)
- ✅ Setup React 19 + Vite 8 + Tailwind CSS v4
- ✅ 6 halaman publik + routing SPA
- ✅ Navbar scroll-aware + mobile menu dengan backdrop dismiss
- ✅ Footer responsif 4-kolom (2-kolom di xs)
- ✅ HomePage 7-section fully responsive
- ✅ HeroCarousel dengan gambar lokal (gambar-1..4.jpg)
- ✅ Partner marquee dual-row dengan pause on hover
- ✅ Scroll reveal & animated counters
- ✅ Horizontal snap scroll testimonials di mobile
- ✅ Tombol "Donasi Sekarang" → `niatbaik.id/campaign/djaz8mlwi9c`
- ✅ Admin CMS page (`/admin`) dengan auth SHA-256
- ✅ Brute-force lockout 15 menit, session TTL 2 jam
- ✅ FloatingActions: WhatsApp FAB pulse + scroll-to-top FAB
- ✅ Global CSS utilities: scrollbar-hide, touch-manipulation, focus-visible ring
- ✅ iOS safe-area-inset untuk floating buttons

---

## 📞 Kontak & Support

| Kanal | Detail |
|-------|--------|
| 📧 Email | halo@niatbaik.id |
| 💬 WhatsApp | [+62 811 223 344 55](https://wa.me/6281122334455) |
| 🌐 Website | [niatbaik.id](https://niatbaik.id) |

---

## 📄 License

Proyek ini dilindungi di bawah **MIT License**.

---

## 🙏 Acknowledgments

- **Lucide Icons** — beautiful, consistent open-source icons
- **Tailwind CSS v4** — next-generation utility-first CSS
- **Vite** — blazing fast build tool
- **React 19** — cutting-edge UI library
- **Web Crypto API** — secure in-browser hashing

---

<div align="center">

**Made with ❤️ for a better Indonesia**

[niatbaik.id](https://niatbaik.id) · [WhatsApp](https://wa.me/6281122334455) · [Email](mailto:halo@niatbaik.id)

</div>
