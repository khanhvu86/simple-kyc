import { AUTH_URL, ADMIN_URL } from '../constant/url';
import { USER_ROLE } from '../constant/user';
import AuthLayout from '../layouts/auth';
import AdminLayout from '../layouts/admin';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Submissions from '../pages/submissions';
import KYC from '../pages/kyc';
import UserProfile from '../pages/user-profile';
import PrivateRoute from '../components/private-route';

export const AppRoutes = [
  {
    path: AUTH_URL.BASE,
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      {
        index: true,
        path: AUTH_URL.LOGIN,
        element: <Login />,
      },
    ],
  },
  {
    path: ADMIN_URL.BASE,
    element: (
      <PrivateRoute requiredRoles={[USER_ROLE.NORMAL_USER, USER_ROLE.OFFICER]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      {
        index: true,
        path: ADMIN_URL.DASHBOARD,
        element: <Dashboard />,
      },
      {
        index: true,
        path: ADMIN_URL.USER_PROFILE,
        element: (
          <PrivateRoute requiredRoles={[0]}>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        index: true,
        path: ADMIN_URL.KYC,
        element: <KYC />,
      },
      {
        index: true,
        path: ADMIN_URL.SUBMISSIONS,
        element: <Submissions />,
      },
    ],
  },
];
