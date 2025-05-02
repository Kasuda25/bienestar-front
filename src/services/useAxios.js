import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import LocalStorage from '../services/useLocalStorage';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    async (config) => {
        const authStore = useAuthStore();
        const token = authStore.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

export function setupInterceptors(router) {
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (!error.response) {
                return Promise.reject(error);
            } else if (
                (error.response.status === 401 && !originalRequest._retry) ||
                (error.response.status === 403 && !originalRequest._retry)
            ) {
                originalRequest._retry = true;
                LocalStorage.endSession();

                router.push({ name: 'login' });
            }
            // Handle other error cases or rethrow the error
            return Promise.reject(error);
        }
    );
}

export default instance;
