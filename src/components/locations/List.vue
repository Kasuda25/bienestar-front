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
                                @click="onSearch"
                            >
                                Buscar
                            </button>
                        </div>
                        <div v-if="!locations && !listError">
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
                                    class="no-items"
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
                                            <RouterLink
                                                :to="`/locations/${location.id}`"
                                                v-slot="{ navigate, href }"
                                                custom
                                            >
                                                <a
                                                    :href="href"
                                                    class="d-block w-100 h-100 text-decoration-none text-dark ps-3"
                                                    @click="navigate"
                                                >
                                                    <div
                                                        class="d-flex flex-column justify-content-center"
                                                    >
                                                        <h6
                                                            class="mb-0 text-sm font-weight-bolder opacity-8"
                                                        >
                                                            {{
                                                                location.nombre
                                                            }}
                                                        </h6>
                                                    </div>
                                                </a>
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle">
                                            <RouterLink
                                                :to="`/locations/${location.id}`"
                                                v-slot="{ navigate, href }"
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
                                                        {{ location.capacidad }}
                                                    </span>
                                                </a>
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle">
                                            <RouterLink
                                                :to="`/locations/${location.id}`"
                                                v-slot="{ navigate, href }"
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
                                                            formatDays(
                                                                location.horarios
                                                            )
                                                        }}
                                                    </span>
                                                </a>
                                            </RouterLink>
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

    const emit = defineEmits(['changePage', 'onSearch']);
    const props = defineProps({
        locations: Array,
        totalPages: Number,
        listError: Boolean,
    });

    const currentPage = ref(0);

    const searchQuery = ref('');

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

    const onSearch = () => {
        emit('onSearch', searchQuery.value);
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
