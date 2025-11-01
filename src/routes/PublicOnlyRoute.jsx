import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  return user ? <Navigate to="/admin" replace /> : <Outlet />;
}
