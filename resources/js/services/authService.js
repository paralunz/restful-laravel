import { ref, computed } from 'vue';
import api from '../api';

export const token = ref(localStorage.getItem('token'));
export const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
export const isAuthenticated = computed(() => !!token.value);
export const isAdmin = () => user.value?.role === 'admin';

export const login = async (credentials) => {
    const { data } = await api.post('/login', credentials);
    if (!data.token) throw new Error('Unexpected login response');

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    token.value = data.token;
    user.value = data.user;
};

export const register = (userData) => api.post('/register', userData);

export const logout = async () => {
    try {
        await api.post('/logout');
    } catch {
        // token may already be expired
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        token.value = null;
        user.value = null;
    }
};
