import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const token = ref('')
    const isAuth = ref(false)

    return { user, token, isAuth }
})