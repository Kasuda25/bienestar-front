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
                                            :value="instructor.nombre"
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
                                            :value="instructor.apellido"
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
                                            :value="instructor.email"
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
                                            @click="deleteInstructor"
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
                                            @click="updateInstructor"
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
                        <div v-if="!activities && !activitiesError">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden"
                                        >Loading...</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive p-0 no-scroll">
                            <table class="table align-activitys-center mb-0">
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
                                                >{{
                                                    activity.ubicacion?.nombre
                                                }}</span
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-center">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination mt-3 mb-1">
                                    <li class="page-item">
                                        <div
                                            v-if="currentPage > 0"
                                            class="page-link"
                                            aria-label="Previous"
                                            @click="previousPage"
                                        >
                                            <span
                                                class="material-symbols-rounded"
                                            >
                                                keyboard_arrow_left
                                            </span>
                                            <span class="sr-only"
                                                >Previous</span
                                            >
                                        </div>
                                    </li>
                                    <li
                                        v-for="page in totalPages"
                                        :key="page"
                                        class="page-item"
                                    >
                                        <div
                                            v-if="totalPages > 1"
                                            class="page-link"
                                            @click="
                                                () => {
                                                    currentPage = page - 1;
                                                    customPage();
                                                }
                                            "
                                        >
                                            {{ page }}
                                        </div>
                                    </li>
                                    <li class="page-item">
                                        <div
                                            v-if="
                                                currentPage <
                                                totalPages - 1
                                            "
                                            class="page-link"
                                            aria-label="Next"
                                            @click="nextPage"
                                        >
                                            <span
                                                class="material-symbols-rounded"
                                            >
                                                keyboard_arrow_right
                                            </span>
                                            <span class="sr-only">Next</span>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
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
    const currentPage = ref(0);
    const totalPages = ref(0);

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

    const changePage = async (page) => {
        activities.value = null;

        await queryActivities(page);
    };

    const queryInstructor = async () => {
        await InstructorsService.getInstructor(instructorId)
            .then((response) => {
                instructor.value = response;
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

    const queryActivities = async (page = 0, size = 5) => {
        await ActivitiesService.getActivitiesByInstructorForAdmin(
            instructor.value.id,
            page,
            size
        )
            .then((response) => {
                activities.value = response.data;
                totalPages.value = response.pagination.totalPages;
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
        localIntructorData.value.name = instructor.value.nombre;
        localIntructorData.value.lastName = instructor.value.apellido;
        localIntructorData.value.email = instructor.value.email;
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
            text: `Se eliminará al instructor ${instructor.value.nombre}. Esta acción no se puede revertir.`,
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

    const previousPage = () => {
        if (currentPage.value > 0) {
            currentPage.value--;
        }

        changePage(currentPage.value);
    };

    const customPage = () => {
        changePage(currentPage.value);
    };

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
        }

        changePage(currentPage.value);
    };
</script>

<style scoped>
    .page-link {
        cursor: pointer;
    }
</style>
