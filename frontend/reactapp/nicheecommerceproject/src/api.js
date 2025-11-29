import axios from 'axios';
// src/api.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const getProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
};




const axiosInstance = axios.create({
    baseURL: API_BASE,
});


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});


export const authApi = {
    login: (data) => axiosInstance.post('/auth/login', data),
    register: (data) => axiosInstance.post('/auth/register', data),
};


export const productApi = {
    list: (params) => axiosInstance.get('/products', { params }),
    get: (id) => axiosInstance.get(`/products/${id}`),
    create: (data) => axiosInstance.post('/products', data),
    update: (id, data) => axiosInstance.put(`/products/${id}`, data),
    delete: (id) => axiosInstance.delete(`/products/${id}`),
};


export const cartApi = {
    get: () => axiosInstance.get('/cart'),
    add: (item) => axiosInstance.post('/cart', item),
    update: (id, qty) => axiosInstance.put(`/cart/${id}`, { qty }),
    remove: (id) => axiosInstance.delete(`/cart/${id}`),
};


export const orderApi = {
    create: (payload) => axiosInstance.post('/orders', payload),
    list: () => axiosInstance.get('/orders'),
    get: (id) => axiosInstance.get(`/orders/${id}`),
    updateStatus: (id, status) => axiosInstance.patch(`/orders/${id}/status`, { status }),
};


export default axiosInstance;