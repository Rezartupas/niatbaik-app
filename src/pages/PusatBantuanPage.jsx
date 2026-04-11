import { MessageCircle, Mail, HelpCircle } from 'lucide-react';
import BackButton from '../components/BackButton';
import { CONTACT_LINKS } from '../data';


const FAQS = [
  {
    q: 'Bagaimana cara berdonasi?',
    a: 'Pilih program yang ingin Anda dukung, masukkan nominal donasi, pilih metode pembayaran, lalu konfirmasi transaksi. Proses selesai dalam hitungan menit.',
  },
  {
    q: 'Apakah donasi saya aman?',
    a: 'Ya, seluruh transaksi diproses melalui gateway pembayaran berlisensi Bank Indonesia dan dilindungi enkripsi SSL. NiatBaik juga secara rutin diaudit oleh lembaga independen.',
  },
  {
    q: 'Bagaimana saya tahu donasi tersalurkan?',
    a: 'Anda akan menerima laporan penyaluran berkala via email. Selain itu, setiap program memiliki halaman update yang dapat Anda pantau kapan saja.',
  },
  {
    q: 'Bisakah saya membatalkan atau menarik donasi?',
    a: 'Donasi yang sudah terkonfirmasi tidak dapat dibatalkan karena sudah langsung disalurkan ke lembaga penerima. Untuk kondisi khusus, silakan hubungi tim kami.',
  },
  {
    q: 'Apakah ada biaya tambahan?',
    a: 'Tidak. NiatBaik tidak memotong biaya apapun dari nominal yang Anda donasikan. 100% donasi Anda sampai ke penerima manfaat.',
  },
];

/**
 * Pusat Bantuan page — FAQ and contact options for NiatBaik users.
 */
export default function PusatBantuanPage() {
  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <BackButton />
        </div>

        {/* Page Header */}
        <header className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4 uppercase tracking-wider">
            Pusat Bantuan
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Ada yang bisa kami bantu?
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-xl mx-auto">
            Temukan jawaban atas pertanyaan yang sering ditanyakan, atau hubungi tim kami secara langsung.
          </p>
        </header>

        {/* Contact CTA Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          <a
            href={CONTACT_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 hover:bg-emerald-100 hover:shadow-md transition-all"
          >
            <div className="flex-shrink-0 bg-emerald-500 text-white p-3 rounded-xl">
              <MessageCircle size={24} aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Chat via WhatsApp</p>
              <p className="text-sm text-slate-500">Respons cepat di hari kerja</p>
            </div>
          </a>

          <a
            href={CONTACT_LINKS.email}
            className="flex items-center gap-4 bg-sky-50 border border-sky-200 rounded-2xl p-6 hover:bg-sky-100 hover:shadow-md transition-all"
          >
            <div className="flex-shrink-0 bg-sky-500 text-white p-3 rounded-xl">
              <Mail size={24} aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Email Kami</p>
              <p className="text-sm text-slate-500">halo@niatbaik.id</p>
            </div>
          </a>
        </div>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <HelpCircle size={22} className="text-sky-500" aria-hidden="true" />
            Pertanyaan yang Sering Diajukan
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
