import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserInfoStore = defineStore('userInformation', () => {
  const isUserLoggedIn = ref(false);

  return {
    isUserLoggedIn
  };
});
