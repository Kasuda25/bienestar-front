<template>
    <transition name="slide-left">
        <aside
            class="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 bg-white my-2 z-index-1032"
            id="sidenav-main"
            v-show="isAsideVisible"
        >
            <div class="sidenav-header">
                <button
                    class="btn btn-secondary mb-0 mt-1 me-1 end-0 position-absolute"
                    @click="toggleAside"
                    v-if="isAsideVisible && isMobile"
                >
                    <i class="fas fa-times"></i>
                </button>
                <a
                    class="navbar-brand px-4 py-3 m-0"
                    href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
                    target="_blank"
                >
                    <img
                        src="../assets/img/logo-ct-dark.png"
                        class="navbar-brand-img"
                        width="26"
                        height="26"
                        alt="main_logo"
                    />
                    <span class="ms-1 text-sm text-dark">Creative Tim</span>
                </a>
            </div>
            <hr class="horizontal dark mt-0 mb-2" />
            <div
                class="collapse navbar-collapse w-auto"
                id="sidenav-collapse-main"
            >
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink
                            to="/dashboard"
                            v-slot="{ isActive, navigate }"
                            custom
                        >
                            <a
                                :class="[
                                    'nav-link cursor-pointer',
                                    isActive
                                        ? 'active bg-dark text-white'
                                        : 'text-dark',
                                ]"
                                @click="navigate"
                            >
                                <i class="material-symbols-rounded opacity-5"
                                    >dashboard</i
                                >
                                <span class="nav-link-text ms-1"
                                    >Dashboard</span
                                >
                            </a>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            to="/activities"
                            v-slot="{ isActive, navigate }"
                            custom
                        >
                            <a
                                :class="[
                                    'nav-link cursor-pointer',
                                    isActive
                                        ? 'active bg-dark text-white'
                                        : 'text-dark',
                                ]"
                                @click="navigate"
                            >
                                <i class="material-symbols-rounded opacity-5"
                                    >task</i
                                >
                                <span class="nav-link-text ms-1"
                                    >Actividades</span
                                >
                            </a>
                        </RouterLink>
                    </li>
                    <li class="nav-item mt-3">
                        <h6
                            class="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5"
                        >
                            Cuenta
                        </h6>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="">
                            <i class="material-symbols-rounded opacity-5"
                                >person</i
                            >
                            <span class="nav-link-text ms-1">Perfil</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    </transition>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';

    const emit = defineEmits();
    const props = defineProps({
        isAsideVisible: Boolean,
        isMobile: Boolean,
    });

    const mainUrl = ref(import.meta.env.VITE_MAIN_URL);

    const toggleAside = () => {
        emit('toggleAside');
    };
</script>

<style scope>
    .slide-left-enter-active,
    .slide-left-leave-active {
        transition:
            transform 0.2s ease,
            opacity 0.2s ease;
    }

    .slide-left-enter-from {
        transform: translateX(-100%);
        opacity: 0;
    }

    .slide-left-enter-to {
        transform: translateX(0%);
        opacity: 1;
    }

    .slide-left-leave-from {
        transform: translateX(0%);
        opacity: 1;
    }

    .slide-left-leave-to {
        transform: translateX(-100%);
        opacity: 0;
    }

    .sidebar-button {
        z-index: 2000;
    }
</style>
