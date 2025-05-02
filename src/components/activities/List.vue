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
                                Lista de activities
                            </h6>
                            <div class="pe-3">
                                <RouterLink
                                    to="/activities/create"
                                    v-slot="{ navigate }"
                                    custom
                                >
                                    <a
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
                                <div v-if="!activities">
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
                                <thead v-if="activities && activities[0]">
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
                                            Horario
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
                                        <th
                                            class="text-secondary opacity-7"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div v-if="activities && !activities[0]">
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <h4 class="my-auto">
                                                Aún no hay activities
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody v-if="activities && activities[0]">
                                    <tr
                                        v-if="activities"
                                        v-for="activity in activities"
                                        :key="activity.id"
                                        @click="
                                            $router.push(
                                                `/activities/${activity.id}`
                                            )
                                        "
                                        class="cursor-pointer"
                                    >
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div
                                                    class="d-flex flex-column justify-content-center"
                                                >
                                                    <h6 class="mb-0 text-sm">
                                                        {{ activity.nombre }}
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                class="text-xs font-weight-bold"
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
                                        </td>
                                        <td class="align-middle text-sm">
                                            <span
                                                class="text-xs font-weight-bold"
                                            >
                                                {{
                                                    activity.horaInicio.slice(0, 5)
                                                }}
                                                -
                                                {{
                                                    activity.horaFin.slice(0, 5)
                                                }}</span
                                            >
                                        </td>
                                        <td class="align-middle text-sm">
                                            <span
                                                class="text-xs font-weight-bold"
                                            >
                                                {{ activity.ubicacion }}
                                            </span>
                                        </td>
                                        <td class="align-middle text-sm">
                                            <span
                                                class="text-xs font-weight-bold"
                                            >
                                                {{
                                                    activity.instructor.nombre
                                                        .usuario.nombre
                                                }}
                                                {{
                                                    activity.instructor.nombre
                                                        .usuario.apellido
                                                }}
                                            </span>
                                        </td>
                                        <td class="align-middle text-sm">
                                            <a
                                                href="javascript:;"
                                                class="text-secondary font-weight-bold text-xs"
                                                data-toggle="tooltip"
                                                data-original-title="Edit user"
                                            >
                                                Edit
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
    const emit = defineEmits();
    const props = defineProps({
        activities: Array,
    });
</script>

<style scoped>
    .no-scroll {
        overflow: hidden;
    }
</style>
