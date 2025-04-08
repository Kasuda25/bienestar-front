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
        <router-view :actividades="items" />
        <Footer />
    </main>
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    import Sidebar from '../../components/Sidebar.vue';
    import Navbar from '../../components/Navbar.vue';
    import Footer from '../../components/Footer.vue';

    import ActividadesServices from '../../services/useActividades';

    const route = useRoute();
    const pageSubname = ref('');
    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const isAsideVisible = ref(true);
    const isMobile = ref(false);
    const items = ref();

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

        items.value = await ActividadesServices.getActividades();
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
</script>
