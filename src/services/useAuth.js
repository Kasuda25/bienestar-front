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
                authStore.isAuth = true;
                return response.data;
            }
        } catch (error) {
            if (!error.response) {
                throw new Error('Los servicios de Bienestar no están disponibles actualmente. Intente de nuevo más tarde');
            } else if (error.response.status >= 500) {
                throw new Error(
                    'Ha ocurrido un error. Por favor intente de nuevo más tarde'
                );
            } else if (error.response.status === 400) {
                throw new Error('Credenciales incorrectas');
            } else {
                throw new Error('Error al iniciar sesión');
            }
        }
    }
}

export default new AuthService();
