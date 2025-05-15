<template>
    <router-view
        v-model:activityData="activityData"
        v-model:validationErrorStatus="validationErrorStatus"
        v-model:validationErrorMessage="validationErrorMessage"
        :activities="activities"
        :external-loading="isLoading"
        :list-error="listError"
        :key="viewKey"
        @sendActivityData="validateActivityData"
        @deleteActivity="deleteActivity"
    />
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';

    import ActivitiesService from '@/services/useActivities';

    const router = useRouter();
    const snackbar = useSnackbar();

    const isLoading = ref(false);
    const listError = ref(false);
    const viewKey = ref(0);

    const activities = ref();
    const activityData = ref({
        name: '',
        startDate: '',
        endDate: '',
        schedule: [],
        maxStudents: null,
        instructor: null,
        location: null,
        id: null,
    });

    const queryActivities = async () => {
        try {
            activities.value = await ActivitiesService.getActivities();
        } catch (error) {
            if (error) {
                listError.value = true;
                let message =
                    'Ha ocurrido un error al obtener la lista de actividades. Por favor intenta de nuevo más tarde.';

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

    onMounted(async () => {
        queryActivities();
    });

    const validationErrorStatus = ref({
        name: false,
        startDate: false,
        endDate: false,
        schedule: false,
        maxStudents: false,
        instructor: false,
        location: false,
    });

    const validationErrorMessage = ref({
        name: '',
        startDate: '',
        endDate: '',
        schedule: '',
        maxStudents: '',
        instructor: '',
        location: '',
    });

    const validateActivityData = async (operation) => {
        if (activityData.value.name === '') {
            validationErrorStatus.value.name = true;
            validationErrorMessage.value.name = 'El nombre es obligatorio';
        } else {
            validationErrorStatus.value.name = false;
            validationErrorMessage.value.name = '';
        }

        if (activityData.value.startDate === '') {
            validationErrorStatus.value.startDate = true;
            validationErrorMessage.value.startDate =
                'La fecha de inicio es obligatoria';
        } else {
            validationErrorStatus.value.startDate = false;
            validationErrorMessage.value.startDate = '';
        }

        if (activityData.value.endDate === '') {
            validationErrorStatus.value.endDate = true;
            validationErrorMessage.value.endDate = 'La fecha de fin es obligatoria';
        } else {
            validationErrorStatus.value.endDate = false;
            validationErrorMessage.value.endDate = '';
        }

        if (!activityData.value.schedule || !activityData.value.schedule[0]) {
            validationErrorStatus.value.schedule = true;
            snackbar.add({
                type: 'error',
                text: 'El horario es obligatorio',
            });
        } else {
            validationErrorStatus.value.schedule = true;
        }

        if (activityData.value.maxStudents === null) {
            validationErrorStatus.value.maxStudents = true;
            validationErrorMessage.value.maxStudents =
                'El número máximo de estudiantes es obligatorio';
        } else {
            validationErrorStatus.value.maxStudents = false;
            validationErrorMessage.value.maxStudents = '';
        }

        if (activityData.value.instructor === null) {
            validationErrorStatus.value.instructor = true;
            validationErrorMessage.value.instructor = 'El instructor es obligatorio';
        } else {
            validationErrorStatus.value.instructor = false;
            validationErrorMessage.value.instructor = '';
        }

        if (activityData.value.location === null) {
            validationErrorStatus.value.location = true;
            validationErrorMessage.value.location = 'La ubicación es obligatoria';
        } else {
            validationErrorStatus.value.location = false;
            validationErrorMessage.value.location = '';
        }

        if (
            !validationErrorStatus.value.name &&
            !validationErrorStatus.value.startDate &&
            !validationErrorStatus.value.endDate &&
            !validationErrorStatus.value.startHour &&
            !validationErrorStatus.value.endHour &&
            !validationErrorStatus.value.maxStudents &&
            !validationErrorStatus.value.instructor &&
            !validationErrorStatus.value.location
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
                    nombre: activityData.value.name,
                    fechaInicio: activityData.value.startDate,
                    fechaFin: activityData.value.endDate,
                    horarios: activityData.value.schedule,
                    maxEstudiantes: activityData.value.maxStudents,
                    instructorId: activityData.value.instructor,
                    ubicacionId: activityData.value.location,
                });
            }

            if (operation === 'update') {
                response = await ActivitiesService.putActivity(
                    activityData.value.id,
                    {
                        nombre: activityData.value.name,
                        fechaInicio: activityData.value.startDate,
                        fechaFin: activityData.value.endDate,
                        horarios: activityData.value.schedule,
                        maxEstudiantes: activityData.value.maxStudents,
                        instructorId: activityData.value.instructor,
                        ubicacionId: activityData.value.location,
                    }
                );
            }

            if (response) {
                await queryActivities();
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
        activityData.value = {
            name: '',
            startDate: '',
            endDate: '',
            startHour: '',
            endHour: '',
            day: '',
            maxStudents: null,
            instructor: null,
            location: null,
            id: null,
        };
    };

    const deleteActivity = async (id) => {
        try {
            isLoading.value = true;
            const response = await ActivitiesService.deleteActivity(id);

            if (response) {
                await queryActivities();
                isLoading.value = false;
                snackbar.add({
                    type: 'success',
                    text: 'Se ha eliminado la actividad',
                });

                router.go(-1);
            }
        } catch (error) {
            isLoading.value = false;
            if (error) {
                let message =
                    'Ha ocurrido un error al eliminar la actividad. Por favor intenta de nuevo más tarde.';

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
