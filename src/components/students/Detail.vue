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
                            <h6 class="text-white ps-3 my-auto">Estudiante</h6>
                        </div>
                    </div>
                    <div class="card-body pb-2">
                        <div v-if="isStudentLoading && !studentError">
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden"
                                        >Loading...</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div v-if="studentError">
                            <div class="d-flex justify-content-center">
                                <h4 class="my-auto">
                                    Ha ocurrido un error al obtener la
                                    información del estudiante
                                </h4>
                            </div>
                        </div>
                        <div v-else-if="!isStudentLoading && !studentError">
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
                                            :value="student.nombre"
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
                                            v-model="localStudentData.name"
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
                                            :value="student.apellido"
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
                                            v-model="localStudentData.lastName"
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
                                    <label class="form-label" for="uidInput"
                                        >Código estudiantil</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus.uid,
                                        }"
                                    >
                                        <input
                                            class="form-control"
                                            id="uidInput"
                                            type="number"
                                            :value="student.codigoEstudiantil"
                                            tabindex="-1"
                                            :style="{
                                                pointerEvents: 'none',
                                                backgroundColor: '#fff',
                                                cursor: 'default',
                                            }"
                                            readonly
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{ props.validationErrorMessage.uid }}
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
                                            :value="student.email"
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
                                            v-model="localStudentData.email"
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
                                            v-model="localStudentData.password"
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
                                    <label class="form-label" for="programInput"
                                        >Programa académico</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .program,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="programInput"
                                            type="text"
                                            :value="student.programaAcademico"
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
                                            for="programInput"
                                            id="programInput"
                                            :v-model="localStudentData.program"
                                        >
                                            <option
                                                :value="localStudentData.program"
                                                selected
                                            >
                                                {{
                                                    localStudentData.program
                                                }}
                                            </option>
                                            <option
                                                value="Tecnología En Sistemas De Gestión De Calidad"
                                            >
                                                Tecnología En Sistemas De
                                                Gestión De Calidad
                                            </option>
                                            <option
                                                value="Tecnología En Desarrollo De Sistemas De Información Y De Software"
                                            >
                                                Tecnología En Desarrollo De
                                                Sistemas De Información Y De
                                                Software
                                            </option>
                                            <option
                                                value="Tecnología En Gestión De Servicios Turísticos Y Hoteleros"
                                            >
                                                Tecnología En Gestión De
                                                Servicios Turísticos Y Hoteleros
                                            </option>
                                            <option
                                                value="Licenciatura en Bilingüismo con énfasis en Inglés"
                                            >
                                                Licenciatura en Bilingüismo con
                                                énfasis en Inglés
                                            </option>
                                            <option value="Contaduría Pública">
                                                Contaduría Pública
                                            </option>
                                            <option
                                                value="Administración de Empresas"
                                            >
                                                Administración de Empresas
                                            </option>
                                            <option value="Derecho">
                                                Derecho
                                            </option>
                                            <option
                                                value="Ingeniería Industrial"
                                            >
                                                Ingeniería Industrial
                                            </option>
                                            <option
                                                value="Ingeniería de Sistemas"
                                            >
                                                Ingeniería de Sistemas
                                            </option>
                                            <option
                                                value="Administración de empresas turísticas y hoteleras"
                                            >
                                                Administración de empresas
                                                turísticas y hoteleras
                                            </option>
                                        </select>
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage.program
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-12 col-md-4">
                                    <label
                                        class="form-label"
                                        for="semesterInput"
                                        >Semestre</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        class="input-group input-group-outline"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .semester,
                                        }"
                                    >
                                        <input
                                            v-if="isReadOnly"
                                            class="form-control"
                                            id="semesterInput"
                                            type="number"
                                            :value="student.semestre"
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
                                            id="semesterInput"
                                            type="text"
                                            v-model="localStudentData.semester"
                                            @input="filterSemesterInput"
                                        />
                                    </div>
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .semester
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
                                        @click="deleteStudent"
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
                                        v-if="!props.externalLoading"
                                        role="button"
                                        class="btn bg-gradient-dark mt-3 me-2"
                                        @click="updateStudent"
                                    >
                                        Guardar
                                    </div>
                                    <div
                                        v-if="props.externalLoading"
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

    import StudentService from '@/services/useStudents';

    const router = useRouter();
    const snackbar = useSnackbar();

    const emit = defineEmits([
        'sendStudentData',
        'update:studentData',
        'update:validationErrorStatus',
        'update:validationErrorMessage',
    ]);
    const props = defineProps({
        studentData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        externalLoading: Boolean,
    });
    const studentId = router.currentRoute.value.params.id;
    const isStudentLoading = ref(false);
    const isReadOnly = ref(true);
    const studentError = ref(false);
    const showPassword = ref(false);

    const student = ref({});

    const localStudentData = ref({ ...props.studentData });

    watch(
        localStudentData,
        (newVal) => {
            emit('update:studentData', newVal);
        },
        { deep: true }
    );

    const queryStudent = async () => {
        await StudentService.getStudent(studentId)
            .then((response) => {
                student.value = response;
            })
            .catch((error) => {
                if (error) {
                    let message =
                        'Ha ocurrido un error al obtener la información de estudiante. Por favor intenta de nuevo más tarde.';

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
                isStudentLoading.value = false;
            });
    };

    onMounted(async () => {
        isStudentLoading.value = true;

        const id = parseInt(studentId);
        if (isNaN(id)) {
            router.replace('/404');
            return;
        }

        await queryStudent();

        resetErrorStatusAndMessages();

        if (Object.keys(student.value).length === 0) {
            router.replace('/404');
            return;
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
        localStudentData.value.name = student.value.nombre;
        localStudentData.value.lastName = student.value.apellido;
        localStudentData.value.uid = student.value.codigoEstudiantil;
        localStudentData.value.email = student.value.email;
        localStudentData.value.password = student.value.password;
        localStudentData.value.program = student.value.programaAcademico;
        localStudentData.value.semester = student.value.semestre;
        localStudentData.value.id = student.value.id;
    };

    const resetErrorStatusAndMessages = () => {
        emit('update:validationErrorStatus', {
            name: false,
            lastName: false,
            uid: false,
            email: false,
            password: false,
            program: false,
            semester: false,
        });

        emit('update:validationErrorMessage', {
            name: '',
            lastName: '',
            uid: '',
            email: '',
            password: '',
            program: '',
            semester: '',
        });
    };

    const startEdit = async () => {
        setEditFields();
        isReadOnly.value = false;
    };

    const cancelEdit = () => {
        resetErrorStatusAndMessages();
        studentError.value = false;
        isReadOnly.value = true;
    };

    const updateStudent = () => {
        emit('sendStudentData', 'update');
    };

    const deleteStudent = () => {
        Swal.fire({
            title: 'Eliminar estudiante',
            text: `Se eliminará al estudiante ${student.value.nombreCompleto}. Esta acción no se puede revertir.`,
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
                emit('deleteStudent', student.value.id);
            }
        });
    };

    const filterSemesterInput = (e) => {
        const cleanedValue = e.target.value.replace(/[^\d]/g, '');
        e.target.value = cleanedValue;
        localStudentData.value.semester = cleanedValue;
    };
</script>
