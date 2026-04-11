import BackButton from '../components/BackButton';

const TERMS = [
  {
    title: '1. Penerimaan Ketentuan',
    content:
      'Dengan menggunakan platform NiatBaik, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku. Platform ini dioperasikan oleh Yayasan Niat Baik Indonesia.',
  },
  {
    title: '2. Penggunaan Platform',
    content:
      'NiatBaik hanya diperuntukkan bagi program penggalangan dana sosial yang sah dan tidak bertentangan dengan hukum yang berlaku di Indonesia. Penyalahgunaan platform dapat mengakibatkan penonaktifan akun.',
  },
  {
    title: '3. Privasi dan Keamanan Data',
    content:
      'Kami berkomitmen melindungi data pribadi Anda sesuai dengan peraturan perlindungan data yang berlaku. Data tidak akan dijual atau dibagikan kepada pihak ketiga tanpa persetujuan eksplisit dari pengguna.',
  },
  {
    title: '4. Transparansi Dana',
    content:
      'Seluruh donasi yang masuk akan dilaporkan secara berkala kepada donatur. NiatBaik tidak memungut biaya layanan dari donasi yang terkumpul; operasional kami didukung oleh sponsors dan wakaf operasional.',
  },
  {
    title: '5. Penyelesaian Sengketa',
    content:
      'Segala perselisihan yang timbul akibat penggunaan platform ini akan diselesaikan secara musyawarah. Apabila tidak tercapai mufakat, penyelesaian dilakukan sesuai hukum yang berlaku di Republik Indonesia.',
  },
];

/**
 * Syarat & Ketentuan page — Terms of service for NiatBaik users.
 */
export default function SyaratKetentuanPage() {
  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <BackButton />
        </div>

        {/* Page Header */}
        <header className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-4 uppercase tracking-wider">
            Dokumen Hukum
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Syarat &amp; Ketentuan</h1>
          <p className="text-slate-500">Terakhir diperbarui: April 2026</p>
        </header>

        {/* Terms List */}
        <div className="space-y-8">
          {TERMS.map((term) => (
            <section key={term.title} aria-labelledby={`term-${term.title.charAt(0)}`} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
              <h2 id={`term-${term.title.charAt(0)}`} className="text-lg font-bold text-slate-900 mb-3">
                {term.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">{term.content}</p>
            </section>
          ))}
        </div>

        {/* Contact prompt */}
        <div className="mt-10 text-center text-sm text-slate-500">
          Ada pertanyaan mengenai ketentuan ini?{' '}
          <a href="mailto:halo@niatbaik.id" className="text-sky-600 font-semibold hover:underline">
            Hubungi kami
          </a>.
        </div>

      </div>
    </main>
  );
}
