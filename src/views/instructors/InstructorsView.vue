<template>
    <router-view
        :instructors="instructors"
        :instructorData="instructorData"
        :validation-error-status="validationErrorStatus"
        :validation-error-message="validationErrorMessage"
        :isLoading="isLoading"
        :listError="listError"
        :key="viewKey"
        @sendInstructorData="validateInstructorData"
        @deleteInstructor="deleteInstructor"
    />
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref, watch, reactive } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';

    import InstructorsService from '@/services/useInstructors';

    const router = useRouter();
    const snackbar = useSnackbar();

    const isLoading = ref(false);
    const listError = ref(false);
    const viewKey = ref(0);

    const instructors = ref();
    const instructorData = reactive({
        name: '',
        lastName: '',
        email: '',
        password: '',
        speciality: '',
        id: null,
    });

    const queryInstructors = async () => {
        try {
            instructors.value = await InstructorsService.getInstructors();
        } catch (error) {
            listError.value = true;
            snackbar.add({
                type: 'error',
                text: 'Ha ocurrido un error. Por favor intenta de nuevo mas tade',
            });
        }
    };

    watch(
        () => instructors.value,
        () => {
            queryInstructors();
        }
    );

    onMounted(async () => {
        queryInstructors();
    });

    const validationErrorStatus = reactive({
        name: false,
        lastName: false,
        email: false,
        password: false,
        speciality: false,
    });

    const validationErrorMessage = reactive({
        name: '',
        lastName: '',
        email: '',
        password: '',
        speciality: '',
    });

    const validateInstructorData = async (operation) => {
        if (instructorData.name === '') {
            validationErrorStatus.name = true;
            validationErrorMessage.name = 'El nombre es obligatorio';
        } else {
            validationErrorStatus.name = false;
            validationErrorMessage.name = '';
        }

        if (instructorData.lastName === '') {
            validationErrorStatus.lastName = true;
            validationErrorMessage.lastName = 'El apellido es obligatorio';
        } else {
            validationErrorStatus.lastName = false;
            validationErrorMessage.lastName = '';
        }

        if (instructorData.email === '') {
            validationErrorStatus.email = true;
            validationErrorMessage.email = 'El correo es obligatorio';
        } else {
            validationErrorStatus.email = false;
            validationErrorMessage.email = '';
        }

        if (instructorData.password != '' && operation === 'update') {
            if (instructorData.password.length < 8) {
                validationErrorStatus.password = true;
                validationErrorMessage.password =
                    'La contraseña debe tener al menos 8 caracteres';
            } else {
                validationErrorStatus.password = false;
                validationErrorMessage.password = '';
            }
        } else if (instructorData.password === '' && operation === 'create') {
            validationErrorStatus.password = true;
            validationErrorMessage.password = 'La contraseña es obligatoria';
        } else {
            validationErrorStatus.password = false;
            validationErrorMessage.password = '';
        }

        if (instructorData.speciality === '') {
            validationErrorStatus.speciality = true;
            validationErrorMessage.speciality =
                'La especialidad es obligatoria';
        } else {
            validationErrorStatus.speciality = false;
            validationErrorMessage.speciality = '';
        }

        if (
            !validationErrorStatus.name &&
            !validationErrorStatus.lastName &&
            !validationErrorStatus.email &&
            !validationErrorStatus.password &&
            !validationErrorStatus.speciality
        ) {
            sendinstructorData(operation);
        }
    };

    const sendinstructorData = async (operation) => {
        try {
            isLoading.value = true;
            let response;

            if (operation === 'create') {
                response = await InstructorsService.createInstructor({
                    nombre: instructorData.name,
                    apellido: instructorData.lastName,
                    email: instructorData.email,
                    password: instructorData.password,
                    especialidad: instructorData.speciality,
                });
            }

            if (operation === 'update') {
                response = await InstructorsService.putInstructor(
                    instructorData.id,
                    {
                        nombre: instructorData.name,
                        apellido: instructorData.lastName,
                        correo: instructorData.email,
                        contrasena: instructorData.password,
                        especialidad: instructorData.speciality,
                    }
                );
            }

            if (response) {
                isLoading.value = false;

                if (operation === 'create') {
                    snackbar.add({
                        type: 'success',
                        text: 'Instructor creado exitosamente',
                    });

                    resetValues();

                    router.push({
                        name: 'instructor-detail',
                        params: { id: response.id },
                    });
                }

                if (operation === 'update') {
                    snackbar.add({
                        type: 'success',
                        text: 'Instructor actualizado exitosamente',
                    });

                    viewKey.value++;
                }
            }
        } catch (error) {
            isLoading.value = false;
            snackbar.add({
                type: 'error',
                text: error.message,
            });
        }
    };

    const resetValues = () => {
        instructorData.name = '';
        instructorData.lastName = '';
        instructorData.email = '';
        instructorData.password = '';
        instructorData.speciality = '';
    };

    const deleteInstructor = async (id) => {
        try {
            isLoading.value = true;
            const response = await InstructorsService.deleteInstructor(id);

            if (response) {
                isLoading.value = false;
                snackbar.add({
                    type: 'success',
                    text: 'Se ha eliminado al instructor',
                });

                router.go(-1);
            }
        } catch (error) {
            isLoading.value = false;
            snackbar.add({
                type: 'error',
                text: 'Ha ocurido un error. Po favor intentalo de nuevo más tarde',
            });
        }
    };
</script>
