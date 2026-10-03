import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLE_HOME } from '../config/roles';

// Usage: <Route element={<ProtectedRoute role="ADMIN" />}> ...admin routes... </Route>
export default function ProtectedRoute({ role }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (role && user.role !== role) return <Navigate to={ROLE_HOME[user.role]} replace />;

  return <Outlet />;
}