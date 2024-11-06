import router from '@/router';
import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://localhost:8081/api',
    baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token){
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