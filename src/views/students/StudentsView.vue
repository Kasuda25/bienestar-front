<template>
    <router-view
        v-model:studentData="studentData"
        v-model:attendanceData="attendanceData"
        v-model:validationErrorStatus="validationErrorStatus"
        v-model:validationErrorMessage="validationErrorMessage"
        :students="students"
        :totalPages="totalPages"
        :external-loading="isLoading"
        :list-error="listError"
        :key="viewKey"
        @sendStudentData="validateStudentData"
        @sendAttendanceData="validateAttendanceData"
        @deleteStudent="deleteStudent"
        @changePage="changePage"
    />
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';

    import { useAuthStore } from '@/stores/auth';

    import StudentsService from '@/services/useStudents.js';
    import InstructorsService from '@/services/useInstructors.js';

    const router = useRouter();
    const snackbar = useSnackbar();

    const authStore = useAuthStore();

    const isLoading = ref(false);
    const listError = ref(false);
    const viewKey = ref(0);
    const totalPages = ref(0);

    const students = ref();
    const studentData = ref({
        name: '',
        lastName: '',
        uid: null,
        email: '',
        password: '',
        program: '',
        semester: null,
        hours: null,
        id: null,
    });
    const attendanceData = ref({
        student: null,
        activity: null,
        hours: null,
        description: '',
    });

    const changePage = async (page) => {
        students.value = null;

        await queryStudents(page);
    };

    const queryStudents = async (page = 0, size = 10) => {
        try {
            const response = await StudentsService.getStudents(page, size);

            students.value = response.data;
            totalPages.value = response.pagination.totalPages;
        } catch (error) {
            if (error.response) {
                listError.value = true;
                let message =
                    'Ha ocurrido un error al obtener la lista de estudiantes. Por favor intenta de nuevo más tarde.';

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

    const queryStudentsEnrolled = async (page = 0, size = 10) => {
        try {
            const response = await InstructorsService.getStudentsByInstructor(
                authStore.id,
                page,
                size
            );

            students.value = response.data;
        } catch (error) {
            if (error.response) {
                listError.value = true;
                let message =
                    'Ha ocurrido un error al obtener la lista de estudiantes. Por favor intenta de nuevo más tarde.';

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
        if (authStore.user.rol === 'ADMIN') {
            await queryStudents();
        }

        if (authStore.user.rol === 'INSTRUCTOR') {
            await queryStudentsEnrolled();
        }
    });

    const validationErrorStatus = ref({
        name: false,
        lastName: false,
        uid: false,
        email: false,
        password: false,
        program: false,
        semester: false,
        hours: false,
        studentId: false,
        activityId: false,
        attendanceHours: false,
        attendanceDescription: false,
    });

    const validationErrorMessage = ref({
        name: '',
        lastName: '',
        uid: '',
        email: '',
        password: '',
        program: '',
        semester: '',
        hours: '',
        studentId: '',
        activityId: '',
        attendanceHours: '',
        attendanceDescription: '',
    });

    const validateStudentData = async (operation) => {
        if (studentData.value.name === '' || !studentData.value.name) {
            validationErrorStatus.value.name = true;
            validationErrorMessage.value.name = 'El nombre es obligatorio';
        } else {
            validationErrorStatus.value.name = false;
            validationErrorMessage.value.name = '';
        }

        if (studentData.value.lastName === '' || !studentData.value.lastName) {
            validationErrorStatus.value.lastName = true;
            validationErrorMessage.value.lastName =
                'El apellido es obligatorio';
        } else {
            validationErrorStatus.value.lastName = false;
            validationErrorMessage.value.lastName = '';
        }

        if (studentData.value.uid === null || !studentData.value.uid) {
            validationErrorStatus.value.uid = true;
            validationErrorMessage.value.uid =
                'El código estudiantil es obligatorio';
        } else {
            validationErrorStatus.value.uid = false;
            validationErrorMessage.value.uid = '';
        }

        if (studentData.value.email === '' || !studentData.value.email) {
            validationErrorStatus.value.email = true;
            validationErrorMessage.value.email = 'El correo es obligatorio';
        } else {
            validationErrorStatus.value.email = false;
            validationErrorMessage.value.email = '';
        }

        if (studentData.value.password && operation === 'update') {
            if (studentData.value.password.length < 8) {
                validationErrorStatus.value.password = true;
                validationErrorMessage.value.password =
                    'La contraseña debe tener al menos 8 caracteres';
            } else {
                validationErrorStatus.value.password = false;
                validationErrorMessage.value.password = '';
            }
        } else if (
            (studentData.value.password === '' ||
                !studentData.value.password) &&
            operation === 'create'
        ) {
            validationErrorStatus.value.password = true;
            validationErrorMessage.value.password =
                'La contraseña es obligatoria';
        } else if (
            studentData.value.password &&
            studentData.value.password.length < 8
        ) {
            validationErrorStatus.value.password = true;
            validationErrorMessage.value.password =
                'La contraseña debe tener al menos 8 caracteres';
        } else {
            validationErrorStatus.value.password = false;
            validationErrorMessage.value.password = '';
        }

        if (studentData.value.program === null || !studentData.value.program) {
            validationErrorStatus.value.program = true;
            validationErrorMessage.value.program =
                'El programa académico es obligatorio';
        } else {
            validationErrorStatus.value.program = false;
            validationErrorMessage.value.program = '';
        }

        if (
            studentData.value.semester === null ||
            !studentData.value.semester
        ) {
            validationErrorStatus.value.semester = true;
            validationErrorMessage.value.semester =
                'El semestre es obligatorio';
        } else if (studentData.value.semester < 1) {
            validationErrorStatus.value.semester = true;
            validationErrorMessage.value.semester =
                'El semestre no puede ser 0';
        } else if (studentData.value.semester > 10) {
            validationErrorStatus.value.semester = true;
            validationErrorMessage.value.semester =
                'El semestre no puede ser mayor a 10';
        } else {
            validationErrorStatus.value.semester = false;
            validationErrorMessage.value.semester = '';
        }

        if (
            !validationErrorStatus.value.name &&
            !validationErrorStatus.value.lastName &&
            !validationErrorStatus.value.uid &&
            !validationErrorStatus.value.email &&
            !validationErrorStatus.value.password &&
            !validationErrorStatus.value.program &&
            !validationErrorStatus.value.semester
        ) {
            sendStudentData(operation);
        }
    };

    const validateAttendanceData = () => {
        if (
            attendanceData.value.activity === null ||
            !attendanceData.value.activity
        ) {
            validationErrorStatus.value.activity = true;
            validationErrorMessage.value.activity =
                'La actividad es obligatoria';
        } else {
            validationErrorStatus.value.activity = false;
            validationErrorMessage.value.activity = '';
        }

        if (
            attendanceData.value.hours === null ||
            !attendanceData.value.hours
        ) {
            validationErrorStatus.value.attendanceHours = true;
            validationErrorMessage.value.attendanceHours =
                'Las horas son obligatorias';
        } else {
            validationErrorStatus.value.attendanceHours = false;
            validationErrorMessage.value.attendanceHours = '';
        }

        if (
            attendanceData.value.description === '' ||
            !attendanceData.value.description
        ) {
            validationErrorStatus.value.attendanceDescription = true;
            validationErrorMessage.value.attendanceDescription =
                'La descripción es obligatoria';
        } else {
            validationErrorStatus.value.attendanceDescription = false;
            validationErrorMessage.value.attendanceDescription = '';
        }

        if (!validationErrorStatus.value.activity) {
            sendAttendanceData();
        }
    };

    const sendStudentData = async (operation) => {
        try {
            isLoading.value = true;
            let response;

            if (operation === 'create') {
                response = await StudentsService.createStudent({
                    nombre: studentData.value.name,
                    apellido: studentData.value.lastName,
                    codigoEstudiantil: studentData.value.uid,
                    email: studentData.value.email,
                    password: studentData.value.password,
                    programaAcademico: studentData.value.program,
                    semestre: studentData.value.semester,
                });
            }

            if (operation === 'update') {
                response = await StudentsService.putStudent(
                    studentData.value.id,
                    {
                        nombre: studentData.value.name,
                        apellido: studentData.value.lastName,
                        codigoEstudiantil: studentData.value.uid,
                        email: studentData.value.email,
                        password: studentData.value.password,
                        programaAcademico: studentData.value.program,
                        semestre: studentData.value.semester,
                        estado: 'ACTIVO',
                    }
                );
            }

            if (response) {
                await queryStudents();
                isLoading.value = false;

                if (operation === 'create') {
                    snackbar.add({
                        type: 'success',
                        text: 'Estudiante creado exitosamente',
                    });

                    resetValues();

                    router.push({
                        name: 'students-detail',
                        params: { id: response.data.id },
                    });
                }

                if (operation === 'update') {
                    snackbar.add({
                        type: 'success',
                        text: 'Estudiante actualizado exitosamente',
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

    const sendAttendanceData = async () => {
        try {
            isLoading.value = true;
            const response = await StudentsService.registerAttendance({
                estudianteId: attendanceData.value.student,
                actividadId: attendanceData.value.activity,
            });

            if (response.asistenciaId) {
                isLoading.value = false;

                const secondResponse = await StudentsService.registerHours({
                    asistenciaId: response.asistenciaId,
                    horas: attendanceData.value.hours,
                    descripcion: attendanceData.value.description,
                });

                if (secondResponse) {
                    snackbar.add({
                        type: 'success',
                        text: 'Asistencia registrada exitosamente',
                    });

                    resetAttendanceValues();
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
        studentData.value = {
            name: '',
            lastName: '',
            uid: '',
            email: '',
            password: '',
            program: '',
            semester: '',
        };
    };

    const resetAttendanceValues = () => {
        attendanceData.value = {
            student: '',
            activity: '',
            hours: '',
            description: '',
        };
    };

    const deleteStudent = async (id) => {
        try {
            isLoading.value = true;
            const response = await StudentsService.deleteStudent(id);

            if (response) {
                await queryStudents();
                isLoading.value = false;
                snackbar.add({
                    type: 'success',
                    text: 'Se ha eliminado al estudiante',
                });

                router.go(-1);
            }
        } catch (error) {
            isLoading.value = false;
            let message =
                'Ha ocurrido un error al tratar de eliminar al estudiante. Por favor intenta de nuevo más tarde.';

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
    };
</script>
