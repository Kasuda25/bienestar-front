<template>
    <div class="container-fluid py-2 pe-3">
        <div class="row">
            <div class="ms-3 mb-4">
                <h3 class="mb-0 h4 font-weight-bolder">Dashboard</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        activities: Array,
        instructors: Array,
        activityListError: Boolean,
        instructorListError: Boolean,
    });
</script>
