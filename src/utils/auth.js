/**
 * auth.js — CMS Authentication Utilities
 *
 * Security model:
 *  - Credentials are compared against a SHA-256 hash stored in memory (never plain-text at runtime).
 *  - Sessions are stored in sessionStorage so they die with the tab.
 *  - Sessions carry an expiry timestamp; every page load validates it.
 *  - Failed login attempts are counted in sessionStorage; after MAX_ATTEMPTS the
 *    user is locked out for LOCKOUT_MS milliseconds (brute-force mitigation).
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const SESSION_KEY     = 'nb_admin_session';
const ATTEMPTS_KEY    = 'nb_admin_attempts';
const LOCKOUT_KEY     = 'nb_admin_lockout';
const SESSION_TTL_MS  = 2 * 60 * 60 * 1000; // 2 hours
const MAX_ATTEMPTS    = 5;
const LOCKOUT_MS      = 15 * 60 * 1000;       // 15 minutes

/**
 * Pre-computed SHA-256 hashes of the credentials.
 * Run: await crypto.subtle.digest('SHA-256', new TextEncoder().encode('value'))
 * then convert to hex to reproduce these values.
 *
 * username : "bismillahcinta"
 * password : "bismillahcinta123"
 */
const VALID_USERNAME_HASH = '5c14e96d41fa87249d33ccb73b6138afe577aa7993b284b17798b6442fbdf4bb';
const VALID_PASSWORD_HASH = '279ca5a9f84ca87422a036f889e5dbb07a645d35eac38dba3752b7fa8f1b9139';

// ─── Crypto helpers ───────────────────────────────────────────────────────────

/**
 * Returns a lowercase hex SHA-256 digest of the given string.
 * Uses the native Web Crypto API — no external dependencies needed.
 */
export async function sha256(text) {
  const buf    = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  const bytes  = Array.from(new Uint8Array(buf));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─── Brute-force protection ────────────────────────────────────────────────────

/** Returns true when the account is currently locked out. */
export function isLockedOut() {
  const until = parseInt(sessionStorage.getItem(LOCKOUT_KEY) || '0', 10);
  if (Date.now() < until) return true;
  // Lockout expired — clear stale data
  if (until) {
    sessionStorage.removeItem(LOCKOUT_KEY);
    sessionStorage.removeItem(ATTEMPTS_KEY);
  }
  return false;
}

/** Returns remaining lockout seconds (0 if not locked). */
export function lockoutSecondsRemaining() {
  const until = parseInt(sessionStorage.getItem(LOCKOUT_KEY) || '0', 10);
  return Math.max(0, Math.ceil((until - Date.now()) / 1000));
}

/** Returns the current failed-attempt count. */
export function getAttempts() {
  return parseInt(sessionStorage.getItem(ATTEMPTS_KEY) || '0', 10);
}

/** Records a failed attempt and applies lockout if threshold is reached. */
function recordFailedAttempt() {
  const attempts = getAttempts() + 1;
  sessionStorage.setItem(ATTEMPTS_KEY, String(attempts));
  if (attempts >= MAX_ATTEMPTS) {
    sessionStorage.setItem(LOCKOUT_KEY, String(Date.now() + LOCKOUT_MS));
  }
  return attempts;
}

/** Clears the attempt counter after a successful login. */
function clearAttempts() {
  sessionStorage.removeItem(ATTEMPTS_KEY);
  sessionStorage.removeItem(LOCKOUT_KEY);
}

// ─── Session management ────────────────────────────────────────────────────────

/** Returns the stored session object, or null if absent / expired / malformed. */
export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session?.expiresAt || Date.now() > session.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/** Returns true when a valid, non-expired session exists. */
export function isAuthenticated() {
  return getSession() !== null;
}

/** Writes a new session to sessionStorage. */
function createSession() {
  const session = {
    user:      'admin',
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/** Destroys the active session. */
export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ─── Main login function ───────────────────────────────────────────────────────

/**
 * Attempts to authenticate with the provided credentials.
 *
 * @returns {{ ok: boolean, error?: string, attemptsLeft?: number }}
 */
export async function login(username, password) {
  // 1. Guard — lockout
  if (isLockedOut()) {
    const secs = lockoutSecondsRemaining();
    const mins = Math.ceil(secs / 60);
    return { ok: false, error: `Terlalu banyak percobaan. Coba lagi dalam ${mins} menit.` };
  }

  // 2. Hash the supplied credentials
  const [usernameHash, passwordHash] = await Promise.all([
    sha256(username.trim()),
    sha256(password),
  ]);

  // 3. Constant-time-style comparison (both hashes always computed before branching)
  const usernameOk = usernameHash === VALID_USERNAME_HASH;
  const passwordOk = passwordHash === VALID_PASSWORD_HASH;

  if (usernameOk && passwordOk) {
    clearAttempts();
    createSession();
    return { ok: true };
  }

  // 4. Record failure
  const attempts    = recordFailedAttempt();
  const attemptsLeft = Math.max(0, MAX_ATTEMPTS - attempts);

  if (attemptsLeft === 0) {
    const mins = Math.ceil(LOCKOUT_MS / 60_000);
    return { ok: false, error: `Akun dikunci selama ${mins} menit karena terlalu banyak percobaan.` };
  }

  return {
    ok:           false,
    error:        'Username atau password salah.',
    attemptsLeft,
  };
}
