/**
 * RequireAuth.jsx — route guard component.
 *
 * Wraps protected routes; unauthenticated visitors are silently redirected
 * to /admin/login.  The original destination is stored so we can
 * redirect back after a successful login.
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Pass the attempted URL in state so AdminLoginPage can redirect back
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
