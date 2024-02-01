import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type { FileObject, MediaObject } from '@/models/ui-models';
import { fetchFileById } from '@/services/FileService';

export const useAttachmentOverlayStore = defineStore('attachmentOverlay', () => {
  const currentViewedAttachments: Ref<FileObject[]> = ref([]);
  const setCurrentViewedAttachments =  (attachments: FileObject[]): void => {
    currentViewedAttachments.value = attachments;
  };

  const clearCurrentViewedAttachments = async () => {
    currentViewedAttachments.value = [];
  };

  const downloadAttachment = async (attachment: FileObject): Promise<void> => {
    const attachmentInformation = await fetchFileById(attachment);

    if (attachmentInformation) {
      const link = document.createElement('a');

      link.href = attachmentInformation.url;
      link.download = `${attachmentInformation.name}${attachmentInformation.ext}`;
      link.target = '_blank';
      link.dispatchEvent(new MouseEvent('click'));
    }
  };

  const previewAttachment = async (attachment: FileObject): Promise<void> => {
    const attachmentInformation = await fetchFileById(attachment);

    if (attachmentInformation) {
      const link = document.createElement('a');

      link.href = attachmentInformation.url;
      link.target = '_blank';
      link.dispatchEvent(new MouseEvent('click'));
    }
  };

  return {
    currentViewedAttachments,
    setCurrentViewedAttachments,
    clearCurrentViewedAttachments,
    downloadAttachment,
    previewAttachment
  };
});
