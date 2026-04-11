import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TentangKamiPage from './pages/TentangKamiPage';
import MitraKamiPage from './pages/MitraKamiPage';
import LegalitasPage from './pages/LegalitasPage';
import SyaratKetentuanPage from './pages/SyaratKetentuanPage';
import PusatBantuanPage from './pages/PusatBantuanPage';

/**
 * App — root router and shared layout wrapper.
 *
 * Layout structure:
 *   <Navbar>  ← shared, fixed at top
 *   <Routes>  ← page-level content swaps here
 *   <Footer>  ← shared, at the bottom
 *
 * To add a new page:
 *   1. Create src/pages/YourPage.jsx
 *   2. Import it here
 *   3. Add a <Route path="/your-path" element={<YourPage />} />
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
        <Navbar />

        {/* Page content — grows to fill available vertical space */}
        <div className="flex-1">
          <Routes>
            <Route path="/"                    element={<HomePage />} />
            <Route path="/tentang-kami"        element={<TentangKamiPage />} />
            <Route path="/mitra-kami"          element={<MitraKamiPage />} />
            <Route path="/legalitas"           element={<LegalitasPage />} />
            <Route path="/syarat-ketentuan"    element={<SyaratKetentuanPage />} />
            <Route path="/pusat-bantuan"       element={<PusatBantuanPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}