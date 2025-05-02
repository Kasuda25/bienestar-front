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
            pageName="Dashboard"
            :isAsideVisible="isAsideVisible"
            :isMobile="isMobile"
            :dropdownOpen="dropdownOpen"
            @toggleAside="toggleAside"
            @toggleDropdown="toggleDropdown"
            @logOut="logOut"
            @setDropdownRef="(el) => (dropdownRef = el)"
        />
        <Dashboard
            :actividades="items"
            :isAsideVisible="isAsideVisible"
            :isMobile="isMobile"
        />
        <Footer />
    </main>
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import Sidebar from '../../components/shared/Sidebar.vue';
    import Navbar from '../../components/shared/Navbar.vue';
    import Footer from '../../components/shared/Footer.vue';
    import Dashboard from '../../components/dashboard/Dashboard.vue';

    import ActividadesServices from '../../services/useActividades';
    import LocalStorage from '../../services/useLocalStorage';

    const router = useRouter();

    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const isAsideVisible = ref(true);
    const isMobile = ref(false);
    const items = ref();

    onMounted(async () => {
        document.addEventListener('click', handleClickOutside);
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        items.value = await ActividadesServices.getActividades();
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('resize', checkScreenSize);
    });

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
