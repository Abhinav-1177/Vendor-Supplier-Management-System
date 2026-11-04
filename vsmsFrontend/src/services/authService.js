import * as mock from './authService.mock';
import * as real from './authService.api';

const impl = import.meta.env.VITE_USE_MOCK === 'false' ? real : mock;

export const login = impl.login;
export const signup = impl.signup;
export const getSession = impl.getSession;
export const logout = impl.logout;
