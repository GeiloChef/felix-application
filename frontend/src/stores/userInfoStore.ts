import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { UserData } from '@/models/ui-models';
import router from '@/router';
import { postLogin } from '@/services/AuthenticationService';

export const useUserInfoStore = defineStore('userInformation', () => {
  const userInfo = useLocalStorage('userInfo', {} as UserData);
  const jwt = useLocalStorage('jwt', '' as string);

  const isUserLoggedIn = computed((): boolean => {
    return !!jwt.value;
  });

  const processLogin = async (username: string, password: string): Promise<boolean> => {
    const user: false | UserData = await postLogin(username, password);

    if (user) {
      userInfo.value = user;
      jwt.value = user.jwt;

      router.push({ name: 'home' });

      return true;
    } else {
      return false;
    }
  };

  const processLogout = () => {
    userInfo.value = {} as UserData;
    jwt.value = '';

    router.push({ name: 'login' });
  };

  return {
    userInfo,
    isUserLoggedIn,
    processLogin,
    processLogout
  };
});
