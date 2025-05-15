import '@/assets/css/nucleo-icons.css';
import '@/assets/css/nucleo-svg.css';
import '@/assets/css/material-dashboard.css';
import '@/assets/fonts/fontawesome/css/all.min.css';
import '@/assets/css/style.css';
import '@/assets/js/core/popper.min.js';
import '@/assets/js/core/bootstrap.min.js';
import '@/assets/js/plugins/perfect-scrollbar.min.js';
import '@/assets/js/material-dashboard.min.js';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { SnackbarService } from 'vue3-snackbar';
import 'vue3-snackbar/styles';

import App from '@/App.vue';
import router from '@/router';
import { setupInterceptors } from '@/services/useAxios';
import AuthService from '@/services/useAuth';
import LocalStorage from '@/services/useLocalStorage';

// async function initLogin() {
//     const rtoken = localStorage.getItem('rtoken');

// if (rtoken) {
//     await AuthService.autoLogin(rtoken)
//         .then((response) => {
//             if (response) {
//                 LocalStorage.createSession();
//             }
//         })
//         .catch((error) => {
//             if (error) {
//                 LocalStorage.endSession();
//             }
//         });
// }
// }

// const app = createApp(App);

// setupInterceptors(router);

// app.use(createPinia());
// app.use(SnackbarService);
// app.use(router);

// initLogin();

// app.mount('#app');

async function initApp() {
    const app = createApp(App);

    app.use(createPinia());
    app.use(SnackbarService);

    const rtoken = localStorage.getItem('rtoken');

    if (rtoken) {
        await AuthService.autoLogin(rtoken)
            .then((response) => {
                if (response) {
                    LocalStorage.createSession();
                }
            })
            .catch((error) => {
                if (error) {
                    LocalStorage.endSession();
                }
            });
    }

    setupInterceptors(router);
    app.use(router);

    app.mount('#app');
}

initApp();
