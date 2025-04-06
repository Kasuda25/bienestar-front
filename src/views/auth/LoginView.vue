<template>
    <Login :loginData="loginData" @login="loginDataValidation" :validation-error-status="validationErrorStatus"
        :validation-error-message="validationErrorMessage" />
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import AuthService from '../../services/useAuth'

import Login from '../../components/auth/Login.vue'

const router = useRouter()

const loginData = reactive({
    email: '',
    password: ''
})

const validationErrorStatus = reactive({
    email: false,
    password: false
})

const validationErrorMessage = reactive({
    email: '',
    password: ''
})

const loginDataValidation = () => {
    if (loginData.email === '') {
        validationErrorStatus.email = true
        validationErrorMessage.email = 'Ingresa tu correo.'
    } else {
        validationErrorStatus.email = false
        validationErrorMessage.email = ''
    }

    if (loginData.password === '') {
        validationErrorStatus.password = true
        validationErrorMessage.password = 'Ingresa tu contraseña.'
    } else {
        validationErrorStatus.password = false
        validationErrorMessage.password = ''
    }

    if (!validationErrorStatus.email && !validationErrorStatus.password) {
        doLogin()
    }
}

const doLogin = async () => {
    try {
        const response = await AuthService.login(loginData)
        if (response) {
            router.push({ name: 'home' })
        }
    } catch (error) {
        console.log(error);
    }
}
</script>