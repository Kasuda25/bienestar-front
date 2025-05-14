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
                                            Hora
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
                                                        activity.horaInicio.slice(
                                                            0,
                                                            5
                                                        )
                                                    }}
                                                    -
                                                    {{
                                                        activity.horaFin.slice(
                                                            0,
                                                            5
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
                                                        activity.ubicacion.nombre
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
                                                        activity.instructor
                                                            .nombre.usuario
                                                            .nombre
                                                    }}
                                                    {{
                                                        activity.instructor
                                                            .nombre.usuario
                                                            .apellido
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
                                <div
                                    v-if="
                                        instructors &&
                                        !instructors[0] &&
                                        !instructorListError
                                    "
                                >
                                    <div class="d-flex justify-content-center">
                                        <h4 class="my-auto">
                                            No hay instructores para mostrar
                                        </h4>
                                    </div>
                                </div>
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
                                                    {{
                                                        instructor.usuario.email
                                                    }}
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
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="card h-100">
                    <div class="card-header pb-0">
                        <h6>Orders overview</h6>
                        <p class="text-sm">
                            <i
                                class="fa fa-arrow-up text-success"
                                aria-hidden="true"
                            ></i>
                            <span class="font-weight-bold">24%</span> this month
                        </p>
                    </div>
                    <div class="card-body p-3">
                        <div class="timeline timeline-one-side">
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i
                                        class="material-symbols-rounded text-success text-gradient"
                                        >notifications</i
                                    >
                                </span>
                                <div class="timeline-content">
                                    <h6
                                        class="text-dark text-sm font-weight-bold mb-0"
                                    >
                                        $2400, Design changes
                                    </h6>
                                    <p
                                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                                    >
                                        22 DEC 7:20 PM
                                    </p>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i
                                        class="material-symbols-rounded text-danger text-gradient"
                                        >code</i
                                    >
                                </span>
                                <div class="timeline-content">
                                    <h6
                                        class="text-dark text-sm font-weight-bold mb-0"
                                    >
                                        New order #1832412
                                    </h6>
                                    <p
                                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                                    >
                                        21 DEC 11 PM
                                    </p>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i
                                        class="material-symbols-rounded text-info text-gradient"
                                        >shopping_cart</i
                                    >
                                </span>
                                <div class="timeline-content">
                                    <h6
                                        class="text-dark text-sm font-weight-bold mb-0"
                                    >
                                        Server payments for April
                                    </h6>
                                    <p
                                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                                    >
                                        21 DEC 9:34 PM
                                    </p>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i
                                        class="material-symbols-rounded text-warning text-gradient"
                                        >credit_card</i
                                    >
                                </span>
                                <div class="timeline-content">
                                    <h6
                                        class="text-dark text-sm font-weight-bold mb-0"
                                    >
                                        New card added for order #4395133
                                    </h6>
                                    <p
                                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                                    >
                                        20 DEC 2:20 AM
                                    </p>
                                </div>
                            </div>
                            <div class="timeline-block mb-3">
                                <span class="timeline-step">
                                    <i
                                        class="material-symbols-rounded text-primary text-gradient"
                                        >key</i
                                    >
                                </span>
                                <div class="timeline-content">
                                    <h6
                                        class="text-dark text-sm font-weight-bold mb-0"
                                    >
                                        Unlock packages for development
                                    </h6>
                                    <p
                                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                                    >
                                        18 DEC 4:54 AM
                                    </p>
                                </div>
                            </div>
                            <div class="timeline-block">
                                <span class="timeline-step">
                                    <i
                                        class="material-symbols-rounded text-dark text-gradient"
                                        >payments</i
                                    >
                                </span>
                                <div class="timeline-content">
                                    <h6
                                        class="text-dark text-sm font-weight-bold mb-0"
                                    >
                                        New order #9583120
                                    </h6>
                                    <p
                                        class="text-secondary font-weight-bold text-xs mt-1 mb-0"
                                    >
                                        17 DEC
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
    defineProps({
        activities: Array,
        instructors: Array,
        activityListError: Boolean,
        instructorListError: Boolean,
    });
</script>
