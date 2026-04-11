# 🤍 NiatBaik - Platform Donasi Terpercaya

**Platform donasi online yang transparan, aman, dan berdampak untuk Indonesia**

NiatBaik adalah solusi digital terpadu untuk menghubungkan para penyumbang dengan program-program kemanusiaan terverifikasi. Dengan fokus pada transparansi dan dampak nyata, kami membuat setiap rupiah donasi benar-benar memberikan perubahan positif.

---

## ✨ Fitur Utama

- **Transparansi Penuh** — Laporan real-time dan dokumentasi langsung dari lapangan
- **Donasi Fleksibel** — Mulai dari Rp 5.000 tanpa minimum pemaksaan
- **Program Terverifikasi** — Ratusan program dari lembaga resmi dan terpercaya
- **Riwayat Dampak** — Pantau hasil donasi melalui email dan WhatsApp
- **Keamanan SSL** — Transaksi terenkripsi dan aman
- **User Experience** — Desain responsif dan intuitif untuk semua perangkat

---

## 🎯 Platform

- **Responsif** — Mobile-first design yang sempurna di semua ukuran layar
- **Real-time Counter** — Animated statistics yang menampilkan dampak secara dinamis
- **Smooth Animations** — Scroll reveal effects untuk visual engagement
- **Aksesibilitas** — ARIA labels dan semantic HTML untuk inklusi pengguna

---

## 🛠️ Tech Stack

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **React** | 19.2.4 | Library UI modern dengan hooks |
| **React Router** | 7.14.0 | Client-side routing SPA |
| **Vite** | 8.0.4 | Build tool ultra-cepat |
| **Tailwind CSS** | 4.2.2 | Utility-first CSS framework |
| **Lucide React** | 1.8.0 | Icon library yang elegan |
| **ESLint** | 9.39.4 | Code quality & linting |

---

## 📁 Struktur Project

```
niatbaik-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar responsif
│   │   ├── Footer.jsx           # Footer dengan links
│   │   ├── BackButton.jsx       # Tombol kembali universal
│   │   └── home/
│   │       ├── HeroCarousel.jsx # Carousel section hero
│   │       └── PartnerMarquee.jsx # Marquee partner logos
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page utama
│   │   ├── TentangKamiPage.jsx  # About us
│   │   ├── MitraKamiPage.jsx    # Partner programs
│   │   ├── LegalitasPage.jsx    # Legal compliance
│   │   ├── SyaratKetentuanPage.jsx # Terms & conditions
│   │   └── PusatBantuanPage.jsx # Help center
│   ├── hooks/
│   │   ├── useReveal.js         # Intersection observer untuk scroll animations
│   │   └── useCounter.js        # Counter animation hook
│   ├── data/
│   │   └── index.js             # Static data (features, stats, testimonials)
│   ├── App.jsx                  # Root router component
│   ├── main.jsx                 # Entry point aplikasi
│   └── index.css                # Tailwind & custom styles
├── public/
│   ├── favicon.svg              # Site favicon
│   └── icons.svg                # Icon sprite
├── vite.config.js               # Konfigurasi Vite
├── tailwind.config.js           # Tailwind customization
├── postcss.config.js            # PostCSS config untuk CSS
├── eslint.config.js             # ESLint rules
├── package.json                 # Dependencies & scripts
└── README.md                    # File ini
```

---

## 🚀 Quick Start

### Prasyarat
- **Node.js** ≥ 16.x
- **npm** atau **yarn**

### Instalasi

```bash
# Clone repository
git clone https://github.com/yourusername/niatbaik-app.git
cd niatbaik-app

# Install dependencies
npm install
# atau jika menggunakan yarn
yarn install
```

### Development Server

```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173` dengan Hot Module Replacement (HMR) aktif.

### Production Build

```bash
npm run build
# atau
yarn build
```

Output akan tersimpan di folder `dist/` siap untuk deployment.

### Preview Build

```bash
npm run preview
# atau
yarn preview
```

---

## 📋 Scripts Tersedia

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan development server dengan HMR |
| `npm run build` | Build optimized untuk production |
| `npm run lint` | Jalankan ESLint untuk code quality |
| `npm run preview` | Preview production build secara lokal |

---

## 📄 Halaman Aplikasi

### 1. **HomePage** (`/`)
Landing page utama dengan:
- Hero section dengan CTA buttons
- Feature pillars (3 pilar kepercayaan)
- Impact statistics dengan animated counters
- How it works explainer
- Partner marquee scrolling
- Testimonial cards
- Final CTA banner

### 2. **TentangKamiPage** (`/tentang-kami`)
Halaman tentang platform NiatBaik:
- Sejarah dan visi misi
- Tim core
- Nilai dan komitmen

### 3. **MitraKamiPage** (`/mitra-kami`)
Program dan lembaga partner:
- List program yang tersedia
- Filter kategori dan lokasi
- Detail program dengan progress bar

### 4. **LegalitasPage** (`/legalitas`)
Dokumen legal dan regulasi:
- Sertifikasi dan izin operasional
- Compliance documentation

