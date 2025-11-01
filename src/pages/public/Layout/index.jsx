import { Outlet } from 'react-router';
import { NavBar } from '../../../components';

export function Layout() {
  const navButton = {
    to: '/doe',
    label: 'Doe',
  };

  const links = [
    { to: '/', label: 'Início' },
    { to: '/adote', label: 'Adote' },
    { to: '/sobre-nos', label: 'Sobre Nós' },
    { to: '/como-ajudar', label: 'Como Ajudar' },
  ];

  return (
    <>
      <NavBar links={links} navButton={navButton} />
      <Outlet />
    </>
  );
}
