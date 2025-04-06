<template>
    <router-view />
</template>

<script setup>
import { onMounted } from 'vue'

import LocalStorage from '../src/services/useLocalStorage'

onMounted(() => {
    LocalStorage.restoreSession()
})
</script>

<style scoped></style>
