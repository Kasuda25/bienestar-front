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
            :pageName="pageName"
            :pageSubname="pageSubname"
            :isAsideVisible="isAsideVisible"
            :isMobile="isMobile"
            :dropdownOpen="dropdownOpen"
            @toggleAside="toggleAside"
            @toggleDropdown="toggleDropdown"
            @logOut="logOut"
            @setDropdownRef="(el) => (dropdownRef = el)"
        />
        <router-view />
        <Footer />
    </main>
    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
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

    const pageName = ref('');
    const pageSubname = ref('');

    onMounted(() => {
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
            case 'activities':
                pageName.value = 'Actividades';
                break;

            case 'dashboard':
                pageName.value = 'Dashboard';
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
</script>

<style scoped></style>
