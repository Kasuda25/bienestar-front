<template>
    <transition name="slide-left">
        <aside
            class="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 bg-white my-2"
            id="sidenav-main"
            v-if="isAsideVisible"
        >
            <div class="sidenav-header">
                <button
                    class="btn mb-0 mt-1 me-1 end-0 position-absolute"
                    @click="toggleAside"
                    v-if="isAsideVisible && isMobile"
                >
                    <i class="fas fa-times"></i>
                </button>
                <a class="navbar-brand text-center px-4 py-3 m-0" :href="`/`">
                    <img
                        src="../../assets/img/logo-ct-dark.png"
                        class="navbar-brand-img"
                        alt="main_logo"
                    />
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
                            v-slot="{ navigate, href, isActive }"
                            custom
                        >
                            <a
                                :href="href"
                                :class="[
                                    'nav-link cursor-pointer',
                                    isActive
                                        ? 'active bg-dark text-white'
                                        : 'text-dark',
                                ]"
                                @click.prevent="
                                    toggleAside();
                                    navigate();
                                "
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
                            v-slot="{ navigate, href, isActive }"
                            custom
                        >
                            <a
                                :href="href"
                                :class="[
                                    'nav-link cursor-pointer',
                                    isActive
                                        ? 'active bg-dark text-white'
                                        : 'text-dark',
                                ]"
                                @click.prevent="
                                    toggleAside();
                                    navigate();
                                "
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
                    <li v-if="authStore.user.rol === 'ADMIN'" class="nav-item">
                        <RouterLink
                            to="/instructors"
                            v-slot="{ navigate, href, isActive }"
                            custom
                        >
                            <a
                                :href="href"
                                :class="[
                                    'nav-link cursor-pointer',
                                    isActive
                                        ? 'active bg-dark text-white'
                                        : 'text-dark',
                                ]"
                                @click.prevent="
                                    toggleAside();
                                    navigate();
                                "
                            >
                                <i class="material-symbols-rounded opacity-5"
                                    >group</i
                                >
                                <span class="nav-link-text ms-1"
                                    >Instructores</span
                                >
                            </a>
                        </RouterLink>
                    </li>
                    <li
                        v-if="
                            authStore.user.rol === 'ADMIN' ||
                            authStore.user.rol === 'INSTRUCTOR'
                        "
                        class="nav-item"
                    >
                        <RouterLink
                            to="/students"
                            custom
                            v-slot="{ navigate, href, isActive }"
                        >
                            <a
                                :href="href"
                                :class="[
                                    'nav-link cursor-pointer',
                                    isActive
                                        ? 'active bg-dark text-white'
                                        : 'text-dark',
                                ]"
                                @click.prevent="
                                    toggleAside();
                                    navigate();
                                "
                            >
                                <i class="material-symbols-rounded opacity-5"
                                    >groups</i
                                >
                                <span class="nav-link-text ms-1"
                                    >Estudiantes</span
                                >
                            </a>
                        </RouterLink>
                    </li>
                    <li v-if="authStore.user.rol === 'ADMIN'" class="nav-item">
                        <RouterLink
                            to="/locations"
                            custom
                            v-slot="{ navigate, href, isActive }"
                        >
                            <a
                                :href="href"
                                :class="[
                                    'nav-link cursor-pointer',
                                    isActive
                                        ? 'active bg-dark text-white'
                                        : 'text-dark',
                                ]"
                                @click.prevent="
                                    toggleAside();
                                    navigate();
                                "
                            >
                                <i class="material-symbols-rounded opacity-5"
                                    >location_on</i
                                >
                                <span class="nav-link-text ms-1"
                                    >Ubicaciones</span
                                >
                            </a>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            to="/enroll"
                            custom
                            v-slot="{ navigate, href, isActive }"
                        >
                            <a
                                :href="href"
                                :class="[
                                    'nav-link cursor-pointer',
                                    isActive
                                        ? 'active bg-dark text-white'
                                        : 'text-dark',
                                ]"
                                @click.prevent="
                                    toggleAside();
                                    navigate();
                                "
                            >
                                <i class="material-symbols-rounded opacity-5"
                                    >how_to_reg</i
                                >
                                <span class="nav-link-text ms-1"
                                    >Inscripciones</span
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
                        <RouterLink
                            to="/profile"
                            v-slot="{ navigate, href, isActive }"
                            custom
                        >
                            <a
                                :href="href"
                                :class="[
                                    'nav-link cursor-pointer',
                                    isActive
                                        ? 'active bg-dark text-white'
                                        : 'text-dark',
                                ]"
                                @click.prevent="
                                    toggleAside();
                                    navigate();
                                "
                            >
                                <i class="material-symbols-rounded opacity-5"
                                    >account_circle</i
                                >
                                <span class="nav-link-text ms-1">Perfil</span>
                            </a>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <div
                            class="nav-link text-dark cursor-pointer"
                            @click="logout"
                        >
                            <i class="material-symbols-rounded opacity-5"
                                >logout</i
                            >
                            <span class="nav-link-text ms-1"
                                >Cerrar sesión</span
                            >
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    </transition>
</template>

<script setup>
    import { useAuthStore } from '@/stores/auth';

    const emit = defineEmits(['toggleAside']);

    defineProps({
        isAsideVisible: Boolean,
        isMobile: Boolean,
    });

    const authStore = useAuthStore();

    const toggleAside = () => {
        emit('toggleAside');
    };

    const logout = () => {
        emit('logout');
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
        z-index: 1049;
    }
</style>
