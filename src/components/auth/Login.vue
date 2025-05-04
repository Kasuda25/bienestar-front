<template>
    <div class="main-content mt-0">
        <div
            class="page-header align-items-start min-vh-100 min-vw-100"
            style="
                background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
            "
        >
            <span class="mask bg-gradient-dark opacity-6"></span>
            <div class="container my-auto">
                <div class="row">
                    <div class="col-lg-4 col-md-8 col-12 mx-auto">
                        <div class="card z-index-0 fadeIn3 fadeInBottom">
                            <div
                                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
                            >
                                <div
                                    class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1"
                                >
                                    <h4
                                        class="text-white font-weight-bolder text-center mt-2 mb-0"
                                    >
                                        Iniciar sesión
                                    </h4>
                                    <div class="row mt-3">
                                        <div class="col-2 text-center ms-auto">
                                            <a
                                                class="btn btn-link px-3"
                                                href="javascript:;"
                                            >
                                                <i
                                                    class="fa fa-facebook text-white text-lg"
                                                ></i>
                                            </a>
                                        </div>
                                        <div class="col-2 text-center px-1">
                                            <a
                                                class="btn btn-link px-3"
                                                href="javascript:;"
                                            >
                                                <i
                                                    class="fa fa-github text-white text-lg"
                                                ></i>
                                            </a>
                                        </div>
                                        <div class="col-2 text-center me-auto">
                                            <a
                                                class="btn btn-link px-3"
                                                href="javascript:;"
                                            >
                                                <i
                                                    class="fa fa-google text-white text-lg"
                                                ></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <form role="form" class="text-start">
                                    <div class="form-group my-3">
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="inputEmail"
                                            v-model="props.loginData.email"
                                            placeholder=" "
                                            :class="{
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .email,
                                            }"
                                        />
                                        <label
                                            class="form-label"
                                            for="inputEmail"
                                            :class="{
                                                'invalid-feedback-fix':
                                                    props.validationErrorStatus
                                                        .email,
                                            }"
                                            >Correo</label
                                        >
                                        <div class="invalid-feedback">
                                            {{
                                                props.validationErrorMessage
                                                    .email
                                            }}
                                        </div>
                                    </div>
                                    <div class="form-group mb-3">
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="inputPassword"
                                            v-model="props.loginData.password"
                                            placeholder=" "
                                            :class="{
                                                'is-invalid':
                                                    props.validationErrorStatus
                                                        .password,
                                            }"
                                            @keyup.enter="login"
                                        />
                                        <label
                                            class="form-label"
                                            for="inputPassword"
                                            :class="{
                                                'invalid-feedback-fix':
                                                    props.validationErrorStatus
                                                        .password,
                                            }"
                                            >Contraseña</label
                                        >
                                        <div class="invalid-feedback">
                                            {{
                                                props.validationErrorMessage
                                                    .password
                                            }}
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button
                                            v-if="!isLoading"
                                            type="button"
                                            class="btn bg-gradient-dark w-100 my-4 mb-2"
                                            @click="login"
                                        >
                                            Iniciar sesión
                                        </button>
                                        <button
                                            v-if="isLoading"
                                            type="button"
                                            class="btn bg-gradient-dark w-100 my-4 mb-2"
                                        >
                                            <div
                                                class="spinner-border spinner-border-sm"
                                                role="status"
                                            >
                                                <span class="visually-hidden"
                                                    >Loading...</span
                                                >
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer position-absolute bottom-2 py-2 w-100">
                <div class="container">
                    <div
                        class="row align-items-center justify-content-lg-center"
                    >
                        <div class="col-12 my-auto">
                            <div
                                class="copyright text-center text-lg-center text-sm text-white"
                            >
                                © 2025
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits();
    const props = defineProps({
        loginData: Object,
        validationErrorStatus: Object,
        validationErrorMessage: Object,
        isLoading: Boolean,
    });

    const login = () => {
        emit('login');
    };
</script>

<style scoped>
    .form-group {
        position: relative;
        margin-top: 20px;
    }

    .form-control {
        padding: 10px 10px 10px 12px;
        font-size: 16px;
    }

    .form-label {
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
        background: white;
        padding: 0 5px;
        color: gray;
        transition: 0.3s ease-in-out;
        pointer-events: none;
    }

    .invalid-feedback-fix {
        transform: translateY(-110%);
    }

    .form-control:focus + label,
    .form-control:not(:placeholder-shown) + label {
        top: 0;
        transform: translateY(-50%);
        font-size: 12px;
    }

    .form-control:focus {
        border-color: #007bff;
        outline: none;
    }

    .form-control.is-invalid {
        border-color: #dc3545;
    }

    .invalid-feedback {
        display: block;
        font-size: 14px;
        color: #dc3545;
        margin-top: 5px;
    }
</style>
