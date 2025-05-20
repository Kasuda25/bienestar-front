<template>
    <div class="container-fluid py-2 pe-3">
        <div class="row">
            <div class="ms-3 mb-4">
                <h3 class="mb-0 h4 font-weight-bolder">Dashboard</h3>
            </div>
        </div>
        <div v-if="!activities && !activityListError">
            <div class="row">
                <div class="d-flex justify-content-center mt-4">
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
                    <div class="card">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        activities: Array,
        activityListError: Boolean,
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
