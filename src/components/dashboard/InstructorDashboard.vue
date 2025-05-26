<template>
    <div class="container-fluid py-2 pe-3">
        <div class="row">
            <div class="ms-3 mb-4">
                <h3 class="mb-0 h4 font-weight-bolder">Dashboard</h3>
            </div>
        </div>
        <div v-if="!activities && !activityListError">
            <div class="row">
                <div class="d-flex justify-content-center my-4">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="activityListError">
            <div class="row">
                <div class="d-flex justify-content-center">
                    <h4 class="my-auto">
                        Ha ocurrido un error al obtener la lista de actividades
                    </h4>
                </div>
            </div>
        </div>
        <div v-if="activities && !activityListError">
            <div class="row">
                <div
                    v-for="activity in activities.slice(0, 3)"
                    :key="activity"
                    class="col-lg-4 col-md-6 mt-3 mb-3"
                >
                    <RouterLink
                        :to="`/activities/${activity.id}`"
                        v-slot="{ navigate }"
                    >
                        <div
                            :href="`/activities/${activity.id}`"
                            @click="navigate"
                            class="card"
                        >
                            <div class="card-body">
                                <h6 class="mb-0">{{ activity.nombre }}</h6>
                                <p class="text-sm">
                                    Ubicación: {{ activity.ubicacion.nombre }}
                                </p>
                                <div class="pe-2">
                                    <p class="text-sm mb-0">Horarios:</p>
                                    <div
                                        v-for="item in activity.horariosAsignados.slice(
                                            0,
                                            3
                                        )"
                                        :key="item"
                                    >
                                        {{ formatDay(item.dia) }}:
                                        {{ formatHour(item.horaInicio) }} -
                                        {{ formatHour(item.horaFin) }}
                                    </div>
                                </div>
                                <hr class="dark horizontal" />
                                <div class="d-flex justify-content-center">
                                    <p class="mb-0 text-sm">
                                        {{
                                            new Date(
                                                activity.fechaInicio
                                            ).toLocaleDateString('es-ES')
                                        }}
                                        -
                                        {{
                                            new Date(
                                                activity.fechaFin
                                            ).toLocaleDateString('es-ES')
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="col-lg-12 col-md-12 mb-md-0 mb-4">
            <div class="card mb-4">
                <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h5 class="mb-0 mt-2">Estudiantes inscritos</h5>
                        </div>
                        <div
                            v-if="students && students[0]"
                            class="col-6 text-end"
                        >
                            <RouterLink
                                to="/students"
                                v-slot="{ navigate }"
                                custom
                            >
                                <a
                                    :href="`/students`"
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
                            <div v-if="!students && !studentListError">
                                <div class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden"
                                            >Loading...</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <thead
                                v-if="
                                    students && students[0] && !studentListError
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
                                        Código
                                    </th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                    >
                                        Horas acumuladas
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="studentListError">
                                <div class="d-flex justify-content-center">
                                    <h4 class="my-auto">
                                        Ha ocurrido un error al obtener la lista
                                        de estudiantes
                                    </h4>
                                </div>
                            </tbody>
                            <tbody
                                v-if="
                                    students &&
                                    !students[0] &&
                                    !studentListError
                                "
                                class="no-items"
                            >
                                <div>
                                    <div class="d-flex justify-content-center">
                                        <h4 class="my-auto">
                                            No hay estudiantes para mostrar
                                        </h4>
                                    </div>
                                </div>
                            </tbody>
                            <tbody
                                v-if="
                                    students && students[0] && !studentListError
                                "
                            >
                                <tr
                                    v-for="student in students.slice(0, 5)"
                                    :key="student"
                                >
                                    <td class="align-middle">
                                        <RouterLink
                                            :to="`/students/${student.id}`"
                                            v-slot="{ href, navigate }"
                                            custom
                                        >
                                            <a
                                                :href="href"
                                                class="d-flex w-100 h-100 text-decoration-none text-dark"
                                                @click="navigate"
                                            >
                                                <h6
                                                    class="mb-0 ps-3 text-sm font-weight-bolder opacity-8"
                                                >
                                                    {{ student.nombreCompleto }}
                                                </h6>
                                            </a>
                                        </RouterLink>
                                    </td>
                                    <td class="align-middle">
                                        <RouterLink
                                            :to="`/students/${student.id}`"
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
                                                        student.codigoEstudiantil
                                                    }}</span
                                                >
                                            </a>
                                        </RouterLink>
                                    </td>
                                    <td class="align-middle">
                                        <RouterLink
                                            :to="`/students/${student.id}`"
                                            v-slot="{ href, navigate }"
                                            custom
                                        >
                                            <a
                                                :href="href"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                                @click="navigate"
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
                                        </RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        activities: Array,
        students: Array,
        activityListError: Boolean,
        studentListError: Boolean,
    });

    const formatDay = (dia) => {
        const diasMap = {
            LUNES: 'Lunes',
            MARTES: 'Martes',
            MIERCOLES: 'Miércoles',
            JUEVES: 'Jueves',
            VIERNES: 'Viernes',
            SABADO: 'Sábado',
        };

        return (
            diasMap[dia.toUpperCase()] ||
            dia.charAt(0).toUpperCase() + dia.slice(1).toLowerCase()
        );
    };

    const formatHour = (hora) => hora.slice(0, 5);
</script>

<style scoped>
    .no-items {
        border-top: none;
    }
</style>
