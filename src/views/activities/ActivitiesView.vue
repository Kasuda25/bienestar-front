<template>
    <router-view
        v-model:activityData="activityData"
        v-model:validationErrorStatus="validationErrorStatus"
        v-model:validationErrorMessage="validationErrorMessage"
        :activities="activities"
        :enrolled-activities="enrolledActivities"
        :total-pages="totalPages"
        :enrrolled-total-pages="enrrolledTotalPages"
        :external-loading="isLoading"
        :list-error="listError"
        :enrolled-list-error="enrolledListError"
        :key="viewKey"
        @sendActivityData="validateActivityData"
        @sendEnrollData="sendEnrollData"
        @deleteActivity="deleteActivity"
        @removeScheduleError="handleRemoveScheduleError"
        @changePage="changePage"
        @onSearch="searchElement"
    />
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';

    import ActivitiesService from '@/services/useActivities';
    import InscriptionsService from '@/services/useInscriptions';
    import StudentsService from '@/services/useStudents';

    import { useAuthStore } from '@/stores/auth';

    const router = useRouter();
    const snackbar = useSnackbar();

    const authStore = useAuthStore();

    const isLoading = ref(false);
    const listError = ref(false);
    const enrolledListError = ref(false);
    const viewKey = ref(0);
    const totalPages = ref(0);
    const enrrolledTotalPages = ref(0);

    const activities = ref();
    const enrolledActivities = ref('');
    const activityData = ref({
        name: '',
        startDate: '',
        endDate: '',
        schedule: [],
        selectedDays: {},
        maxStudents: null,
        instructor: null,
        location: null,
        id: null,
    });

    const changePage = async (page, search, table) => {
        activities.value = null;
        if (authStore.user.rol === 'ADMIN') {
            await queryActivities(page, 10, search);
        }

        if (authStore.user.rol === 'INSTRUCTOR') {
            await queryActivitiesByInstructor(page, 10, search);
        }

        if (authStore.user.rol === 'ESTUDIANTE') {
            if (table === 'enrolled') {
                await queryActivitiesByStudent(page, 10, search);
            } else if (table === 'all') {
                await queryActivities(page, 10, search);
            }
        }
    };

    const searchElement = async (search, table) => {
        if (authStore.user.rol === 'ADMIN') {
            activities.value = null;
            await queryActivities(0, 10, search);
        }

        if (authStore.user.rol === 'INSTRUCTOR') {
            activities.value = null;
            await queryActivitiesByInstructor(0, 10, search);
        }

        if (authStore.user.rol === 'ESTUDIANTE') {
            if (table === 'enrolled') {
                enrolledActivities.value = null;
                await queryActivitiesByStudent(0, 10, search);
            } else if (table === 'all') {
                activities.value = null;
                await queryActivities(0, 10, search);
            }
        }
    };

    const queryActivities = async (page = 0, size = 10, search = '') => {
        try {
            const response = await ActivitiesService.getActivities(
                page,
                size,
                search
            );

            activities.value = response.data;
            totalPages.value = response.pagination.totalPages;
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

    const queryActivitiesByInstructor = async (
        page = 0,
        size = 10,
        search = ''
    ) => {
        try {
            const response = await ActivitiesService.getActivitiesByInstructor(
                page,
                size,
                search
            );

            activities.value = response.data;
            totalPages.value = response.pagination.totalPages;
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

    const queryActivitiesByStudent = async (
        page = 0,
        size = 10,
        search = ''
    ) => {
        try {
            const response = await StudentsService.getActivitiesByStudent(
                page,
                size,
                search
            );

            enrolledActivities.value = response.data;
            enrrolledTotalPages.value = response.pagination.totalPages;
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
        if (authStore.user.rol === 'ADMIN') {
            await queryActivities();
        }

        if (authStore.user.rol === 'INSTRUCTOR') {
            await queryActivitiesByInstructor();
        }

        if (authStore.user.rol === 'ESTUDIANTE') {
            await queryActivitiesByStudent();
            await queryActivities();
        }
    });

    const validationErrorStatus = ref({
        name: false,
        startDate: false,
        endDate: false,
        schedule: [],
        maxStudents: false,
        instructor: false,
        location: false,
    });

    const validationErrorMessage = ref({
        name: '',
        startDate: '',
        endDate: '',
        schedule: [],
        maxStudents: '',
        instructor: '',
        location: '',
    });

    const handleRemoveScheduleError = (index) => {
        if (Array.isArray(validationErrorStatus.value.schedule)) {
            validationErrorStatus.value.schedule.splice(index, 1);
        }

        if (Array.isArray(validationErrorMessage.value.schedule)) {
            validationErrorMessage.value.schedule.splice(index, 1);
        }
    };

    const validateSchedule = () => {
        const schedule = activityData.value.schedule;
        const status = [];
        const messages = [];
        let hasError = false;

        schedule.forEach((item) => {
            const errors = {};
            const messagesPerItem = {};

            if (!item.dia) {
                errors.dia = true;
                messagesPerItem.dia = 'Seleccione un día';
                hasError = true;
            }

            if (!item.horaInicio) {
                errors.horaInicio = true;
                messagesPerItem.horaInicio = 'Hora de inicio requerida';
                hasError = true;
            }

            if (!item.horaFin) {
                errors.horaFin = true;
                messagesPerItem.horaFin = 'Hora de fin requerida';
                hasError = true;
            }

            if (
                item.horaInicio &&
                item.horaFin &&
                item.horaFin <= item.horaInicio
            ) {
                errors.horaFin = true;
                messagesPerItem.horaFin =
                    'Hora de fin debe ser mayor que la de inicio';
                hasError = true;
            }

            status.push(errors);
            messages.push(messagesPerItem);
        });

        const groupedByDay = {};

        schedule.forEach((item, index) => {
            if (!item.dia || !item.horaInicio || !item.horaFin) return;

            const dia = item.dia;
            if (!groupedByDay[dia]) {
                groupedByDay[dia] = [];
            }

            groupedByDay[dia].push({ ...item, index });
        });

        for (const dia in groupedByDay) {
            const items = groupedByDay[dia];

            for (let i = 0; i < items.length; i++) {
                for (let j = i + 1; j < items.length; j++) {
                    const a = items[i];
                    const b = items[j];

                    if (a.horaInicio < b.horaFin && b.horaInicio < a.horaFin) {
                        status[a.index].horaInicio = true;
                        status[a.index].horaFin = true;
                        messages[a.index].horaInicio =
                            'Cruce de horario con otro en el mismo día';
                        messages[a.index].horaFin =
                            'Cruce de horario con otro en el mismo día';

                        status[b.index].horaInicio = true;
                        status[b.index].horaFin = true;
                        messages[b.index].horaInicio =
                            'Cruce de horario con otro en el mismo día';
                        messages[b.index].horaFin =
                            'Cruce de horario con otro en el mismo día';

                        hasError = true;
                    }
                }
            }
        }

        validationErrorStatus.value.schedule = status;
        validationErrorMessage.value.schedule = messages;

        return hasError;
    };

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
            validationErrorMessage.value.endDate =
                'La fecha de fin es obligatoria';
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
            validationErrorMessage.value.instructor =
                'El instructor es obligatorio';
        } else {
            validationErrorStatus.value.instructor = false;
            validationErrorMessage.value.instructor = '';
        }

        if (activityData.value.location === null) {
            validationErrorStatus.value.location = true;
            validationErrorMessage.value.location =
                'La ubicación es obligatoria';
        } else {
            validationErrorStatus.value.location = false;
            validationErrorMessage.value.location = '';
        }

        let schedule;

        if (operation === 'create') {
            schedule = validateSchedule();
        }

        if (
            !validationErrorStatus.value.name &&
            !validationErrorStatus.value.startDate &&
            !validationErrorStatus.value.endDate &&
            !validationErrorStatus.value.startHour &&
            !validationErrorStatus.value.endHour &&
            !validationErrorStatus.value.maxStudents &&
            !validationErrorStatus.value.instructor &&
            !validationErrorStatus.value.location &&
            !schedule
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
                    ubicacionId: activityData.value.location.id,
                });
            }

            if (operation === 'update') {
                for (const item of activityData.value.schedule) {
                    item.horarioUbicacionId = item.horarioBase.id;
                }

                response = await ActivitiesService.putActivity(
                    activityData.value.id,
                    {
                        nombre: activityData.value.name,
                        fechaInicio: activityData.value.startDate,
                        fechaFin: activityData.value.endDate,
                        maxEstudiantes: activityData.value.maxStudents,
                        instructorId: activityData.value.instructor,
                        ubicacion: activityData.value.location,
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
                let messages = [];

                if (error.type === 'backend') {
                    if (
                        error.message?.errors &&
                        typeof error.message.errors === 'object'
                    ) {
                        for (const key in error.message.errors) {
                            if (
                                Object.prototype.hasOwnProperty.call(
                                    error.message.errors,
                                    key
                                )
                            ) {
                                messages.push(error.message.errors[key]);
                            }
                        }
                    } else {
                        messages.push(
                            error.message.message ||
                                'Error desconocido del servidor'
                        );
                    }
                } else if (
                    error.type === 'network' ||
                    error.type === 'unknown'
                ) {
                    messages.push(
                        error.message || 'Ha ocurrido un error inesperado.'
                    );
                }

                messages.forEach((msg) => {
                    snackbar.add({
                        type: 'error',
                        text: msg,
                    });
                });
            }
        }
    };

    const sendEnrollData = async (activityId) => {
        try {
            isLoading.value = true;
            const response = await InscriptionsService.createInscription({
                student: authStore.id,
                activity: activityId,
            });

            if (response) {
                await queryActivities();
                isLoading.value = false;
                snackbar.add({
                    type: 'success',
                    text: 'Estudiante inscrito exitosamente',
                });

                router.push({
                    name: 'activities-detail',
                    params: { id: activityData.value.id },
                });
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
