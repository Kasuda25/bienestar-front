// import axios from './useAxios'
// import { useAuthStore } from '../stores/auth'

class AuthService {
    async login(data) {
        try {
            console.log(data);
            return data
            // const response = await axios.post('/auth/login', data)
            // if (response.status === 200) {
            //     const authStore = useAuthStore()
            //     authStore.user = response.data.user
            //     authStore.token = response.data.token
            //     authStore.isAuth = true
            //     return response.data
            // }
        } catch (error) {
            throw new Error(response.data.errors);
        }
    }
}

export default new AuthService()