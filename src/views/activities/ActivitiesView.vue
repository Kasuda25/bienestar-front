<template>
    <router-view
        :activities="activities"
        :activityData="activityData"
        :validation-error-status="validationErrorStatus"
        :validation-error-message="validationErrorMessage"
        :isLoading="isLoading"
        :listError="listError"
        :key="viewKey"
        @sendActivityData="validateActivityData"
        @deleteActivity="deleteActivity"
    />
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref, watch, reactive } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';

    import ActivitiesService from '@/services/useActivities';

    const router = useRouter();
    const snackbar = useSnackbar();

    const isLoading = ref(false);
    const listError = ref(false);
    const viewKey = ref(0);

    const activities = ref();
    const activityData = reactive({
        name: '',
        startDate: '',
        endDate: '',
        startHour: '',
        endHour: '',
        maxStudents: null,
        instructor: null,
        location: '',
        id: null,
    });

    const queryActivities = async () => {
        try {
            activities.value = await ActivitiesService.getActivities();
        } catch (error) {
            listError.value = true;
            snackbar.add({
                type: 'error',
                text: 'Ha ocurrido un error. Por favor intenta de nuevo mas tade',
            });
        }
    };

    watch(
        () => activities.value,
        () => {
            queryActivities();
        }
    );

    onMounted(async () => {
        queryActivities();
    });

    const validationErrorStatus = reactive({
        name: false,
        startDate: false,
        endDate: false,
        startHour: false,
        endHour: false,
        maxStudents: false,
        instructor: false,
        location: false,
    });

    const validationErrorMessage = reactive({
        name: '',
        startDate: '',
        endDate: '',
        startHour: '',
        endHour: '',
        maxStudents: '',
        instructor: '',
        location: '',
    });

    const validateActivityData = async (operation) => {
        if (activityData.name === '') {
            validationErrorStatus.name = true;
            validationErrorMessage.name = 'El nombre es obligatorio';
        } else {
            validationErrorStatus.name = false;
            validationErrorMessage.name = '';
        }

        if (activityData.startDate === '') {
            validationErrorStatus.startDate = true;
            validationErrorMessage.startDate = 'La fecha de inicio es obligatoria';
        } else {
            validationErrorStatus.startDate = false;
            validationErrorMessage.startDate = '';
        }

        if (activityData.endDate === '') {
            validationErrorStatus.endDate = true;
            validationErrorMessage.endDate = 'La fecha de fin es obligatoria';
        } else {
            validationErrorStatus.endDate = false;
            validationErrorMessage.endDate = '';
        }

        if (activityData.startHour === '') {
            validationErrorStatus.startHour = true;
            validationErrorMessage.startHour = 'La hora de inicio es obligatoria';
        } else {
            validationErrorStatus.startHour = false;
            validationErrorMessage.startHour = '';
        }

        if (activityData.endHour === '') {
            validationErrorStatus.endHour = true;
            validationErrorMessage.endHour = 'La hora de fin es obligatoria';
        } else {
            validationErrorStatus.endHour = false;
            validationErrorMessage.endHour = '';
        }

        if (activityData.maxStudents === null) {
            validationErrorStatus.maxStudents = true;
            validationErrorMessage.maxStudents =
                'El número máximo de estudiantes es obligatorio';
        } else {
            validationErrorStatus.maxStudents = false;
            validationErrorMessage.maxStudents = '';
        }

        if (activityData.instructor === null) {
            validationErrorStatus.instructor = true;
            validationErrorMessage.instructor = 'El instructor es obligatorio';
        } else {
            validationErrorStatus.instructor = false;
            validationErrorMessage.instructor = '';
        }

        if (activityData.location === '') {
            validationErrorStatus.location = true;
            validationErrorMessage.location = 'La ubicación es obligatoria';
        } else {
            validationErrorStatus.location = false;
            validationErrorMessage.location = '';
        }

        if (
            !validationErrorStatus.name &&
            !validationErrorStatus.startDate &&
            !validationErrorStatus.endDate &&
            !validationErrorStatus.startHour &&
            !validationErrorStatus.endHour &&
            !validationErrorStatus.maxStudents &&
            !validationErrorStatus.instructor &&
            !validationErrorStatus.location
        ) {
            sendActivityData(operation);
        }
    };

    const sendActivityData = async (operation) => {
        try {
            isLoading.value = true;
            let response;

            if (operation === 'create') {
                response = await ActivitiesService.createActivity({
                    nombre: activityData.name,
                    fechaInicio: activityData.startDate,
                    fechaFin: activityData.endDate,
                    horaInicio: activityData.startHour,
                    horaFin: activityData.endHour,
                    maxEstudiantes: activityData.maxStudents,
                    instructorId: activityData.instructor,
                    ubicacion: activityData.location,
                });
            }

            if (operation === 'update') {
                response = await ActivitiesService.putActivity(
                    activityData.id,
                    {
                        nombre: activityData.name,
                        fechaInicio: activityData.startDate,
                        fechaFin: activityData.endDate,
                        horaInicio: activityData.startHour,
                        horaFin: activityData.endHour,
                        maxEstudiantes: activityData.maxStudents,
                        instructorId: activityData.instructor,
                        ubicacion: activityData.location,
                    }
                );
            }

            if (response) {
                isLoading.value = false;

                if (operation === 'create') {
                    snackbar.add({
                        type: 'success',
                        text: 'Actividad creada exitosamente',
                    });

                    resetValues();

                    router.push({
                        name: 'activities-detail',
                        params: { id: response.id },
                    });
                }

                if (operation === 'update') {
                    snackbar.add({
                        type: 'success',
                        text: 'Actividad actualizada exitosamente',
                    });

                    viewKey.value++;
                }
            }
        } catch (error) {
            isLoading.value = false;
            snackbar.add({
                type: 'error',
                text: error.message,
            });
        }
    };

    const resetValues = () => {
        activityData.name = '';
        activityData.startDate = '';
        activityData.endDate = '';
        activityData.startHour = '';
        activityData.endHour = '';
        activityData.maxStudents = null;
        activityData.instructor = null;
        activityData.location = '';
    };

    const deleteActivity = async (id) => {
        try {
            isLoading.value = true;
            const response = await ActivitiesService.deleteActivity(id);

            if (response) {
                isLoading.value = false;
                snackbar.add({
                    type: 'success',
                    text: 'Se ha eliminado la actividad',
                });

                queryActivities();
                router.go(-1);
            }
        } catch (error) {
            isLoading.value = false;
            snackbar.add({
                type: 'error',
                text: 'Ha ocurido un error. Po favor intentalo de nuevo más tarde',
            });
        }
    };
</script>
