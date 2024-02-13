<template>
  <Dialog
    id="GlobalDownloadDialog"
    v-model:visible="isFileDownloadDialogOpen"
    modal
    contentClass="overflow-hidden"
    position="top"
    :draggable="false"
    :header="$t('here-you-can-find-all-relevant-documents')"
    :style="{ width: '80rem' }"
    :breakpoints="{
      '640px': '95vw' }">
    <template #closeicon>
      <FontAwesomeIcon
        size="xl"
        icon="circle-xmark" />
    </template>
    <div class="mt-4 mb-10 pl-6 flex flex-row gap-6">
      <div class="flex flex-col">
        <span
          class="p-input-icon-left"
          :class="{ 'p-input-icon-right': searchInputHasText }">
          <FontAwesomeIcon icon="fa-magnifying-glass" />
          <InputText
            id="username"
            class="w-80 sm:w-96"
            autocomplete="off"
            v-model="searchText"
            :placeholder="$t('search-for-documents')"/>
          <FontAwesomeIcon
            v-if="searchInputHasText"
            class="cursor-pointer"
            icon="xmark"
            @click="clearSearchtextInput" />
        </span>
        <small class="mt-1 ml-1 text-gray-400">{{ $t('search-by-name-or-tag') }}</small>
      </div>
      <Button
        v-if="false"
        class="!max-h-12"
        :label="$t('filter-documents')"
        icon="fa-paperclip"
        size="small">
      </Button>
    </div>
    <DataView
      class="downloads-data-view-body"
      :value="filteredDocuments">
      <template #empty>
        <span class="italic">
          {{ $t('no-file-found-that-match-your-search-criteria') }}
        </span>
      </template>
      <template #list="fileDownloadsProps">
        <div
          v-for="(fileDownload, index) in fileDownloadsProps.items"
          :key="index"
          class="col-12">
          <div class="flex flex-row gap-4 w-full justify-between items-end px-6">
            <div class="flex flex-col gap-4">
              <div class="flex flex-row w-full">
                <div class="flex flex-col">
                  <div class="text-2xl font-bold">
                    {{ fileDownload.headline }}
                  </div>
                  <div class="text-md text-gray-400">
                    {{ fileDownload.subHeadline }}
                  </div>
                </div>
              </div>
              <div class="flex flex-row gap-2">
                <Tag
                  v-for="tag in fileDownload.tags"
                  :key="tag.label"
                  severity="success"
                  :value="tag.value"></Tag>
              </div>
            </div>
            <div class="flex flex-row">
              <Button
                @click="openAttachmentOverlay($event, fileDownload.files)"
                :label="$t('attachment-with-number', fileDownload.files.length, { count: fileDownload.files.length }).capitalizeFirstLetter()"
                icon="fa-paperclip"
                size="small">
              </Button>
            </div>
          </div>
          <Divider />
        </div>
      </template>
    </DataView>

    <AttachmentOverlay ref="AttachmentOverlayRef" />
  </Dialog>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import DataView from 'primevue/dataview';
  import Dialog from 'primevue/dialog';
  import Divider from 'primevue/divider';
  import Tag from 'primevue/tag';
  import { computed, type Ref, ref } from 'vue';

  import AttachmentOverlay from '@/components/partials/AttachmentOverlay.vue';
  import type { FileDownload, MediaObject } from '@/models/ui-models';
  import { useAttachmentOverlayStore } from '@/stores/attachmentOverlayStore';
  import { useFileDownloadStore } from '@/stores/fileDownloadStore';

  const fileDownloadStore = useFileDownloadStore();
  const { fileDownloads, isFileDownloadDialogOpen } = storeToRefs(fileDownloadStore);

  const attachmentOverlayStore = useAttachmentOverlayStore();

  const AttachmentOverlayRef: Ref<typeof AttachmentOverlay | null> = ref(null);

  const searchText = ref('');

  const clearSearchtextInput = (): void => {
    searchText.value = '';
  };

  const searchInputHasText = computed((): boolean => {
    return searchText.value.length > 0;
  });

  const openAttachmentOverlay = (event: PointerEvent | MouseEvent, attachments: MediaObject[]) => {
    if (AttachmentOverlayRef.value) {
      attachmentOverlayStore.setCurrentViewedAttachments(attachments);
      AttachmentOverlayRef.value.toggle(event);
    }
  };

  const filteredDocuments = computed((): FileDownload[] => {
    if (!searchText.value) return fileDownloads.value;

    return fileDownloads.value.filter((file) => {
      return (file.headline.toLowerCase().includes(searchText.value.toLowerCase()))
        || (file.subHeadline.toLowerCase().includes(searchText.value.toLowerCase()))
        || (file.description.toLowerCase().includes(searchText.value.toLowerCase()))
        || (file.metaTags.join('').toLowerCase().includes(searchText.value.toLowerCase()));
    });
  });
</script>

<style>
/*
.p-tag {
  background-color: rgb(224, 123, 45);
  @apply text-white
}
*/

.downloads-data-view-body {
  .p-dataview-content {
    max-height: 70vh;
    overflow-y: auto;
    @extend .custom-scrollbar
  }
}

</style>