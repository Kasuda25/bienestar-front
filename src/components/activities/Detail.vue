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
                                        for="startHourInput"
                                        ><strong>Hora de inicio</strong></label
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
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="startHourInput"
                                            type="text"
                                            :value="formatStartHour"
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
                                            id="startHourInput"
                                            type="time"
                                            v-model="
                                                localActivityData.startHour
                                            "
                                            onfocus="this.showPicker()"
                                            onkeydown="return false;"
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
                                        ><strong>Hora de fin</strong></label
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
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="endHourInput"
                                            type="text"
                                            :value="formatEndHour"
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
                                            id="endHourInput"
                                            type="time"
                                            v-model="localActivityData.endHour"
                                            onfocus="this.showPicker()"
                                            onkeydown="return false;"
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
                                    <label class="form-label"
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
                                            :value="
                                                activity.instructor?.nombre
                                                    ?.nombreCompleto
                                            "
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
                                            type="select"
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
                                                :value="activity.instructor?.id"
                                                selected
                                            >
                                                {{
                                                    activity.instructor?.nombre
                                                        ?.nombreCompleto
                                                }}
                                            </option>
                                            <option
                                                v-for="instructor in instructores"
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
                                            :value="activity.ubicacion"
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
                            <div class="d-flex w-100">
                                <div v-if="isReadOnly" class="w-100 text-end">
                                    <div
                                        role="button"
                                        class="btn bg-gradient-dark mt-3 me-2"
                                        @click="startEdit"
                                    >
                                        Editar
                                    </div>
                                    <div
                                        v-if="!externalLoading"
                                        role="button"
                                        class="btn bg-danger mt-3"
                                        @click="deleteActivity"
                                        :style="{
                                            color: 'white',
                                        }"
                                    >
                                        Eliminar
                                    </div>
                                    <div
                                        v-if="externalLoading"
                                        role="button"
                                        class="btn bg-danger mt-3 px-4"
                                        :style="{
                                            color: 'white',
                                        }"
                                    >
                                        <div
                                            class="spinner-border spinner-border-sm mx-2"
                                            role="status"
                                        >
                                            <span class="visually-hidden"
                                                >Loading...</span
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="w-100 text-end">
                                    <div
                                        role="button"
                                        class="btn bg-gradient-dark mt-3 me-2"
                                        @click="cancelEdit"
                                    >
                                        Cancelar
                                    </div>
                                    <div
                                        v-if="!externalLoading"
                                        role="button"
                                        class="btn bg-gradient-dark mt-3 me-2"
                                        @click="updateActivity"
                                    >
                                        Guardar
                                    </div>
                                    <div
                                        v-if="externalLoading"
                                        role="button"
                                        class="btn bg-gradient-dark mt-3 me-2 px-4"
                                    >
                                        <div
                                            class="spinner-border spinner-border-sm mx-2"
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
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';
    import Swal from 'sweetalert2';

    import ActivitiesService from '@/services/useActivities';
    import InstructorsService from '@/services/useInstructors';

    const router = useRouter();
    const snackbar = useSnackbar();

    const emit = defineEmits(['sendActivityData']);
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
    const instructorError = ref(false);

    const activity = ref({});
    const instructores = ref([]);

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
                activity.value = response;
            })
            .catch((error) => {
                if (error) {
                    activityError.value = true;
                    snackbar.add({
                        type: 'error',
                        text: 'Ha ocurrido un error. Por favor intenta de nuevo más tarde',
                    });
                }
            })
            .finally(() => {
                isLoading.value = false;
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
        resetErrorStatusAndMessages();
    });

    const setEditFields = () => {
        localActivityData.value.name = activity.value.nombre;
        localActivityData.value.startDate = activity.value.fechaInicio;
        localActivityData.value.endDate = activity.value.fechaFin;
        localActivityData.value.startHour = activity.value.horaInicio;
        localActivityData.value.endHour = activity.value.horaFin;
        localActivityData.value.maxStudents = activity.value.maxEstudiantes;
        localActivityData.value.instructor = activity.value.instructor.id;
        localActivityData.value.location = activity.value.ubicacion;
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
        try {
            instructores.value = await InstructorsService.getInstructors();
        } catch (error) {
            if (error) {
                instructorError.value = true;
                snackbar.add({
                    type: 'error',
                    text: 'Ha ocurrido un error. Por favor intenta de nuevo más tarde',
                });
            }
        }
        isLoading.value = false;
    };

    const cancelEdit = () => {
        resetErrorStatusAndMessages();
        instructorError.value = false;
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

    const formatTimeTo12Hour = (time) => {
        if (!time || !time.includes(':')) return '';
        const [hour, minute] = time.split(':');
        let formattedHour = parseInt(hour, 10);
        const ampm = formattedHour >= 12 ? 'PM' : 'AM';
        formattedHour = formattedHour % 12;
        formattedHour = formattedHour ? formattedHour : 12;
        return `${formattedHour}:${minute} ${ampm}`;
    };

    const formatStartHour = computed(() =>
        formatTimeTo12Hour(activity.value.horaInicio)
    );
    const formatEndHour = computed(() =>
        formatTimeTo12Hour(activity.value.horaFin)
    );
</script>
