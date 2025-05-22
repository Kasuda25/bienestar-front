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
                            <h6 class="text-white ps-3 my-auto">Actividad</h6>
                        </div>
                    </div>
                    <div class="card-body pb-2">
                        <div v-if="isLoading && !activityError">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden"
                                        >Loading...</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div v-if="activityError">
                            <div class="d-flex justify-content-center">
                                <h4 class="my-auto">
                                    Ha ocurrido un error al obtener la lista de
                                    actividades
                                </h4>
                            </div>
                        </div>
                        <div v-else-if="!isLoading && !activityError">
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label class="form-label" for="nameInput"
                                        ><strong>Nombre</strong></label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .name,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="nameInput"
                                            type="text"
                                            :value="activity.nombre"
                                            tabindex="-1"
                                            :style="{
                                                pointerEvents: 'none',
                                                backgroundColor: '#fff',
                                                cursor: 'default',
                                            }"
                                            readonly
                                        />
                                        <input
                                            v-else
                                            class="form-control"
                                            id="nameInput"
                                            type="text"
                                            v-model="localActivityData.name"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{ props.validationErrorMessage.name }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="maxStudentsInput"
                                        ><strong
                                            >Máximo de estudiantes</strong
                                        ></label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .maxStudents,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="maxStudentsInput"
                                            type="text"
                                            :value="activity.maxEstudiantes"
                                            tabindex="-1"
                                            :style="{
                                                pointerEvents: 'none',
                                                backgroundColor: '#fff',
                                                cursor: 'default',
                                            }"
                                            readonly
                                        />
                                        <input
                                            v-else
                                            class="form-control"
                                            id="maxStudentsInput"
                                            type="number"
                                            v-model="
                                                localActivityData.maxStudents
                                            "
                                            @input="filterNumberInput"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .maxStudents
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div
                                v-if="
                                    authStore.user.rol === 'ADMIN' ||
                                    authStore.user.rol === 'ESTUDIANTE'
                                "
                                class="row mb-3"
                            >
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="instructorInput"
                                        ><strong>Instructor</strong></label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .instructor,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="instructorInput"
                                            type="text"
                                            :value="`${activity.instructor?.nombre} ${activity.instructor?.apellido}`"
                                            tabindex="-1"
                                            :style="{
                                                pointerEvents: 'none',
                                                backgroundColor: '#fff',
                                                cursor: 'default',
                                            }"
                                            readonly
                                        />
                                        <select
                                            v-else
                                            class="form-control form-select"
                                            for="instructorInput"
                                            id="instructorInput"
                                            :v-model="
                                                localActivityData.instructor
                                            "
                                        >
                                            <option
                                                v-if="instructorError"
                                                value=""
                                                selected
                                                disabled
                                            >
                                                No se pudo obtener la lista de
                                                instructores
                                            </option>
                                            <option
                                                v-else
                                                :value="activity.instructor.id"
                                                selected
                                            >
                                                {{ activity.instructor.nombre }}
                                                {{
                                                    activity.instructor.apellido
                                                }}
                                            </option>
                                            <option
                                                v-for="instructor in instructors"
                                                :key="instructor"
                                                :value="instructor.id"
                                            >
                                                {{ instructor.nombreCompleto }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .instructor
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="startDateInput"
                                        ><strong>Fecha de inicio</strong></label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="[
                                            {
                                                'transparent-placeholder':
                                                    !localActivityData.startDate,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .startDate,
                                            },
                                        ]"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="startDateInput"
                                            type="text"
                                            :value="formatStartDate"
                                            tabindex="-1"
                                            :style="{
                                                pointerEvents: 'none',
                                                backgroundColor: '#fff',
                                                cursor: 'default',
                                            }"
                                            readonly
                                        />
                                        <input
                                            v-else
                                            class="form-control"
                                            id="startDateInput"
                                            type="date"
                                            v-model="
                                                localActivityData.startDate
                                            "
                                            onfocus="this.showPicker()"
                                            onkeydown="return false;"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .startDate
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label class="form-label" for="endDateInput"
                                        ><strong>Fecha de fin</strong></label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="[
                                            {
                                                'transparent-placeholder':
                                                    !localActivityData.endDate,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .endDate,
                                            },
                                        ]"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="endDateInput"
                                            type="text"
                                            :value="formatEndDate"
                                            tabindex="-1"
                                            :style="{
                                                pointerEvents: 'none',
                                                backgroundColor: '#fff',
                                                cursor: 'default',
                                            }"
                                            readonly
                                        />
                                        <input
                                            v-else
                                            class="form-control"
                                            id="endDateInput"
                                            type="date"
                                            v-model="localActivityData.endDate"
                                            onfocus="this.showPicker()"
                                            onkeydown="return false;"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage.endDate
                                        }}
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="lacationInput"
                                        ><strong>Ubicación</strong></label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .location,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="lacationInput"
                                            type="text"
                                            :value="activity.ubicacion?.nombre"
                                            tabindex="-1"
                                            :style="{
                                                pointerEvents: 'none',
                                                backgroundColor: '#fff',
                                                cursor: 'default',
                                            }"
                                            readonly
                                        />
                                        <select
                                            v-else
                                            class="form-control form-select"
                                            for="locationInput"
                                            id="locationInput"
                                            :v-model="
                                                localActivityData.location
                                            "
                                        >
                                            <option
                                                v-if="locationError"
                                                value=""
                                                selected
                                                disabled
                                            >
                                                No se pudo obtener la lista de
                                                ubicaciones
                                            </option>
                                            <option
                                                v-else
                                                :value="activity.ubicacion?.id"
                                                selected
                                            >
                                                {{ activity.ubicacion?.nombre }}
                                            </option>
                                            <option
                                                v-for="location in locations"
                                                :key="location"
                                                :value="location.id"
                                            >
                                                {{ location.nombre }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .location
                                        }}
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
                                                            :key="
                                                                item.id || index
                                                            "
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
                            <div
                                v-if="authStore.user.rol === 'ADMIN'"
                                class="d-flex w-100"
                            >
                                <div
                                    class="d-flex justify-content-end w-100 flex-wrap gap-sm-2 gap-1"
                                >
                                    <template v-if="isReadOnly">
                                        <button
                                            class="btn bg-gradient-dark mt-3 w-100 w-sm-auto d-flex align-items-center justify-content-center"
                                            @click="startEdit"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            class="btn bg-danger mt-3 w-100 w-sm-auto d-flex align-items-center justify-content-center text-white"
                                            :disabled="externalLoading"
                                            @click="deleteActivity"
                                        >
                                            <template v-if="externalLoading">
                                                <div
                                                    class="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></div>
                                                Eliminando...
                                            </template>
                                            <template v-else>
                                                Eliminar
                                            </template>
                                        </button>
                                    </template>

                                    <template v-else>
                                        <button
                                            class="btn bg-gradient-dark mt-3 w-100 w-sm-auto d-flex align-items-center justify-content-center"
                                            @click="cancelEdit"
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                            class="btn bg-gradient-dark mt-3 w-100 w-sm-auto d-flex align-items-center justify-content-center"
                                            :disabled="externalLoading"
                                            @click="updateActivity"
                                        >
                                            <template v-if="externalLoading">
                                                <div
                                                    class="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></div>
                                                Guardando...
                                            </template>
                                            <template v-else>
                                                Guardar
                                            </template>
                                        </button>
                                    </template>
                                </div>
                            </div>
                            <div
                                v-if="authStore.user.rol === 'ESTUDIANTE'"
                                class="d-flex"
                            >
                                <div class="d-flex justify-content-end w-100">
                                    <button
                                        class="btn bg-gradient-dark mt-3 w-100 w-sm-auto d-flex align-items-center justify-content-center"
                                        :disabled="externalLoading"
                                        @click="handleClick"
                                    >
                                        <template v-if="externalLoading">
                                            <div
                                                class="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></div>
                                            Cargando...
                                        </template>
                                        <template v-else>
                                            Inscribirse
                                        </template>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6">
                <div class="card my-4">
                    <div
                        class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                    >
                        <div
                            class="d-flex justify-content-between bg-gradient-dark shadow-dark border-radius-lg py-3"
                        >
                            <h6 class="text-white ps-3 my-auto">
                                Estudiantes inscritos a esta actividad
                            </h6>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-3">
                        <div class="table-responsive p-0 no-scroll">
                            <table class="table align-activitys-center mb-0">
                                <div v-if="!students && !studentError">
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
                                        students && students[0] && !studentError
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
                                            Horas completadas
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="studentError">
                                        <td colspan="4" class="text-center">
                                            <h5 class="my-auto">
                                                Ha ocurrido un error al obtener
                                                la lista de estudiantes
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr
                                        v-if="
                                            students &&
                                            !students[0] &&
                                            !studentError
                                        "
                                    >
                                        <td colspan="4" class="text-center">
                                            <h4 class="my-auto">
                                                No hay estudiantes inscritos a
                                                esta actividad
                                            </h4>
                                        </td>
                                    </tr>
                                    <tr
                                        v-for="student in students"
                                        :key="student.id"
                                        @click="
                                            $router.push(
                                                `/students/${student.id}`
                                            )
                                        "
                                        class="cursor-pointer"
                                    >
                                        <td class="px-4">
                                            <h6 class="mb-0 text-sm">
                                                {{ student.nombreCompleto }}
                                            </h6>
                                        </td>
                                        <td>
                                            <span
                                                class="text-xs font-weight-bold"
                                            >
                                                {{ student.codigoEstudiantil }}
                                            </span>
                                        </td>
                                        <td class="align-middle text-sm">
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
    import { ref, onMounted, computed, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';
    import Swal from 'sweetalert2';

    import { useAuthStore } from '@/stores/auth';

    import ActivitiesService from '@/services/useActivities';
    import InstructorsService from '@/services/useInstructors';
    import LocationsService from '@/services/useLocations';

    const router = useRouter();
    const snackbar = useSnackbar();

    const authStore = useAuthStore();

    const emit = defineEmits([
        'sendActivityData',
        'update:activityData',
        'update:validationErrorStatus',
        'update:validationErrorMessage',
    ]);
    const props = defineProps({
        activityData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        externalLoading: Boolean,
    });
    const activityId = router.currentRoute.value.params.id;
    const isLoading = ref(false);
    const isReadOnly = ref(true);
    const activityError = ref(false);
    const studentError = ref(false);
    const instructorError = ref(false);
    const locationError = ref(false);

    const activity = ref({});
    const students = ref();
    const instructors = ref([]);
    const locations = ref([]);

    const localActivityData = ref({ ...props.activityData });

    watch(
        localActivityData,
        (newVal) => {
            emit('update:activityData', newVal);
        },
        { deep: true }
    );

    const queryActivity = async () => {
        await ActivitiesService.getActivity(activityId)
            .then((response) => {
                activity.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    activityError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la información de la actividad. Por favor intenta de nuevo más tarde.';

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

    const queryStudents = async () => {
        await InstructorsService.getStudentsByActivity(activityId)
            .then((response) => {
                students.value = response.estudiantes;
            })
            .catch((error) => {
                if (error) {
                    studentError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la lista de estudiantes. Por favor intenta de nuevo más tarde.';

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

    const queryInstructors = async () => {
        await InstructorsService.getInstructors()
            .then((response) => {
                instructors.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    instructorError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la lista de instructores. Por favor intenta de nuevo más tarde.';

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

    const queryLocations = async () => {
        await LocationsService.getLocations()
            .then((response) => {
                locations.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    locationError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la lista de ubicaciones. Por favor intenta de nuevo más tarde.';

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
        isLoading.value = true;

        const id = parseInt(activityId);
        if (isNaN(id)) {
            router.replace('/404');
            return;
        }

        await queryActivity();

        if (Object.keys(activity.value).length === 0) {
            router.replace('/404');
            return;
        }

        if (
            authStore.user.rol === 'ADMIN' ||
            authStore.user.rol === 'INSTRUCTOR'
        ) {
            await queryStudents();
        }

        resetErrorStatusAndMessages();
    });

    const setEditFields = () => {
        localActivityData.value.name = activity.value.nombre;
        localActivityData.value.startDate = activity.value.fechaInicio;
        localActivityData.value.endDate = activity.value.fechaFin;
        localActivityData.value.maxStudents = activity.value.maxEstudiantes;
        localActivityData.value.instructor = activity.value.instructor.id;
        localActivityData.value.location = activity.value.ubicacion.id;
        localActivityData.value.schedule = activity.value.horarios;
        localActivityData.value.id = activity.value.id;
    };

    const resetErrorStatusAndMessages = () => {
        emit('update:validationErrorStatus', {
            name: false,
            startDate: false,
            endDate: false,
            startHour: false,
            endHour: false,
            maxStudents: false,
            instructor: false,
            location: false,
        });

        emit('update:validationErrorMessage', {
            name: '',
            startDate: '',
            endDate: '',
            startHour: '',
            endHour: '',
            maxStudents: '',
            instructor: '',
            location: '',
        });
    };

    const startEdit = async () => {
        isLoading.value = true;
        setEditFields();
        isReadOnly.value = false;
        await queryInstructors();
        await queryLocations();
        isLoading.value = false;
    };

    const cancelEdit = () => {
        resetErrorStatusAndMessages();
        instructorError.value = false;
        locationError.value = false;
        isReadOnly.value = true;
    };

    const updateActivity = () => {
        emit('sendActivityData', 'update');
    };

    const deleteActivity = () => {
        Swal.fire({
            title: 'Eliminar actividad',
            text: `Se eliminará la actividad ${activity.value.nombre}. Esta acción no se puede revertir.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#212529',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'my-swal-popup',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                emit('deleteActivity', activity.value.id);
            }
        });
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

    const formatStartDate = computed(() => {
        const date = activity.value.fechaInicio;
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    });

    const formatEndDate = computed(() => {
        const date = activity.value.fechaFin;
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    });

    const filterNumberInput = (e) => {
        const cleanedValue = e.target.value.replace(/[^\d]/g, '');
        e.target.value = cleanedValue;
        localActivityData.value.maxStudents = cleanedValue;
    };
</script>
