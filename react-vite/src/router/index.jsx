import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import LoginFormPage from '../components/LoginFormPage';
import OperatorPage from '../components/OperatorPage';
import SignupFormPage from '../components/SignupFormPage';
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
        element: <h1>Materials Page</h1>,
      },
      {
        path: 'operators',
        element: <h1>Operators Page</h1>,
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
        element: <h1>Squads Page</h1>,
        index: true,
      },
      {
        path: 'squads/:squadId',
        element: <h1>Squad Page</h1>,
      },
    ],
  },
]);
