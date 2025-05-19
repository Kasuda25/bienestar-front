<template>
    <AdminDashboard
        v-if="authStore.user.rol === 'ADMIN'"
        :activities="activities"
        :instructors="instructors"
        :activity-list-error="activityListError"
        :instructor-list-error="instructorListError"
    />
    <InstructorDashboard
        v-if="authStore.user.rol === 'INSTRUCTOR'"
        :activities="activities"
        :activity-list-error="activityListError"
    />
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';

    import AdminDashboard from '@/components/dashboard/AdminDashboard.vue';
    import InstructorDashboard from '@/components/dashboard/InstructorDashboard.vue';

    import { useAuthStore } from '@/stores/auth';

    import ActivitiesService from '@/services/useActivities';
    import InstructorsService from '@/services/useInstructors';

    const snackbar = useSnackbar();

    const authStore = useAuthStore();

    const activityListError = ref(false);
    const instructorListError = ref(false);

    const activities = ref();
    const instructors = ref();

    onMounted(async () => {
        if (authStore.user.rol === 'ADMIN') {
            try {
                const response = await ActivitiesService.getActivities();

                activities.value = response.data;
            } catch (error) {
                if (error) {
                    activityListError.value = true;
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

            try {
                const response = await InstructorsService.getInstructors();

                instructors.value = response.data;
            } catch (error) {
                if (error) {
                    instructorListError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la lista de instructores. Por favor intenta de nuevo más tarde.';

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
        }

        if (authStore.user.rol === 'INSTRUCTOR') {
            try {
                // const response = await ActivitiesService.getActivitiesByInstructor(authStore.user.id);
                const response = await ActivitiesService.getActivitiesByInstructor(34);

                activities.value = response.data;
            } catch (error) {
                if (error) {
                    activityListError.value = true;
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
        }
    });
</script>
