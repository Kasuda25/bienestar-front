<template>
    <nav
        class="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl"
        id="navbarBlur"
        data-scroll="true"
    >
        <div class="container-fluid py-1 pe-3 ps-0">
            <button
                class="btn btn-secondary mb-0 me-3 sidebar-button"
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
                            class="dropdown-menu dropdown-menu-end"
                            :class="{ show: dropdownOpen }"
                        >
                            <li class="mb-2">
                                <div class="dropdown-item border-radius-md">
                                    <div class="d-flex py-1">
                                        <div
                                            class="d-flex flex-column justify-content-center"
                                        >
                                            <span>Perfil</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div
                                    class="dropdown-item border-radius-md"
                                    @click="logOut"
                                >
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
    const emit = defineEmits([
        'toggleAside',
        'toggleDropdown',
        'logOut',
        'setDropdownRef',
    ]);
    const props = defineProps({
        pageName: String,
        pageSubname: String,
        isAsideVisible: Boolean,
        isMobile: Boolean,
        dropdownOpen: Boolean,
        dropdownRef: Object,
    });

    const toggleAside = () => {
        emit('toggleAside');
    };

    const toggleDropdown = () => {
        emit('toggleDropdown');
    };

    const logOut = () => {
        emit('logOut');
    };

    const setDropdownRef = (el) => {
        if (el) {
            emit('setDropdownRef', el);
        }
    };
</script>
