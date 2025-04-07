import { createRouter, createWebHistory } from 'vue-router';
import activitiesRoutes from './activities.routes.js';

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/LoginView.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/DashboardView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/activities',
        component: () => import('../views/activities/ActivitiesView.vue'),
        meta: { requiresAuth: true },
        children: activitiesRoutes,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const { useAuthStore } = await import('../stores/auth');
    const authStore = useAuthStore();

    if (to.path === '/') {
        return next(authStore.isAuth ? '/dashboard' : '/login');
    }

    if (to.path === '/login' && authStore.isAuth) {
        return next('/dashboard');
    }

    if (to.meta.requiresAuth && !authStore.isAuth) {
        return next('/login');
    }

    next();
});

export default router;
