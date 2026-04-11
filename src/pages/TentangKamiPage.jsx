import BackButton from '../components/BackButton';

/**
 * Tentang Kami — About Us page.
 * Provides a deeper look into NiatBaik's mission, vision, and team story.
 */
export default function TentangKamiPage() {
  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <BackButton />
        </div>


        {/* Page Header */}
        <header className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold mb-4 uppercase tracking-wider">
            Tentang Kami
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Kami Ada untuk{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
              Menyalurkan Kebaikan
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            NiatBaik adalah platform crowdfunding sosial yang menghubungkan para donatur dengan lembaga-lembaga amanah di seluruh penjuru Indonesia.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-14">

          <section aria-labelledby="visi-heading" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
            <h2 id="visi-heading" className="text-2xl font-bold text-slate-900 mb-4">Visi Kami</h2>
            <p className="text-slate-600 leading-relaxed">
              Menjadi jembatan kebaikan terpercaya yang menghubungkan setiap niat baik masyarakat Indonesia dengan mereka yang paling membutuhkan — secara transparan, aman, dan tepat sasaran.
            </p>
          </section>

          <section aria-labelledby="misi-heading" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
            <h2 id="misi-heading" className="text-2xl font-bold text-slate-900 mb-4">Misi Kami</h2>
            <ul className="space-y-3 text-slate-600">
              {[
                'Bermitra dengan lembaga sosial, NGO, dan yayasan terpercaya di seluruh Indonesia.',
                'Menyediakan platform donasi yang mudah diakses, aman, dan dapat dipertanggungjawabkan.',
                'Meningkatkan transparansi penyaluran donasi melalui laporan berkala kepada para donatur.',
                'Memberdayakan komunitas untuk saling peduli dan bergotong royong.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="story-heading" className="bg-gradient-to-br from-sky-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-sky-100">
            <h2 id="story-heading" className="text-2xl font-bold text-slate-900 mb-4">Kisah Kami</h2>
            <p className="text-slate-600 leading-relaxed">
              NiatBaik lahir dari keresahan sederhana: banyak orang ingin berbuat baik, namun kesulitan menemukan saluran yang tepat, terpercaya, dan transparan. Kami percaya bahwa setiap niat baik, bila disalurkan dengan benar, mampu mengubah kehidupan nyata.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
