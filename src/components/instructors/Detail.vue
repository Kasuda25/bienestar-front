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
                        <div v-if="isLoading && !instructorError">
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
                                    Ha ocurrido un error al obtener la lista de
                                    instructores
                                </h4>
                            </div>
                        </div>
                        <div v-else-if="!isLoading && !instructorError">
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label class="form-label" for="nameInput"
                                        >Nombre</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
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
                                        v-model="props.instructorData.name"
                                    />
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
                                    <input
                                        v-if="isReadOnly"
                                        class="form-control"
                                        id="lastNameInput"
                                        type="text"
                                        :value="instructor.usuario?.apellido"
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
                                        v-model="props.instructorData.lastName"
                                    />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label class="form-label" for="emailInput"
                                        >Correo</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
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
                                        v-model="props.instructorData.email"
                                    />
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
                                        type="password"
                                        v-model="props.instructorData.password"
                                    />
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
                                            props.instructorData.speciality
                                        "
                                    />
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
                                        v-if="!props.isLoading"
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
                                        v-if="props.isLoading"
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
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, toRaw } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';
    import Swal from 'sweetalert2';

    // import ActivitiesService from '@/services/useActivities';
    import InstructorsService from '@/services/useInstructors';

    const router = useRouter();
    const snackbar = useSnackbar();

    const emit = defineEmits();
    const props = defineProps({
        instructorData: Object,
        // validationErrorStatus: Object,
        // validationErrorMessage: Object,
        isLoading: Boolean,
    });
    const instructorId = router.currentRoute.value.params.id;
    const isLoading = ref(false);
    const isReadOnly = ref(true);
    // const activityError = ref(false);
    const instructorError = ref(false);

    // const activity = ref({});
    const instructor = ref({});

    onMounted(async () => {
        const id = parseInt(instructorId);
        if (isNaN(id)) {
            router.replace('/404');
            return;
        }

        isLoading.value = true;
        try {
            instructor.value =
                await InstructorsService.getInstructor(instructorId);
        } catch (error) {
            if (error.message === 'Instructor no encontrado') {
                router.replace('/404');
            } else {
                snackbar.add({
                    type: 'error',
                    text: 'Error al cargar los datos del instructor',
                });
            }
        }
        isLoading.value = false;
    });

    const setEditFields = () => {
        props.instructorData.name = instructor.value.usuario.nombre;
        props.instructorData.lastName = instructor.value.usuario.apellido;
        props.instructorData.email = instructor.value.usuario.email;
        props.instructorData.speciality = instructor.value.especialidad;
        props.instructorData.id = instructor.value.id;
    };

    const startEdit = async () => {
        setEditFields();
        isReadOnly.value = false;
    };

    const cancelEdit = () => {
        instructorError.value = false;
        isReadOnly.value = true;
    };

    const updateInstructor = () => {
        console.log('1');
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
