import api, { getErrorMessage } from './api';
import { clearToken, setToken } from './tokenStorage';

const SESSION_KEY = 'sb_session';

export async function login(email, password) {
  try {
    const { data } = await api.post('/auth/login', { email: email.trim(), password });
    setToken(data.token);
    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
    return data.user;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function signup(form) {
  try {
    const { data } = await api.post('/auth/register', {
      name: form.name.trim(),
      businessName: form.businessName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city,
      gstin: form.gstin.trim(),
      password: form.password,
      role: form.role,
    });
    return data;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function logout() {
  clearToken();
  localStorage.removeItem(SESSION_KEY);
}