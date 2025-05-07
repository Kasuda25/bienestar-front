import { createRouter, createWebHistory } from 'vue-router';
import activitiesRoutes from './activities.routes.js';
import instructorsRoutes from './instructors.routes.js';

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/ProfileView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/activities',
        name: 'activities',
        component: () => import('@/views/activities/ActivitiesView.vue'),
        meta: { requiresAuth: true, role: 'ADMIN' },
        children: activitiesRoutes,
    },
    {
        path: '/instructors',
        name: 'instructors',
        component: () => import('@/views/instructors/InstructorsView.vue'),
        meta: { requiresAuth: true, role: 'ADMIN' },
        children: instructorsRoutes,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
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

    if (to.path === '/activities' || to.path === '/instructors' && authStore.user.rol !== to.meta.role) {
        return next('/dashboard');
    }

    next();
});

export default router;
