<template>
    <Dashboard :actividades="items"/>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import Dashboard from '../../components/dashboard/Dashboard.vue'

import DashboardService from '../../services/useDashboard'

const items = ref()

onMounted(async () => {
    items.value = await DashboardService.getActividades()
})
</script>