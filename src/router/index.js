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
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/RegisterView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('accessToken');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn){
    next('/login');
  }else {
    next();
  }
});

export default router
