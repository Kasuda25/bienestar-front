<template>
    <router-view
        v-model:enrollData="enrollData"
        v-model:validationErrorStatus="validationErrorStatus"
        v-model:validationErrorMessage="validationErrorMessage"
        :external-loading="isLoading"
        :key="viewKey"
        @sendEnrollData="validateEnrollData"
    />
</template>

<script setup>
    import { ref } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';

    import { useAuthStore } from '@/stores/auth';

    import InscriptionsService from '@/services/useInscriptions';

    const snackbar = useSnackbar();

    const authStore = useAuthStore();

    const isLoading = ref(false);
    const viewKey = ref(0);

    const enrollData = ref({
        student: null,
        activity: null,
    });

    const validationErrorStatus = ref({
        student: false,
        activity: false,
    });

    const validationErrorMessage = ref({
        student: '',
        activity: '',
    });

    const validateEnrollData = async () => {
        if (!enrollData.value.student) {
            validationErrorStatus.value.student = true;
            validationErrorMessage.value.student = 'Selecciona un estudiante';
        } else {
            validationErrorStatus.value.student = false;
            validationErrorMessage.value.student = '';
        }

        if (!enrollData.value.activity) {
            validationErrorStatus.value.activity = true;
            validationErrorMessage.value.activity = 'Selecciona una actividad';
        } else {
            validationErrorStatus.value.activity = false;
            validationErrorMessage.value.activity = '';
        }

        if (
            !validationErrorStatus.value.student &&
            !validationErrorStatus.value.activity
        ) {
            sendEnrollData();
        }
    };

    const sendEnrollData = async () => {
        try {
            isLoading.value = true;
            const response = await InscriptionsService.createInscription(
                enrollData.value
            );
            if (response) {
                isLoading.value = false;

                if (
                    authStore.user.role === 'ADMIN' ||
                    authStore.user.rol === 'INSTRUCTOR'
                ) {
                    snackbar.add({
                        type: 'success',
                        text: 'Estudiante inscrito exitosamente',
                    });
                }

                if (authStore.user.role === 'ESTUDIANTE') {
                    snackbar.add({
                        type: 'success',
                        text: 'Te has inscrito exitosamente',
                    });
                }

                resetValues();

                viewKey.value++;
            }
        } catch (error) {
            isLoading.value = false;
            if (error) {
                let message =
                    'Ha ocurrido un error. Por favor intenta de nuevo más tarde.';

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

    const resetValues = () => {
        enrollData.value = {
            student: null,
            activity: null,
        };
    };
</script>
