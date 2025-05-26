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
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Instructor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-if="activityListError">
                                    <div class="d-flex justify-content-center">
                                        <h4 class="my-auto">
                                            Ha ocurrido un error al obtener la
                                            lista de actividades
                                        </h4>
                                    </div>
                                </tbody>
                                <tbody
                                    v-if="
                                        activities &&
                                        !activities[0] &&
                                        !activityListError
                                    "
                                    class="no-items"
                                >
                                    <div>
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <h4 class="my-auto">
                                                No hay activities para mostrar
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
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
                                            <RouterLink
                                                :to="`/activities/${activity.id}`"
                                                v-slot="{ href, navigate }"
                                                custom
                                            >
                                                <a
                                                    :href="href"
                                                    class="d-block w-100 h-100 text-decoration-none text-dark"
                                                    @click="navigate"
                                                >
                                                    <h6
                                                        class="mb-0 ps-3 text-sm font-weight-bolder opacity-8"
                                                    >
                                                        {{ activity.nombre }}
                                                    </h6>
                                                </a>
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle">
                                            <RouterLink
                                                :to="`/activities/${activity.id}`"
                                                v-slot="{ href, navigate }"
                                                custom
                                            >
                                                <a
                                                    :href="href"
                                                    class="d-block w-100 h-100 text-decoration-none text-dark"
                                                    @click="navigate"
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
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle">
                                            <RouterLink
                                                :to="`/activities/${activity.id}`"
                                                v-slot="{ href, navigate }"
                                                custom
                                            >
                                                <a
                                                    :href="href"
                                                    class="d-block w-100 h-100 text-decoration-none text-dark"
                                                    @click="navigate"
                                                >
                                                    <span
                                                        class="text-xs font-weight-bolder opacity-6"
                                                        >{{
                                                            activity.ubicacion
                                                                ?.nombre
                                                        }}</span
                                                    >
                                                </a>
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle">
                                            <RouterLink
                                                :to="`/activities/${activity.id}`"
                                                v-slot="{ href, navigate }"
                                                custom
                                            >
                                                <a
                                                    :href="href"
                                                    class="d-block w-100 h-100 text-decoration-none text-dark"
                                                    @click="navigate"
                                                >
                                                    <span
                                                        class="text-xs font-weight-bolder opacity-6"
                                                        >{{
                                                            activity.instructor
                                                                .usuario.nombre
                                                        }}
                                                        {{
                                                            activity.instructor
                                                                .usuario
                                                                .apellido
                                                        }}</span
                                                    >
                                                </a>
                                            </RouterLink>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-6">
                                <h5 class="mb-0 mt-2">Instructores</h5>
                            </div>
                            <div
                                v-if="instructors && instructors[0]"
                                class="col-6 text-end"
                            >
                                <RouterLink
                                    to="/instructors"
                                    v-slot="{ navigate }"
                                    custom
                                >
                                    <a
                                        :href="`/instructors`"
                                        class="btn bg-gradient-dark mb-0"
                                        @click="navigate"
                                    >
                                        Ver todos
                                    </a>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-3">
                        <div class="table-responsive no-scroll">
                            <table class="table align-activitys-center mb-0">
                                <div
                                    v-if="!instructors && !instructorListError"
                                >
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
                                        !instructorListError
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
                                            Correo
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Especialidad
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <div v-if="instructorListError">
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
                                        !instructorListError
                                    "
                                    class="no-items"
                                >
                                    <div>
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <h4 class="my-auto">
                                                No hay instructores para mostrar
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody
                                    v-if="
                                        instructors &&
                                        instructors[0] &&
                                        !instructorListError
                                    "
                                >
                                    <tr
                                        v-for="instructor in instructors.slice(
                                            0,
                                            5
                                        )"
                                        :key="instructor"
                                    >
                                        <td class="align-middle">
                                            <RouterLink
                                                :to="`/instructors/${instructor.id}`"
                                                v-slot="{ href, navigate }"
                                                custom
                                            >
                                                <a
                                                    :href="href"
                                                    class="d-block w-100 h-100 text-decoration-none text-dark d-flex align-items-center ps-3"
                                                    @click="navigate"
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
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle">
                                            <RouterLink
                                                :to="`/instructors/${instructor.id}`"
                                                v-slot="{ href, navigate }"
                                                custom
                                            >
                                                <a
                                                    :href="href"
                                                    class="d-block w-100 h-100 text-decoration-none text-dark"
                                                    @click="navigate"
                                                >
                                                    <span
                                                        class="text-xs font-weight-bolder opacity-6"
                                                    >
                                                        {{ instructor.email }}
                                                    </span>
                                                </a>
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle">
                                            <RouterLink
                                                :to="`/instructors/${instructor.id}`"
                                                v-slot="{ href, navigate }"
                                                custom
                                            >
                                                <a
                                                    :href="href"
                                                    class="d-block w-100 h-100 text-decoration-none text-dark"
                                                    @click="navigate"
                                                >
                                                    <span
                                                        class="text-xs font-weight-bolder opacity-6"
                                                    >
                                                        {{
                                                            instructor.especialidad
                                                        }}
                                                    </span>
                                                </a>
                                            </RouterLink>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="card">
                    <div class="card-header pb-0">
                        <h6>Últimos cambios</h6>
                    </div>
                    <div class="card-body p-3">
                        <div class="timeline timeline-one-side">
                            <div
                                v-for="audit in audits"
                                :key="audit"
                                class="timeline-block mb-3"
                            >
                                <span class="timeline-step">
                                    <i
                                        class="material-symbols-rounded text-info text-gradient"
                                        >radio_button_unchecked</i
                                    >
                                </span>
                                <div class="timeline-content">
                                    <h6
                                        class="text-dark text-sm font-weight-bold mb-0"
                                    >
                                        {{ audit.detalles }}
                                    </h6>
                                    <p
                                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                                    >
                                        Por {{ audit.nombreUsuario }} -
                                        {{ formatDate(audit.fecha) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';

    import AuthService from '@/services/useAuth';

    defineProps({
        activities: Array,
        instructors: Array,
        activityListError: Boolean,
        instructorListError: Boolean,
    });

    const snackbar = useSnackbar();

    const auditError = ref(false);
    const audits = ref({});

    const queryAudit = async () => {
        await AuthService.audit()
            .then((response) => {
                if (response) {
                    audits.value = response.data;
                }
            })
            .catch((error) => {
                if (error) {
                    auditError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener los registros de actividad. Por favor intenta de nuevo más tarde.';

                    if (
                        error.type === 'backend' ||
                        error.type === 'network' ||
                        error.type === 'unknown'
                    ) {
                        message = error.message;
                    }

                    snackbar.add({
                        type: 'error',
                        text: message,
                    });
                }
            });
    };

    onMounted(async () => {
        await queryAudit();
    });

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');

        return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
    };
</script>

<style scoped>
    .no-items {
        border-top: none;
    }
</style>
