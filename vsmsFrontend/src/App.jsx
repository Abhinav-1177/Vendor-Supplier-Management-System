import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/dashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PagePlaceholder from './components/PagePlaceholder';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import Analytics from './pages/admin/Analytics';
import UserManagement from './pages/admin/UserManagement';
import ProductModeration from './pages/admin/ProductModeration';
import DisputeCenter from './pages/admin/DisputeCenter';
import Advertisements from './pages/admin/Advertisements';
import { ROLE_PREFIX, flatNav, notificationsPath } from './config/navConfig';

const ROLES = ['ADMIN', 'VENDOR', 'SUPPLIER'];

// Real pages by route. Anything not listed here still shows the placeholder.
const PAGES = {
  '/admin/dashboard': <AdminDashboard />,
  '/admin/analytics': <Analytics />,
  '/admin/users': <UserManagement />,
  '/admin/products': <ProductModeration />,
  '/admin/disputes': <DisputeCenter />,
  '/admin/advertisements': <Advertisements />,
};

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Landing page goes at "/" later; for now it sends people to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Role-protected dashboards. Routes are generated from navConfig;
          swap each PagePlaceholder for the real page as we build them. */}
      {ROLES.map((role) => (
        <Route key={role} element={<ProtectedRoute role={role} />}>
          <Route element={<DashboardLayout />}>
            {flatNav(role).map((item) => (
              <Route
                key={item.to}
                path={item.to}
                element={PAGES[item.to] || <PagePlaceholder title={item.label} />}
              />
            ))}
            <Route path={notificationsPath(role)} element={<PagePlaceholder title="Notifications" />} />
            <Route path={ROLE_PREFIX[role]} element={<Navigate to={`${ROLE_PREFIX[role]}/dashboard`} replace />} />
          </Route>
        </Route>
      ))}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}