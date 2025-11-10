import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/index.js';
import { isMobile } from 'react-device-detect';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (isMobile && window.location.pathname.startsWith('/admin')) {
    return <Navigate to="/mobile-not-supported" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
