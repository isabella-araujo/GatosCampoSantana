import { Outlet } from 'react-router';
import { NavBar } from '../../../components';
import { useAuth } from '../../../hooks/useAuth';
import '../../Layout.css';
import { Helmet } from 'react-helmet-async';

export function AdminLayout() {
  const { signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  const logoutButton = { label: 'Sair', handleClick: handleSignOut };

  const links = [
    { to: '/admin', label: 'Gatos' },
    { to: '/admin/objetivos', label: 'Objetivos' },
    { to: '/admin/parceiros', label: 'Parceiros' },
  ];

  return (
    <div className="layout">
      <Helmet>
        <title>Admin | Gatos do Campo de Santana</title>
        <meta
          name="description"
          content="Área administrativa dos Gatos do Campo de Santana."
        />
      </Helmet>
      <NavBar links={links} logoutButton={logoutButton} />
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
}
