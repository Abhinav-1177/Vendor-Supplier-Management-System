import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_HOME } from '../../config/roles';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already logged in: skip the login screen
  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const session = await login(form.email, form.password);
      const from = location.state?.from?.pathname;
      navigate(from || ROLE_HOME[session.role], { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Log in</h1>
      <p className="auth-sub">Welcome back. Enter your details to continue.</p>

      {error && <div className="alert-box alert-error" role="alert">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" autoComplete="email"
            placeholder="you@company.com" value={form.email} onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="password-wrap">
            <input
              id="password" name="password" autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password" value={form.password} onChange={handleChange}
            />
            <button
              type="button" className="password-toggle"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button className="btn-accent" type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="auth-foot">
        New to SupplyBridge? <Link to="/signup">Create an account</Link>
      </p>

      {/* Remove once the real backend is connected */}
      <div className="demo-box">
        Demo accounts<br />
        Admin: admin@supplybridge.com / admin123<br />
        Vendor: vendor@demo.com / vendor123<br />
        Supplier: supplier@demo.com / supplier123
      </div>
    </>
  );
}