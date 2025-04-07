<template>
    <transition name="slide-left">
        <aside
            class="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 bg-white my-2 z-index-1032"
            id="sidenav-main" v-show="isAsideVisible">
            <div class="sidenav-header">
                <button class="btn btn-secondary mb-0 mt-1 me-1 end-0 position-absolute" @click="toggleAside"
                    v-if="isAsideVisible && isMobile">
                    <i class="fas fa-times"></i>
                </button>
                <a class="navbar-brand px-4 py-3 m-0"
                    href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
                    <img src="../../assets/img/logo-ct-dark.png" class="navbar-brand-img" width="26" height="26"
                        alt="main_logo">
                    <span class="ms-1 text-sm text-dark">Creative Tim</span>
                </a>
            </div>
            <hr class="horizontal dark mt-0 mb-2">
            <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active bg-dark text-white" href="../pages/dashboard.html">
                            <i class="material-symbols-rounded opacity-5">dashboard</i>
                            <span class="nav-link-text ms-1">Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="../pages/tables.html">
                            <i class="material-symbols-rounded opacity-5">table_view</i>
                            <span class="nav-link-text ms-1">Tables</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="../pages/billing.html">
                            <i class="material-symbols-rounded opacity-5">receipt_long</i>
                            <span class="nav-link-text ms-1">Billing</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="../pages/virtual-reality.html">
                            <i class="material-symbols-rounded opacity-5">view_in_ar</i>
                            <span class="nav-link-text ms-1">Virtual Reality</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="../pages/rtl.html">
                            <i class="material-symbols-rounded opacity-5">format_textdirection_r_to_l</i>
                            <span class="nav-link-text ms-1">RTL</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="../pages/notifications.html">
                            <i class="material-symbols-rounded opacity-5">notifications</i>
                            <span class="nav-link-text ms-1">Notifications</span>
                        </a>
                    </li>
                    <li class="nav-item mt-3">
                        <h6 class="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5">Account
                            pages
                        </h6>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="../pages/profile.html">
                            <i class="material-symbols-rounded opacity-5">person</i>
                            <span class="nav-link-text ms-1">Profile</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="../pages/sign-in.html">
                            <i class="material-symbols-rounded opacity-5">login</i>
                            <span class="nav-link-text ms-1">Sign In</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="../pages/sign-up.html">
                            <i class="material-symbols-rounded opacity-5">assignment</i>
                            <span class="nav-link-text ms-1">Sign Up</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    </transition>
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <!-- Navbar -->
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl" id="navbarBlur"
            data-scroll="true">
            <div class="container-fluid py-1 pe-3 ps-0">
                <button class="btn btn-secondary mb-0 me-3 sidebar-button" @click="toggleAside" v-if="isMobile">
                    <i class="fas fa-bars"></i>
                </button>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Pages</a>
                        </li>
                        <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>
                <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <ul
                        class="navbar-nav d-flex align-items-center d-flex justify-content-end ms-md-auto pe-md-3 pe-lg-0">
                        <li class="nav-item dropdown d-flex align-items-center" ref="dropdownRef">
                            <a class="nav-link" href="javascript:;" @click="toggleDropdown">
                                <i class="material-symbols-rounded">account_circle</i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" :class="{ show: dropdownOpen }">
                                <li class="mb-2">
                                    <div class="dropdown-item border-radius-md">
                                        <div class="d-flex py-1">
                                            <div class="d-flex flex-column justify-content-center">
                                                <span>Perfil</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown-item border-radius-md" @click="logOut">
                                        <div class="d-flex py-1">
                                            <div class="d-flex flex-column justify-content-center">
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
        <!-- End Navbar -->
        <div class="container-fluid py-2">
            <div class="row">
                <div class="ms-3">
                    <h3 class="mb-0 h4 font-weight-bolder">Dashboard</h3>
                    <p class="mb-4">
                        Check the sales, value and bounce rate by country.
                    </p>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
                    <div class="card">
                        <div class="card-header pb-0">
                            <div class="row">
                                <div class="col-lg-6 col-7">
                                    <h5 class="mb-0 mt-2">Actividades</h5>
                                </div>
                                <div class="col-lg-6 col-5 my-auto text-end">
                                    <button class="btn btn-secondary">Crear</button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body px-0 pb-2">
                            <div class="table-responsive">
                                <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Nombre</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Fecha</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Hora</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Ubicación</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                Instructor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="!actividades">
                                            <td colspan="5" class="text-center">
                                                <div class="d-flex justify-content-center">
                                                    <div class="spinner-border" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr v-if="actividades" v-for="item in actividades" :key="item">
                                            <td>
                                                <div class="d-flex px-2 py-1">
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm">{{ item.nombre }}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="align-middle text-sm">
                                                <span class="text-xs font-weight-bold">{{ new
                                                    Date(item.fechaInicio).toLocaleDateString('es-ES') }} - {{ new
                                                        Date(item.fechaFin).toLocaleDateString('es-ES') }}</span>
                                            </td>
                                            <td class="align-middle text-sm">
                                                <span class="text-xs font-weight-bold">{{ item.horaInicio.slice(0, 5) }}
                                                    - {{ item.horaFin.slice(0, 5) }}</span>
                                            </td>
                                            <td class="align-middle text-sm">
                                                <span class="text-xs font-weight-bold">{{ item.ubicacion }}</span>
                                            </td>
                                            <td class="align-middle text-sm">
                                                <span class="text-xs font-weight-bold">{{ item.instructor.nombre.nombre
                                                }} {{ item.instructor.nombre.apellido }}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="card h-100">
                        <div class="card-header pb-0">
                            <h6>Orders overview</h6>
                            <p class="text-sm">
                                <i class="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                <span class="font-weight-bold">24%</span> this month
                            </p>
                        </div>
                        <div class="card-body p-3">
                            <div class="timeline timeline-one-side">
                                <div class="timeline-block mb-3">
                                    <span class="timeline-step">
                                        <i class="material-symbols-rounded text-success text-gradient">notifications</i>
                                    </span>
                                    <div class="timeline-content">
                                        <h6 class="text-dark text-sm font-weight-bold mb-0">$2400, Design changes</h6>
                                        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">22 DEC 7:20 PM</p>
                                    </div>
                                </div>
                                <div class="timeline-block mb-3">
                                    <span class="timeline-step">
                                        <i class="material-symbols-rounded text-danger text-gradient">code</i>
                                    </span>
                                    <div class="timeline-content">
                                        <h6 class="text-dark text-sm font-weight-bold mb-0">New order #1832412</h6>
                                        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 11 PM</p>
                                    </div>
                                </div>
                                <div class="timeline-block mb-3">
                                    <span class="timeline-step">
                                        <i class="material-symbols-rounded text-info text-gradient">shopping_cart</i>
                                    </span>
                                    <div class="timeline-content">
                                        <h6 class="text-dark text-sm font-weight-bold mb-0">Server payments for April
                                        </h6>
                                        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 9:34 PM</p>
                                    </div>
                                </div>
                                <div class="timeline-block mb-3">
                                    <span class="timeline-step">
                                        <i class="material-symbols-rounded text-warning text-gradient">credit_card</i>
                                    </span>
                                    <div class="timeline-content">
                                        <h6 class="text-dark text-sm font-weight-bold mb-0">New card added for order
                                            #4395133</h6>
                                        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">20 DEC 2:20 AM</p>
                                    </div>
                                </div>
                                <div class="timeline-block mb-3">
                                    <span class="timeline-step">
                                        <i class="material-symbols-rounded text-primary text-gradient">key</i>
                                    </span>
                                    <div class="timeline-content">
                                        <h6 class="text-dark text-sm font-weight-bold mb-0">Unlock packages for
                                            development</h6>
                                        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">18 DEC 4:54 AM</p>
                                    </div>
                                </div>
                                <div class="timeline-block">
                                    <span class="timeline-step">
                                        <i class="material-symbols-rounded text-dark text-gradient">payments</i>
                                    </span>
                                    <div class="timeline-content">
                                        <h6 class="text-dark text-sm font-weight-bold mb-0">New order #9583120</h6>
                                        <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">17 DEC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer py-4  ">
                <div class="container-fluid">
                    <div class="row align-items-center justify-content-lg-between">
                        <div class="col-lg-6 mb-lg-0 mb-4">
                            <div class="copyright text-center text-sm text-muted text-lg-start">
                                © 2025
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits()
const props = defineProps({
    actividades: Array
})

const isAsideVisible = ref(true)
const isMobile = ref(false)
const dropdownOpen = ref(false)
const dropdownRef = ref(null)
const isLoading = ref(false)

const toggleAside = () => {
    isAsideVisible.value = !isAsideVisible.value
}

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value
}

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        dropdownOpen.value = false
    }
}

const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 1200
    if (isMobile.value) {
        isAsideVisible.value = false
    } else {
        isAsideVisible.value = true
    }
}

const logOut = () => {
    emit('logOut')
}

onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize)

    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scope>
.slide-left-enter-active,
.slide-left-leave-active {
    transition: transform 0.2s ease, opacity 0.2s ease;
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