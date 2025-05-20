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
                                Agregar Estudiante
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
                        <form v-else>
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
                                            v-model="localStudentData.uid"
                                            @input="filterUidNumberInput"
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
                                        for="instructorInput"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .program,
                                        }"
                                    >
                                        <select
                                            class="form-control form-select"
                                            id="programInput"
                                            v-model="localStudentData.program"
                                        >
                                            <option
                                                selectd
                                                hidden
                                                disabled
                                            ></option>
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
                                            class="form-control"
                                            id="semesterInput"
                                            type="number"
                                            v-model="localStudentData.semester"
                                            @input="filterSemesterNumberInput"
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
                            <div class="w-100 text-end">
                                <div
                                    v-if="!props.externalLoading"
                                    role="button"
                                    class="btn bg-gradient-dark mt-3"
                                    @click="createStudent"
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, computed, onMounted } from 'vue';

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
    const isLoading = ref(false);
    const showPassword = ref(false);

    const localStudentData = ref({ ...props.studentData });

    watch(
        localStudentData,
        (newValue) => {
            emit('update:studentData', newValue);
        },
        { deep: true }
    );

    const resetValues = () => {
        emit('update:studentData', {
            name: '',
            lastName: '',
            uid: null,
            email: '',
            password: '',
            program: '',
            semester: null,
        });
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

    onMounted(async () => {
        resetValues();
        resetErrorStatusAndMessages();
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

    const createStudent = () => {
        emit('sendStudentData', 'create');
    };

    const filterUidNumberInput = (e) => {
        let cleanedValue = e.target.value.replace(/[^\d]/g, '');
        cleanedValue = cleanedValue.slice(0, 10);
        e.target.value = cleanedValue;
        localStudentData.value.uid = cleanedValue;
    };

    const filterSemesterNumberInput = (e) => {
        let cleanedValue = e.target.value.replace(/[^\d]/g, '');
        cleanedValue = cleanedValue.slice(0, 10);
        e.target.value = cleanedValue;
        localStudentData.value.semester = cleanedValue;
    };
</script>

<style scoped>
    .form-label {
        font-size: 0.9rem;
        color: black;
    }
</style>
