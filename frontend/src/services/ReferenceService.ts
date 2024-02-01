import { i18n } from '@/i18n/config';
import {
  mapReferencesToFrontendObject
} from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes } from '@/models/core';
import type { Reference } from '@/models/ui-models';
import { fetchReferencesFromStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { logError } from '@/utils/coreUtils';

export const fetchReferences = async (): Promise<Reference[]>  => {
  try {
    const { data: responseData } = await fetchReferencesFromStrapi();

    const referencesData = responseData.data;

    return mapReferencesToFrontendObject(referencesData);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('network-error'), i18n.global.t('errors.service.references'), ToastMessageTypes.Error);
    logError(error);

    return [];
  }
};