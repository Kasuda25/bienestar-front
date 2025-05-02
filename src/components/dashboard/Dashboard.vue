<template>
    <div class="container-fluid py-2 pe-3">
        <div class="row">
            <div class="ms-3 mb-4">
                <h3 class="mb-0 h4 font-weight-bolder">Dashboard</h3>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-6">
                                <h5 class="mb-0 mt-2">Actividades</h5>
                            </div>
                            <div class="col-6 text-end">
                                <RouterLink
                                    to="/activities"
                                    v-slot="{ navigate }"
                                    custom
                                >
                                    <a
                                        class="btn bg-gradient-dark mb-0"
                                        @click="navigate"
                                    >
                                        Ver todas
                                    </a>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-2">
                        <div class="table-responsive">
                            <table class="table align-items-center mb-0">
                                <thead>
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
                                    <tr v-if="!actividades">
                                        <td colspan="5" class="text-center">
                                            <div
                                                class="d-flex justify-content-center"
                                            >
                                                <div
                                                    class="spinner-border"
                                                    role="status"
                                                >
                                                    <span
                                                        class="visually-hidden"
                                                        >Loading...</span
                                                    >
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr
                                        v-if="actividades"
                                        v-for="item in actividades.slice(0, 5)"
                                        :key="item"
                                    >
                                        <td>
                                            <RouterLink
                                                :to="`/activities/${item.id}`"
                                                v-slot="{ navigate }"
                                                custom
                                            >
                                                <div
                                                    class="d-flex px-2 py-1 cursor-pointer"
                                                    @click="navigate"
                                                >
                                                    <div
                                                        class="d-flex flex-column justify-content-center"
                                                    >
                                                        <h6
                                                            class="mb-0 text-sm"
                                                        >
                                                            {{ item.nombre }}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle text-sm">
                                            <RouterLink
                                                :to="`/activities/${item.id}`"
                                                v-slot="{ navigate }"
                                                custom
                                            >
                                                <span
                                                    class="text-xs font-weight-bold cursor-pointer"
                                                    @click="navigate"
                                                    >{{
                                                        new Date(
                                                            item.fechaInicio
                                                        ).toLocaleDateString(
                                                            'es-ES'
                                                        )
                                                    }}
                                                    -
                                                    {{
                                                        new Date(
                                                            item.fechaFin
                                                        ).toLocaleDateString(
                                                            'es-ES'
                                                        )
                                                    }}</span
                                                >
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle text-sm">
                                            <RouterLink
                                                :to="`/activities/${item.id}`"
                                                v-slot="{ navigate }"
                                                custom
                                            >
                                                <span
                                                    class="text-xs font-weight-bold cursor-pointer"
                                                    @click="navigate"
                                                    >{{
                                                        item.horaInicio.slice(
                                                            0,
                                                            5
                                                        )
                                                    }}
                                                    -
                                                    {{
                                                        item.horaFin.slice(0, 5)
                                                    }}</span
                                                >
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle text-sm">
                                            <RouterLink
                                                :to="`/activities/${item.id}`"
                                                v-slot="{ navigate }"
                                                custom
                                            >
                                                <span
                                                    class="text-xs font-weight-bold cursor-pointer"
                                                    @click="navigate"
                                                    >{{ item.ubicacion }}</span
                                                >
                                            </RouterLink>
                                        </td>
                                        <td class="align-middle text-sm">
                                            <span
                                                class="text-xs font-weight-bold"
                                                >{{
                                                    item.instructor.nombre
                                                        .nombre
                                                }}
                                                {{
                                                    item.instructor.nombre
                                                        .apellido
                                                }}</span
                                            >
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
    const emit = defineEmits();
    const props = defineProps({
        actividades: Array,
    });
</script>

<style scope>
    .slide-left-enter-active,
    .slide-left-leave-active {
        transition:
            transform 0.2s ease,
            opacity 0.2s ease;
    }

    .slide-left-enter-from {
        transform: translateX(-100%);
        opacity: 0;
    }

    .slide-left-enter-to {
        transform: translateX(0%);
        opacity: 1;
    }

    .slide-left-leave-from {
        transform: translateX(0%);
        opacity: 1;
    }

    .slide-left-leave-to {
        transform: translateX(-100%);
        opacity: 0;
    }

    .sidebar-button {
        z-index: 2000;
    }
</style>
