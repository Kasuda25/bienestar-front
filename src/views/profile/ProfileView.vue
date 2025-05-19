<template>
    <div>
        <AdminView v-if="authStore.user.rol === 'ADMIN'" />
        <InstructorView v-else-if="authStore.user.rol === 'INSTRUCTOR'" />
        <StudentView v-else-if="authStore.user.rol === 'ESTUDIANTE'" />
    </div>
</template>

<script setup>
import AdminView from '@/components/profile/AdminProfile.vue';
import InstructorView from '@/components/profile/InstructorProfile.vue';
import StudentView from '@/components/profile/StudentProfile.vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>