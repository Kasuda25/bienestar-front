<template>
    <router-view />
    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
</template>

<script setup>
    import { Vue3Snackbar } from 'vue3-snackbar';
</script>
