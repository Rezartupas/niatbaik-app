/**
 * AdminLoginPage.jsx — Secure admin login page for niatbaik CMS.
 *
 * Security features:
 *  • SHA-256 credential hashing (see utils/auth.js)
 *  • Brute-force lockout (5 attempts → 15-min lockout)
 *  • sessionStorage-only sessions with TTL
 *  • Generic error messages (no credential hints)
 *  • Auto-redirects authenticated users away from this page
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { lockoutSecondsRemaining, isLockedOut } from '../utils/auth';

// ─── Animated background particles ───────────────────────────────────────────

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large primary orb */}
      <div
        style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)',
          animation: 'floatOrb1 9s ease-in-out infinite',
        }}
      />
      {/* Secondary orb */}
      <div
        style={{
          position: 'absolute', bottom: '-15%', left: '-8%',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
          animation: 'floatOrb2 11s ease-in-out infinite',
        }}
      />
      {/* Accent orb */}
      <div
        style={{
          position: 'absolute', top: '40%', left: '30%',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          animation: 'floatOrb1 13s ease-in-out 2s infinite',
        }}
      />
      {/* Grid lines */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}

// ─── Countdown hook ────────────────────────────────────────────────────────────

function useLockoutCountdown() {
  const [secs, setSecs] = useState(lockoutSecondsRemaining());

  useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => {
      const remaining = lockoutSecondsRemaining();
      setSecs(remaining);
      if (remaining <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [secs]);

  // Reset when lockout begins
  const refresh = () => setSecs(lockoutSecondsRemaining());

  return { secs, refresh };
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function AdminLoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || '/admin';

  // If already logged in, bounce to dashboard
  if (isAuthenticated) return <Navigate to={from} replace />;

  const [username,   setUsername]   = useState('');
  const [password,   setPassword]   = useState('');
  const [showPw,     setShowPw]     = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [attLeft,    setAttLeft]    = useState(null); // attempts remaining
  const { secs: lockSecs, refresh } = useLockoutCountdown();

  const usernameRef = useRef(null);

  // Auto-focus username field
  useEffect(() => { usernameRef.current?.focus(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || isLockedOut()) return;

    setLoading(true);
    setError('');
    setAttLeft(null);

    const result = await login(username, password);
    setLoading(false);

    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login gagal.');
      if (result.attemptsLeft !== undefined) setAttLeft(result.attemptsLeft);
      if (isLockedOut()) refresh();
    }
  };

  const locked = isLockedOut() || lockSecs > 0;
  const lockMins = Math.ceil(lockSecs / 60);

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(24px) scale(0.95); }
        }
        @keyframes loginSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
        .login-card { animation: loginSlideUp 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .shake-anim  { animation: shake 0.42s ease; }

        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #f1f5f9;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .input-field::placeholder { color: rgba(148,163,184,0.6); }
        .input-field:focus {
          border-color: rgba(16,185,129,0.6);
          background: rgba(255,255,255,0.1);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
        }
        .input-field:disabled { opacity: 0.5; cursor: not-allowed; }

        .login-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          background: linear-gradient(135deg, #10b981, #0ea5e9);
          color: #fff;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(16,185,129,0.35);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: rgba(255,255,255,0.1);
        }
        .login-btn::before {
          content: '';
          position: absolute; top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          animation: shimmerBtn 2.5s ease-in-out infinite;
        }
        @keyframes shimmerBtn {
          0%   { left: -60%; }
          100% { left: 140%; }
        }
        .login-btn:disabled::before { display: none; }

        .error-box {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 10px;
          padding: 12px 14px;
          color: #fca5a5;
          font-size: 0.85rem;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .pw-toggle {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(148,163,184,0.7);
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s;
        }
        .pw-toggle:hover { color: #94a3b8; }

        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.25);
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #6ee7b7;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
      `}</style>

      {/* Page wrapper */}
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f2027 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          position: 'relative',
        }}
      >
        <FloatingOrbs />

        {/* Card */}
        <div
          className="login-card"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '420px',
            background: 'rgba(15,23,42,0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '40px 36px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Glow accent top */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '180px', height: '2px',
              background: 'linear-gradient(90deg, transparent, #10b981, #0ea5e9, transparent)',
              borderRadius: '0 0 8px 8px',
            }}
          />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            {/* Logo */}
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '64px', height: '64px', borderRadius: '18px',
                  background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
                  fontSize: '28px',
                }}
                aria-label="NiatBaik logo"
              >
                🤲
              </div>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <span className="badge">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Admin CMS
              </span>
            </div>

            <h1
              style={{
                margin: '12px 0 6px',
                fontSize: '1.65rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              NiatBaik CMS
            </h1>
            <p style={{ color: 'rgba(148,163,184,0.8)', fontSize: '0.85rem', margin: 0 }}>
              Masuk sebagai administrator
            </p>
          </div>

          {/* Lockout warning */}
          {locked && lockSecs > 0 && (
            <div
              style={{
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '20px',
                color: '#fbbf24',
                fontSize: '0.84rem',
                textAlign: 'center',
              }}
              role="alert"
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '6px' }}>🔒</div>
              <strong>Akun dikunci sementara</strong>
              <p style={{ margin: '4px 0 0', color: 'rgba(251,191,36,0.8)', fontSize: '0.8rem' }}>
                Coba lagi dalam {lockMins > 1 ? `${lockMins} menit` : `${lockSecs} detik`}
              </p>
            </div>
          )}

          {/* Login form */}
          <form
            id="admin-login-form"
            onSubmit={handleSubmit}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            {/* Error message */}
            {error && (
              <div
                className={locked ? '' : 'shake-anim'}
                role="alert"
                aria-live="assertive"
              >
                <div className="error-box">
                  <span aria-hidden="true" style={{ fontSize: '1rem', flexShrink: 0 }}>⚠️</span>
                  <span>
                    {error}
                    {attLeft !== null && attLeft > 0 && (
                      <span style={{ display: 'block', marginTop: '4px', color: 'rgba(252,165,165,0.75)', fontSize: '0.78rem' }}>
                        {attLeft} percobaan tersisa sebelum akun dikunci.
                      </span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Username */}
            <div>
              <label
                htmlFor="admin-username"
                style={{ display: 'block', marginBottom: '8px', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.04em', textTransform: 'uppercase' }}
              >
                Username
              </label>
              <input
                id="admin-username"
                ref={usernameRef}
                type="text"
                autoComplete="username"
                className="input-field"
                placeholder="Masukkan username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={loading || locked}
                required
                aria-required="true"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                style={{ display: 'block', marginBottom: '8px', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.04em', textTransform: 'uppercase' }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="input-field"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={loading || locked}
                  required
                  aria-required="true"
                  style={{ paddingRight: '46px' }}
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPw(v => !v)}
                  aria-label={showPw ? 'Sembunyikan password' : 'Tampilkan password'}
                  tabIndex={0}
                >
                  {showPw ? (
                    /* Eye-off icon */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    /* Eye icon */
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="admin-login-submit"
              type="submit"
              className="login-btn"
              disabled={loading || locked || !username || !password}
              aria-busy={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ animation: 'logoSpin 0.8s linear infinite' }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Memverifikasi...
                </span>
              ) : 'Masuk ke Dashboard'}
            </button>
          </form>

          {/* Footer note */}
          <p
            style={{
              marginTop: '24px', textAlign: 'center',
              fontSize: '0.75rem', color: 'rgba(100,116,139,0.9)',
            }}
          >
            🔐 Halaman ini hanya untuk administrator NiatBaik
          </p>
        </div>
      </div>
    </>
  );
}
