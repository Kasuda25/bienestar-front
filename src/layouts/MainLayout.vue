<template>
    <div class="bg-gray-100 min-vh-100 d-flex flex-column">
        <Sidebar
            :isAsideVisible="isAsideVisible"
            :isMobile="isMobile"
            @toggleAside="toggleAside"
            @logout="logout"
        />
        <main
            class="main-content flex-grow-1 position-relative border-radius-lg"
        >
            <Navbar
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
            <Footer />
        </main>
    </div>
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

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
