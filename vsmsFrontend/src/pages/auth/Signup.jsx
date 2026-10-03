import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CITIES, ROLES, ROLE_HOME } from '../../config/roles';

const initial = {
  role: ROLES.VENDOR,
  name: '',
  businessName: '',
  email: '',
  phone: '',
  city: '',
  password: '',
  confirmPassword: '',
};

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Enter your full name.';
  if (!f.businessName.trim()) e.businessName = 'Enter your business name.';
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.';
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a 10-digit mobile number.';
  if (!f.city) e.city = 'Select your city.';
  if (f.password.length < 8) e.password = 'Use at least 8 characters.';
  if (f.confirmPassword !== f.password) e.confirmPassword = 'Passwords do not match.';
  return e;
}

// Defined at module level on purpose: a component declared inside Signup would remount on every keystroke
function Field({ name, label, type = 'text', placeholder, form, errors, onChange, children }) {
  return (
    <div className={`field ${errors[name] ? 'invalid' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {children || (
        <input
          id={name} name={name} type={type} placeholder={placeholder}
          value={form[name]} onChange={onChange}
        />
      )}
      {errors[name] && <div className="field-error">{errors[name]}</div>}
    </div>
  );
}

export default function Signup() {
  const { user, signup } = useAuth();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      await signup(form);
      setSubmitted(true);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <h1>Request submitted</h1>
        <p className="auth-sub">
          An admin will review your {form.role.toLowerCase()} account. You can log in as soon as it is approved.
        </p>
        <Link to="/login"><button className="btn-accent" type="button">Back to log in</button></Link>
      </>
    );
  }

  // Shared props so every Field can read form state without being defined inside this component
  const fieldProps = { form, errors, onChange: handleChange };

  return (
    <>
      <h1>Create your account</h1>
      <p className="auth-sub">Pick how you will use SupplyBridge.</p>

      {serverError && <div className="alert-box alert-error" role="alert">{serverError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="role-toggle" role="radiogroup" aria-label="Account type">
          {[
            { value: ROLES.VENDOR, title: 'Vendor', hint: 'I buy from suppliers' },
            { value: ROLES.SUPPLIER, title: 'Supplier', hint: 'I sell to vendors' },
          ].map((r) => (
            <button
              key={r.value} type="button" role="radio" aria-checked={form.role === r.value}
              className={`role-option ${form.role === r.value ? 'selected' : ''}`}
              onClick={() => setForm({ ...form, role: r.value })}
            >
              <strong>{r.title}</strong>
              <span>{r.hint}</span>
            </button>
          ))}
        </div>

        <div className="field-row">
          <Field {...fieldProps} name="name" label="Full name" placeholder="Rahul Gupta" />
          <Field {...fieldProps} name="businessName" label="Business name" placeholder="RajFoods" />
        </div>

        <Field {...fieldProps} name="email" label="Email" type="email" placeholder="you@company.com" />

        <div className="field-row">
          <Field {...fieldProps} name="phone" label="Mobile number" type="tel" placeholder="9876543210" />
          <Field {...fieldProps} name="city" label="City">
            <select id="city" name="city" value={form.city} onChange={handleChange}>
              <option value="">Select city</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <div className="field-row">
          <Field {...fieldProps} name="password" label="Password" type="password" placeholder="At least 8 characters" />
          <Field {...fieldProps} name="confirmPassword" label="Confirm password" type="password" placeholder="Repeat password" />
        </div>

        <button className="btn-accent" type="submit" disabled={loading}>
          {loading ? 'Submitting…' : 'Create account'}
        </button>
      </form>

      <p className="auth-foot">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </>
  );
}