<template>
    <div class="container-fluid py-2 pe-3">
        <div v-if="authStore.user.rol === 'ESTUDIANTE'" class="row">
            <div class="col-12">
                <div class="card my-4">
                    <div
                        class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                    >
                        <div
                            class="d-flex justify-content-between bg-gradient-dark shadow-dark border-radius-lg py-3"
                        >
                            <h6 class="text-white ps-3 my-auto">
                                Mis actividades
                            </h6>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-3">
                        <div
                            class="d-flex justify-content-end align-items-center px-3 mb-3 input-group input-group-outline"
                        >
                            <input
                                type="text"
                                v-model="enrolledSearchQuery"
                                class="form-control me-2"
                                placeholder="Buscar actividad..."
                                style="max-width: 250px"
                            />
                            <button
                                class="btn bg-gradient-dark mb-0"
                                @click="enrolledOnSearch('enrolled')"
                            >
                                Buscar
                            </button>
                        </div>
                        <div v-if="!enrolledActivities && !enrolledListError">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
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
                                        enrolledActivities &&
                                        enrolledActivities[0] &&
                                        !enrolledListError
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
                                            Dias
                                        </th>
                                        <th
                                            v-if="enrolledActivities[0].instructor"
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Instructor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div v-if="enrolledListError">
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
                                <tbody
                                    v-if="
                                        enrolledActivities &&
                                        !enrolledActivities[0] &&
                                        !enrolledListError
                                    "
                                    class="no-items"
                                >
                                    <div>
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <h4 class="my-auto">
                                                Aún no te has inscrito a alguna actividad
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody
                                    v-if="
                                        enrolledActivities &&
                                        enrolledActivities[0] &&
                                        !enrolledListError
                                    "
                                >
                                    <tr
                                        v-for="activity in enrolledActivities"
                                        :key="activity.id"
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
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        activity.ubicacion
                                                            ?.nombre
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/activities/${activity.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    v-if="activity.horarios"
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        formatDays(
                                                            activity.horarios,
                                                            'admin'
                                                        )
                                                    }}
                                                </span>
                                                <span
                                                    v-if="
                                                        activity.horariosAsignados
                                                    "
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        formatDays(
                                                            activity.horariosAsignados,
                                                            'instructor'
                                                        )
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                        <td
                                            v-if="activity.instructor"
                                            class="d-flex align-middle"
                                        >
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
                                                        activity.instructor
                                                            .usuario.nombre
                                                    }}
                                                    {{
                                                        activity.instructor
                                                            .usuario.apellido
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="enrolledActivities && enrolledActivities[0] && !enrolledListError">
                            <div class="d-flex justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination mt-3 mb-1">
                                        <li class="page-item">
                                            <div
                                                v-if="enrolledCurrentPage > 0"
                                                class="page-link"
                                                aria-label="Previous"
                                                @click="enrolledPreviousPage"
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
                                            v-for="page in props.enrolledTotalPages"
                                            :key="page"
                                            class="page-item"
                                        >
                                            <div
                                                v-if="props.enrolledTotalPages > 1"
                                                class="page-link"
                                                @click="
                                                    () => {
                                                        enrolledCurrentPage = page - 1;
                                                        enrolledCustomPage('enrolled');
                                                    }
                                                "
                                            >
                                                {{ page }}
                                            </div>
                                        </li>
                                        <li class="page-item">
                                            <div
                                                v-if="
                                                    enrolledCurrentPage <
                                                    props.enrolledTotalPages - 1
                                                "
                                                class="page-link"
                                                aria-label="Next"
                                                @click="enrolledNextPage"
                                            >
                                                <span
                                                    class="material-symbols-rounded"
                                                >
                                                    keyboard_arrow_right
                                                </span>
                                                <span class="sr-only"
                                                    >Next</span
                                                >
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
        <div class="row">
            <div class="col-12">
                <div class="card my-4">
                    <div
                        class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                    >
                        <div
                            class="d-flex justify-content-between bg-gradient-dark shadow-dark border-radius-lg py-3"
                        >
                            <h6
                                v-if="
                                    authStore.user.rol === 'ADMIN' ||
                                    authStore.user.rol === 'ESTUDIANTE'
                                "
                                class="text-white ps-3 my-auto"
                            >
                                Lista de actividades
                                <span v-if="authStore.user.rol === 'ESTUDIANTE'"
                                    >disponibles</span
                                >
                            </h6>
                            <h6
                                v-if="authStore.user.rol === 'INSTRUCTOR'"
                                class="text-white ps-3 my-auto"
                            >
                                Mis actividades
                            </h6>
                            <div class="pe-3">
                                <RouterLink
                                    to="/activities/create"
                                    v-slot="{ navigate, href }"
                                    custom
                                >
                                    <a
                                        v-if="authStore.user.rol === 'ADMIN'"
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
                        <div
                            class="d-flex justify-content-end align-items-center px-3 mb-3 input-group input-group-outline"
                        >
                            <input
                                type="text"
                                v-model="searchQuery"
                                class="form-control me-2"
                                placeholder="Buscar actividad..."
                                style="max-width: 250px"
                            />
                            <button
                                class="btn bg-gradient-dark mb-0"
                                @click="onSearch('all')"
                            >
                                Buscar
                            </button>
                        </div>
                        <div v-if="!activities && !listError">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
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
                                            Dias
                                        </th>
                                        <th
                                            v-if="activities[0].instructor"
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
                                <tbody
                                    v-if="
                                        activities &&
                                        !activities[0] &&
                                        !listError
                                    "
                                    class="no-items"
                                >
                                    <div>
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
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        activity.ubicacion
                                                            ?.nombre
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/activities/${activity.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    v-if="activity.horarios"
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        formatDays(
                                                            activity.horarios,
                                                            'admin'
                                                        )
                                                    }}
                                                </span>
                                                <span
                                                    v-if="
                                                        activity.horariosAsignados
                                                    "
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        formatDays(
                                                            activity.horariosAsignados,
                                                            'instructor'
                                                        )
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                        <td
                                            v-if="activity.instructor"
                                            class="d-flex align-middle"
                                        >
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
                                                        activity.instructor
                                                            .usuario.nombre
                                                    }}
                                                    {{
                                                        activity.instructor
                                                            .usuario.apellido
                                                    }}
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="activities && activities[0] && !listError">
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
                                                <span class="sr-only"
                                                    >Next</span
                                                >
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
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    import { useAuthStore } from '@/stores/auth';

    const emit = defineEmits(['changePage', 'onSearch']);
    const props = defineProps({
        activities: Array,
        enrolledActivities: Array,
        totalPages: Number,
        enrolledTotalPages: Number,
        listError: Boolean,
        enrolledListError: Boolean,
    });

    const authStore = useAuthStore();

    const currentPage = ref(0);
    const enrolledCurrentPage = ref(0);

    const searchQuery = ref('');
    const enrolledSearchQuery = ref('');

    const diasConTilde = {
        lunes: 'Lunes',
        martes: 'Martes',
        miercoles: 'Miércoles',
        jueves: 'Jueves',
        viernes: 'Viernes',
        sabado: 'Sábado',
        domingo: 'Domingo',
    };

    const ordenSemana = [
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
        'domingo',
    ];

    const formatDays = (horarios, rol) => {
        if (!horarios || !Array.isArray(horarios)) return '';

        let diasUnicos;

        if (rol === 'admin') {
            diasUnicos = Array.from(
                new Set(
                    horarios.map((h) =>
                        h.horarioBase.dia
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                    )
                )
            );
        } else if (rol === 'instructor') {
            diasUnicos = Array.from(
                new Set(
                    horarios.map((h) =>
                        h.dia
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                    )
                )
            );
        }

        diasUnicos.sort(
            (a, b) => ordenSemana.indexOf(a) - ordenSemana.indexOf(b)
        );

        const diasFinal = diasUnicos.map((dia) => diasConTilde[dia] || dia);

        const len = diasFinal.length;
        if (len === 0) return '';
        if (len === 1) return diasFinal[0];
        if (len === 2) return diasFinal.join(' y ');
        return diasFinal.slice(0, -1).join(', ') + ' y ' + diasFinal[len - 1];
    };

    const previousPage = () => {
        if (currentPage.value > 0) {
            currentPage.value--;
        }

        emit('changePage', currentPage.value, searchQuery.value, 'all');
    };

    const customPage = () => {
        emit('changePage', currentPage.value, searchQuery.value, 'all');
    };

    const nextPage = () => {
        if (currentPage.value < props.totalPages) {
            currentPage.value++;
        }

        emit('changePage', currentPage.value, searchQuery.value, 'all');
    };

    const enrolledPreviousPage = () => {
        if (enrolledCurrentPage.value > 0) {
            enrolledCurrentPage.value--;
        }

        emit('changePage', enrolledCurrentPage.value, enrolledSearchQuery.value, 'enrolled');
    };

    const enrolledCustomPage = () => {
        emit('changePage', enrolledCurrentPage.value, enrolledSearchQuery.value, 'enrolled');
    };

    const enrolledNextPage = () => {
        if (enrolledCurrentPage.value < props.enrolledTotalPages) {
            enrolledCurrentPage.value++;
        }

        emit('changePage', enrolledCurrentPage.value, enrolledSearchQuery.value, 'enrolled');
    };

    const onSearch = () => {
        emit('onSearch', searchQuery.value, 'all');
    };

    const enrolledOnSearch = () => {
        emit('onSearch', enrolledSearchQuery.value, 'enrolled');
    };
</script>

<style scoped>
    .no-items {
        border-top: none;
    }

    .page-link {
        cursor: pointer;
    }

    .input-group
        > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
            .valid-feedback
        ):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: calc(1px * -1);
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        height: 40px;
    }
</style>
