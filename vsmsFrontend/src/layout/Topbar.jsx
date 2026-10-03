import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { flatNav, notificationsPath } from '../config/navConfig';

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const notifPath = notificationsPath(user.role);
  const current = flatNav(user.role).find((i) => i.to === pathname);
  const title = pathname === notifPath ? 'Notifications' : current?.label || 'Dashboard';

  return (
    <header className="topbar">
      <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <i className="bi bi-list" />
      </button>

      <h1 className="topbar-title">{title}</h1>

      <div className="search-bar">
        <i className="bi bi-search" />
        <input type="text" placeholder="Search products, suppliers, orders…" aria-label="Search" />
      </div>

      <div className="topbar-actions">
        <button className="icon-btn" title="Notifications" aria-label="Notifications" onClick={() => navigate(notifPath)}>
          <i className="bi bi-bell" />
          <span className="notif-dot" />
        </button>
        <button className="icon-btn" title="Messages" aria-label="Messages">
          <i className="bi bi-chat-dots" />
        </button>
      </div>
    </header>
  );
}