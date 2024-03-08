import { type RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore, storeToRefs } from 'pinia';
import { computed, type Ref, ref, watch } from 'vue';

import type { UserApplicationSettings } from '@/models/core';
import { AvailableFeatures } from '@/models/core';
import type { UserData } from '@/models/ui-models';
import router from '@/router';
import { postLogin } from '@/services/AuthenticationService';
import { useFeatureToggleStore } from '@/stores/featureToggleStore';

export const useUserInfoStore = defineStore('userInformation', () => {
  const featureToggleStore = useFeatureToggleStore();
  const { featureToggles } = storeToRefs(featureToggleStore);

  const userInfo = useLocalStorage('userInfo', {} as UserData);
  const jwt = useLocalStorage('jwt', '' as string);
  const userHasAcceptedCookies = useLocalStorage('userHasAcceptedCookies', false);
  const userHasAcceptedGuestInformation = useLocalStorage('userHasAcceptedGuestInformation', false);
  const guestInfoModalIsToggled = ref(false);

  const userSelectedSettings: RemovableRef<UserApplicationSettings> =  useLocalStorage('userSelectedSettings',{
    useSnapScrollHomeView: false
  });

  const isUserLoggedIn = computed((): boolean => {
    return !!jwt.value;
  });

  const acceptCookies = () => {
    userHasAcceptedCookies.value = true;
  };

  const toggleGuestInfoModal = (): void => {
    guestInfoModalIsToggled.value = !guestInfoModalIsToggled.value;
  };

  const acceptGuestInformation = (): void => {
    userHasAcceptedGuestInformation.value = true;
  };

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

  watch(featureToggles, (): void => {
    if(!featureToggleStore.isFeatureActive(AvailableFeatures.SnapScrollHomeView)) {
      userSelectedSettings.value.useSnapScrollHomeView = false;
    }
  });


  return {
    userInfo,
    isUserLoggedIn,
    userHasAcceptedCookies,
    userHasAcceptedGuestInformation,
    guestInfoModalIsToggled,
    userSelectedSettings,
    processLogin,
    processLogout,
    acceptCookies,
    toggleGuestInfoModal,
    acceptGuestInformation
  };
});
