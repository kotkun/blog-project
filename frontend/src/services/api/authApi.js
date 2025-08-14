import api from './api';

export const login = async (credentials) => {
    console.log("Sending login request with:", credentials); // Логируем данные
    const response = await api.post('/auth/login', credentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};
export const register = (userData) => api.post('/auth/register', userData);
export const getCurrentUser = () => api.get('/auth/me');

export const logout = async () => {
    try {
        await api.post('/api/auth/logout');
        localStorage.removeItem('token'); // Очищаем токен на клиенте
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
};