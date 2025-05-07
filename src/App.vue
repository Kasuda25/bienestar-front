<template>
    <router-view />
    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { Vue3Snackbar } from 'vue3-snackbar';

    import LocalStorage from '@/services/useLocalStorage';

    onMounted(() => {
        LocalStorage.restoreSession();
    });
</script>
