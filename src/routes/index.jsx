import { createBrowserRouter } from 'react-router';

import { Layout } from '../pages/public/Layout';
import Home from '../pages/public/Home';
import SobreNos from '../pages/public/SobreNos';
import Adote from '../pages/public/Adote';
import GatoDetalhes from '../pages/public/Adote/GatoDetalhes';
import ComoAjudar from '../pages/public/ComoAjudar';
import Doe from '../pages/public/Doe';
import Login from '../pages/public/Login/index.jsx';
import { AdminLayout } from '../pages/admin/AdminLayout';
import Gatos from '../pages/admin/Gatos';
import Parceiros from '../pages/admin/Parceiros';
import Objetivos from '../pages/admin/Objetivos';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import ParceirosCadastro from '../pages/admin/Parceiros/ParceirosCadastro';
import GatosCadastro from '../pages/admin/Gatos/GatosCadastro';
import MobileNotSupported from '../pages/public/Others/MobileNotSupported.jsx';
import PageNotFound from '../pages/public/Others/PageNotFound.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        path: 'adote',
        children: [
          { index: true, Component: Adote },
          { path: ':slug', Component: GatoDetalhes },
        ],
      },
      { path: 'sobre-nos', Component: SobreNos },
      { path: 'como-ajudar', Component: ComoAjudar },
      { path: 'doe', Component: Doe },
    ],
  },
  {
    element: <PublicOnlyRoute />,
    children: [{ path: 'login', Component: Login }],
  },
  { path: '/mobile-not-supported', Component: MobileNotSupported },
  { path: '*', Component: PageNotFound },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'admin',
        Component: AdminLayout,
        children: [
          { index: true, Component: Gatos },
          {
            path: 'gatos',
            children: [
              { index: true, Component: Gatos },
              { path: 'cadastro', Component: GatosCadastro },
            ],
          },
          {
            path: 'parceiros',
            children: [
              { index: true, Component: Parceiros },
              { path: 'cadastro', Component: ParceirosCadastro },
            ],
          },
          { path: 'objetivos', Component: Objetivos },
          { path: '*', Component: Gatos },
        ],
      },
    ],
  },
]);

export { router };
