<template>
    <Dashboard
        :activities="activities"
        :instructors="instructors"
        :activity-list-error="activityListError"
        :instructor-list-error="instructorListError"
    />
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';


    import Dashboard from '@/components/dashboard/Dashboard.vue';

    import ActivitiesService from '@/services/useActivities';
    import InstructorsService from '@/services/useInstructors';

    const snackbar = useSnackbar();

    const activityListError = ref(false);
    const instructorListError = ref(false);

    const activities = ref();
    const instructors = ref();

    onMounted(async () => {
        try {
            activities.value = await ActivitiesService.getActivities();
        } catch (error) {
            if (error) {
                activityListError.value = true;
                snackbar.add({
                    type: 'error',
                    text: 'Ha ocurrido un error al obtener la lista de actividades. Por favor intenta de nuevo mas tade',
                });
            }
        }

        try {
            instructors.value = await InstructorsService.getInstructors();
        } catch (error) {
            if (error) {
                instructorListError.value = true;
                snackbar.add({
                    type: 'error',
                    text: 'Ha ocurrido un error al obtener la lista de instructores. Por favor intenta de nuevo mas tade',
                });
            }
        }
    });
</script>
