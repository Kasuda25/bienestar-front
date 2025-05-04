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
                                    <input
                                        class="form-control"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .name,
                                        }"
                                        id="nameInput"
                                        type="text"
                                        v-model="props.activityData.name"
                                    />
                                    <div class="invalid-feedback">
                                        {{ props.validationErrorMessage.name }}
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
                                    <input
                                        class="form-control"
                                        :class="[
                                            'form-control',
                                            {
                                                'transparent-placeholder':
                                                    !props.activityData
                                                        .startDate,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .startDate,
                                            },
                                        ]"
                                        id="startDateInput"
                                        type="date"
                                        v-model="props.activityData.startDate"
                                        onfocus="this.showPicker()"
                                        onkeydown="return false;"
                                    />
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
                                    <input
                                        class="form-control"
                                        :class="[
                                            'form-control',
                                            {
                                                'transparent-placeholder':
                                                    !props.activityData.endDate,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .endDate,
                                            },
                                        ]"
                                        id="endDateInput"
                                        type="date"
                                        v-model="props.activityData.endDate"
                                        onfocus="this.showPicker()"
                                        onkeydown="return false;"
                                    />
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
                                        for="startHourInput"
                                        >Hora de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <input
                                        class="form-control"
                                        :class="[
                                            'form-control',
                                            {
                                                'transparent-placeholder':
                                                    !props.activityData
                                                        .startHour,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .startHour,
                                            },
                                        ]"
                                        id="startHourInput"
                                        type="time"
                                        v-model="props.activityData.startHour"
                                        onfocus="this.showPicker()"
                                    />
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .startHour
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label class="form-label" for="endHourInput"
                                        >Hora de fin</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <input
                                        class="form-control"
                                        :class="[
                                            'form-control',
                                            {
                                                'transparent-placeholder':
                                                    !props.activityData.endHour,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .endHour,
                                            },
                                        ]"
                                        id="endHourInput"
                                        type="time"
                                        v-model="props.activityData.endHour"
                                        onfocus="this.showPicker()"
                                    />
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage.endHour
                                        }}
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
                                    <input
                                        class="form-control"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .maxStudents,
                                        }"
                                        id="maxStudentsInput"
                                        type="number"
                                        v-model="props.activityData.maxStudents"
                                        @keydown="blockInvalidNumberKeys"
                                    />
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
                                    <label class="form-label">Instructor</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <select
                                        class="form-select"
                                        for="instructorInput"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .instructor,
                                        }"
                                        id="instructorInput"
                                        type="select"
                                        v-model="props.activityData.instructor"
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
                                        <div v-else>
                                            <div
                                                v-for="instructor in instructors"
                                                :key="instructor"
                                            >
                                                <option :value="instructor.id">
                                                    {{
                                                        instructor.usuario
                                                            .nombre
                                                    }}
                                                    {{
                                                        instructor.usuario
                                                            .apellido
                                                    }}
                                                </option>
                                            </div>
                                            <option
                                                selected
                                                hidden
                                                disabled
                                            ></option>
                                        </div>
                                    </select>
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
                                        for="lacationInput"
                                        >Ubicación</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <input
                                        class="form-control"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .location,
                                        }"
                                        id="lacationInput"
                                        type="text"
                                        v-model="props.activityData.location"
                                    />
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .location
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="w-100 text-end">
                                <div
                                    v-if="!props.isLoading"
                                    role="button"
                                    class="btn bg-gradient-dark mt-3"
                                    @click="createActivity"
                                >
                                    Crear
                                </div>
                                <div
                                    v-if="props.isLoading"
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
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';

    import InstructorsService from '@/services/useInstructors';

    const snackbar = useSnackbar();

    const emit = defineEmits();
    const props = defineProps({
        activityData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        isLoading: Boolean,
        instructorError: Boolean,
    });
    const isLoading = ref(false);
    const instructorError = ref(false);

    const instructors = ref([]);

    const resetValues = () => {
        props.activityData.name = '';
        props.activityData.startDate = '';
        props.activityData.endDate = '';
        props.activityData.startHour = '';
        props.activityData.endHour = '';
        props.activityData.maxStudents = null;
        props.activityData.instructor = null;
        props.activityData.location = '';
    };

    onMounted(async () => {
        isLoading.value = true;
        try {
            instructors.value = await InstructorsService.getInstructors();
        } catch (error) {
            instructorError.value = true;
            snackbar.add({
                type: 'error',
                text: 'Ha ocurrido un error. Por favor intenta de nuevo más tarde',
            });
        }
        resetValues();
        isLoading.value = false;
    });

    const createActivity = () => {
        emit('sendActivityData', 'create');
    };

    const blockInvalidNumberKeys = (e) => {
        const invalidKeys = ['-', '+', '.', ',', 'e', 'E'];

        if (invalidKeys.includes(e.key)) {
            e.preventDefault();
        }
    };
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
