import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/index.js';
import { isMobile } from '../utils/mobileDetecter.jsx';
export function PublicOnlyRoute() {
  const { user, loading } = useAuth();
  const mobile = isMobile();

  if (loading) return <Loading />;

  if (mobile) {
    return <Navigate to="/mobile-not-supported" replace />;
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
