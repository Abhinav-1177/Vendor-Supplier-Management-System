import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="auth-shell">
      <aside className="auth-side">
        <div className="auth-brand">
          <div className="auth-logo">S</div>
          <span>Supply<span>Bridge</span></span>
        </div>

        <div>
          <h2>Vendors and suppliers, on one platform</h2>
          <p>
            Compare suppliers, request offers, track orders, and see how every
            partner performs, all from a single dashboard.
          </p>
        </div>

        <small>© 2026 SupplyBridge</small>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <Outlet />
        </div>
      </main>
    </div>
  );
}