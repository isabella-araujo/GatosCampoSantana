import { Outlet } from 'react-router';
import { NavBar } from '../../../components';
import { useAuth } from '../../../hooks/useAuth';

export function AdminLayout() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  const logoutButton = { label: 'Sair', handleClick: handleSignOut };

  const links = [
    { to: '/admin', label: 'Gatos' },
    { to: '/admin/voluntarios', label: 'Voluntários' },
    { to: '/admin/objetivos', label: 'Objetivos' },
    { to: '/admin/parceiros', label: 'Parceiros' },
    { to: '/admin/pontos-coleta', label: 'Pontos de Coleta' },
  ];

  return (
    <>
      <NavBar links={links} logoutButton={logoutButton} />
      <Outlet />
    </>
  );
}
