import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import LoginFormPage from '../components/LoginFormPage';
import MaterialsPage from '../components/MaterialsPage';
import OperatorPage from '../components/OperatorPage';
import OperatorsPage from '../components/OperatorsPage';
import SignupFormPage from '../components/SignupFormPage';
import SquadPage from '../components/SquadPage';
import SquadsPage from '../components/SquadsPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginFormPage />,
      },
      {
        path: 'materials',
        element: <MaterialsPage />,
      },
      {
        path: 'operators',
        element: <OperatorsPage />,
        index: true,
      },
      {
        path: 'operators/:displayNumber',
        element: <OperatorPage />,
      },
      {
        path: 'signup',
        element: <SignupFormPage />,
      },
      {
        path: 'squads',
        element: <SquadsPage />,
        index: true,
      },
      {
        path: 'squads/:squadId',
        element: <SquadPage />,
      },
      {
        path: '*',
        element: <main>{<h1 style={{ margin: '2rem' }}>Not Found</h1>}</main>,
      },
    ],
  },
]);
