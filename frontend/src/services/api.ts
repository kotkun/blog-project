import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' },
});

export const getPosts = () => api.get('/posts');
export const getPost = (id: string) => api.get(`/posts/${id}`);
export const createPost = (post: any) => api.post('/posts', post);
export const updatePost = (id: any, post: any) => api.put(`/posts/${id}`, post);
export const deletePost = (id: any) => api.delete(`/posts/${id}`);

export default api;