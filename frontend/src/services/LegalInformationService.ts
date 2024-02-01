import { i18n } from '@/i18n/config';
import {
  mapLegalInformationToFrontendObject,
} from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes } from '@/models/core';
import type { LegalInformation } from '@/models/ui-models';
import { fetchLegalInformationFromStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { logError } from '@/utils/coreUtils';

export const fetchLegalInformation = async (): Promise<LegalInformation | false>  => {
  try {
    const { data: responseData } = await fetchLegalInformationFromStrapi();

    const legalInformationData = responseData.data;

    return mapLegalInformationToFrontendObject(legalInformationData);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('network-error'), i18n.global.t('errors.service.legal-information'), ToastMessageTypes.Error);
    logError(error);

    return false;
  }
};