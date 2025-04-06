import { createRouter, createWebHistory } from 'vue-router'

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
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 👇 Esto se ejecuta cuando ya Pinia está montado
router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('../stores/auth')
  const authStore = useAuthStore()

  if (to.path === '/') {
    return next(authStore.isAuth ? '/dashboard' : '/login')
  }

  if (to.path === '/login') {
    return next(authStore.isAuth ? '/dashboard' : true)
  }

  if (to.path === '/dashboard') {
    return next(authStore.isAuth ? true : '/login')
  }

  next()
})

export default router
