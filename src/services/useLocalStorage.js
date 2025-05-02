import { useAuthStore } from '../stores/auth';

class LocalStorage {
    async createSession() {
        const authStore = useAuthStore();

        localStorage.setItem('user', JSON.stringify(authStore.user));
        localStorage.setItem('token', authStore.token);
        localStorage.setItem('isAuth', authStore.isAuth);
    }

    async restoreSession() {
        const authStore = useAuthStore();

        authStore.user = JSON.parse(localStorage.getItem('user'));
        authStore.token = localStorage.getItem('token');
        authStore.isAuth = localStorage.getItem('isAuth');
    }

    async endSession() {
        const authStore = useAuthStore();

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');

        authStore.user = {};
        authStore.token = '';
        authStore.isAuth = false;
    }
}

export default new LocalStorage();
