import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type { MediaObject } from '@/models/ui-models';

export const useAttachmentOverlayStore = defineStore('attachmentOverlay', () => {
  const currentViewedAttachments: Ref<MediaObject[]> = ref([]);
  const setCurrentViewedAttachments =  (attachments: MediaObject[]): void => {
    currentViewedAttachments.value = attachments;
  };

  const clearCurrentViewedAttachments = async () => {
    currentViewedAttachments.value = [];
  };

  return {
    currentViewedAttachments,
    setCurrentViewedAttachments,
    clearCurrentViewedAttachments
  };
});
