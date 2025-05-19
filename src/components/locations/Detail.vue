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
                            <h6 class="text-white ps-3 my-auto">Ubicación</h6>
                        </div>
                    </div>
                    <div class="card-body pb-2">
                        <div v-if="isLoading && !locationError">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden"
                                        >Loading...</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div v-if="locationError">
                            <div class="d-flex justify-content-center">
                                <h4 class="my-auto">
                                    Ha ocurrido un error al obtener la lista de
                                    ubicaciones
                                </h4>
                            </div>
                        </div>
                        <div v-else-if="!isLoading && !locationError">
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
                                            :value="location.nombre"
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
                                            v-model="localLocationData.name"
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
                                        for="capacityInput"
                                        ><strong>Capacidad</strong></label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .capacity,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="capacityInput"
                                            type="number"
                                            :value="location.capacidad"
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
                                            id="capacityInput"
                                            type="number"
                                            v-model="localLocationData.capacity"
                                            @input="filterNumberInput"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .capacity
                                        }}
                                    </div>
                                </div>
                            </div>
                            <!-- Tabla editable con agregar/eliminar -->
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
                                                            <th
                                                                v-if="
                                                                    !isReadOnly
                                                                "
                                                                class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2"
                                                            >
                                                                Acciones
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody v-if="isReadOnly">
                                                        <tr
                                                            v-for="(
                                                                item, index
                                                            ) in location.horarios"
                                                            :key="
                                                                item.id || index
                                                            "
                                                        >
                                                            <!-- Día -->
                                                            <td
                                                                class="text-sm font-weight-normal"
                                                            >
                                                                <span>{{
                                                                    formatDay(
                                                                        item.dia
                                                                    )
                                                                }}</span>
                                                            </td>

                                                            <!-- Hora inicio -->
                                                            <td
                                                                class="text-sm font-weight-normal"
                                                            >
                                                                <span>{{
                                                                    formatHour(
                                                                        item.horaInicio
                                                                    )
                                                                }}</span>
                                                            </td>

                                                            <!-- Hora fin -->
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

                                                    <tbody v-else>
                                                        <tr
                                                            v-for="(
                                                                item, index
                                                            ) in localLocationData.schedule"
                                                            :key="
                                                                item.id || index
                                                            "
                                                        >
                                                            <!-- Día -->
                                                            <td
                                                                class="text-sm font-weight-normal"
                                                            >
                                                                <div>
                                                                    <div
                                                                        class="input-group input-group-outline"
                                                                    >
                                                                        <select
                                                                            class="form-control form-select"
                                                                            v-model="
                                                                                item.dia
                                                                            "
                                                                        >
                                                                            <option
                                                                                value="LUNES"
                                                                            >
                                                                                Lunes
                                                                            </option>
                                                                            <option
                                                                                value="MARTES"
                                                                            >
                                                                                Martes
                                                                            </option>
                                                                            <option
                                                                                value="MIERCOLES"
                                                                            >
                                                                                Miércoles
                                                                            </option>
                                                                            <option
                                                                                value="JUEVES"
                                                                            >
                                                                                Jueves
                                                                            </option>
                                                                            <option
                                                                                value="VIERNES"
                                                                            >
                                                                                Viernes
                                                                            </option>
                                                                            <option
                                                                                value="SABADO"
                                                                            >
                                                                                Sábado
                                                                            </option>
                                                                            <option
                                                                                value="DOMINGO"
                                                                            >
                                                                                Domingo
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <!-- Hora inicio -->
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
                                                                            v-model="
                                                                                item.horaInicio
                                                                            "
                                                                            onfocus="this.showPicker()"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <!-- Hora fin -->
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
                                                                            v-model="
                                                                                item.horaFin
                                                                            "
                                                                            onfocus="this.showPicker()"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <!-- Botón eliminar -->
                                                            <td
                                                                v-if="
                                                                    !isReadOnly
                                                                "
                                                            >
                                                                <button
                                                                    class="btn btn-danger my-auto"
                                                                    @click="
                                                                        removeHorario(
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

                                                <!-- Botón agregar -->
                                                <div
                                                    v-if="!isReadOnly"
                                                    class="mt-3"
                                                >
                                                    <button
                                                        class="btn bg-gradient-dark my-auto ms-2"
                                                        @click="addHorario"
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
                                        @click="deleteLocation"
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
                                        @click="updateLocation"
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
    import { ref, onMounted, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';
    import Swal from 'sweetalert2';

    import LocationsService from '@/services/useLocations';

    const router = useRouter();
    const snackbar = useSnackbar();

    const emit = defineEmits([
        'sendLocationData',
        'update:locationData',
        'update:validationErrorStatus',
        'update:validationErrorMessage',
    ]);
    const props = defineProps({
        locationData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        externalLoading: Boolean,
    });
    const locationId = router.currentRoute.value.params.id;
    const isLoading = ref(false);
    const isReadOnly = ref(true);
    const locationError = ref(false);

    const location = ref({});

    const localLocationData = ref({ ...props.locationData });

    watch(
        localLocationData,
        (newVal) => {
            emit('update:locationData', newVal);
        },
        { deep: true }
    );

    const queryLocation = async () => {
        await LocationsService.getLocation(locationId)
            .then((response) => {
                location.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    locationError.value = true;
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

        const id = parseInt(locationId);
        if (isNaN(id)) {
            router.replace('/404');
            return;
        }

        await queryLocation();

        if (Object.keys(location.value).length === 0) {
            router.replace('/404');
            return;
        }

        resetErrorStatusAndMessages();
    });

    const setEditFields = () => {
        localLocationData.value.name = location.value.nombre;
        localLocationData.value.capacity = location.value.capacidad;
        localLocationData.value.schedule = location.value.horarios;
        localLocationData.value.id = location.value.id;
    };

    const resetErrorStatusAndMessages = () => {
        emit('update:validationErrorStatus', {
            name: false,
            capacity: false,
        });

        emit('update:validationErrorMessage', {
            name: '',
            capacity: '',
        });
    };

    const startEdit = async () => {
        setEditFields();
        isReadOnly.value = false;
    };

    const cancelEdit = () => {
        resetErrorStatusAndMessages();
        isReadOnly.value = true;
    };

    const updateLocation = () => {
        emit('sendLocationData', 'update');
    };

    const addHorario = () => {
        localLocationData.value.schedule.push({
            dia: '',
            horaInicio: '',
            horaFin: '',
        });
    };

    const removeHorario = (index) => {
        localLocationData.value.schedule.splice(index, 1);
    };

    const deleteLocation = () => {
        Swal.fire({
            title: 'Eliminar ubicación',
            text: `Se eliminará la ubicación ${location.value.nombre}. Esta acción no se puede revertir.`,
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
                emit('deleteLocation', location.value.id);
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

    const filterNumberInput = (e) => {
        let cleanedValue = e.target.value.replace(/[^\d]/g, '');
        cleanedValue = cleanedValue.slice(0, 3);
        e.target.value = cleanedValue;
        localLocationData.value.maxStudents = cleanedValue;
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
