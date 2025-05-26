<template>
    <div class="container-fluid py-2 pe-3">
        <div class="row">
            <div class="ms-3 mb-4">
                <h3 class="mb-0 h4 font-weight-bolder">Dashboard</h3>
            </div>
        </div>
        <div
            v-if="
                !activities && !student && !activityListError && !studentError
            "
        >
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
            <div
                v-if="student && !studentError"
                class="order-1 order-sm-1 order-md-1 order-lg-1 h5 mt-3 mb-2"
            >
                Mis horas
            </div>
            <div
                v-if="activities && !activityListError"
                class="order-3 order-sm-3 order-md-2 order-lg-2 h5 mt-3 mb-2"
            >
                Mis actividades
            </div>
            <div class="order-lg-3 d-none d-sm-none d-md-none d-lg-block"></div>
            <div class="order-2 order-sm-2 order-md-3 order-lg-4 my-3">
                <div v-if="studentError">
                    <div class="d-flex justify-content-center">
                        <h4 class="my-auto">
                            Ha ocurrido un error al obtener las horas acumuladas
                        </h4>
                    </div>
                </div>
                <div
                    v-if="student && !studentError"
                    class="card h-100 d-flex flex-column"
                >
                    <div
                        class="card-body d-flex justify-content-center align-items-center"
                        style="height: 100%"
                    >
                        <div class="d-flex flex-column align-items-center">
                            <svg width="100" height="100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#e6e6e6"
                                    fill="transparent"
                                    stroke-width="10"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#007bff"
                                    fill="transparent"
                                    stroke-width="10"
                                    stroke-dasharray="251.2"
                                    :stroke-dashoffset="offset"
                                    stroke-linecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                                <text
                                    x="50"
                                    y="55"
                                    text-anchor="middle"
                                    font-size="20"
                                    fill="#333"
                                >
                                    {{ percentage }}%
                                </text>
                            </svg>
                            <small class="text-muted">
                                {{ student?.horasAcumuladas }} de {{ maxHours }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-for="activity in activities"
                :key="activity"
                class="order-4 order-sm-4 order-md-4 order-lg-5 my-3"
            >
                <div v-if="activities && !activityListError">
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
                                        v-for="item in activity.horariosAsignados?.slice(
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
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        activities: Array,
        student: Object,
        activityListError: Boolean,
        studentError: Boolean,
    });

    const maxHours = 32;

    const percentage = computed(() =>
        Math.min(
            100,
            Math.round((props.student?.horasAcumuladas / maxHours) * 100)
        )
    );
    const radio = 40;
    const circumference = 2 * Math.PI * radio;
    const offset = computed(
        () => circumference - (percentage.value / 100) * circumference
    );

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
