import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';
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
import VendorDashboard from './pages/vendor/VendorDashboard';
import BrowseProducts from './pages/vendor/BrowseProducts';
import CompareSuppliers from './pages/vendor/CompareSuppliers';
import IncomingRequests from './pages/vendor/IncomingRequests';
import OrderHistory from './pages/vendor/OrderHistory';
import SalesReport from './pages/vendor/SalesReport';
import SupplierDashboard from './pages/supplier/SupplierDashboard';
import MyProducts from './pages/supplier/MyProducts';
import AddProduct from './pages/supplier/AddProduct';
import SentRequests from './pages/supplier/SentRequests';
import AcceptedOrders from './pages/supplier/AcceptedOrders';
import RevenueSummary from './pages/supplier/RevenueSummary';
import Notifications from './pages/Notifications';
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
  '/vendor/dashboard': <VendorDashboard />,
  '/vendor/browse': <BrowseProducts />,
  '/vendor/compare': <CompareSuppliers />,
  '/vendor/requests': <IncomingRequests />,
  '/vendor/orders': <OrderHistory />,
  '/vendor/sales': <SalesReport />,
  '/supplier/dashboard': <SupplierDashboard />,
  '/supplier/products': <MyProducts />,
  '/supplier/products/new': <AddProduct />,
  '/supplier/requests': <SentRequests />,
  '/supplier/orders': <AcceptedOrders />,
  '/supplier/revenue': <RevenueSummary />,
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
            <Route path={notificationsPath(role)} element={<Notifications />} />
            <Route path={ROLE_PREFIX[role]} element={<Navigate to={`${ROLE_PREFIX[role]}/dashboard`} replace />} />
          </Route>
        </Route>
      ))}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}