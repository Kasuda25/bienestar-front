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
                                Agregar Instrcutor
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
                                        v-model="props.instructorData.name"
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
                                        for="lastNameInput"
                                        >Apellido</label
                                    >
                                </div>
                                <div class="col-12 col-md-8">
                                    <input
                                        class="form-control"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .lastName,
                                        }"
                                        id="lastNameInput"
                                        type="text"
                                        v-model="props.instructorData.lastName"
                                    />
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
                                    <input
                                        class="form-control"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .email,
                                        }"
                                        id="emailInput"
                                        type="email"
                                        v-model="props.instructorData.email"
                                    />
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
                                    <div class="d-flex">
                                        <input
                                            class="form-control"
                                            :class="{
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .password,
                                            }"
                                            id="passwordInput"
                                            :type="passwordType"
                                            v-model="
                                                props.instructorData.password
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
                                    <input
                                        class="form-control"
                                        :class="{
                                            'is-invalid':
                                                props.validationErrorStatus
                                                    .speciality,
                                        }"
                                        id="specialityInput"
                                        type="text"
                                        v-model="
                                            props.instructorData.speciality
                                        "
                                    />
                                    <div class="invalid-feedback">
                                        {{
                                            props.validationErrorMessage
                                                .speciality
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="w-100 text-end">
                                <div
                                    v-if="!props.isLoading"
                                    role="button"
                                    class="btn bg-gradient-dark mt-3"
                                    @click="createIntructor"
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
    import { ref, watch, computed, onMounted } from 'vue';
    import { useSnackbar } from 'vue3-snackbar';

    import InstructorsService from '@/services/useInstructors';

    const snackbar = useSnackbar();

    const emit = defineEmits();
    const props = defineProps({
        instructorData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        isLoading: Boolean,
    });
    const isLoading = ref(false);
    const showPassword = ref(false);

    const resetValues = () => {
        props.instructorData.name = '';
        props.instructorData.lastName = '';
        props.instructorData.email = '';
        props.instructorData.password = '';
        props.instructorData.speciality = '';
    };

    const resetErrorStatusAndMessages = () => {
        props.validationErrorStatus.name = false;
        props.validationErrorStatus.lastName = false;
        props.validationErrorStatus.email = false;
        props.validationErrorStatus.password = false;
        props.validationErrorStatus.speciality = false;
        props.validationErrorMessage.name = '';
        props.validationErrorMessage.lastName = '';
        props.validationErrorMessage.email = '';
        props.validationErrorMessage.password = '';
        props.validationErrorMessage.speciality = '';
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

    const createIntructor = () => {
        emit('sendInstructorData', 'create');
    };
</script>

<style scoped>
    .form-label {
        font-size: 0.9rem;
        color: black;
    }
</style>
