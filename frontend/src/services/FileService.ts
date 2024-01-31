import { storeToRefs } from 'pinia';

import { i18n } from '@/i18n/config';
import { mapStrapiMediaToFrontendObject } from '@/mapper/StrapiApiToFrontendMapper';
import { ToastMessageTypes } from '@/models/core';
import type { DataObject, StrapiMediaDto } from '@/models/typesFromStrapiApi';
import type { FileObject, MediaObject } from '@/models/ui-models';
import { getPrivateFileByIdFromStrapi, getPublicFileByIdFromStrapi } from '@/services/api/StrapiApi';
import { useToastMessageStore } from '@/stores/toastMessageStore';
import { useUserInfoStore } from '@/stores/userInfoStore';

export const fetchFileById = async (file: FileObject): Promise<MediaObject | false> => {
  const userInfoStore = useUserInfoStore();
  const { isUserLoggedIn } = storeToRefs(userInfoStore);

  if (!file.isPublic && !isUserLoggedIn.value) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('permission-error'), i18n.global.t('errors.permissions.file-download'), ToastMessageTypes.Error);

    return false;
  }

  try {
    let fileInfoFromStrapi: StrapiMediaDto = {} as StrapiMediaDto;

    if (file.isPublic) {
      const { data: fileData } = await getPublicFileByIdFromStrapi(file.id);

      fileInfoFromStrapi = fileData.data.attributes.attachment.data.attributes;
    } else {
      const { data: fileData } = await getPrivateFileByIdFromStrapi(file.id);

      fileInfoFromStrapi = fileData.data.attributes.attachment.data.attributes;
    }


    return mapStrapiMediaToFrontendObject(fileInfoFromStrapi);
  } catch (error) {
    useToastMessageStore().addNewToastMessage(i18n.global.t('network-error'), i18n.global.t('errors.permissions.file-download'), ToastMessageTypes.Error);

    return false;
  }
};