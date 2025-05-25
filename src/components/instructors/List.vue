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
                                        >&nbsp;&nbsp;Agregar
                                    </a>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-3">
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
                        <div class="table-responsive p-0 no-scroll">
                            <table class="table align-activitys-center mb-0">
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
                                <tbody
                                    v-if="
                                        instructors &&
                                        !instructors[0] &&
                                        !listError
                                    "
                                    class="no-items"
                                >
                                    <div>
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
                                    >
                                        <td class="align-middle">
                                            <a
                                                :href="`/instructors/${instructor.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark d-flex align-items-center ps-3"
                                            >
                                                <div>
                                                    <img
                                                        src=""
                                                        class="avatar avatar-sm me-3"
                                                    />
                                                </div>
                                                <div
                                                    class="d-flex flex-column justify-content-center"
                                                >
                                                    <h6
                                                        class="mb-0 text-sm font-weight-bolder opacity-8"
                                                    >
                                                        {{
                                                            instructor.nombreCompleto
                                                        }}
                                                    </h6>
                                                </div>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/instructors/${instructor.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{ instructor.email }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/instructors/${instructor.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        instructor.especialidad
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-center">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination mt-3 mb-1">
                                    <li class="page-item">
                                        <div
                                            v-if="currentPage > 0"
                                            class="page-link"
                                            aria-label="Previous"
                                            @click="previousPage"
                                        >
                                            <span
                                                class="material-symbols-rounded"
                                            >
                                                keyboard_arrow_left
                                            </span>
                                            <span class="sr-only"
                                                >Previous</span
                                            >
                                        </div>
                                    </li>
                                    <li
                                        v-for="page in props.totalPages"
                                        :key="page"
                                        class="page-item"
                                    >
                                        <div
                                            v-if="props.totalPages > 1"
                                            class="page-link"
                                            @click="
                                                () => {
                                                    currentPage = page - 1;
                                                    customPage();
                                                }
                                            "
                                        >
                                            {{ page }}
                                        </div>
                                    </li>
                                    <li class="page-item">
                                        <div
                                            v-if="
                                                currentPage <
                                                props.totalPages - 1
                                            "
                                            class="page-link"
                                            aria-label="Next"
                                            @click="nextPage"
                                        >
                                            <span
                                                class="material-symbols-rounded"
                                            >
                                                keyboard_arrow_right
                                            </span>
                                            <span class="sr-only">Next</span>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const emit = defineEmits(['changePage']);
    const props = defineProps({
        instructors: Array,
        totalPages: Number,
        listError: Boolean,
    });

    const currentPage = ref(0);

    const previousPage = () => {
        if (currentPage.value > 0) {
            currentPage.value--;
        }

        emit('changePage', currentPage.value);
    };

    const customPage = () => {
        emit('changePage', currentPage.value);
    };

    const nextPage = () => {
        if (currentPage.value < props.totalPages) {
            currentPage.value++;
        }

        emit('changePage', currentPage.value);
    };
</script>

<style scoped>
    .no-items {
        border-top: none;
    }

    .page-link {
        cursor: pointer;
    }
</style>
