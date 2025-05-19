<template>
    <div class="container-fluid px-2 px-md-4">
        <div
            class="page-header min-height-300 border-radius-xl mt-4"
            style="
                background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
            "
        >
            <span class="mask bg-gradient-dark opacity-6"></span>
        </div>
        <div class="card card-body mx-2 mx-md-2 mt-n6">
            <div class="row gx-4 mb-2">
                <div v-if="student && !studentError" class="col-auto">
                    <div class="avatar avatar-xl position-relative">
                        <img
                            src=""
                            alt="profile_image"
                            class="w-100 border-radius-lg shadow-sm"
                        />
                    </div>
                </div>
                <div v-if="student && !studentError" class="col-auto my-auto">
                    <div class="h-100">
                        <h5 class="mb-1">
                            {{ authStore.user.nombre }}
                            {{ authStore.user.apellido }}
                        </h5>
                        <p class="mb-0 font-weight-normal text-sm">
                            Estudiante
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div v-if="!student && !studentError" class="col-12">
                        <div class="card card-plain h-100">
                            <div class="card-header pb-0 p-3">
                                <div class="row">
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
                            </div>
                        </div>
                    </div>
                    <div v-if="studentError" class="col-12">
                        <div class="card card-plain h-100">
                            <div class="card-header pb-0 p-3">
                                <div class="row">
                                    <div class="d-flex justify-content-center">
                                        <h4 class="my-auto">
                                            Ha ocurrido un error al obtener la
                                            lista de actividades
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="student && !studentError"
                        class="col-12 col-xl-4"
                    >
                        <div class="card card-plain h-100">
                            <div class="card-header pb-0 p-3">
                                <div class="row">
                                    <div
                                        class="col-md-8 d-flex align-items-center"
                                    >
                                        <h6 class="mb-0">Perfil</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body p-3">
                                <ul class="list-group">
                                    <li
                                        class="list-group-item border-0 ps-0 pt-0 text-sm"
                                    >
                                        <strong class="text-dark"
                                            >Nombres:</strong
                                        >
                                        &nbsp; {{ student?.nombre }}
                                    </li>
                                    <li
                                        class="list-group-item border-0 ps-0 text-sm"
                                    >
                                        <strong class="text-dark"
                                            >Apellidos:</strong
                                        >
                                        &nbsp; {{ student?.apellido }}
                                    </li>
                                    <li
                                        class="list-group-item border-0 ps-0 text-sm"
                                    >
                                        <strong class="text-dark"
                                            >Correo:</strong
                                        >
                                        &nbsp; {{ student?.email }}
                                    </li>
                                    <li
                                        class="list-group-item border-0 ps-0 text-sm"
                                    >
                                        <strong class="text-dark"
                                            >Programa académico:</strong
                                        >
                                        &nbsp; {{ student?.programaAcademico }}
                                    </li>
                                    <li
                                        class="list-group-item border-0 ps-0 text-sm"
                                    >
                                        <strong class="text-dark"
                                            >Semestre:</strong
                                        >
                                        &nbsp; {{ student?.semestre }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="student && !studentError"
                        class="col-12 col-xl-4"
                    >
                        <div class="card card-plain h-100">
                            <div class="card-header pb-0 p-3">
                                <div class="row">
                                    <div
                                        class="col-md-8 d-flex align-items-center"
                                    >
                                        <h6 class="mb-0">Horas acumuladas</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body p-3">
                                <div
                                    class="d-flex flex-column align-items-sm-start align-items-center"
                                >
                                    <div
                                        class="d-flex flex-column align-items-center"
                                    >
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
                                        <small class="text-muted"
                                            >{{ student?.horasAcumuladas }} de
                                            {{ maxHours }}</small
                                        >
                                    </div>
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
    import { ref, onMounted, computed } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';

    import { useAuthStore } from '@/stores/auth';

    import StudentsService from '@/services/useStudents';

    const snackbar = useSnackbar();

    const authStore = useAuthStore();

    const isLoading = ref(false);
    const studentError = ref(false);

    const student = ref();

    const maxHours = 32;

    const percentage = computed(() =>
        Math.min(
            100,
            Math.round((student.value?.horasAcumuladas / maxHours) * 100)
        )
    );
    const radio = 40;
    const circumference = 2 * Math.PI * radio;
    const offset = computed(
        () => circumference - (percentage.value / 100) * circumference
    );

    const queryStudent = async () => {
        await StudentsService.getStudent(authStore.id)
            // await StudentsService.getStudent(24)
            .then((response) => {
                student.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    studentError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la información de la ubicación. Por favor intenta de nuevo más tarde.';

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
            })
            .finally(() => {
                isLoading.value = false;
            });
    };

    onMounted(async () => {
        isLoading.value = true;

        await queryStudent();
    });
</script>
