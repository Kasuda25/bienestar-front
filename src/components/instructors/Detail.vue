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
                            <h6 class="text-white ps-3 my-auto">Instructor</h6>
                        </div>
                    </div>
                    <div class="card-body pb-2">
                        <div v-if="isInstructorLoading && !instructorError">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden"
                                        >Loading...</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div v-if="instructorError">
                            <div class="d-flex justify-content-center">
                                <h4 class="my-auto">
                                    Ha ocurrido un error al obtener la
                                    información del instructor
                                </h4>
                            </div>
                        </div>
                        <div
                            v-else-if="!isInstructorLoading && !instructorError"
                        >
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
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="nameInput"
                                            type="text"
                                            :value="instructor.usuario?.nombre"
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
                                            v-model="localIntructorData.name"
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
                                        for="lastNameInput"
                                        >Apellido</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .lastName,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="lastNameInput"
                                            type="text"
                                            :value="
                                                instructor.usuario?.apellido
                                            "
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
                                            id="lastNameInput"
                                            type="text"
                                            v-model="
                                                localIntructorData.lastName
                                            "
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .lastName
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label class="form-label" for="emailInput"
                                        >Correo</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .email,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="emailInput"
                                            type="email"
                                            :value="instructor.usuario?.email"
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
                                            id="emailInput"
                                            type="email"
                                            v-model="localIntructorData.email"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{ props.validationErrorMessage.email }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="passwordInput"
                                        >Contraseña</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .password,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="passwordInput"
                                            type="password"
                                            value=""
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
                                            id="passwordInput"
                                            :type="passwordType"
                                            v-model="
                                                localIntructorData.password
                                            "
                                        />
                                        <span
                                            v-if="!showPassword"
                                            class="my-auto ms-2 pt-2"
                                            :style="{ cursor: 'pointer' }"
                                            @click="toggleShowPassword"
                                            ><i
                                                class="material-symbols-rounded opacity-5"
                                                >visibility</i
                                            ></span
                                        >
                                        <span
                                            v-if="showPassword"
                                            class="my-auto ms-2 pt-2"
                                            :style="{ cursor: 'pointer' }"
                                            @click="toggleShowPassword"
                                            ><span
                                                class="material-symbols-rounded opacity-5"
                                            >
                                                visibility_off
                                            </span></span
                                        >
                                    </div>
                                    <div class="invalid-feedback d-block">
                                        {{
                                            props.validationErrorMessage
                                                .password
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="specialityInput"
                                        >Especialidad</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .speciality,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="specialityInput"
                                            type="text"
                                            :value="instructor.especialidad"
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
                                            id="specialityInput"
                                            type="text"
                                            v-model="
                                                localIntructorData.speciality
                                            "
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .speciality
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
                                        v-if="!props.externalLoading"
                                        role="button"
                                        class="btn bg-danger mt-3"
                                        @click="deleteInstructor"
                                        :style="{
                                            color: 'white',
                                        }"
                                    >
                                        Eliminar
                                    </div>
                                    <div
                                        v-if="props.externalLoading"
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
                                        v-if="!props.isLoading"
                                        role="button"
                                        class="btn bg-gradient-dark mt-3 me-2"
                                        @click="updateInstructor"
                                    >
                                        Guardar
                                    </div>
                                    <div
                                        v-if="props.isLoading"
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
                                Actividades asignadas
                            </h6>
                        </div>
                    </div>
                    <div class="card-body px-0 pb-3">
                        <div class="table-responsive p-0 no-scroll">
                            <table class="table align-activitys-center mb-0">
                                <div v-if="!activities && !activitiesError">
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
                                        activities &&
                                        activities[0] &&
                                        !activitiesError
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
                                            Fecha
                                        </th>
                                        <th
                                            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                        >
                                            Ubicación
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="activitiesError">
                                        <td colspan="4" class="text-center">
                                            <h5 class="my-auto">
                                                Ha ocurrido un error al obtener
                                                la lista de actividades
                                            </h5>
                                        </td>
                                    </tr>
                                    <tr
                                        v-if="
                                            activities &&
                                            !activities[0] &&
                                            !activitiesError
                                        "
                                    >
                                        <td colspan="4" class="text-center">
                                            <h4 class="my-auto">
                                                No hay actividades asignadas
                                            </h4>
                                        </td>
                                    </tr>
                                    <tr
                                        v-for="activity in activities"
                                        :key="activity.id"
                                        @click="
                                            $router.push(
                                                `/activities/${activity.id}`
                                            )
                                        "
                                        class="cursor-pointer"
                                    >
                                        <td class="px-4">
                                            <h6 class="mb-0 text-sm">
                                                {{ activity.nombre }}
                                            </h6>
                                        </td>
                                        <td>
                                            <span
                                                class="text-xs font-weight-bold"
                                            >
                                                {{
                                                    new Date(
                                                        activity.fechaInicio
                                                    ).toLocaleDateString(
                                                        'es-ES'
                                                    )
                                                }}
                                                -
                                                {{
                                                    new Date(
                                                        activity.fechaFin
                                                    ).toLocaleDateString(
                                                        'es-ES'
                                                    )
                                                }}
                                            </span>
                                        </td>
                                        <td class="align-middle text-sm">
                                            <span
                                                class="text-xs font-weight-bold"
                                                >{{ activity.ubicacion?.nombre }}</span
                                            >
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

    import ActivitiesService from '@/services/useActivities';
    import InstructorsService from '@/services/useInstructors';

    const router = useRouter();
    const snackbar = useSnackbar();

    const emit = defineEmits([
        'sendInstructorData',
        'update:instructorData',
        'update:validationErrorStatus',
        'update:validationErrorMessage',
    ]);
    const props = defineProps({
        instructorData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        externalLoading: Boolean,
    });
    const instructorId = router.currentRoute.value.params.id;
    const isInstructorLoading = ref(false);
    const isActivitiesLoading = ref(false);
    const isReadOnly = ref(true);
    const activitiesError = ref(false);
    const instructorError = ref(false);
    const showPassword = ref(false);

    const instructor = ref({});
    const activities = ref();

    const localIntructorData = ref({ ...props.instructorData });

    watch(
        localIntructorData,
        (newVal) => {
            emit('update:instructorData', newVal);
        },
        { deep: true }
    );

    const queryInstructor = async () => {
        await InstructorsService.getInstructor(instructorId)
            .then((response) => {
                instructor.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    let message =
                        'Ha ocurrido un error al obtener la información de instructor. Por favor intenta de nuevo más tarde.';

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
                isInstructorLoading.value = false;
            });
    };

    const queryActivities = async () => {
        await ActivitiesService.getActivitiesByInstructorForAdmin(instructor.value.id)
            .then((response) => {
                activities.value = response.data;
            })
            .catch((error) => {
                if (error) {
                    activitiesError.value = true;
                    let message =
                        'Ha ocurrido un error al obtener la lista de actividades. Por favor intenta de nuevo más tarde.';

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
                isActivitiesLoading.value = false;
            });
    };

    onMounted(async () => {
        isInstructorLoading.value = true;
        isActivitiesLoading.value = true;

        const id = parseInt(instructorId);
        if (isNaN(id)) {
            router.replace('/404');
            return;
        }

        await queryInstructor();

        resetErrorStatusAndMessages();

        if (Object.keys(instructor.value).length === 0) {
            router.replace('/404');
            return;
        } else {
            await queryActivities();
        }
    });

    const toggleShowPassword = () => {
        showPassword.value = !showPassword.value;
    };

    const passwordType = computed(() => {
        if (showPassword.value) {
            return 'text';
        }
        return 'password';
    });

    const setEditFields = () => {
        localIntructorData.value.name = instructor.value.usuario.nombre;
        localIntructorData.value.lastName = instructor.value.usuario.apellido;
        localIntructorData.value.email = instructor.value.usuario.email;
        localIntructorData.value.speciality = instructor.value.especialidad;
        localIntructorData.value.id = instructor.value.id;
    };

    const resetErrorStatusAndMessages = () => {
        emit('update:validationErrorStatus', {
            name: false,
            lastName: false,
            email: false,
            password: false,
            speciality: false,
        });

        emit('update:validationErrorMessage', {
            name: '',
            lastName: '',
            email: '',
            password: '',
            speciality: '',
        });
    };

    const startEdit = async () => {
        setEditFields();
        isReadOnly.value = false;
    };

    const cancelEdit = () => {
        resetErrorStatusAndMessages();
        instructorError.value = false;
        isReadOnly.value = true;
    };

    const updateInstructor = () => {
        emit('sendInstructorData', 'update');
    };

    const deleteInstructor = () => {
        Swal.fire({
            title: 'Eliminar instructor',
            text: `Se eliminará al instructor ${instructor.value.usuario.nombre}. Esta acción no se puede revertir.`,
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
                emit('deleteInstructor', instructor.value.id);
            }
        });
    };
</script>
