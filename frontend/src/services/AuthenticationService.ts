import { i18n } from '@/i18n/config';
import { mapUserToFrontendObject } from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes, type UserLoginCredentials } from '@/models/core';
import type { UserData } from '@/models/ui-models';
import { postLoginToStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { logError } from '@/utils/coreUtils';

export const postLogin = async (identifier: string, password: string): Promise<UserData | false> => {
  const userCredentials: UserLoginCredentials = {
    identifier,
    password
  };

  try {
    const { data: userData } = await postLoginToStrapi(userCredentials);

    return mapUserToFrontendObject(userData.user, userData.jwt);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('login-error'), i18n.global.t('errors.login'), ToastMessageTypes.Error);
    logError(error);

    return false;
  }
};