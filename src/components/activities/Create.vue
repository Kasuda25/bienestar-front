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
                                Crear Actividad
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
                        <div v-else>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label class="form-label" for="nameInput"
                                        >Nombre</label
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
                                        >Máximo de estudiantes</label
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
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="instructorInput"
                                        >Instructor</label
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
                                        <select
                                            class="form-control form-select"
                                            id="instructorInput"
                                            v-model="
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
                                                selected
                                                hidden
                                                disabled
                                            >
                                                Selecciona
                                            </option>
                                            <option
                                                v-for="instructor in instructors"
                                                :key="instructor"
                                                :value="instructor.id"
                                            >
                                                {{ instructor.usuario.nombre }}
                                                {{
                                                    instructor.usuario.apellido
                                                }}
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
                                        >Fecha de inicio</label
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
                                        >Fecha de fin</label
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
                                        >Ubicación</label
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
                                        <select
                                            class="form-control form-select"
                                            id="locationInput"
                                            v-model="localActivityData.location"
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
                                                selected
                                                hidden
                                                disabled
                                            >
                                                Selecciona
                                            </option>
                                            <option
                                                v-for="location in locations"
                                                :key="location"
                                                :value="location"
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
                            <div
                                v-if="localActivityData.location != null"
                                class="row mb-3"
                            >
                                <div class="col-12">
                                    <label class="form-label">Horario</label>

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
                                                            <th
                                                                class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2"
                                                            >
                                                                Acciones
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr
                                                            v-for="(
                                                                item, index
                                                            ) in localActivityData.schedule"
                                                            :key="
                                                                item.id || index
                                                            "
                                                        >
                                                            <td
                                                                class="text-sm font-weight-normal"
                                                            >
                                                                <div
                                                                    class="input-group input-group-outline"
                                                                >
                                                                    <select
                                                                        class="form-control form-select"
                                                                        v-model="
                                                                            item.dia
                                                                        "
                                                                        :class="{
                                                                            'is-invalid':
                                                                                validationErrorStatus
                                                                                    .schedule?.[
                                                                                    index
                                                                                ]
                                                                                    ?.dia,
                                                                        }"
                                                                    >
                                                                        <option
                                                                            v-for="dia in availableDays"
                                                                            :key="
                                                                                dia.value
                                                                            "
                                                                            :value="
                                                                                dia.value
                                                                            "
                                                                        >
                                                                            {{
                                                                                dia.label
                                                                            }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div
                                                                    class="text-danger text-xs mt-1"
                                                                    v-if="
                                                                        validationErrorMessage
                                                                            .schedule?.[
                                                                            index
                                                                        ]?.dia
                                                                    "
                                                                >
                                                                    {{
                                                                        validationErrorMessage
                                                                            .schedule[
                                                                            index
                                                                        ].dia
                                                                    }}
                                                                </div>
                                                            </td>
                                                            <td
                                                                class="text-sm font-weight-normal"
                                                            >
                                                                <div>
                                                                    <div
                                                                        class="input-group input-group-outline"
                                                                    >
                                                                        <input
                                                                            type="time"
                                                                            class="form-control"
                                                                            :class="{
                                                                                'is-invalid':
                                                                                    validationErrorStatus
                                                                                        .schedule?.[
                                                                                        index
                                                                                    ]
                                                                                        ?.horaInicio,
                                                                            }"
                                                                            v-model="
                                                                                item.horaInicio
                                                                            "
                                                                            onfocus="this.showPicker()"
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        class="text-danger text-xs mt-1"
                                                                        v-if="
                                                                            validationErrorMessage
                                                                                .schedule?.[
                                                                                index
                                                                            ]
                                                                                ?.horaInicio
                                                                        "
                                                                    >
                                                                        {{
                                                                            validationErrorMessage
                                                                                .schedule[
                                                                                index
                                                                            ]
                                                                                .horaInicio
                                                                        }}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td
                                                                class="text-sm font-weight-normal"
                                                            >
                                                                <div>
                                                                    <div
                                                                        class="input-group input-group-outline"
                                                                    >
                                                                        <input
                                                                            type="time"
                                                                            class="form-control"
                                                                            :class="{
                                                                                'is-invalid':
                                                                                    validationErrorStatus
                                                                                        .schedule?.[
                                                                                        index
                                                                                    ]
                                                                                        ?.horaFin,
                                                                            }"
                                                                            v-model="
                                                                                item.horaFin
                                                                            "
                                                                            onfocus="this.showPicker()"
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        class="text-danger text-xs mt-1"
                                                                        v-if="
                                                                            validationErrorMessage
                                                                                .schedule?.[
                                                                                index
                                                                            ]
                                                                                ?.horaFin
                                                                        "
                                                                    >
                                                                        {{
                                                                            validationErrorMessage
                                                                                .schedule[
                                                                                index
                                                                            ]
                                                                                .horaFin
                                                                        }}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    class="btn btn-danger my-auto"
                                                                    @click="
                                                                        removeSchedule(
                                                                            index
                                                                        )
                                                                    "
                                                                >
                                                                    <i
                                                                        class="material-symbols-rounded"
                                                                        >close</i
                                                                    >
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="mt-3">
                                                    <button
                                                        class="btn bg-gradient-dark my-auto ms-2"
                                                        @click="addSchedule"
                                                    >
                                                        <i
                                                            class="material-symbols-rounded"
                                                            >add</i
                                                        >
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100 text-end">
                                <div
                                    v-if="!props.externalLoading"
                                    role="button"
                                    class="btn bg-gradient-dark mt-3"
                                    @click="createActivity"
                                >
                                    Crear
                                </div>
                                <div
                                    v-if="props.externalLoading"
                                    role="button"
                                    class="btn bg-gradient-dark mt-3 px-4"
                                >
                                    <div
                                        class="spinner-border spinner-border-sm"
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
                <div v-if="localActivityData.location != null && !isLoading" class="card">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="mb-0">
                                            Horarios de
                                            {{
                                                localActivityData.location
                                                    .nombre
                                            }}
                                        </h6>
                                    </div>
                                </div>
                            </div>
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
                                                ) in localActivityData.location
                                                    ?.horarios"
                                                :key="item.id || index"
                                            >
                                                <td
                                                    class="text-sm font-weight-normal"
                                                >
                                                    <span>{{
                                                        formatDay(item.dia)
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
                                                        formatHour(item.horaFin)
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
</template>

<script setup>
    import { ref, onMounted, watch, computed } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';

    import InstructorsService from '@/services/useInstructors';
    import LocationsService from '@/services/useLocations';

    const snackbar = useSnackbar();

    const emit = defineEmits([
        'sendActivityData',
        'update:activityData',
        'update:validationErrorStatus',
        'update:validationErrorMessage',
        'removeScheduleError',
    ]);
    const props = defineProps({
        activityData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        externalLoading: Boolean,
    });
    const isLoading = ref(false);
    const instructorError = ref(false);
    const locationError = ref(false);

    const localActivityData = ref({
        ...props.activityData,
    });

    watch(
        localActivityData,
        (newVal) => {
            emit('update:activityData', newVal);
        },
        { deep: true }
    );

    const instructors = ref([]);
    const locations = ref([]);

    const resetValues = () => {
        emit('update:activityData', {
            name: '',
            startDate: '',
            endDate: '',
            schedule: [],
            maxStudents: null,
            instructor: null,
            location: null,
            id: null,
        });

        localActivityData.value.name = '';
        localActivityData.value.startDate = '';
        localActivityData.value.endDate = '';
        localActivityData.value.schedule = [];
        localActivityData.value.maxStudents = null;
        localActivityData.value.instructor = null;
        localActivityData.value.location = null;
        localActivityData.value.id = null;
    };

    const resetErrorStatusAndMessages = () => {
        emit('update:validationErrorStatus', {
            name: false,
            startDate: false,
            endDate: false,
            schedule: [],
            maxStudents: false,
            instructor: false,
            location: false,
        });

        emit('update:validationErrorMessage', {
            name: '',
            startDate: '',
            endDate: '',
            schedule: [],
            maxStudents: '',
            instructor: '',
            location: '',
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

    const queryLocations = async () => {
        await LocationsService.getLocations()
            .then((response) => {
                locations.value = response.data;
            })
            .catch((error) => {
                locationError.value = true;
                if (error) {
                    let message =
                        'Ha ocurrido un error al obtener la lista de ubicaciones. Por favor intenta de nuevo más tarde.';

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
        await queryInstructors();
        await queryLocations();
        resetValues();
        resetErrorStatusAndMessages();
        isLoading.value = false;
    });

    const addSchedule = () => {
        localActivityData.value.schedule.push({
            horarioUbicacionId: '',
            dia: '',
            horaInicio: '',
            horaFin: '',
        });
    };

    const days = {
        LUNES: 'Lunes',
        MARTES: 'Martes',
        MIERCOLES: 'Miércoles',
        JUEVES: 'Jueves',
        VIERNES: 'Viernes',
        SABADO: 'Sábado',
        DOMINGO: 'Domingo',
    };

    const availableDays = computed(() => {
        const uniques = [
            ...new Set(
                localActivityData.value.location?.horarios?.map((h) => h.dia)
            ),
        ];
        return uniques.map((d) => ({ value: d, label: days[d] || d }));
    });

    const removeSchedule = (index) => {
        localActivityData.value.schedule.splice(index, 1);
        emit('update:activityData', localActivityData.value);
        emit('removeScheduleError', index);
    };

    const createActivity = () => {
        emit('sendActivityData', 'create');
    };

    const formatDay = (dia) => {
        const diasMap = {
            LUNES: 'Lunes',
            MARTES: 'Martes',
            MIÉRCOLES: 'Miércoles',
            MIERCOLES: 'Miércoles',
            JUEVES: 'Jueves',
            VIERNES: 'Viernes',
            SÁBADO: 'Sábado',
            SABADO: 'Sábado',
            DOMINGO: 'Domingo',
        };

        return (
            diasMap[dia.toUpperCase()] ||
            dia.charAt(0).toUpperCase() + dia.slice(1).toLowerCase()
        );
    };

    const formatHour = (hora) => hora.slice(0, 5);

    const filterNumberInput = (e) => {
        let cleanedValue = e.target.value.replace(/[^\d]/g, '');
        e.target.value = cleanedValue;
        cleanedValue = cleanedValue.slice(0, 3);
        localActivityData.value.maxStudents = cleanedValue;
    };

    watch(
        () => localActivityData.value.schedule,
        (newSchedule) => {
            newSchedule.forEach((item) => {
                if (item.dia && localActivityData.value.location?.horarios) {
                    const horario =
                        localActivityData.value.location.horarios.find(
                            (h) => h.dia === item.dia
                        );

                    if (horario) {
                        item.horarioUbicacionId = horario.id;
                    }
                }
            });
        },
        { deep: true }
    );
</script>

<style scoped>
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .transparent-placeholder::-webkit-datetime-edit {
        color: transparent;
    }

    .transparent-placeholder:focus::-webkit-datetime-edit {
        color: initial;
    }

    .form-label {
        font-size: 0.9rem;
        color: black;
    }

    .no-select {
        user-select: none;
    }

    .no-edit::-webkit-inner-spin-button,
    .no-edit::-webkit-calendar-picker-indicator {
        opacity: 1;
        pointer-events: auto;
    }

    .no-edit {
        pointer-events: none;
        /* bloquea interacciones, excepto el calendario */
    }

    .no-edit:focus {
        pointer-events: auto;
        /* permite abrir el calendario al enfocar */
    }
</style>
