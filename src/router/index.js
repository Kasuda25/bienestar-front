import { createRouter, createWebHistory } from 'vue-router';
import activitiesRoutes from './activities.routes.js';
import instructorsRoutes from './instructors.routes.js';
import studentsRoutes from './students.routes.js';
import locationsRoutes from './locations.routes.js';

const routes = [
    // {
    //     path: '/',
    //     redirect: '/login',
    // },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
    },
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/DashboardView.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@/views/profile/ProfileView.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: 'activities',
                name: 'activities',
                component: () =>
                    import('@/views/activities/ActivitiesView.vue'),
                meta: { requiresAuth: true },
                children: activitiesRoutes,
            },
            {
                path: 'instructors',
                name: 'instructors',
                component: () =>
                    import('@/views/instructors/InstructorsView.vue'),
                meta: { requiresAuth: true },
                children: instructorsRoutes,
            },
            {
                path: 'students',
                name: 'students',
                component: () => import('@/views/students/StudentsView.vue'),
                meta: { requiresAuth: true },
                children: studentsRoutes,
            },
            {
                path: 'locations',
                name: 'locations',
                component: () => import('@/views/locations/LocationsView.vue'),
                meta: { requiresAuth: true },
                children: locationsRoutes,
            },
        ],
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

    // if (to.path === '/login' && authStore.isAuth) {
    //     return next('/dashboard');
    // }

    if (to.meta.requiresAuth && !authStore.isAuth) {
        return next('/login');
    }

    if (to.path === '/activities' && authStore.user.rol !== 'ADMIN') {
        return next('/dashboard');
    }

    if (to.path === '/instructors' && authStore.user.rol !== 'ADMIN') {
        return next('/dashboard');
    }

    if (to.path === '/students/create' && authStore.user.rol !== 'ADMIN') {
        return next('/dashboard');
    }

    if (to.path === '/students' && authStore.user.rol == 'STUDENT') {
        return next('/dashboard');
    }

    next();
});

export default router;
