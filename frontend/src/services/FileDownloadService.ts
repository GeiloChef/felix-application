import { i18n } from '@/i18n/config';
import { mapFileDownloadsToFrontendObject, mapMilestonesToFrontendObject } from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes } from '@/models/core';
import type { FileDownload, Milestone } from '@/models/ui-models';
import { fetchFileDownloadsFromStrapi, fetchMilestonesFromStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { logError } from '@/utils/coreUtils';

export const fetchFileDownloads = async (): Promise<FileDownload[]>  => {
  try {
    const { data: responseData } = await fetchFileDownloadsFromStrapi();

    const fileDownloadData = responseData.data;

    return mapFileDownloadsToFrontendObject(fileDownloadData);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('network-error'), i18n.global.t('errors.service.file-download-list'), ToastMessageTypes.Error);
    logError(error);

    return [];
  }
};