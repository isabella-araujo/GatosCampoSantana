import { Outlet } from 'react-router';
import { Footer, NavBar, ScrollToTop } from '../../../components';
import '../../Layout.css';
import { Helmet } from 'react-helmet-async';

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
      <ScrollToTop enableDebug={true} />
      <div className="layout">
        <Helmet>
          <title>Gatos do Campo de Santana 🐾</title>
          <meta
            name="description"
            content="Adote, ajude e conheça os gatos do Campo de Santana."
          />
        </Helmet>

        <NavBar links={links} navButton={navButton} />
        <div className="layout-content">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}
