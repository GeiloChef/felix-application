import { i18n } from '@/i18n/config';
import {
  mapMilestonesToFrontendObject
} from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes } from '@/models/core';
import type { Milestone } from '@/models/ui-models';
import { fetchMilestonesFromStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { logError } from '@/utils/coreUtils';

export const fetchMilestones = async (): Promise<Milestone[]>  => {
  try {
    const { data: responseData } = await fetchMilestonesFromStrapi();

    const milestoneData = responseData.data;

    return mapMilestonesToFrontendObject(milestoneData);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('network-error'), i18n.global.t('errors.service.milestones'), ToastMessageTypes.Error);
    logError(error);

    return [];
  }
};