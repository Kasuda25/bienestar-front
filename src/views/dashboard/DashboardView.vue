<template>
        <Dashboard
            :activities="activities"
            :listError="listError"
        />
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar} from 'vue3-snackbar';

    import LocalStorage from '../../services/useLocalStorage';

    import Dashboard from '../../components/dashboard/Dashboard.vue';

    import ActividadesServices from '../../services/useActividades';

    const router = useRouter();
    const snackbar = useSnackbar();

    const listError = ref(false);

    const activities = ref();

    onMounted(async () => {
        try {
            activities.value = await ActividadesServices.getActivities();
        } catch (error) {
            listError.value = true;
            snackbar.add({
                type: 'error',
                text: 'Ha ocurrido un error. Por favor intenta de nuevo mas tade',
            });
        }
    });
</script>
