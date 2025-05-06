import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import LocalStorage from '@/services/useLocalStorage';

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
        return Promise.reject(error);
    }
);

export function setupInterceptors(router) {
    instance.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;
            if (!error.response) {
                return Promise.reject(error);
            } else if ((error.response.status === 401 && !originalRequest._retry) || (error.response.status === 403 && !originalRequest._retry)) {
                originalRequest._retry = true;

                const authStore = useAuthStore();

                const rtoken = authStore.rtoken;

                if (rtoken) {
                    const response = await instance.post('/auth/refresh-token', { refreshToken: rtoken });

                    if (response.status === 200) {
                        authStore.token = response.data.token;
                        authStore.rtoken = response.data.refreshToken;

                        await LocalStorage.createSession();

                        return instance(originalRequest);
                    } else {
                        LocalStorage.endSession();

                        router.push({ name: 'login' });
                    }
                } else {
                    LocalStorage.endSession();

                    router.push({ name: 'login' });
                }
            }
            return Promise.reject(error);
        }
    );
}

export default instance;
