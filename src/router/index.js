import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/feedbacks',
    name: 'feedbacks',
    component: () => import( '../views/FeedbacksView.vue')
  },

  {
    path: '/directorio',
    name: 'directorio',
    component: () => import( '../views/DirectorioView.vue')
  },

  {
    path: '/perfil',
    name: 'perfil',
    component: () => import( '../views/PerfilView.vue')
  },

  {
    path: '/nosotros',
    name: 'nosotros',
    component: () => import( '../views/NosotrosView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
