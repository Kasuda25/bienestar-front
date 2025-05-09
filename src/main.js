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

const app = createApp(App);

setupInterceptors(router);

app.use(createPinia());
app.use(SnackbarService);
app.use(router);

app.mount('#app');
