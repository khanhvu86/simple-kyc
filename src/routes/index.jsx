import { createBrowserRouter } from 'react-router-dom';
import AuthRedirect from './auth-redirect';
import AuthLayout from '../layouts/auth';
import AdminLayout from '../layouts/admin';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import { AUTH_URL, ADMIN_URL } from '../constant/url';

const Router = createBrowserRouter([
  {
    path: '/',
    Component: AuthRedirect,
  },
  {
    path: AUTH_URL.BASE,
    Component: AuthLayout,
    children: [
      { index: true, Component: Login },
      {
        path: AUTH_URL.LOGIN,
        index: true,
        Component: Login,
      },
    ],
  },
  {
    path: ADMIN_URL.BASE,
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      {
        path: ADMIN_URL.DASHBOARD,
        index: true,
        Component: Dashboard,
      },
    ],
  },
]);

export default Router;
