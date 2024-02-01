import { defineStore } from 'pinia';
import type { ToastMessageOptions } from 'primevue/toast';
import { type Ref, ref } from 'vue';

import { mapFrontEndToastMessageToPrimeVueToastMessage } from '@/mapper/FrontendToPrimeVueMapper';
import type { ToastMessage } from '@/models/core';
import { ToastMessageTypes } from '@/models/core';

export const useToastMessageStore = defineStore('toastMessage', () => {
  const toastMessages: Ref<ToastMessageOptions[]> = ref([]);

  const addNewToastMessage = (title: string, description: string, severity: ToastMessageTypes): void => {
    const toastMessage: ToastMessage = {
      title,
      description,
      severity,
      duration: 3000
    };

    toastMessages.value.push(mapFrontEndToastMessageToPrimeVueToastMessage(toastMessage));
  };

  return {
    toastMessages,
    addNewToastMessage
  };
});
