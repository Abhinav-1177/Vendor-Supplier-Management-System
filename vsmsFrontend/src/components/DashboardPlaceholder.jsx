import { useAuth } from '../context/AuthContext';

// Temporary: replaced by the real layout and dashboards in the next steps
export default function DashboardPlaceholder({ title }) {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: 32 }}>
      <h2>{title}</h2>
      <p style={{ margin: '8px 0 16px', color: 'var(--text-muted)' }}>
        Logged in as {user.name} ({user.role.toLowerCase()})
      </p>
      <button className="btn-accent" style={{ width: 'auto' }} onClick={logout}>Log out</button>
    </div>
  );
}