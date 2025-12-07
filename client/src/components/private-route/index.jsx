import { Navigate } from 'react-router';
import { useAuthContext } from '../../hooks/use-auth-context';
import { AUTH_URL } from '../../constant/url';

const PrivateRoute = ({ children, requiredRoles }) => {
  const { user, isAuthenticated } = useAuthContext();
  return isAuthenticated && requiredRoles.some((role) => role === user.role) ? (
    children
  ) : (
    <Navigate to={AUTH_URL.LOGIN} />
  );
};

export default PrivateRoute;
