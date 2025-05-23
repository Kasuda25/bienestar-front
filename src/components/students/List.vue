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
                                Lista de estudiantes
                                <span v-if="authStore.user.rol === 'INSTRUCTOR'"
                                    >inscritos</span
                                >
                            </h6>
                            <div
                                v-if="authStore.user.rol === 'ADMIN'"
                                class="pe-3"
                            >
                                <RouterLink
                                    to="/students/create"
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
                        <div class="d-flex w-100 mb-2 px-4">
                            <div
                                class="w-25 input-group input-group-outline ms-auto"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Buscar por código"
                                    v-model="searchQuery"
                                />
                            </div>
                        </div>
                        <div class="table-responsive p-0 no-scroll">
                            <table class="table align-activitys-center mb-0">
                                <div v-if="!students && !listError">
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
                                    v-if="students && students[0] && !listError"
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
                                            Código
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Programa
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Semestre
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Horas completadas
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
                                                la lista de estudiantes
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody
                                    v-if="
                                        students && !students[0] && !listError
                                    "
                                    class="no-items"
                                >
                                    <div>
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <h4 class="my-auto">
                                                Aún no hay estudiantes
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody
                                    v-if="students && filteredStudents.length && !listError"
                                >
                                    <tr
                                        v-for="student in students"
                                        :key="student.id"
                                    >
                                        <td class="align-middle">
                                            <a
                                                :href="`/students/${student.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark ps-3"
                                            >
                                                <span
                                                    class="h6 mb-0 text-sm font-weight-bolder opacity-8"
                                                >
                                                    {{ student.nombreCompleto }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/students/${student.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        student.codigoEstudiantil
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/students/${student.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        student.programaAcademico
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/students/${student.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{ student.semestre }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/students/${student.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <div class="d-flex flex-column">
                                                    <span
                                                        class="text-xs font-weight-bold mb-1"
                                                    >
                                                        {{
                                                            student.horasAcumuladas
                                                        }}
                                                        / 32 horas
                                                    </span>
                                                    <div
                                                        class="progress"
                                                        style="height: 3px"
                                                    >
                                                        <div
                                                            class="progress-bar bg-info"
                                                            role="progressbar"
                                                            :style="{
                                                                width:
                                                                    (student.horasAcumuladas /
                                                                        32) *
                                                                        100 +
                                                                    '%',
                                                            }"
                                                            :aria-valuenow="
                                                                student.horasAcumuladas
                                                            "
                                                            aria-valuemin="0"
                                                            aria-valuemax="32"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody
                                    v-if="
                                        students && !filteredStudents.length && !listError
                                    "
                                >
                                    <tr>
                                        <td colspan="5" class="text-center">
                                            No se encontraron estudiantes con
                                            ese código
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
    import { ref, computed } from 'vue';

    import { useAuthStore } from '@/stores/auth';

    const props = defineProps({
        students: Array,
        listError: Boolean,
    });

    const authStore = useAuthStore();

    const searchQuery = ref('');

    const filteredStudents = computed(() => {
        if (!searchQuery.value) return props.students;
        return props.students.filter((student) =>
            student.codigoEstudiantil
                ?.toString()
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())
        );
    });
</script>

<style scoped>
    .no-items {
        border-top: none;
    }
</style>
