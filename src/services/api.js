import router from '@/router';
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8081/api'
});

api.interceptors.request.use(
    (config) => {
        if(!config.url.includes('/auth/')){
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default api;