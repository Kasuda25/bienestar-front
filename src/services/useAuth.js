import axios from './useAxios'
import { useAuthStore } from '../stores/auth'

class AuthService {
    async login(data) {
        try {
            const response = await axios.post('/auth/login', data)
            if (response.status === 200) {
                const authStore = useAuthStore()
                authStore.user = response.data.usuario
                authStore.token = response.data.token
                authStore.isAuth = true
                return response.data
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new AuthService()