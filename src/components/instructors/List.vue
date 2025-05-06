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
                                Lista de instructores
                            </h6>
                            <div class="pe-3">
                                <RouterLink
                                    to="/instructors/create"
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
                                        >&nbsp;&nbsp;Agregar
                                    </a>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-3">
                        <div class="table-responsive p-0 no-scroll">
                            <table class="table align-activitys-center mb-0">
                                <div v-if="!instructors && !listError">
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
                                        instructors &&
                                        instructors[0] &&
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
                                            correo
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Especialidad
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
                                                la lista de instructores
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody>
                                    <div
                                        v-if="
                                            instructors &&
                                            !instructors[0] &&
                                            !listError
                                        "
                                    >
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <h4 class="my-auto">
                                                Aún no hay instructores
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody
                                    v-if="
                                        instructors &&
                                        instructors[0] &&
                                        !listError
                                    "
                                >
                                    <tr
                                        v-for="instructor in instructors"
                                        :key="instructor.id"
                                        @click="
                                            $router.push(
                                                `/instructors/${instructor.id}`
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
                                                        {{
                                                            instructor.nombreCompleto
                                                        }}
                                                    </h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                class="text-xs font-weight-bold"
                                            >
                                                {{ instructor.usuario.email }}
                                            </span>
                                        </td>
                                        <td class="align-middle text-sm">
                                            <span
                                                class="text-xs font-weight-bold"
                                            >
                                                {{ instructor.especialidad }}
                                            </span>
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
        instructors: Array,
        listError: Boolean,
    });
</script>
