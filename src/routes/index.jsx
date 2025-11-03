import { createBrowserRouter } from 'react-router';

import { Layout } from '../pages/public/Layout';
import Home from '../pages/public/Home';
import SobreNos from '../pages/public/SobreNos';
import Adote from '../pages/public/Adote';
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

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'adote', Component: Adote },
      { path: 'sobre-nos', Component: SobreNos },
      { path: 'como-ajudar', Component: ComoAjudar },
      { path: 'doe', Component: Doe },
    ],
  },
  {
    element: <PublicOnlyRoute />,
    children: [{ path: 'login', Component: Login }],
  },
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
        ],
      },
    ],
  },
]);

export { router };
