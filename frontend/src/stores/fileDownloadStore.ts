import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

import type { FileDownload } from '@/models/ui-models';
import { fetchFileDownloads } from '@/services/FileDownloadService';

export const useFileDownloadStore = defineStore('fileDownloads', () => {
  const isFileDownloadDialogOpen = ref(false);
  const fileDownloads: Ref<FileDownload[]> = ref([]);

  const toggleFileDownloadDialog = (): void => {
    isFileDownloadDialogOpen.value = !isFileDownloadDialogOpen.value;
  };

  const getFileDownloadsFromService = async () => {
    fetchFileDownloads().then((data: FileDownload[]) => {
      fileDownloads.value = data;
    });
  };

  return {
    isFileDownloadDialogOpen,
    fileDownloads,
    toggleFileDownloadDialog,
    getFileDownloadsFromService
  };
});