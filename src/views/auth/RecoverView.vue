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
    import LocalStorage from '../../services/useLocalStorage';

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
    });

    const validationErrorStatus = ref({
        email: false,
        password: false,
    });

    const validationErrorMessage = ref({
        email: '',
        password: '',
    });

    const recoverDataValidation = () => {
        if (recoverData.value.email === '') {
            validationErrorStatus.value.email = true;
            validationErrorMessage.value.email = 'Ingresa tu correo.';
        } else {
            validationErrorStatus.value.email = false;
            validationErrorMessage.value.email = '';
        }

        if (recoverData.value.password === '') {
            validationErrorStatus.value.password = true;
            validationErrorMessage.value.password = 'Ingresa tu contraseña.';
        } else {
            validationErrorStatus.value.password = false;
            validationErrorMessage.value.password = '';
        }

        if (
            !validationErrorStatus.value.email &&
            !validationErrorStatus.value.password
        ) {
            doRecover();
        }
    };

    const doRecover = async () => {
        try {
            isLoading.value = true;
            const response = await AuthService.recover(recoverData.value);
            if (response) {
                LocalStorage.createSession();
                isLoading.value = false;
                router.push({ name: 'dashboard' });
            }
        } catch (error) {
            if (error) {
                isLoading.value = false;
                let message =
                    'Ha ocurrido un error al iniciar sesión. Por favor intenta de nuevo más tarde.';

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
