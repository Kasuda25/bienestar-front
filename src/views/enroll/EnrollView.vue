<template>
    <router-view
        v-model:enrollData="enrollData"
        v-model:validationErrorStatus="validationErrorStatus"
        v-model:validationErrorMessage="validationErrorMessage"
        :external-loading="isLoading"
        @sendEnrollData="validateEnrollData"
    />
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';

    import InscriptionsService from '@/services/useInscriptions';

    const router = useRouter();
    const snackbar = useSnackbar();

    const isLoading = ref(false);

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
        isLoading.value = true;
        const response = await InscriptionsService.createInscription(
            enrollData.value
        );
        if (response) {
            isLoading.value = false;

            snackbar.add({
                type: 'success',
                text: 'Estudiante inscrito exitosamente',
            });

            resetValues();

            router.push({ name: 'students' });
        }
    };

    const resetValues = () => {
        enrollData.value = {
            student: null,
            activity: null,
        };
    };
</script>
