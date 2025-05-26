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
                                    <label class="form-label" for="programInput"
                                        >Programa académico</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <div
                                        for="instructorInput"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .program,
                                        }"
                                    >
                                        <v-select
                                            v-model="localStudentData.program"
                                            :options="programs"
                                            :reduce="(program) => program.name"
                                            label="nombreCompleto"
                                            :filterable="true"
                                            :searchable="true"
                                            :get-option-label="
                                                (program) => `${program.name}`
                                            "
                                            class="custom-vue3-select"
                                        />
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
    import { ref, watch, onMounted } from 'vue';
    import vSelect from 'vue3-select';
    import 'vue3-select/dist/vue3-select.css';

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

    const localStudentData = ref({ ...props.studentData });

    const programs = [
        { name: 'Tecnología En Sistemas De Gestión De Calidad' },
        {
            name: 'Tecnología En Desarrollo De Sistemas De Información Y De Software',
        },
        { name: 'Licenciatura en Bilingüismo con énfasis en Inglés' },
        { name: 'Contaduría Pública' },
        { name: 'Administración de Empresas' },
        { name: 'Derecho' },
        { name: 'Ingeniería Industrial' },
        { name: 'Ingeniería de Sistemas' },
        { name: 'Administración de empresas turísticas y hoteleras' },
    ];

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

    .custom-vue3-select .vs__dropdown-toggle {
        border: 1px solid #ced4da;
        border-radius: 0.5rem;
        min-height: 42px;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.5;
        background-color: white;
        transition:
            border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
    }

    .custom-vue3-select .vs__dropdown-toggle:focus,
    .custom-vue3-select .vs__dropdown-toggle.vs__dropdown-toggle--open {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        border-color: #80bdff;
    }

    .custom-vue3-select .vs__selected {
        font-size: 0.875rem;
    }

    .custom-vue3-select .vs__dropdown-menu {
        border-radius: 0.5rem;
        font-size: 0.875rem;
    }

    .custom-vue3-select .vs__dropdown-option--highlight {
        background-color: #f0f0f0;
        color: #212529;
    }
</style>
