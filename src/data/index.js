/**
 * Central data store for static/mock content used across the application.
 * Replace these with real API calls when the backend is ready.
 */

export const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
    alt: 'Penerima manfaat 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1593113580332-ceb4b1c855a9?auto=format&fit=crop&w=1000&q=80',
    alt: 'Penerima manfaat 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?auto=format&fit=crop&w=1000&q=80',
    alt: 'Penerima manfaat 3',
  },
  {
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    alt: 'Penerima manfaat 4',
  },
];


/**
 * Partner data — replace with real partner info when available.
 * Each entry: { id, name, category, description, website, logoUrl }
 */
export const PARTNER_LOGOS = [
  {
    id: 1,
    name: 'Yayasan Rumah Zakat',
    category: 'Lembaga Zakat',
    description: 'Lembaga amil zakat nasional yang berfokus pada pemberdayaan ekonomi dan sosial masyarakat kurang mampu di seluruh Indonesia.',
    website: 'https://www.rumahzakat.org',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
  },
  {
    id: 2,
    name: 'Dompet Dhuafa',
    category: 'NGO Sosial',
    description: 'Organisasi filantropi Islam terkemuka yang melayani kaum dhuafa melalui program pendidikan, kesehatan, dan ekonomi produktif.',
    website: 'https://www.dompetdhuafa.org',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1024px-Google_2015_logo.svg.png',
  },
  {
    id: 3,
    name: 'UNICEF Indonesia',
    category: 'Lembaga Internasional',
    description: 'Badan PBB yang berdedikasi untuk memenuhi hak-hak anak di Indonesia, khususnya dalam bidang gizi, pendidikan, dan perlindungan anak.',
    website: 'https://www.unicef.org/indonesia',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png',
  },
  {
    id: 4,
    name: 'Yayasan Peduli Anak',
    category: 'Yayasan Panti Asuhan',
    description: 'Yayasan yang mengelola jaringan panti asuhan di Jawa dan Bali, memberikan rumah, pendidikan, dan kasih sayang bagi anak-anak yatim piatu.',
    website: 'https://example.com/peduli-anak',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/512px-Bootstrap_logo.svg.png',
  },
  {
    id: 5,
    name: 'Lembaga Kesehatan Nusantara',
    category: 'Kesehatan',
    description: 'Menyediakan layanan kesehatan gratis dan bersubsidi untuk masyarakat prasejahtera di daerah 3T (tertinggal, terdepan, terluar).',
    website: 'https://example.com/lkn',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png',
  },
  {
    id: 6,
    name: 'Gerakan Literasi Bangsa',
    category: 'Pendidikan',
    description: 'Komunitas relawan yang mendistribusikan buku dan membangun perpustakaan desa di kawasan-kawasan terpencil Indonesia.',
    website: 'https://example.com/glb',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
  },
];

/** Categories for the Mitra Kami filter bar — derived from PARTNER_LOGOS */
export const PARTNER_CATEGORIES = ['Semua', 'Lembaga Zakat', 'NGO Sosial', 'Lembaga Internasional', 'Yayasan Panti Asuhan', 'Kesehatan', 'Pendidikan'];

export const NAV_LINKS = [
  { label: 'Tentang Kami', to: '/tentang-kami' },
  { label: 'Mitra Kami', to: '/mitra-kami' },
  { label: 'Legalitas', to: '/legalitas' },
];

export const FOOTER_LINKS = [
  { label: 'Tentang Kami', to: '/tentang-kami' },
  { label: 'Syarat & Ketentuan', to: '/syarat-ketentuan' },
  { label: 'Pusat Bantuan', to: '/pusat-bantuan' },
];

export const CONTACT_LINKS = {
  whatsapp: 'https://wa.me/6281122334455',
  email: 'mailto:halo@niatbaik.id',
};

export const SOCIAL_LINKS = [
  { id: 'facebook', label: 'Facebook', href: '#facebook', hoverColor: 'hover:bg-sky-600' },
  { id: 'instagram', label: 'Instagram', href: '#instagram', hoverColor: 'hover:bg-pink-600' },
  { id: 'tiktok', label: 'TikTok', href: '#tiktok', hoverColor: 'hover:bg-black' },
];

/**
 * Feature pillars displayed on the HomePage.
 * Each entry: { icon (string — lucide name), color, title, desc }
 * @type {Array<{icon: string, color: string, title: string, desc: string}>}
 */
export const HOME_FEATURES = [
  {
    icon: 'ShieldCheck',
    color: 'emerald',
    title: 'Terverifikasi & Aman',
    desc: 'Setiap lembaga mitra telah melalui proses due-diligence ketat. Donasi Anda aman 100% hingga penerima manfaat.',
  },
  {
    icon: 'Zap',
    color: 'sky',
    title: 'Proses Cepat & Mudah',
    desc: 'Hanya 3 langkah: pilih program, masukkan nominal, konfirmasi. Donasi selesai dalam 60 detik.',
  },
  {
    icon: 'Globe',
    color: 'violet',
    title: 'Dampak Nyata & Terukur',
    desc: 'Laporan penyaluran dikirim langsung ke email Anda. Lihat bukti nyata kebaikan yang Anda ciptakan.',
  },
];

/**
 * Impact statistics displayed on the HomePage with animated counters.
 * @type {Array<{value: number, suffix: string, label: string, prefix: string}>}
 */
export const HOME_STATS = [
  { value: 50,  suffix: '+',  label: 'Miliar Disalurkan', prefix: 'Rp ' },
  { value: 100, suffix: 'K+', label: 'Donatur Aktif',     prefix: '' },
  { value: 40,  suffix: '+',  label: 'Mitra Lembaga',     prefix: '' },
  { value: 98,  suffix: '%',  label: 'Tersalurkan Tepat', prefix: '' },
];

/**
 * Testimonials displayed on the HomePage.
 * @type {Array<{id: number, text: string, name: string, role: string, avatar: string, rating: number}>}
 */
export const HOME_TESTIMONIALS = [
  {
    id: 1,
    text: '"Luar biasa! Dalam 10 menit saya bisa berdonasi dan langsung mendapat notifikasi penyaluran. Ini yang saya cari selama ini — platform donasi yang beneran transparan."',
    name: 'Budi Santoso',
    role: 'Donatur Rutin sejak 2023',
    avatar: 'https://i.pravatar.cc/80?img=11',
    rating: 5,
  },
  {
    id: 2,
    text: '"Kami mendapat bantuan renovasi mushola desa lewat NiatBaik. Prosesnya profesional, petugas responsif, dan laporannya lengkap. Sungguh amanah."',
    name: 'Pak Rustam',
    role: 'Penerima Manfaat, Kalimantan Timur',
    avatar: 'https://i.pravatar.cc/80?img=52',
    rating: 5,
  },
  {
    id: 3,
    text: '"Sebagai yayasan mitra, kami merasakan manfaat nyata. Donatur bertambah 3x lipat sejak bergabung. Sistem pelaporan mereka sangat memudahkan kami."',
    name: 'Ibu Sari Wulandari',
    role: 'Direktur Yayasan Peduli Anak NTT',
    avatar: 'https://i.pravatar.cc/80?img=44',
    rating: 5,
  },
];
