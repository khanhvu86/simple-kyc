import { AUTH_URL, ADMIN_URL } from '../constant/url';
import { createBrowserRouter } from 'react-router-dom';
import AuthRedirect from './auth-redirect';
import AuthLayout from '../layouts/auth';
import AdminLayout from '../layouts/admin';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import PersonalInformation from '../pages/personal-information';

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
      {
        path: ADMIN_URL.PERSONAL_INFORMATION,
        index: true,
        Component: PersonalInformation,
      },
    ],
  },
]);

export default Router;
