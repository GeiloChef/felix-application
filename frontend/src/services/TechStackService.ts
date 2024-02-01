import { i18n } from '@/i18n/config';
import { mapTechStackToFrontendObject } from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes } from '@/models/core';
import type { TechStackEntry } from '@/models/ui-models';
import { fetchTechStackFromStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { logError } from '@/utils/coreUtils';

export const fetchTechStack = async (): Promise<TechStackEntry[]>  => {
  try {
    const { data: responseData } = await fetchTechStackFromStrapi();

    const techStackData = responseData.data;

    return mapTechStackToFrontendObject(techStackData);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('error'), i18n.global.t('errors.service.tech-stack'), ToastMessageTypes.Error);
    logError(error);

    return [];
  }
};