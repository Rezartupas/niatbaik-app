/**
 * AuthContext.jsx — React context that holds authentication state
 * and exposes login / logout actions to the entire component tree.
 *
 * Usage:
 *   wrap your router inside <AuthProvider> then consume with useAuth().
 */

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { isAuthenticated, login as authLogin, logout as authLogout, getSession } from '../utils/auth';

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  // Bootstrap from existing session (page refresh survival within the same tab)
  const [session, setSession] = useState(() => getSession());

  /**
   * Attempt login and update context state.
   * Returns the same result shape from auth.js → { ok, error?, attemptsLeft? }
   */
  const login = useCallback(async (username, password) => {
    const result = await authLogin(username, password);
    if (result.ok) {
      setSession(getSession());
    }
    return result;
  }, []);

  /** Log the user out and clear session state. */
  const logout = useCallback(() => {
    authLogout();
    setSession(null);
  }, []);

  /**
   * Poll every 60 s to catch session expiry while the tab is open.
   * When the session expires naturally, redirect to login automatically.
   */
  useEffect(() => {
    if (!session) return;
    const id = setInterval(() => {
      if (!isAuthenticated()) {
        setSession(null);
      }
    }, 60_000);
    return () => clearInterval(id);
  }, [session]);

  const value = {
    session,
    isAuthenticated: session !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/** Convenience hook — throws if used outside <AuthProvider>. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>');
  return ctx;
}
