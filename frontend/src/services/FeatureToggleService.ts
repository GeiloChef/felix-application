import { i18n } from '@/i18n/config';
import { mapFeatureTogglesToFrontendObject } from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes } from '@/models/core';
import type { FeatureToggle } from '@/models/ui-models';
import { fetchFeatureTogglesFromStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { logError } from '@/utils/coreUtils';

export const fetchFeatureToggles = async (): Promise<FeatureToggle[]>  => {
  try {
    const { data: responseData } = await fetchFeatureTogglesFromStrapi();

    const featureToggleData = responseData.data;

    return mapFeatureTogglesToFrontendObject(featureToggleData);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('network-error'), i18n.global.t('errors.service.feature-toggles'), ToastMessageTypes.Error);
    logError(error);

    return [];
  }
};