import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const LAYOUT = {
  app: 'app',
  bare: 'bare',
} as const

export type LayoutName = typeof LAYOUT[keyof typeof LAYOUT]

declare module 'vue-router' {
  interface RouteMeta {
    layout?: LayoutName
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'today',
    component: () => import('../pages/TodayPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../pages/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
