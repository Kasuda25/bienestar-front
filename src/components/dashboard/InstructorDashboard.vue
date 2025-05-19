<template>
    <div class="container-fluid py-2 pe-3">
        <div class="row">
            <div class="ms-3 mb-4">
                <h3 class="mb-0 h4 font-weight-bolder">Dashboard</h3>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
                <div class="card mb-4">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-6">
                                <h5 class="mb-0 mt-2">Actividades</h5>
                            </div>
                            <div
                                v-if="activities && activities[0]"
                                class="col-6 text-end"
                            >
                                <RouterLink
                                    to="/activities"
                                    v-slot="{ navigate }"
                                    custom
                                >
                                    <a
                                        :href="`/activities`"
                                        class="btn bg-gradient-dark mb-0"
                                        @click="navigate"
                                    >
                                        Ver todas
                                    </a>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-3">
                        <div class="table-responsive no-scroll">
                            <table class="table align-activitys-center mb-0">
                                <div v-if="!activities && !activityListError">
                                    <div class="d-flex justify-content-center">
                                        <div
                                            class="spinner-border"
                                            role="status"
                                        >
                                            <span class="visually-hidden"
                                                >Loading...</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <thead
                                    v-if="
                                        activities &&
                                        activities[0] &&
                                        !activityListError
                                    "
                                >
                                    <tr>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                                        >
                                            Nombre
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Fecha
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Ubicación
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div v-if="activityListError">
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <h4 class="my-auto">
                                                Ha ocurrido un error al obtener
                                                la lista de actividades
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <div
                                    v-if="
                                        activities &&
                                        !activities[0] &&
                                        !activityListError
                                    "
                                >
                                    <div class="d-flex justify-content-center">
                                        <h4 class="my-auto">
                                            No hay activities para mostrar
                                        </h4>
                                    </div>
                                </div>
                                <tbody
                                    v-if="
                                        activities &&
                                        activities[0] &&
                                        !activityListError
                                    "
                                >
                                    <tr
                                        v-for="activity in activities.slice(
                                            0,
                                            5
                                        )"
                                        :key="activity"
                                    >
                                        <td class="align-middle">
                                            <a
                                                :href="`/activities/${activity.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <h6
                                                    class="mb-0 ps-3 text-sm font-weight-bolder opacity-8"
                                                >
                                                    {{ activity.nombre }}
                                                </h6>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/activities/${activity.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                    >{{
                                                        new Date(
                                                            activity.fechaInicio
                                                        ).toLocaleDateString(
                                                            'es-ES'
                                                        )
                                                    }}
                                                    -
                                                    {{
                                                        new Date(
                                                            activity.fechaFin
                                                        ).toLocaleDateString(
                                                            'es-ES'
                                                        )
                                                    }}</span
                                                >
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/activities/${activity.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                    >{{
                                                        activity.ubicacion
                                                            ?.nombre
                                                    }}</span
                                                >
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
