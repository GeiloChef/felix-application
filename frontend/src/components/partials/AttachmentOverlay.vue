<template>
  <div>
    <OverlayPanel
      id="attachmentOverlay"
      ref="attachment_op"
      @hide="attachmentOverlayStore.clearCurrentViewedAttachments">
      <div
        v-if="hasLockedFiles"
        class="mb-8">
        <InlineMessage severity="warn">
          {{ t('you-need-to-be-logged-in-to-download-or-view-attachments')}}
        </InlineMessage>
      </div>
      <div>
        <div class="text-lg">
          {{ t('attachment', currentViewedAttachments.length) }}
        </div>
      </div>
      <Divider/>
      <DataView :value="currentViewedAttachments">
        <template #list="slotProps">
          <div
            v-for="(attachment, index) in currentViewedAttachments"
            :key="index"
            class="col-12 mt-6">
            <div class="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
              <div class="flex flex-row items-center gap-2">
                <span
                  class="max-w-72 md:max-w-64 truncate"
                  :class="{ 'text-gray-400': isPrivateFileLocked(attachment) }">
                  {{ attachment.name.capitalizeFirstLetter() }}
                </span>
                <div
                  class="flex justify-center items-center"
                  v-if="isPrivateFileLocked(attachment)"
                  v-tooltip="{
                    value: i18n.global.t('private-files-can-only-be-seen-by-logged-in-users'),
                    showDelay: 150,
                    hideDelay: 0
                  }">
                  <FontAwesomeIcon
                    class="!text-yellow-500"
                    icon="triangle-exclamation" />
                </div>
                <span
                  v-if="isPrivateFileLocked(attachment)"
                  class="!text-yellow-500">
                  ({{ $t('private') }})
                </span>
              </div>
              <div class="flex flex-row gap-4 justify-end">
                <Button
                  class="max-h-8 flex"
                  size="small"
                  icon="eye"
                  severity="secondary"
                  outlined
                  :disabled="isPrivateFileLocked(attachment)"
                  :label="t('preview').capitalizeFirstLetter()"
                  @click="triggerPreviewOfAttachment(attachment)" />
                <Button
                  class="max-h-8 flex"
                  size="small"
                  icon="file-download"
                  severity="success"
                  :disabled="isPrivateFileLocked(attachment)"
                  :label="t('download').capitalizeFirstLetter()"
                  @click="triggerDownloadOfAttachment(attachment)" />
              </div>
            </div>
            <Divider/>
          </div>
        </template>
      </DataView>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import DataView from 'primevue/dataview';
  import Divider from 'primevue/divider';
  import InlineMessage from 'primevue/inlinemessage';
  import OverlayPanel from 'primevue/overlaypanel';
  import { computed, ref, type Ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { i18n } from '@/i18n/config';
  import type { FileObject } from '@/models/ui-models';
  import { useAttachmentOverlayStore } from '@/stores/attachmentOverlayStore';
  import { useUserInfoStore } from '@/stores/userInfoStore';

  const { t } = useI18n();

  const userInfoStore = useUserInfoStore();
  const { isUserLoggedIn } = storeToRefs(userInfoStore);

  const attachmentOverlayStore = useAttachmentOverlayStore();
  const { currentViewedAttachments } = storeToRefs(attachmentOverlayStore);

  const isPrivateFileLocked = (file: FileObject) => {
    return !file.isPublic && !isUserLoggedIn.value;
  };

  const hasLockedFiles = computed((): boolean => {
    const privateFile = currentViewedAttachments.value.find((file) => !file.isPublic);

    return !!privateFile && !isUserLoggedIn.value;
  });

  const attachment_op: Ref<typeof OverlayPanel | null> = ref(null);
  const toggle = (event: PointerEvent) => {
    if (attachment_op.value) {
      attachment_op.value.toggle(event);
    }
  };

  const triggerDownloadOfAttachment = async (attachment: FileObject) => {
    await attachmentOverlayStore.downloadAttachment(attachment);
  };

  const triggerPreviewOfAttachment = async (attachment: FileObject) => {
    await attachmentOverlayStore.previewAttachment(attachment);
  };

  defineExpose({
    toggle
  });
</script>

<style lang="scss">
#attachmentOverlay{
  .p-overlaypanel-content {
    max-width: 100vw;
  }
}

@media (min-width: 768px) {
  #attachmentOverlay{
    .p-overlaypanel-content {
      min-width: 36rem;
    }
  }
}

</style>