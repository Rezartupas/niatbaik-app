import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * BackButton — navigates to the previous browser history entry,
 * or falls back to "/" if there is no history (e.g. direct URL visit).
 *
 * Usage:
 *   <BackButton />                    — uses default label "Kembali"
 *   <BackButton label="Halaman Utama" />
 */
export default function BackButton({ label = 'Kembali' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    // If there is browser history, go back; otherwise go home.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={`${label} ke halaman sebelumnya`}
      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-sky-600 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md"
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 bg-white group-hover:border-sky-300 group-hover:bg-sky-50 transition-all shadow-sm">
        <ArrowLeft size={15} aria-hidden="true" />
      </span>
      {label}
    </button>
  );
}