### 5. **SyaratKetentuanPage** (`/syarat-ketentuan`)
Terms & Conditions:
- Syarat penggunaan platform
- Kebijakan privasi
- Peraturan donasi

### 6. **PusatBantuanPage** (`/pusat-bantuan`)
FAQ dan support:
- Frequently asked questions
- Panduan donasi step-by-step
- Contact support options

---

## 🎨 Customization

### Tailwind Colors
Edit `tailwind.config.js` untuk customize color palette:

```javascript
// tailwind.config.js
extend: {
  colors: {
    // Tambahkan custom colors di sini
  }
}
```

### Font dan Typography
Font utama: **Poppins** (dari fallback `font-sans`)
Customize di CSS atau Tailwind config.

### Animasi
Custom animations didefinisikan di `index.css`:
- `animate-blob` — Breathing blob animations
- `gradient-text-animate` — Gradient text effect
- `btn-shimmer` — Shimmer button effect

---

## 🔧 Struktur Komponen

### Reusable Components

**Navbar.jsx**
```jsx
- Logo/branding
- Navigation links
- Mobile menu toggle
- Responsive breakpoints
```

**Footer.jsx**
```jsx
- Company info
- Quick links to all pages
- Social media links
- Copyright
```

**BackButton.jsx**
```jsx
- Generic back navigation
- Used across detail pages
```

### Home Sub-components

**HeroCarousel.jsx**
```jsx
- Image carousel dengan autoplay
- Navigation dots/arrows
- Responsive sizing
```

**PartnerMarquee.jsx**
```jsx
- Scrolling partner logos
- Infinite loop animation
- Responsive columns
```

---

## 🎭 Hooks Custom

### useReveal()
Implements Intersection Observer untuk scroll-triggered animations:
```jsx
const ref = useReveal(threshold);
// Element animates in when visible
```

### useCounter()
Animated number counter untuk statistics:
```jsx
const { count, ref } = useCounter(targetValue);
// Counts from 0 to target when scrolled into view
```

---

## 📊 Data Structure

File `src/data/index.js` berisi:

```javascript
// Features untuk homepage
HOME_FEATURES = [
  { icon: 'ShieldCheck', color: 'emerald', title: '...', desc: '...' },
  // ...
]

// Statistics
HOME_STATS = [
  { value: 100000, label: 'Donatur', prefix: '', suffix: '+' },
  // ...
]

// Testimonials
HOME_TESTIMONIALS = [
  { id: 1, name: 'Nama', role: 'Profesi', text: 'Quote...', avatar: 'url', rating: 5 },
  // ...
]
```

---

## 🚢 Deployment

### Opsi 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Opsi 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Opsi 3: GitHub Pages
```bash
npm run build
# Push folder dist/ ke gh-pages branch
```

### Opsi 4: Self-hosted
```bash
npm run build
# Upload `dist/` folder ke web server
```

---

## 🌐 Environment Variables

Buat file `.env` jika diperlukan untuk konfigurasi:

```env
VITE_API_URL=https://api.niatbaik.com
VITE_DONATION_MIN=5000
```

Akses di code: `import.meta.env.VITE_API_URL`

---

## 🧪 Testing & Quality

### ESLint
```bash
npm run lint
```

Konfigurasi di `eslint.config.js` mengikuti:
- React best practices
- React Hooks rules
- Code quality standards

---

## 📱 Browser Support

| Browser | Min Version |
|---------|-------------|
| Chrome | Latest 2 |
| Firefox | Latest 2 |
| Safari | Latest 2 |
| Edge | Latest 2 |

---

## 🤝 Contributing

Kontribusi sangat diterima! Untuk berkontribusi:

1. **Fork** repository
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Development Guidelines
- Follow existing code style
- Write semantic HTML dengan ARIA labels
- Ensure responsive design
- Test di mobile, tablet, desktop
- Update documentation jika ada perubahan struktur

---

## 🐛 Known Issues

Tidak ada issue kritis saat ini. Jika menemukan bug, silakan buat issue di repository.

---

## 📝 Changelog

### v0.0.0 (Initial Release - 2024)
- ✅ Setup React + Vite + Tailwind
- ✅ Homepage dengan hero, features, stats, testimonials
- ✅ Navbar & Footer responsif
- ✅ Routing untuk 6 halaman utama
- ✅ Scroll animations & scroll-triggered counters
- ✅ Mobile-first responsive design

---

## 📞 Support

- 📧 Email: support@niatbaik.com
- 💬 WhatsApp: +62-xxx-xxxx-xxxx
- 🐛 Issues: Buat issue di GitHub
- 📖 Dokumentasi: Lihat file doc/ folder

---

## 📄 License

Proyek ini dilindungi di bawah **MIT License**. Lihat file `LICENSE` untuk detail.

---

## 🙏 Acknowledgments

- **Lucide Icons** — beautiful, consistent icons
- **Tailwind CSS** — utility-first CSS framework
- **Vite** — next generation build tool
- **React Community** — inspirasi dan best practices

---

<div align="center">

**Made with ❤️ for impact and transparency**

[Kunjungi NiatBaik](https://niatbaik.com) | [GitHub](https://github.com/your-repo) | [Contact](mailto:support@niatbaik.com)

</div>
