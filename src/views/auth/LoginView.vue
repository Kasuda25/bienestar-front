<template>
    <Login
        :loginData="loginData"
        @login="loginDataValidation"
        :validation-error-status="validationErrorStatus"
        :validation-error-message="validationErrorMessage"
        :isLoading="isLoading"
    />
</template>

<script setup>
    import { ref, reactive, onBeforeMount } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../../stores/auth';

    import AuthService from '../../services/useAuth';
    import LocalStorage from '../../services/useLocalStorage';

    import Login from '../../components/auth/Login.vue';

    import { useSnackbar } from 'vue3-snackbar';

    const router = useRouter();
    const authStore = useAuthStore();

    const snackbar = useSnackbar();

    const isLoading = ref(false);

    onBeforeMount(() => {
        if (authStore.isAuth) {
            router.push({ name: 'dashboard' });
        }
    });

    const loginData = reactive({
        email: '',
        password: '',
    });

    const validationErrorStatus = reactive({
        email: false,
        password: false,
    });

    const validationErrorMessage = reactive({
        email: '',
        password: '',
    });

    const loginDataValidation = () => {
        if (loginData.email === '') {
            validationErrorStatus.email = true;
            validationErrorMessage.email = 'Ingresa tu correo.';
        } else {
            validationErrorStatus.email = false;
            validationErrorMessage.email = '';
        }

        if (loginData.password === '') {
            validationErrorStatus.password = true;
            validationErrorMessage.password = 'Ingresa tu contraseña.';
        } else {
            validationErrorStatus.password = false;
            validationErrorMessage.password = '';
        }

        if (!validationErrorStatus.email && !validationErrorStatus.password) {
            doLogin();
        }
    };

    const doLogin = async () => {
        try {
            isLoading.value = true;
            const response = await AuthService.login(loginData);
            if (response) {
                LocalStorage.createSession();
                isLoading.value = false;
                router.push({ name: 'dashboard' });
            }
        } catch (error) {
            isLoading.value = false;
            snackbar.add({
                type: 'error',
                text: error.message,
            });
        }
    };
</script>
