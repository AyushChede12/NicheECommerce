import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const productApi = {
    // -------------------------------
    // PRODUCT LISTING
    // -------------------------------
    list: async (filters) => {
        const params = {};

        if (filters?.q) params.q = filters.q;
        if (filters?.category) params.category = filters.category;
        if (filters?.min) params.min = filters.min;
        if (filters?.max) params.max = filters.max;

        return axios.get(`${BASE_URL}/prod`, { params });
    },

    // -------------------------------
    // CREATE PRODUCT
    // -------------------------------
    create: async (data) => {
        return axios.post(`${BASE_URL}/prod/create`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    // -------------------------------
    // 🔐 USER AUTH — LOGIN & REGISTER
    // -------------------------------
    register: async (data) => {
        return axios.post(`${BASE_URL}/user/register`, data);
    },

    login: async (data) => {
        return axios.post(`${BASE_URL}/user/login`, data);
    }
};
