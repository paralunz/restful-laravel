import { ref, computed } from 'vue';
import api from '../api';

const readToken = () => {
    const t = localStorage.getItem('token');
    if (!t || t === 'undefined' || t === 'null') {
        localStorage.removeItem('token');
        return null;
    }
    return t;
};

const readUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        localStorage.removeItem('user');
        return null;
    }
};

export const token = ref(readToken());
export const user = ref(readUser());

export const isAuthenticated = computed(() => !!token.value);

export const isAdmin = () => user.value?.role === 'admin';

const clearSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token.value = null;
    user.value = null;
};

export const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    const { token: newToken, user: userData } = response.data;

    if (!newToken || !userData) {
        throw new Error('Unexpected login response');
    }

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));

    token.value = newToken;
    user.value = userData;

    return response;
};

export const register = (userData) => api.post('/register', userData);

export const logout = async () => {
    try {
        await api.post('/logout');
    } catch {
        // Token may already be expired; log out locally anyway.
    } finally {
        clearSession();
    }
};
