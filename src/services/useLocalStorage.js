import { useAuthStore } from '../stores/auth';

class LocalStorage {
    async createSession() {
        const authStore = useAuthStore();

        localStorage.setItem('token', authStore.token);
        localStorage.setItem('rtoken', authStore.rtoken);
    }

    async endSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('rtoken');
    }
}

export default new LocalStorage();
