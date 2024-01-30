import { i18n } from '@/i18n/config';
import {
  mapLocaleToFrontendObject,
} from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes } from '@/models/core';
import type { LocaleEntry } from '@/models/ui-models';
import { fetchLocalesFromStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { logError } from '@/utils/coreUtils';

export const fetchLocales = async (): Promise<LocaleEntry[]>  => {
  try {
    const { data: responseData } = await fetchLocalesFromStrapi();

    return mapLocaleToFrontendObject(responseData);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('network-error'), i18n.global.t('errors.service.locales'), ToastMessageTypes.Error);
    logError(error);

    return [];
  }
};