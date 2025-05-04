<template>
        <Dashboard
            :activities="activities"
            :instructors="instructors"
            :activityListError="activityListError"
            :instructorListError="instructorListError"
        />
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar} from 'vue3-snackbar';

    import LocalStorage from '@/services/useLocalStorage';

    import Dashboard from '@/components/dashboard/Dashboard.vue';

    import ActivitiesService from '@/services/useActivities';
    import InstructorsService from '@/services/useInstructors';

    const router = useRouter();
    const snackbar = useSnackbar();

    const activityListError = ref(false);
    const instructorListError = ref(false);

    const activities = ref();
    const instructors = ref();

    onMounted(async () => {
        try {
            activities.value = await ActivitiesService.getActivities();
        } catch (error) {
            activityListError.value = true;
            snackbar.add({
                type: 'error',
                text: 'Ha ocurrido un error al obtener la lista de actividades. Por favor intenta de nuevo mas tade',
            });
        }

        try {
            instructors.value = await InstructorsService.getInstructors();
        } catch (error) {
            instructorListError.value = true;
            snackbar.add({
                type: 'error',
                text: 'Ha ocurrido un error al obtener la lista de instructores. Por favor intenta de nuevo mas tade',
            });
        }
    });
</script>
