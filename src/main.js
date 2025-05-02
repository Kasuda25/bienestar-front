import './style.css';
import './assets/fonts/fontawesome/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { SnackbarService } from 'vue3-snackbar';
import 'vue3-snackbar/styles';

import App from './App.vue';
import router from './router';
import instance, { setupInterceptors } from './services/useAxios';

const app = createApp(App);

setupInterceptors(router);

app.use(createPinia());
app.use(SnackbarService);
app.use(router);

app.mount('#app');
