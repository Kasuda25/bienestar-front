<template>
    <nav
        class="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl"
        id="navbarBlur"
        data-scroll="true"
    >
        <div class="container-fluid py-1 pe-3 ps-0">
            <button
                class="btn btn-outline-secondary mb-0 me-3 sidebar-button z-index-1032"
                :style="{
                    border: 'none',
                }"
                @click="toggleAside"
                v-if="isMobile"
            >
                <i class="fas fa-bars"></i>
            </button>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0">
                    <li class="breadcrumb-item text-sm text-gray active">
                        Bienestar
                    </li>
                    <li
                        :class="[
                            'breadcrumb-item text-sm',
                            pageSubname
                                ? 'text-gray active'
                                : 'text-dark active',
                        ]"
                        aria-current="page"
                    >
                        {{ pageName }}
                    </li>
                    <li
                        v-if="pageSubname"
                        class="breadcrumb-item text-sm text-dark active"
                        aria-current="page"
                    >
                        {{ pageSubname }}
                    </li>
                </ol>
            </nav>
            <div
                class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                id="navbar"
            >
                <ul
                    class="navbar-nav d-flex align-items-center d-flex justify-content-end ms-md-auto pe-md-3 pe-lg-0"
                >
                    <li
                        class="nav-item dropdown d-flex align-items-center"
                        :ref="setDropdownRef"
                    >
                        <a
                            class="nav-link"
                            href="javascript:;"
                            @click="toggleDropdown"
                        >
                            <i class="material-symbols-rounded"
                                >account_circle</i
                            >
                        </a>
                        <ul
                            class="dropdown-menu dropdown-menu-end py-0"
                            :class="{ show: dropdownOpen }"
                        >
                            <li>
                                <a :href="`/profile`" class="dropdown-item">
                                    <div class="d-flex py-1">
                                        <div
                                            class="d-flex flex-column justify-content-center"
                                        >
                                            <span>Perfil</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div class="dropdown-item" @click="logout">
                                    <div class="d-flex py-1">
                                        <div
                                            class="d-flex flex-column justify-content-center"
                                        >
                                            <span>Cerrar sesión</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    const emit = defineEmits([
        'toggleAside',
        'toggleDropdown',
        'logout',
        'setDropdownRef',
    ]);

    defineProps({
        isAsideVisible: Boolean,
        isMobile: Boolean,
        dropdownOpen: Boolean,
        dropdownRef: Object,
    });

    const route = useRoute();

    const pageName = ref('');
    const pageSubname = ref('');

    const setPageName = () => {
        const parentRouteName =
            route.matched.length > 2
                ? route.matched[route.matched.length - 2].name
                : route.matched[1]?.name;

        switch (parentRouteName) {
            case 'dashboard':
                pageName.value = 'Dashboard';
                break;

            case 'activities':
                pageName.value = 'Actividades';
                break;

            case 'instructors':
                pageName.value = 'Instructores';
                break;

            case 'students':
                pageName.value = 'Estudiantes';
                break;

            case 'locations':
                pageName.value = 'Ubicaciones';
                break;

            case 'enroll':
                pageName.value = 'Inscripciones';
                break;

            case 'profile':
                pageName.value = 'Perfil';
                break;

            default:
                pageName.value = '';
                break;
        }
    };

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

            case 'instructors-list':
                pageSubname.value = 'Listar';
                break;

            case 'instructors-create':
                pageSubname.value = 'Crear';
                break;

            case 'instructors-detail':
                pageSubname.value = 'Detalle';
                break;

            case 'students-list':
                pageSubname.value = 'Listar';
                break;

            case 'students-create':
                pageSubname.value = 'Crear';
                break;

            case 'students-detail':
                pageSubname.value = 'Detalle';
                break;

            case 'locations-list':
                pageSubname.value = 'Listar';
                break;

            case 'locations-create':
                pageSubname.value = 'Crear';
                break;

            case 'locations-detail':
                pageSubname.value = 'Detalle';
                break;

            case 'enroll-create':
                pageSubname.value = 'Inscribir';
                break;

            default:
                pageSubname.value = '';
                break;
        }
    };

    watch(
        () => route.fullPath,
        () => {
            setPageName();
            setPageSubname();
        },
        { immediate: true }
    );

    const toggleAside = () => {
        emit('toggleAside');
    };

    const toggleDropdown = () => {
        emit('toggleDropdown');
    };

    const logout = () => {
        emit('logout');
    };

    const setDropdownRef = (el) => {
        if (el) {
            emit('setDropdownRef', el);
        }
    };
</script>
