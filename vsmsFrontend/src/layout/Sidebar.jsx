import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NAV, ROLE_LABEL } from '../config/navConfig';

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const sections = NAV[user.role];

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="auth-logo">S</div>
          <div>
            <div className="brand-name">Supply<span>Bridge</span></div>
            <div className="role-badge">{ROLE_LABEL[user.role]}</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {sections.map((section) => (
            <div key={section.section}>
              <div className="nav-section-label">{section.section}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={onClose}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className={`bi ${item.icon}`} />
                  {item.label}
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div className="user-meta">
            <div className="user-name">{user.name}</div>
            <div className="user-role">
              {user.businessName || ROLE_LABEL[user.role]}
            </div>
          </div>
          <button className="logout-btn" onClick={logout} title="Log out" aria-label="Log out">
            <i className="bi bi-box-arrow-right" />
          </button>
        </div>
      </aside>
    </>
  );
}