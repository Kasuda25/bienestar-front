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
                            <h6
                                v-if="
                                    authStore.user.rol === 'ADMIN' ||
                                    authStore.user.rol === 'INSTRUCTOR'
                                "
                                class="text-white ps-3 my-auto"
                            >
                                Inscribir estudiante a una actividad
                            </h6>
                            <h6
                                v-if="authStore.user.rol === 'ESTUDIANTE'"
                                class="text-white ps-3 my-auto"
                            >
                                Inscribirse a una actividad
                            </h6>
                        </div>
                    </div>
                    <div class="card-body pb-2">
                        <div v-if="isLoading">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden"
                                        >Loading...</span
                                    >
                                </div>
                            </div>
                        </div>
                        <form v-else>
                            <div
                                v-if="
                                    authStore.user.rol === 'ADMIN' ||
                                    authStore.user.rol === 'INSTRUCTOR'
                                "
                                class="row mb-3"
                            >
                                <div class="col-12 col-md-4 my-auto">
                                    <label
                                        class="form-label"
                                        for="instructorInput"
                                        >Estudiante</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .student,
                                        }"
                                    >
                                        <v-select
                                            v-model="localEnrollData.student"
                                            :options="students"
                                            label="codigoEstudiantil"
                                            :reduce="(student) => student.id"
                                            placeholder="Buscar estudiante por código"
                                            :filterable="true"
                                            :searchable="true"
                                            :get-option-label="
                                                (student) =>
                                                    `${student.codigoEstudiantil} - ${student.nombreCompleto}`
                                            "
                                            class="custom-vue3-select"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage.student
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4 my-auto">
                                    <label
                                        class="form-label"
                                        for="instructorInput"
                                        >Actividad</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .activity,
                                        }"
                                    >
                                        <v-select
                                            v-model="localEnrollData.activity"
                                            :options="activities"
                                            label="nombre"
                                            :reduce="(activity) => activity.id"
                                            placeholder="Buscar actividad"
                                            :filterable="true"
                                            :searchable="true"
                                            :get-option-label="
                                                (activity) =>
                                                    `${activity.nombre}`
                                            "
                                            class="custom-vue3-select"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .activity
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="d-flex justify-content-end w-100">
                                    <button
                                        class="btn bg-gradient-dark mt-3 w-100 w-sm-auto d-flex align-items-center justify-content-center"
                                        :disabled="externalLoading"
                                        @click.prevent="createEnroll"
                                    >
                                        <template v-if="externalLoading">
                                            <div
                                                class="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></div>
                                            Cargando...
                                        </template>
                                        <template v-else> Inscribir </template>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div v-if="student" class="col-sm-12 col-md-12 col-lg-6">
                <div class="card my-4">
                    <div
                        class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                    >
                        <div
                            class="d-flex justify-content-between bg-gradient-dark shadow-dark border-radius-lg py-3"
                        >
                            <h6 class="text-white ps-3 my-auto">
                                Estudiante seleccionado
                            </h6>
                        </div>
                    </div>
                    <div class="card-body pb-3">
                        <div class="row mb-3">
                            <div class="col-12 col-md-4 my-auto">
                                <label class="form-label" for="nameInput"
                                    ><strong>Nombre</strong></label
                                >
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="input-group input-group-outline">
                                    <input
                                        class="form-control"
                                        id="nameInput"
                                        type="text"
                                        :value="student.nombreCompleto"
                                        :style="{
                                            pointerEvents: 'none',
                                            backgroundColor: '#fff',
                                            cursor: 'default',
                                        }"
                                        readonly
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4 my-auto">
                                <label class="form-label" for="nameInput"
                                    ><strong>Código</strong></label
                                >
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="input-group input-group-outline">
                                    <input
                                        class="form-control"
                                        id="nameInput"
                                        type="text"
                                        :value="student.codigoEstudiantil"
                                        :style="{
                                            pointerEvents: 'none',
                                            backgroundColor: '#fff',
                                            cursor: 'default',
                                        }"
                                        readonly
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4 my-auto">
                                <label class="form-label" for="nameInput"
                                    ><strong>Horas acumuladas</strong></label
                                >
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="input-group input-group-outline">
                                    <input
                                        class="form-control"
                                        id="nameInput"
                                        type="text"
                                        :value="student.horasAcumuladas"
                                        :style="{
                                            pointerEvents: 'none',
                                            backgroundColor: '#fff',
                                            cursor: 'default',
                                        }"
                                        readonly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="activity" class="col-sm-12 col-md-12 col-lg-6">
                <div class="card my-4">
                    <div
                        class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                    >
                        <div
                            class="d-flex justify-content-between bg-gradient-dark shadow-dark border-radius-lg py-3"
                        >
                            <h6 class="text-white ps-3 my-auto">
                                Actividad seleccionada
                            </h6>
                        </div>
                    </div>
                    <div class="card-body pb-3">
                        <div class="row mb-3">
                            <div class="col-12 col-md-4 my-auto">
                                <label class="form-label" for="nameInput"
                                    ><strong>Nombre</strong></label
                                >
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="input-group input-group-outline">
                                    <input
                                        class="form-control"
                                        id="nameInput"
                                        type="text"
                                        :value="activity.nombre"
                                        :style="{
                                            pointerEvents: 'none',
                                            backgroundColor: '#fff',
                                            cursor: 'default',
                                        }"
                                        readonly
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 col-md-4 my-auto">
                                <label class="form-label" for="nameInput"
                                    ><strong>Ubicación</strong></label
                                >
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="input-group input-group-outline">
                                    <input
                                        class="form-control"
                                        id="nameInput"
                                        type="text"
                                        :value="activity.ubicacion.nombre"
                                        :style="{
                                            pointerEvents: 'none',
                                            backgroundColor: '#fff',
                                            cursor: 'default',
                                        }"
                                        readonly
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12">
                                <label class="form-label"
                                    ><strong>Horario</strong></label
                                >
                                <div class="card">
                                    <div class="card-body px-0 pt-0 pb-2">
                                        <div class="table-responsive p-2">
                                            <table
                                                class="table align-items-center mb-0"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th
                                                            class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                                                        >
                                                            Día
                                                        </th>
                                                        <th
                                                            class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2"
                                                        >
                                                            Hora de inicio
                                                        </th>
                                                        <th
                                                            class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2"
                                                        >
                                                            Hora de fin
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        v-for="(
                                                            item, index
                                                        ) in activity.horarios"
                                                        :key="item.id || index"
                                                    >
                                                        <td
                                                            class="text-sm font-weight-normal"
                                                        >
                                                            <span>{{
                                                                formatDay(
                                                                    item
                                                                        .horarioBase
                                                                        .dia
                                                                )
                                                            }}</span>
                                                        </td>
                                                        <td
                                                            class="text-sm font-weight-normal"
                                                        >
                                                            <span>{{
                                                                formatHour(
                                                                    item.horaInicio
                                                                )
                                                            }}</span>
                                                        </td>
                                                        <td
                                                            class="text-sm font-weight-normal"
                                                        >
                                                            <span>{{
                                                                formatHour(
                                                                    item.horaFin
                                                                )
                                                            }}</span>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';
    import vSelect from 'vue3-select';
    import 'vue3-select/dist/vue3-select.css';
    import { useSnackbar } from 'vue3-snackbar';

    import { useAuthStore } from '@/stores/auth';

    import StudentsService from '@/services/useStudents';
    import ActivitiesService from '@/services/useActivities';

    const snackbar = useSnackbar();

    const emit = defineEmits([
        'sendEnrollData',
        'update:enrollData',
        'update:validationErrorStatus',
        'update:validationErrorMessage',
    ]);

    const props = defineProps({
        enrollData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        externalLoading: Boolean,
    });

    const authStore = useAuthStore();

    const isLoading = ref(false);
    const studentError = ref(false);
    const activityError = ref(false);

    const localEnrollData = ref({ ...props.enrollData });

    watch(
        localEnrollData,
        (newValue) => {
            emit('update:enrollData', newValue);
        },
        { deep: true }
    );

    const students = ref([]);
    const student = ref();
    const activities = ref([]);
    const activity = ref();

    const resetValues = () => {
        emit('update:enrollData', {
            student: '',
            activity: '',
        });
    };

    const resetErrorStatusAndMessages = () => {
        emit('update:validationErrorStatus', {
            student: false,
            activity: false,
        });

        emit('update:validationErrorMessage', {
            student: '',
            activity: '',
        });
    };

    const queryStudents = async (page = 0, size = 999) => {
        await StudentsService.getStudents(page, size)
            .then((response) => {
                students.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    studentError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la lista de estudiantes. Por favor intenta de nuevo más tarde.';

                    if (error.type === 'backend') {
                        message = error.message;
                    } else if (error.type === 'network') {
                        message = error.message;
                    } else if (error.type === 'unknown') {
                        message = error.message;
                    }

                    snackbar.add({
                        type: 'error',
                        text: message,
                    });
                }
            });
    };

    const queryStudent = async (studentId) => {
        await StudentsService.getStudent(studentId)
            .then((response) => {
                student.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    studentError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener los datos del estudiante. Por favor intenta de nuevo más tarde.';

                    if (error.type === 'backend') {
                        message = error.message;
                    } else if (error.type === 'network') {
                        message = error.message;
                    } else if (error.type === 'unknown') {
                        message = error.message;
                    }

                    snackbar.add({
                        type: 'error',
                        text: message,
                    });
                }
            });
    };

    const queryActivities = async (page = 0, size = 999) => {
        await ActivitiesService.getActivities(page, size)
            .then((response) => {
                activities.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    activityError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la lista de actividades. Por favor intenta de nuevo más tarde.';

                    if (error.type === 'backend') {
                        message = error.message;
                    } else if (error.type === 'network') {
                        message = error.message;
                    } else if (error.type === 'unknown') {
                        message = error.message;
                    }

                    snackbar.add({
                        type: 'error',
                        text: message,
                    });
                }
            });
    };

    const queryActivitiesByInstructor = async (page = 0, size = 999) => {
        await ActivitiesService.getActivitiesByInstructor(page, size)
            .then((response) => {
                activities.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    activityError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la lista de actividades. Por favor intenta de nuevo más tarde.';

                    if (error.type === 'backend') {
                        message = error.message;
                    } else if (error.type === 'network') {
                        message = error.message;
                    } else if (error.type === 'unknown') {
                        message = error.message;
                    }

                    snackbar.add({
                        type: 'error',
                        text: message,
                    });
                }
            });
    };

    const queryActivity = async (activityId) => {
        await ActivitiesService.getActivity(activityId)
            .then((response) => {
                activity.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    activityError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener los datos de la actividad. Por favor intenta de nuevo más tarde.';

                    if (error.type === 'backend') {
                        message = error.message;
                    } else if (error.type === 'network') {
                        message = error.message;
                    } else if (error.type === 'unknown') {
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
        isLoading.value = true;
        if (authStore.user.rol === 'ADMIN') {
            await queryActivities();
            await queryStudents();
        }

        if (authStore.user.rol === 'INSTRUCTOR') {
            await queryActivitiesByInstructor();
            await queryStudents();
        }

        if (authStore.user.rol === 'ESTUDIANTE') {
            await queryActivities();
        }
        resetValues();
        resetErrorStatusAndMessages();
        isLoading.value = false;
    });

    watch(
        () => localEnrollData.value.student,
        async (newStudentId) => {
            if (
                (newStudentId && authStore.user.rol === 'ADMIN') ||
                authStore.user.rol === 'INSTRUCTOR'
            ) {
                await queryStudent(newStudentId);
            }
        }
    );

    watch(
        () => localEnrollData.value.activity,
        async (newActivityId) => {
            if (newActivityId) {
                await queryActivity(newActivityId);
            }
        }
    );

    const createEnroll = () => {
        if (authStore.user.rol === 'ESTUDIANTE') {
            localEnrollData.value.student = authStore.id;
        }

        emit('sendEnrollData', 'create');
    };

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

<style scroped>
    .custom-vue3-select .vs__dropdown-toggle {
        border: 1px solid #ced4da;
        border-radius: 0.5rem;
        min-height: 42px;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.5;
        background-color: white;
        transition:
            border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
    }

    .custom-vue3-select .vs__dropdown-toggle:focus,
    .custom-vue3-select .vs__dropdown-toggle.vs__dropdown-toggle--open {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        border-color: #80bdff;
    }

    .custom-vue3-select .vs__selected {
        font-size: 0.875rem;
    }

    .custom-vue3-select .vs__dropdown-menu {
        border-radius: 0.5rem;
        font-size: 0.875rem;
    }

    .custom-vue3-select .vs__dropdown-option--highlight {
        background-color: #f0f0f0;
        color: #212529;
    }
</style>
