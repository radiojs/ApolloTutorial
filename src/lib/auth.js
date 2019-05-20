import { AUTH_TOKEN } from './constants';

const clearAuthToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
};

const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};

const setAuthToken = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
}

const currentUser = () => (typeof window !== 'undefined' && localStorage.getItem(AUTH_TOKEN));

export {
    clearAuthToken,
    getAuthToken,
    setAuthToken,
    currentUser,
};
