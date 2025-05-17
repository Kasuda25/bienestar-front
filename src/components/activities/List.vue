<template>
    <div class="container-fluid py-2 pe-3">
        <div class="row">
            <div class="col-12">
                <div class="card my-4">
                    <div
                        class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                    >
                        <div
                            class="d-flex justify-content-between bg-gradient-dark shadow-dark border-radius-lg py-3"
                        >
                            <h6 class="text-white ps-3 my-auto">
                                Lista de actividades
                            </h6>
                            <div class="pe-3">
                                <RouterLink
                                    to="/activities/create"
                                    v-slot="{ navigate, href }"
                                    custom
                                >
                                    <a
                                        :href="href"
                                        class="btn btn-light mb-0"
                                        @click="navigate"
                                    >
                                        <i
                                            class="material-symbols-rounded text-sm"
                                            >add</i
                                        >&nbsp;&nbsp;Crear
                                    </a>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-3">
                        <div class="table-responsive p-0 no-scroll">
                            <table class="table align-activitys-center mb-0">
                                <div v-if="!activities && !listError">
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
                                        !listError
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
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Instructor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div v-if="listError">
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
                                <tbody>
                                    <div
                                        v-if="
                                            activities &&
                                            !activities[0] &&
                                            !listError
                                        "
                                    >
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <h4 class="my-auto">
                                                Aún no hay actividades
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody
                                    v-if="
                                        activities &&
                                        activities[0] &&
                                        !listError
                                    "
                                >
                                    <tr
                                        v-for="activity in activities"
                                        :key="activity.id"
                                    >
                                        <td class="align-middle">
                                            <a
                                                :href="`/activities/${activity.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <h6 class="mb-0 ps-3 text-sm font-weight-bolder opacity-8">
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
                                                >
                                                    {{
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
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/activities/${activity.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span class="text-xs font-weight-bolder opacity-6">
                                                    {{ activity.ubicacion?.nombre }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="d-flex align-middle">
                                            <a
                                                :href="`/activities/${activity.id}`"
                                                class="d-block w-100 h-100 ñtext-decoration-none text-dark align-items-center"
                                            >
                                                <img
                                                    src=""
                                                    class="avatar avatar-sm me-2"
                                                />
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6 my-auto"
                                                >
                                                    {{
                                                        activity.instructor.usuario
                                                            .nombre
                                                    }}
                                                    {{
                                                        activity.instructor.usuario
                                                            .apellido
                                                    }}
                                                </span>
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
        listError: Boolean,
    });
</script>
