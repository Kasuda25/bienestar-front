import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
    const id = ref();
    const user = ref({});
    const token = ref('');
    const rtoken = ref('');
    const isAuth = ref(false);

    const logout = () => {
        user.value = {};
        token.value = '';
        rtoken.value = '';
        isAuth.value = false;
    }

    return { id, user, token, rtoken, isAuth, logout };
});
