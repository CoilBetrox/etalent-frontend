import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: false}
  },
  {
    path: '/feedbacks',
    name: 'feedbacks',
    component: () => import('@/views/FeedbacksView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/feedbacksAdmin',
    name: 'feedbacksAdmin',
    component: () => import('@/views/FeedbacksAdminView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/directorio',
    name: 'directorio',
    component: () => import('@/views/DirectorioView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/directorioAdmin',
    name: 'directorioAdmin',
    component: () => import('@/views/DirectorioAdminView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('@/views/PerfilView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/nosotros',
    name: 'nosotros',
    component: () => import('@/views/NosotrosView.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {requiresAuth: false}
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: () => import('@/views/VerifyEmail.vue'),
    //props: (route) => ({ token: route.query.token})
  },
  {
    path: '/forgot-password',
    name: 'Forgot-Password',
    component: () => import('@/views/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  //const userRole = localStorage.getItem('userRole');
  if (to.name === 'VerifyEmail') {
    next();
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
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
