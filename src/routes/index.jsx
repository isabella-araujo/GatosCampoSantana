import { createBrowserRouter } from 'react-router';

import { Layout } from '../pages/public/Layout';
import Home from '../pages/public/Home';
import SobreNos from '../pages/public/SobreNos';
import Adote from '../pages/public/Adote';
import ComoAjudar from '../pages/public/ComoAjudar';
import Doe from '../pages/public/Doe';
import Login from '../pages/public/Login';
import { AdminLayout } from '../pages/admin/AdminLayout';
import Gatos from '../pages/admin/Gatos';
import PontosColeta from '../pages/admin/PontosColeta';
import Parceiros from '../pages/admin/Parceiros';
import Voluntarios from '../pages/admin/Voluntarios';
import VoluntariosCadastro from '../pages/admin/Voluntarios/VoluntariosCadastro';
import Objetivos from '../pages/admin/Objetivos';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

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
      {
        element: <PublicOnlyRoute />,
        children: [{ path: 'login', Component: Login }],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'admin',
        Component: AdminLayout,
        children: [
          { index: true, Component: Gatos },
          { path: 'pontos-coleta', Component: PontosColeta },
          { path: 'parceiros', Component: Parceiros },
          {
            path: 'voluntarios',
            children: [
              { index: true, Component: Voluntarios },
              { path: 'cadastro', Component: VoluntariosCadastro },
            ],
          },
          { path: 'objetivos', Component: Objetivos },
        ],
      },
    ],
  },
]);

export { router };
