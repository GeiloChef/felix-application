import { i18n } from '@/i18n/config';
import { mapPersonalInformationToFrontendObject } from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes } from '@/models/core';
import type { PersonalInformationPublicStrapiDto } from '@/models/typesFromStrapiApi';
import type { PersonalInformation } from '@/models/ui-models';
import { fetchPublicPersonalInformationFromStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { logError } from '@/utils/coreUtils';

export const fetchPersonalInformation = async (): Promise<PersonalInformation>  => {
  const userInfoStore = useUserInfoStore();

  let publicPersonalInformation: PersonalInformationPublicStrapiDto = {} as PersonalInformationPublicStrapiDto;
  const privatePersonalInformation = null;

  try {
    const { data: responseData } = await fetchPublicPersonalInformationFromStrapi();

    publicPersonalInformation = responseData.data.attributes;


    if (userInfoStore.isUserLoggedIn) {
      // todo: fetch private information about me
    }

    return mapPersonalInformationToFrontendObject(publicPersonalInformation, privatePersonalInformation);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('network-error'), i18n.global.t('errors.service.personal-information'), ToastMessageTypes.Error);
    logError(error);

    return {} as PersonalInformation;
  }

};