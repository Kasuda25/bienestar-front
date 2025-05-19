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
                                Lista de ubicaciones
                            </h6>
                            <div class="pe-3">
                                <RouterLink
                                    to="/locations/create"
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
                        <div class="table-responsive p-0 no-scroll">
                            <table class="table align-activitys-center mb-0">
                                <div v-if="!locations && !listError">
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
                                        locations && locations[0] && !listError
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
                                            Capacidad
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Dias disponibles
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
                                                la lista de ubicaciones
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody
                                    v-if="
                                        locations && !locations[0] && !listError
                                    "
                                    class="no-activities"
                                >
                                    <div>
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <h4 class="my-auto">
                                                Aún no hay ubicaciones
                                            </h4>
                                        </div>
                                    </div>
                                </tbody>
                                <tbody
                                    v-if="
                                        locations && locations[0] && !listError
                                    "
                                >
                                    <tr
                                        v-for="location in locations"
                                        :key="location.id"
                                    >
                                        <td class="align-middle">
                                            <a
                                                :href="`/locations/${location.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark ps-3"
                                            >
                                                <div
                                                    class="d-flex flex-column justify-content-center"
                                                >
                                                    <h6
                                                        class="mb-0 text-sm font-weight-bolder opacity-8"
                                                    >
                                                        {{ location.nombre }}
                                                    </h6>
                                                </div>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/locations/${location.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{ location.capacidad }}
                                                </span>
                                            </a>
                                        </td>
                                        <td class="align-middle">
                                            <a
                                                :href="`/locations/${location.id}`"
                                                class="d-block w-100 h-100 text-decoration-none text-dark"
                                            >
                                                <span
                                                    class="text-xs font-weight-bolder opacity-6"
                                                >
                                                    {{
                                                        formatDays(
                                                            location.horarios
                                                        )
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
        </div>
    </div>
</template>

<script setup>
    defineProps({
        locations: Array,
        listError: Boolean,
    });

    // Diccionario para mapear los días originales a la forma con tilde
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

    const formatDays = (horarios) => {
        if (!horarios || !Array.isArray(horarios)) return '';

        // Normalizamos a minúscula sin tilde y eliminamos duplicados
        const diasUnicos = Array.from(
            new Set(
                horarios.map((h) =>
                    h.dia
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                )
            )
        );

        // Ordenamos según el orden de la semana
        diasUnicos.sort(
            (a, b) => ordenSemana.indexOf(a) - ordenSemana.indexOf(b)
        );

        // Convertimos a la forma con tilde
        const diasFinal = diasUnicos.map((dia) => diasConTilde[dia] || dia);

        // Formateamos con coma y "y"
        const len = diasFinal.length;
        if (len === 0) return '';
        if (len === 1) return diasFinal[0];
        if (len === 2) return diasFinal.join(' y ');
        return diasFinal.slice(0, -1).join(', ') + ' y ' + diasFinal[len - 1];
    };
</script>

<style scoped>
    .no-activities {
        border-top: none;
    }
</style>
