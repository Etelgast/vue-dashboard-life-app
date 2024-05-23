import { api } from '@/entities/Session/api'
import { useSessionStore } from '@/entities/Session/model/stores'
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw
} from 'vue-router'

const checkAuthSession = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  let isAuth = false
  const sessionStore = useSessionStore()
  await api.getUserSession()

  if (sessionStore.user && !isAuth) {
    isAuth = true
    next()
  } else if (!sessionStore.user && !isAuth) {
    isAuth = true
    next({ name: 'login' })
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/HomePage.vue'),
    beforeEnter: checkAuthSession
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/LoginPage.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/account/AccountPage.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/pages/calendar/CalendarPage.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/pages/map/MapPage.vue')
  },
  {
    path: '/statistic',
    name: 'statistic',
    component: () => import('@/pages/statistic/StatisticPage.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/pages/settings/SettingsPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
