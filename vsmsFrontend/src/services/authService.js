// Mock auth service backed by localStorage.
// Later: replace the body of each function with an Axios call to Spring Boot
// (POST /api/auth/login, POST /api/auth/register). The function signatures stay the same.

const USERS_KEY = 'sb_users';
const SESSION_KEY = 'sb_session';

const seedUsers = [
  { id: 1, name: 'Admin User', email: 'admin@supplybridge.com', password: 'admin123', role: 'ADMIN', status: 'ACTIVE' },
  { id: 2, name: 'Rahul Gupta', businessName: 'RajFoods', email: 'vendor@demo.com', password: 'vendor123', role: 'VENDOR', city: 'Delhi', status: 'ACTIVE' },
  { id: 3, name: 'Priya Mehta', businessName: 'PureFresh', email: 'supplier@demo.com', password: 'supplier123', role: 'SUPPLIER', city: 'Delhi', status: 'ACTIVE' },
];

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

function readUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY));
    if (Array.isArray(stored)) return stored;
  } catch { /* fall through to seed */ }
  localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
  return seedUsers;
}

const toSession = ({ password, ...user }) => user; // never keep the password in the session

export async function login(email, password) {
  await delay();
  const user = readUsers().find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || user.password !== password) throw new Error('Incorrect email or password.');
  if (user.status === 'PENDING') throw new Error('Your account is waiting for admin approval.');
  if (user.status === 'BLOCKED') throw new Error('This account has been blocked. Contact support.');
  const session = toSession(user);
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function signup(data) {
  await delay();
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === data.email.trim().toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }
  const newUser = {
    id: Date.now(),
    name: data.name.trim(),
    businessName: data.businessName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    city: data.city,
    password: data.password,
    role: data.role, // VENDOR or SUPPLIER only; admins are created by the system
    status: 'PENDING', // admin approves from User Management
  };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  return toSession(newUser);
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}