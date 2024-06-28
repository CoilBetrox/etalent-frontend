import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import { metadata } from 'core-js/fn/reflect';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true}
  },
  {
    path: '/feedbacks',
    name: 'feedbacks',
    component: () => import( '../views/FeedbacksView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/directorio',
    name: 'directorio',
    component: () => import( '../views/DirectorioView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import( '../views/PerfilView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/nosotros',
    name: 'nosotros',
    component: () => import( '../views/NosotrosView.vue'),
    meta: {requiresAuth: true}
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
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated){
      next('/login');
    } else {
      //agregar logica adicional para verificar roles
      next();
    }
  }else {
    next();
  }
});

export default router
