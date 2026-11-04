import axios from 'axios';
import { clearToken, getToken } from './tokenStorage';

// One Axios instance for the whole app. Services import this, never axios directly.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach the JWT to every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// An expired or invalid token sends the user back to login.
// Login and register are skipped so a wrong password doesn't trigger a redirect.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const isAuthCall = url.includes('/auth/login') || url.includes('/auth/register');
    if (error.response?.status === 401 && !isAuthCall) {
      clearToken();
      localStorage.removeItem('sb_session');
      window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);

// Turns any Axios error into a message that is safe to show in the UI
export function getErrorMessage(error) {
  if (error.response) {
    return error.response.data?.message || error.response.data?.error || `Request failed (${error.response.status}).`;
  }
  if (error.request) return 'Cannot reach the server. Check your connection and try again.';
  return error.message || 'Something went wrong.';
}

export default api;