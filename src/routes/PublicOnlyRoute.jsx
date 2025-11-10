import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/index.js';
export function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return user ? <Navigate to="/admin" replace /> : <Outlet />;
}
