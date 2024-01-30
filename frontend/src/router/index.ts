import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';

import HomeView from '../views/HomeView.vue';

import { useUserInfoStore } from '@/stores/userInfoStore';
import LoginView  from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userStore = useUserInfoStore();

  if (to.name === 'login' && userStore.isUserLoggedIn) {
    next(from);
  }

  next();
});

export default router;
