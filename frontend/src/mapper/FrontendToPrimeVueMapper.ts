import type { ToastMessageOptions } from 'primevue/toast';

import type { ToastMessage } from '@/models/core';

export const  mapFrontEndToastMessageToPrimeVueToastMessage = (toastMessage: ToastMessage): ToastMessageOptions => {
  return {
    severity: toastMessage.severity,
    summary: toastMessage.title,
    detail: toastMessage.description,
    life: toastMessage.duration,
  };
};