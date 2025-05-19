<template>
    <router-view
        v-model:instructorData="instructorData"
        v-model:validationErrorStatus="validationErrorStatus"
        v-model:validationErrorMessage="validationErrorMessage"
        :instructors="instructors"
        :external-loading="isLoading"
        :list-error="listError"
        :key="viewKey"
        @sendInstructorData="validateInstructorData"
        @deleteInstructor="deleteInstructor"
    />
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';

    import InstructorsService from '@/services/useInstructors';

    const router = useRouter();
    const snackbar = useSnackbar();

    const isLoading = ref(false);
    const listError = ref(false);
    const viewKey = ref(0);

    const instructors = ref();
    const instructorData = ref({
        name: '',
        lastName: '',
        email: '',
        password: '',
        speciality: '',
        id: null,
    });

    const queryInstructors = async () => {
        try {
            const response = await InstructorsService.getInstructors();

            instructors.value = response.data;
        } catch (error) {
            if (error) {
                listError.value = true;
                let message =
                    'Ha ocurrido un error al obtener la lista de instructores. Por favor intenta de nuevo más tarde.';

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
        }
    };

    onMounted(async () => {
        await queryInstructors();
    });

    const validationErrorStatus = ref({
        name: false,
        lastName: false,
        email: false,
        password: false,
        speciality: false,
    });

    const validationErrorMessage = ref({
        name: '',
        lastName: '',
        email: '',
        password: '',
        speciality: '',
    });

    const validateInstructorData = async (operation) => {
        if (instructorData.value.name === '' || !instructorData.value.name) {
            validationErrorStatus.value.name = true;
            validationErrorMessage.value.name = 'El nombre es obligatorio';
        } else {
            validationErrorStatus.value.name = false;
            validationErrorMessage.value.name = '';
        }

        if (
            instructorData.value.lastName === '' ||
            !instructorData.value.lastName
        ) {
            validationErrorStatus.value.lastName = true;
            validationErrorMessage.value.lastName =
                'El apellido es obligatorio';
        } else {
            validationErrorStatus.value.lastName = false;
            validationErrorMessage.value.lastName = '';
        }

        if (instructorData.value.email === '' || !instructorData.value.email) {
            validationErrorStatus.value.email = true;
            validationErrorMessage.value.email = 'El correo es obligatorio';
        } else {
            validationErrorStatus.value.email = false;
            validationErrorMessage.value.email = '';
        }

        if (instructorData.value.password != '' && operation === 'update') {
            if (instructorData.value.password.length < 8) {
                validationErrorStatus.value.password = true;
                validationErrorMessage.value.password =
                    'La contraseña debe tener al menos 8 caracteres';
            } else {
                validationErrorStatus.value.password = false;
                validationErrorMessage.value.password = '';
            }
        } else if (
            instructorData.value.password === '' ||
            (!instructorData.value.password && operation === 'create')
        ) {
            validationErrorStatus.value.password = true;
            validationErrorMessage.value.password =
                'La contraseña es obligatoria';
        } else if (instructorData.value.password.length < 8) {
            validationErrorStatus.value.password = true;
            validationErrorMessage.value.password =
                'La contraseña debe tener al menos 8 caracteres';
        } else {
            validationErrorStatus.value.password = false;
            validationErrorMessage.value.password = '';
        }

        if (
            instructorData.value.speciality === '' ||
            !instructorData.value.speciality
        ) {
            validationErrorStatus.value.speciality = true;
            validationErrorMessage.value.speciality =
                'La especialidad es obligatoria';
        } else {
            validationErrorStatus.value.speciality = false;
            validationErrorMessage.value.speciality = '';
        }

        if (
            !validationErrorStatus.value.name &&
            !validationErrorStatus.value.lastName &&
            !validationErrorStatus.value.email &&
            !validationErrorStatus.value.password &&
            !validationErrorStatus.value.speciality
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
                    nombre: instructorData.value.name,
                    apellido: instructorData.value.lastName,
                    email: instructorData.value.email,
                    password: instructorData.value.password,
                    especialidad: instructorData.value.speciality,
                });
            }

            if (operation === 'update') {
                response = await InstructorsService.putInstructor(
                    instructorData.value.id,
                    {
                        nombre: instructorData.value.name,
                        apellido: instructorData.value.lastName,
                        correo: instructorData.value.email,
                        contrasena: instructorData.value.password,
                        especialidad: instructorData.value.speciality,
                    }
                );
            }

            if (response) {
                await queryInstructors();
                isLoading.value = false;

                if (operation === 'create') {
                    snackbar.add({
                        type: 'success',
                        text: 'Instructor creado exitosamente',
                    });

                    resetValues();

                    router.push({
                        name: 'instructors-detail',
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
            if (error) {
                isLoading.value = false;
                snackbar.add({
                    type: 'error',
                    text: error.message,
                });
            }
        }
    };

    const resetValues = () => {
        instructorData.value = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            speciality: '',
        };
    };

    const deleteInstructor = async (id) => {
        try {
            isLoading.value = true;
            const response = await InstructorsService.deleteInstructor(id);

            if (response) {
                await queryInstructors();
                isLoading.value = false;
                snackbar.add({
                    type: 'success',
                    text: 'Se ha eliminado al instructor',
                });

                router.go(-1);
            }
        } catch (error) {
            isLoading.value = false;
            let message =
                'Ha ocurrido un error al tratar de eliminar al instructor. Por favor intenta de nuevo más tarde.';

            if (error.type === 'backend') {
                message = error.message;
            } else if (error.type === 'network') {
                message = error.message;
            } else if (error.type === 'unknown') {
                message = error.message;
            }

            snackbar.add({
                type: 'error',
                text: message,
            });
        }
    };
</script>
