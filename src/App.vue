<template>
    <router-view />
    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
</template>

<script setup>
    // import { onBeforeMount } from 'vue';
    import { Vue3Snackbar } from 'vue3-snackbar';
    // import { useSnackbar } from 'vue3-snackbar';

    // import AuthService from '@/services/useAuth';
    // import LocalStorage from '@/services/useLocalStorage';

    // const snackbar = new useSnackbar();

    // const rtoken = localStorage.getItem('rtoken');

    // onBeforeMount(async () => {
    //     if (rtoken) {
    //         await AuthService.autoLogin(rtoken)
    //             .then((response) => {
    //                 if (response) {
    //                     LocalStorage.createSession();
    //                 }
    //             })
    //             .catch((error) => {
    //                 if (error) {
    //                     let message =
    //                         'Ha ocurrido un error al obtener al autenticarse. Por favor vuelve a iniciar sesión.';

    //                     if (
    //                         error.type === 'backend' ||
    //                         error.type === 'network' ||
    //                         error.type === 'unknown'
    //                     ) {
    //                         message = error.message;
    //                     }

    //                     snackbar.add({
    //                         type: 'error',
    //                         text: message,
    //                     });

    //                     LocalStorage.endSession();
    //                 }
    //             });
    //     }
    // });
</script>
