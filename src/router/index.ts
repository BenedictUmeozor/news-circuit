import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/page/:page',
      name: 'page',
      component: () => import('../views/PageView.vue'),
      props: true,
    },
    {
      path: '/category/:category',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
      props: true,
    },
    {
      path: '/category/:category/page/:page',
      name: 'category-page',
      component: () => import('../views/CategoryPageView.vue'),
      props: true,
    },
    {
      path: '/search/:query',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      props: true,
    },
    {
      path: '/search/:query/page/:page',
      name: 'search-page',
      component: () => import('../views/SearchViewPage.vue'),
      props: true,
    },
  ],
})

export default router
