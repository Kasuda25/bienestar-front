<template>
    <router-view
        v-model:recover-data="recoverData"
        v-model:validation-error-status="validationErrorStatus"
        v-model:validation-error-message="validationErrorMessage"
        :is-loading="isLoading"
        @recover="recoverDataValidation"
    />
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../../stores/auth';
    import { useSnackbar } from 'vue3-snackbar';

    import AuthService from '../../services/useAuth';

    const router = useRouter();
    const snackbar = useSnackbar();

    const authStore = useAuthStore();

    const isLoading = ref(false);

    onBeforeMount(() => {
        if (authStore.isAuth) {
            router.push({ name: 'dashboard' });
        }
    });

    const recoverData = ref({
        email: '',
        password: '',
        token: router.currentRoute.value.query?.token,
    });

    const validationErrorStatus = ref({
        email: false,
        password: false,
    });

    const validationErrorMessage = ref({
        email: '',
        password: '',
    });

    const recoverDataValidation = (value) => {
        if (recoverData.value.email === '') {
            validationErrorStatus.value.email = true;
            validationErrorMessage.value.email = 'Ingresa un correo.';
        } else {
            validationErrorStatus.value.email = false;
            validationErrorMessage.value.email = '';
        }

        if (recoverData.value.password === '') {
            validationErrorStatus.value.password = true;
            validationErrorMessage.value.password = 'Ingresa una contraseña.';
        } else if (recoverData.value.password.lenght < 8) {
            validationErrorStatus.value.password = true;
            validationErrorMessage.value.password = 'La contraseña debe tener por lo menos 8 caracteres';
        } else {
            validationErrorStatus.value.password = false;
            validationErrorMessage.value.password = '';
        }

        if (value === 'email') {
            if (!validationErrorStatus.value.email) {
                doRecover(value);
            }
        }

        if (value === 'password') {
            if (!validationErrorStatus.value.password) {
                doRecover(value);
            }
        }
    };

    const doRecover = async (value) => {
        try {
            isLoading.value = true;
            if (value === 'email') {
                const response = await AuthService.forgotPassword(recoverData.value.email);
                if (response) {
                    snackbar.add({
                        type: 'success',
                        text: response.message,
                    });
                    isLoading.value = false;
                    router.push({ name: 'login' });
                }
            }

            if (value === 'password') {
                const response = await AuthService.resetPassword({ token: recoverData.value.token, password: recoverData.value.password });
                if (response) {
                    snackbar.add({
                        type: 'success',
                        text: response.message,
                    });
                    isLoading.value = false;
                    router.push({ name: 'login' });
                }
            }
        } catch (error) {
            if (error) {
                isLoading.value = false;
                let message =
                    'Ha ocurrido un error al enviar la solicitud. Por favor intenta de nuevo más tarde.';

                if (error.type === 'backend') {
                    message = error.message;
                } else if (error.type === 'network') {
                    message = error.message;
                } else if (error.type === 'unknown') {
                    message = error.message;
                }

                snackbar.add({
                    type: 'error',
                    text: message,
                });
            }
        }
    };
</script>
