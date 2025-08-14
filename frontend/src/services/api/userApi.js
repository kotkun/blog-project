import api from './api';

export const getUserProfile = () => api.get('/users/me');
export const updateUserProfile = (userData) => api.put('/users/me', userData);