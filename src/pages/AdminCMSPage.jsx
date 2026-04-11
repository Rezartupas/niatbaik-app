/**
 * AdminCMSPage.jsx — Main admin CMS dashboard for niatbaik.id
 *
 * Sections accessible from the sidebar:
 *  - Beranda (overview / stats)
 *  - Program (campaign management)
 *  - Mitra (partner management)
 *  - Konten (pages & articles)
 *  - Pengguna (user list)
 *  - Pengaturan (site settings)
 *
 * The page is purely UI — actual CRUD operations can be wired in later.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ─── Tiny SVG icon helper ─────────────────────────────────────────────────────

function Icon({ d, size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    </svg>
  );
}

// ─── Sidebar nav items ────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    id: 'beranda', label: 'Beranda', emoji: '📊',
    icon: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  },
  {
    id: 'program', label: 'Program', emoji: '❤️',
    icon: ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'],
  },
  {
    id: 'mitra', label: 'Mitra', emoji: '🤝',
    icon: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75', 'M9 7m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0'],
  },
  {
    id: 'konten', label: 'Konten', emoji: '📝',
    icon: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
  },
  {
    id: 'pengguna', label: 'Pengguna', emoji: '👤',
    icon: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0'],
  },
  {
    id: 'pengaturan', label: 'Pengaturan', emoji: '⚙️',
    icon: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
      'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'],
  },
];

// ─── Stat cards data ──────────────────────────────────────────────────────────

const STATS = [
  { label: 'Total Donasi',   value: 'Rp 2,4M',   change: '+12%', up: true,  color: '#10b981', icon: '💰' },
  { label: 'Program Aktif',  value: '18',         change: '+3',   up: true,  color: '#0ea5e9', icon: '❤️' },
  { label: 'Total Donatur',  value: '3.821',      change: '+8%',  up: true,  color: '#8b5cf6', icon: '👥' },
  { label: 'Mitra Terdaftar',value: '42',         change: '-1',   up: false, color: '#f59e0b', icon: '🤝' },
];

// ─── Recent activity ──────────────────────────────────────────────────────────

const RECENT_ACTIVITY = [
  { type: 'donasi',   desc: 'Donasi baru dari Anonim — Rp 500.000',          time: '2 menit lalu',  color: '#10b981' },
  { type: 'program',  desc: 'Program "Bantu Belajar" mencapai target',        time: '15 menit lalu', color: '#0ea5e9' },
  { type: 'mitra',    desc: 'Mitra baru "Yayasan Tekad" terdaftar',           time: '1 jam lalu',    color: '#8b5cf6' },
  { type: 'konten',   desc: 'Artikel "Transparansi Dana" dipublikasikan',     time: '3 jam lalu',    color: '#f59e0b' },
  { type: 'pengguna', desc: 'Pengguna baru mendaftar: ahmad.wijaya@gmail.com', time: '5 jam lalu',   color: '#ec4899' },
];

// ─── Mock program table ───────────────────────────────────────────────────────

const PROGRAMS = [
  { id: 1, name: 'Bantu Belajar',       category: 'Pendidikan', target: 'Rp 10.000.000', raised: 'Rp 7.200.000', pct: 72, status: 'Aktif'    },
  { id: 2, name: 'Sedekah Pangan',      category: 'Pangan',     target: 'Rp 5.000.000',  raised: 'Rp 5.000.000', pct: 100, status: 'Selesai' },
  { id: 3, name: 'Beasiswa Yatim',      category: 'Pendidikan', target: 'Rp 20.000.000', raised: 'Rp 9.800.000', pct: 49, status: 'Aktif'    },
  { id: 4, name: 'Klinik Gratis',       category: 'Kesehatan',  target: 'Rp 8.000.000',  raised: 'Rp 1.600.000', pct: 20, status: 'Aktif'    },
  { id: 5, name: 'Renovasi Pesantren',  category: 'Sarana',     target: 'Rp 15.000.000', raised: 'Rp 12.000.000', pct: 80, status: 'Aktif'   },
];

// ─── Section renderers ────────────────────────────────────────────────────────

function BerandaSection() {
  return (
    <div>
      <h2 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px' }}>
        Selamat Datang 👋
      </h2>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {STATS.map(s => (
          <div
            key={s.label}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '20px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${s.color}22`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
              <span style={{
                fontSize: '0.72rem', fontWeight: 700, borderRadius: '999px',
                padding: '3px 10px',
                background: s.up ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                color: s.up ? '#6ee7b7' : '#fca5a5',
              }}>
                {s.up ? '▲' : '▼'} {s.change}
              </span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color, marginBottom: '4px' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' }}>
        <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
          Aktivitas Terkini
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {RECENT_ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color, flexShrink: 0 }} />
              <span style={{ flex: 1, color: '#cbd5e1', fontSize: '0.875rem' }}>{a.desc}</span>
              <span style={{ color: '#475569', fontSize: '0.75rem', flexShrink: 0 }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgramSection() {
  const [search, setSearch] = useState('');

  const filtered = PROGRAMS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s) => s === 'Aktif' ? { bg: 'rgba(16,185,129,0.15)', text: '#6ee7b7' }
    : { bg: 'rgba(100,116,139,0.15)', text: '#94a3b8' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700 }}>Manajemen Program</h2>
        <button
          id="add-program-btn"
          style={{
            padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #10b981, #0ea5e9)', color: '#fff',
            fontWeight: 700, fontSize: '0.875rem',
          }}
        >
          + Tambah Program
        </button>
      </div>

      {/* Search */}
      <input
        id="program-search"
        type="text"
        placeholder="🔍  Cari program..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', maxWidth: '340px', padding: '10px 14px',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px', color: '#f1f5f9', fontSize: '0.875rem',
          outline: 'none', marginBottom: '20px', boxSizing: 'border-box',
        }}
      />

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Nama Program', 'Kategori', 'Target', 'Terkumpul', 'Progress', 'Status', 'Aksi'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr
                key={p.id}
                style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 16px', color: '#e2e8f0', fontWeight: 600, fontSize: '0.875rem' }}>{p.name}</td>
                <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>{p.category}</td>
                <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>{p.target}</td>
                <td style={{ padding: '14px 16px', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>{p.raised}</td>
                <td style={{ padding: '14px 16px', minWidth: '120px' }}>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p.pct}%`, background: p.pct >= 100 ? '#10b981' : 'linear-gradient(90deg, #10b981, #0ea5e9)', borderRadius: '99px', transition: 'width 0.6s ease' }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block' }}>{p.pct}%</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: statusColor(p.status).bg, color: statusColor(p.status).text }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      id={`edit-program-${p.id}`}
                      style={{ padding: '5px 12px', borderRadius: '7px', border: '1px solid rgba(14,165,233,0.3)', background: 'rgba(14,165,233,0.1)', color: '#7dd3fc', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                    >Edit</button>
                    <button
                      id={`delete-program-${p.id}`}
                      style={{ padding: '5px 12px', borderRadius: '7px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#fca5a5', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                    >Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlaceholderSection({ title, emoji }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{emoji}</div>
      <h2 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>{title}</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Bagian ini sedang dalam pengembangan.</p>
    </div>
  );
}

const SECTION_MAP = {
  beranda:    <BerandaSection />,
  program:    <ProgramSection />,
  mitra:      <PlaceholderSection title="Manajemen Mitra" emoji="🤝" />,
  konten:     <PlaceholderSection title="Manajemen Konten" emoji="📝" />,
  pengguna:   <PlaceholderSection title="Manajemen Pengguna" emoji="👥" />,
  pengaturan: <PlaceholderSection title="Pengaturan Situs" emoji="⚙️" />,
};

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminCMSPage() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('beranda');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  // Session expiry display
  const expiresAt   = session?.expiresAt ? new Date(session.expiresAt) : null;
  const expiryStr   = expiresAt
    ? expiresAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    : null;

  const SIDEBAR_W = sidebarOpen ? '240px' : '64px';

  return (
    <>
      <style>{`
        @keyframes adminFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .admin-section { animation: adminFadeIn 0.35s ease both; }

        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px; border-radius: 10px;
          cursor: pointer; transition: background 0.2s, color 0.2s;
          border: none; width: 100%; text-align: left;
          color: #64748b; background: transparent; font-size: 0.875rem;
          font-weight: 500; white-space: nowrap; overflow: hidden;
        }
        .nav-item:hover { background: rgba(255,255,255,0.06); color: #cbd5e1; }
        .nav-item.active {
          background: linear-gradient(135deg, rgba(16,185,129,0.2), rgba(14,165,233,0.15));
          color: #6ee7b7;
          border: 1px solid rgba(16,185,129,0.2);
        }
        .logout-confirm {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; backdrop-filter: blur(6px);
        }
      `}</style>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="logout-confirm" role="dialog" aria-modal="true" aria-labelledby="logout-dialog-title">
          <div style={{
            background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px', padding: '32px', maxWidth: '360px', width: '90%',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>👋</div>
            <h3 id="logout-dialog-title" style={{ color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Keluar dari CMS?</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '24px' }}>
              Sesi Anda akan dihapus dan Anda harus login kembali.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                id="logout-cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
                style={{ padding: '10px 24px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontWeight: 600 }}
              >Batal</button>
              <button
                id="logout-confirm-btn"
                onClick={handleLogout}
                style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}
              >Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}

      <div style={{
        minHeight: '100vh',
        background: '#0a0f1e',
        display: 'flex',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}>

        {/* ── Sidebar ── */}
        <aside
          style={{
            width: SIDEBAR_W, flexShrink: 0, height: '100vh',
            position: 'sticky', top: 0,
            background: 'rgba(15,23,42,0.95)',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', flexDirection: 'column',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
          }}
          aria-label="Sidebar navigasi admin"
        >
          {/* Brand */}
          <div style={{
            padding: '20px 16px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: '10px',
            minHeight: '72px',
          }}>
            <div style={{
              width: '36px', height: '36px', flexShrink: 0,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
            }}>🤲</div>
            {sidebarOpen && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.2 }}>NiatBaik</div>
                <div style={{ color: '#475569', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin CMS</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }} aria-label="Menu admin">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                title={!sidebarOpen ? item.label : undefined}
              >
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.emoji}</span>
                {sidebarOpen && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Session info + logout */}
          <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {sidebarOpen && expiryStr && (
              <div style={{ padding: '8px 14px', marginBottom: '8px', background: 'rgba(245,158,11,0.08)', borderRadius: '8px', fontSize: '0.72rem', color: '#fbbf24' }}>
                🕑 Sesi berakhir {expiryStr}
              </div>
            )}
            <button
              id="admin-logout-btn"
              className="nav-item"
              onClick={() => setShowLogoutConfirm(true)}
              style={{ color: '#ef4444' }}
              title={!sidebarOpen ? 'Keluar' : undefined}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>🚪</span>
              {sidebarOpen && 'Keluar'}
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Top bar */}
          <header style={{
            height: '64px', padding: '0 24px',
            background: 'rgba(15,23,42,0.9)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backdropFilter: 'blur(12px)',
            position: 'sticky', top: 0, zIndex: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Sidebar toggle */}
              <button
                id="sidebar-toggle"
                onClick={() => setSidebarOpen(v => !v)}
                aria-label={sidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#94a3b8', flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>

              {/* Breadcrumb */}
              <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                <span>Admin</span>
                <span style={{ margin: '0 6px', color: '#334155' }}>/</span>
                <span style={{ color: '#94a3b8', fontWeight: 600, textTransform: 'capitalize' }}>
                  {NAV_ITEMS.find(n => n.id === activeSection)?.label}
                </span>
              </div>
            </div>

            {/* User chip */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px', padding: '6px 14px',
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 800, color: '#fff',
              }}>A</div>
              <span style={{ color: '#cbd5e1', fontSize: '0.82rem', fontWeight: 600 }}>
                {session?.user || 'admin'}
              </span>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%', background: '#10b981',
                boxShadow: '0 0 6px #10b981',
              }} title="Online" />
            </div>
          </header>

          {/* Page content */}
          <main
            key={activeSection}
            className="admin-section"
            style={{ flex: 1, padding: '32px 28px', overflowY: 'auto' }}
            id={`admin-section-${activeSection}`}
          >
            {SECTION_MAP[activeSection] || <BerandaSection />}
          </main>
        </div>
      </div>
    </>
  );
}
