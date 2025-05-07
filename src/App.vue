<template>
    <div class="bg-gray-100 vh-100">
        <Sidebar
            v-if="!isLogin"
            :isAsideVisible="isAsideVisible"
            :isMobile="isMobile"
            @toggleAside="toggleAside"
        />
        <main
            class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
        >
            <Navbar
                :class="[isLogin ? 'd-none' : '']"
                :pageName="pageName"
                :pageSubname="pageSubname"
                :isAsideVisible="isAsideVisible"
                :isMobile="isMobile"
                :dropdownOpen="dropdownOpen"
                @toggleAside="toggleAside"
                @toggleDropdown="toggleDropdown"
                @logout="logout"
                @setDropdownRef="(el) => (dropdownRef = el)"
            />
            <router-view />
            <Footer v-if="!isLogin" />
        </main>
        <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
    </div>
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { Vue3Snackbar } from 'vue3-snackbar';

    import LocalStorage from '@/services/useLocalStorage';

    import Sidebar from '@/components/shared/Sidebar.vue';
    import Navbar from '@/components/shared/Navbar.vue';
    import Footer from '@/components/shared/Footer.vue';

    const route = useRoute();
    const router = useRouter();

    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const isAsideVisible = ref(true);
    const isMobile = ref(false);

    const isLogin = ref(false);

    const pageName = ref('');
    const pageSubname = ref('');

    const isLoginView = () => {
        if (route.name === 'login') {
            isLogin.value = true;
            return;
        } else {
            isLogin.value = false;
        }
    };

    watch(
        () => route.name,
        () => {
            isLoginView();
        },
        { immediate: true }
    );

    onMounted(() => {
        isLogin.value = true;
        LocalStorage.restoreSession();

        document.addEventListener('click', handleClickOutside);
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('resize', checkScreenSize);
    });

    const setPageName = () => {
        const parentRouteName =
            route.matched.length > 1
                ? route.matched[route.matched.length - 2].name
                : route.matched[0]?.name;

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
        if (isMobile.value) {
            isAsideVisible.value = !isAsideVisible.value;
        }
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

    const logout = () => {
        LocalStorage.endSession();

        router.push({ name: 'login' });
    };
</script>

<style scoped></style>
