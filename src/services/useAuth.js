import axios from './useAxios';
import { useAuthStore } from '../stores/auth';

class AuthService {
    async login(data) {
        try {
            const response = await axios.post('/auth/login', data);
            if (response.status === 200) {
                const authStore = useAuthStore();
                authStore.user = response.data.usuario;
                authStore.token = response.data.token;
                authStore.rtoken = response.data.refreshToken;
                authStore.isAuth = true;
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                throw {
                    type: 'backend',
                    message:
                        error.response.data?.error ||
                        'Error desconocido del servidor',
                    status: error.response.status,
                };
            } else if (error.request) {
                throw {
                    type: 'network',
                    message:
                        'No se pudo conectar con el servidor. Verifica tu conexión.',
                };
            } else {
                throw {
                    type: 'unknown',
                    message:
                        error.message || 'Ha ocurrido un error inesperado.',
                };
            }
        }
    }

    async autoLogin(token) {
        try {
            const response = await axios.post('/auth/refresh-token', {
                refreshToken: token,
            });
            if (response.status === 200) {
                const authStore = useAuthStore();
                authStore.user = response.data.usuario;
                authStore.token = response.data.token;
                authStore.rtoken = response.data.refreshToken;
                authStore.isAuth = true;
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                throw {
                    type: 'backend',
                    message:
                        error.response.data?.error ||
                        'Error desconocido del servidor',
                    status: error.response.status,
                };
            } else if (error.request) {
                throw {
                    type: 'network',
                    message:
                        'No se pudo conectar con el servidor. Verifica tu conexión.',
                };
            } else {
                throw {
                    type: 'unknown',
                    message:
                        error.message || 'Ha ocurrido un error inesperado.',
                };
            }
        }
    }

    async audit() {
        try {
            const response = await axios.get('/auditoria/ultimas');
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                throw {
                    type: 'backend',
                    message:
                        error.response.data?.error ||
                        'Error desconocido del servidor',
                    status: error.response.status,
                };
            } else if (error.request) {
                throw {
                    type: 'network',
                    message:
                        'No se pudo conectar con el servidor. Verifica tu conexión.',
                };
            } else {
                throw {
                    type: 'unknown',
                    message:
                        error.message || 'Ha ocurrido un error inesperado.',
                };
            }
        }
    }
}

export default new AuthService();
