import { ShieldCheck } from 'lucide-react';
import BackButton from '../components/BackButton';

const LEGAL_DOCS = [
  {
    title: 'Akta Pendirian Yayasan',
    description: 'Dokumen resmi pendirian Yayasan Niat Baik Indonesia yang telah disahkan oleh notaris.',
    tag: 'Akta Notaris',
  },
  {
    title: 'Surat Keputusan Kemenkumham',
    description: 'Pengesahan badan hukum dari Kementerian Hukum dan HAM Republik Indonesia.',
    tag: 'SK Kemenkumham',
  },
  {
    title: 'NPWP Yayasan',
    description: 'Nomor Pokok Wajib Pajak yang memastikan seluruh operasional yayasan taat pajak.',
    tag: 'Perpajakan',
  },
  {
    title: 'Izin Penyelenggaraan Penggalangan Dana',
    description: 'Surat izin resmi dari Kemensos RI untuk menyelenggarakan kegiatan penggalangan dana.',
    tag: 'Kemensos RI',
  },
];

/**
 * Legalitas page — displays the legal credentials and certifications of NiatBaik.
 */
export default function LegalitasPage() {
  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <BackButton />
        </div>

        {/* Page Header */}
        <header className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4 uppercase tracking-wider">
            Legalitas
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Beroperasi dengan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
              Izin Resmi
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Kepercayaan Anda adalah amanah kami. NiatBaik beroperasi secara transparan di bawah naungan hukum yang berlaku di Republik Indonesia.
          </p>
        </header>

        {/* Legal Documents Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {LEGAL_DOCS.map((doc) => (
            <article
              key={doc.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-xl text-emerald-600">
                  <ShieldCheck size={22} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{doc.tag}</span>
                  <h2 className="text-base font-bold text-slate-900 mt-1 mb-2">{doc.title}</h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{doc.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="mt-12 bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center">
          <p className="text-slate-700 leading-relaxed">
            Seluruh dokumen legalitas tersedia untuk diverifikasi secara publik. Jika Anda memerlukan salinan dokumen resmi, silakan hubungi kami melalui halaman{' '}
            <a href="mailto:halo@niatbaik.id" className="text-sky-600 font-semibold hover:underline">
              halo@niatbaik.id
            </a>.
          </p>
        </div>

      </div>
    </main>
  );
}
