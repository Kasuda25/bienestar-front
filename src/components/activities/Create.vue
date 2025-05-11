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
                                        for="startHourInput"
                                        >Hora de inicio</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="[
                                            {
                                                'transparent-placeholder':
                                                    !localActivityData.startHour,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .startHour,
                                            },
                                        ]"
                                    >
                                        <input
                                            class="form-control"
                                            id="startHourInput"
                                            type="time"
                                            v-model="
                                                localActivityData.startHour
                                            "
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
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
                                    <div
                                        class="input-group input-group-outline"
                                        :class="[
                                            {
                                                'transparent-placeholder':
                                                    !localActivityData.endHour,
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .endHour,
                                            },
                                        ]"
                                    >
                                        <input
                                            class="form-control"
                                            id="endHourInput"
                                            type="time"
                                            v-model="localActivityData.endHour"
                                            onfocus="this.showPicker()"
                                        />
                                    </div>
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
                                    <label class="form-label">Instructor</label>
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        for="instructorInput"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .instructor,
                                        }"
                                    >
                                        <select
                                            class="form-control form-select"
                                            id="instructorInput"
                                            type="select"
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
                                        <input
                                            class="form-control"
                                            id="lacationInput"
                                            type="text"
                                            v-model="localActivityData.location"
                                        />
                                    </div>
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
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';

    import InstructorsService from '@/services/useInstructors';

    const snackbar = useSnackbar();

    const emit = defineEmits(['sendActivityData']);
    const props = defineProps({
        activityData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        externalLoading: Boolean,
    });
    const isLoading = ref(false);
    const instructorError = ref(false);

    const localActivityData = ref({ ...props.activityData });

    watch(
        localActivityData,
        (newVal) => {
            emit('update:activityData', newVal);
        },
        { deep: true }
    );

    const instructors = ref([]);

    const resetValues = () => {
        emit('update:activityData', {
            name: '',
            startDate: '',
            endDate: '',
            startHour: '',
            endHour: '',
            maxStudents: null,
            instructor: null,
            location: '',
        });
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

    const queryInstructors = async () => {
        await InstructorsService.getInstructors()
            .then((response) => {
                instructors.value = response;
            })
            .catch((error) => {
                if (error) {
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
            })
            .finally(() => {
                isLoading.value = false;
            });
    };

    onMounted(async () => {
        isLoading.value = true;

        await queryInstructors();
        resetValues();
        resetErrorStatusAndMessages();

        isLoading.value = false;
    });

    const createActivity = () => {
        emit('sendActivityData', 'create');
    };

    const filterNumberInput = (e) => {
        const cleanedValue = e.target.value.replace(/[^\d]/g, '');
        e.target.value = cleanedValue;
        localActivityData.value.maxStudents = cleanedValue;
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
