import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';

import { useUserInfoStore } from '@/stores/userInfoStore';
import HomeView from '@/views/HomeView.vue';
import ImprintView from '@/views/ImprintView.vue';
import LoginView  from '@/views/LoginView.vue';
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        isAccessibleWithoutAcceptingCookies: false,
        hasDownloadDialogButton: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        isAccessibleWithoutAcceptingCookies: false,
        hasDownloadDialogButton: false
      }
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: ImprintView,
      meta: {
        isAccessibleWithoutAcceptingCookies: true,
        hasDownloadDialogButton: false
      }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        isAccessibleWithoutAcceptingCookies: true,
        hasDownloadDialogButton: false
      }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    };
  }
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userInfoStore = useUserInfoStore();

  if (to.name === 'login' && userInfoStore.isUserLoggedIn) {
    next(from);

    return;
  }

  if (to.name !== 'login'
    && !to.meta.isAccessibleWithoutAcceptingCookies
    && !userInfoStore.userHasAcceptedGuestInformation) {
    next({ name: 'login' });

    return;
  }

  next();
});

export default router;
