<template>
    <Sidebar
        :isAsideVisible="isAsideVisible"
        :isMobile="isMobile"
        @toggleAside="toggleAside"
        @logOut="logOut"
    />
    <main
        class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    >
        <Navbar
            pageName="Actividades"
            :pageSubname="pageSubname"
            :isAsideVisible="isAsideVisible"
            :isMobile="isMobile"
            :dropdownOpen="dropdownOpen"
            @toggleAside="toggleAside"
            @toggleDropdown="toggleDropdown"
            @logOut="logOut"
            @setDropdownRef="(el) => (dropdownRef = el)"
        />
        <router-view
            :activities="activities"
            :activityData="activityData"
            :validation-error-status="validationErrorStatus"
            :validation-error-message="validationErrorMessage"
            :isLoading="isLoading"
            @createActividad="createActividadValidation"
        />
        <Footer />
    </main>
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref, watch, reactive } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useSnackbar } from 'vue3-snackbar';

    import Sidebar from '../../components/shared/Sidebar.vue';
    import Navbar from '../../components/shared/Navbar.vue';
    import Footer from '../../components/shared/Footer.vue';

    import ActividadesServices from '../../services/useActividades';

    const route = useRoute();
    const router = useRouter();
    const snackbar = useSnackbar();

    const pageSubname = ref('');
    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const isAsideVisible = ref(true);
    const isMobile = ref(false);
    const isLoading = ref(false);

    const activities = ref();
    const activityData = reactive({
        name: '',
        startDate: '',
        endDate: '',
        startHour: '',
        endHour: '',
        maxStudents: null,
        instructor: null,
        location: '',
    });

    watch(
        () => route.name,
        async () => {
            setPageSubname();
        }
    );

    onMounted(async () => {
        setPageSubname();

        document.addEventListener('click', handleClickOutside);
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        activities.value = await ActividadesServices.getActividades();
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('resize', checkScreenSize);
    });

    const setPageSubname = () => {
        switch (route.name) {
            case 'activities-list':
                pageSubname.value = 'Listar';
                break;

            case 'activities-create':
                pageSubname.value = 'Crear';
                break;

            case 'activities-detail':
                pageSubname.value = 'Detalle';
                break;

            case '':
                pageSubname.value = '';
                break;

            default:
                break;
        }
    };

    const toggleAside = () => {
        isAsideVisible.value = !isAsideVisible.value;
    };

    const toggleDropdown = () => {
        dropdownOpen.value = !dropdownOpen.value;
    };

    const handleClickOutside = (event) => {
        if (
            dropdownOpen.value &&
            dropdownRef.value &&
            !dropdownRef.value.contains(event.target)
        ) {
            dropdownOpen.value = false;
        }
    };

    const checkScreenSize = () => {
        isMobile.value = window.innerWidth < 1200;
        if (isMobile.value) {
            isAsideVisible.value = false;
        } else {
            isAsideVisible.value = true;
        }
    };

    const logOut = () => {
        LocalStorage.endSession();

        router.push({ name: 'login' });
    };

    const validationErrorStatus = reactive({
        name: false,
        startDate: false,
        endDate: false,
        startHour: false,
        endHour: false,
        maxStudents: false,
        instructor: false,
        location: false,
    });

    const validationErrorMessage = reactive({
        name: '',
        startDate: '',
        endDate: '',
        startHour: '',
        endHour: '',
        maxStudents: '',
        instructor: '',
        location: '',
    });

    const createActividadValidation = async () => {
        if (activityData.name === '') {
            validationErrorStatus.name = true;
            validationErrorMessage.name = 'El nombre es requerido';
        } else {
            validationErrorStatus.name = false;
            validationErrorMessage.name = '';
        }

        if (activityData.startDate === '') {
            validationErrorStatus.startDate = true;
            validationErrorMessage.startDate =
                'La fecha de inicio es requerida';
        } else {
            validationErrorStatus.startDate = false;
            validationErrorMessage.startDate = '';
        }

        if (activityData.endDate === '') {
            validationErrorStatus.endDate = true;
            validationErrorMessage.endDate = 'La fecha de fin es requerida';
        } else {
            validationErrorStatus.endDate = false;
            validationErrorMessage.endDate = '';
        }

        if (activityData.startHour === '') {
            validationErrorStatus.startHour = true;
            validationErrorMessage.startHour = 'La hora de inicio es requerida';
        } else {
            validationErrorStatus.startHour = false;
            validationErrorMessage.startHour = '';
        }

        if (activityData.endHour === '') {
            validationErrorStatus.endHour = true;
            validationErrorMessage.endHour = 'La hora de fin es requerida';
        } else {
            validationErrorStatus.endHour = false;
            validationErrorMessage.endHour = '';
        }

        if (activityData.maxStudents === null) {
            validationErrorStatus.maxStudents = true;
            validationErrorMessage.maxStudents =
                'El número máximo de estudiantes es requerido';
        } else {
            validationErrorStatus.maxStudents = false;
            validationErrorMessage.maxStudents = '';
        }

        if (activityData.instructor === null) {
            validationErrorStatus.instructor = true;
            validationErrorMessage.instructor = 'El instructor es requerido';
        } else {
            validationErrorStatus.instructor = false;
            validationErrorMessage.instructor = '';
        }

        if (activityData.location === '') {
            validationErrorStatus.location = true;
            validationErrorMessage.location = 'La ubicación es requerida';
        } else {
            validationErrorStatus.location = false;
            validationErrorMessage.location = '';
        }

        if (
            !validationErrorStatus.name &&
            !validationErrorStatus.startDate &&
            !validationErrorStatus.endDate &&
            !validationErrorStatus.startHour &&
            !validationErrorStatus.endHour &&
            !validationErrorStatus.maxStudents &&
            !validationErrorStatus.instructor &&
            !validationErrorStatus.location
        ) {
            createActividad();
        }
    };

    const createActividad = async () => {
        try {
            isLoading.value = true;
            const response = await ActividadesServices.createActividad({
                nombre: activityData.name,
                fechaInicio: activityData.startDate,
                fechaFin: activityData.endDate,
                horaInicio: activityData.startHour,
                horaFin: activityData.endHour,
                maxEstudiantes: activityData.maxStudents,
                instructorId: activityData.instructor,
                ubicacion: activityData.location,
            });

            if (response) {
                isLoading.value = false;
                snackbar.add({
                    type: 'success',
                    text: 'Actividad creada exitosamente',
                });

                resetValues();

                router.push({
                    name: 'activities-detail',
                    params: { id: response.id },
                });
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
        activityData.name = '';
        activityData.startDate = '';
        activityData.endDate = '';
        activityData.startHour = '';
        activityData.endHour = '';
        activityData.maxStudents = null;
        activityData.instructor = null;
        activityData.location = '';
    }
</script>
