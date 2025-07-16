import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8088/api',
});

// Добавляем перехватчик ошибок
api.interceptors.response.use(
    response => response.data, // Успешный ответ – возвращаем только data
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);


export const getPost = (id) => api.get(`/posts/${id}`);
export const getPosts = () => api.get('/posts');
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
export const createPost = (post) => api.post('/posts', post);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export default api;