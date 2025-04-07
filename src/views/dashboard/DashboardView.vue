<template>
    <Dashboard :actividades="items" @logOut="logOut"/>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Dashboard from '../../components/dashboard/Dashboard.vue'

import DashboardService from '../../services/useDashboard'
import LocalStorage from '../../services/useLocalStorage'

const router = useRouter()

const items = ref()

onMounted(async () => {
    items.value = await DashboardService.getActividades()
})

const logOut = () => {
    LocalStorage.endSession()

    router.push({ name: 'login' })
}
</script>