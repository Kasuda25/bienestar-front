import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import LocalStorage from '../services/useLocalStorage';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(async (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export function setupInterceptors() {
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (
                (error.response.status === 401 && !originalRequest._retry) ||
                (error.response.status === 403 && !originalRequest._retry)
            ) {
                originalRequest._retry = true;
                LocalStorage.endSession();
            }
        }
    );
}

export default instance;
