<template>
  <div>
    <OverlayPanel
      ref="attachment_op"
      @hide="attachmentOverlayStore.clearCurrentViewedAttachments">
      <div class="mb-8">
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
            class="col-12">
            <div class="flex justify-between">
              {{attachment.name}}
              <div class="flex flex-row gap-4">
                <Button
                  class="max-h-8"
                  size="small"
                  icon="eye"
                  severity="secondary"
                  outlined
                  :label="t('preview').capitalizeFirstLetter()"/>
                <Button
                  class="max-h-8"
                  size="small"
                  icon="file-download"
                  severity="success"
                  v-tooltip.bottom="'test'"
                  :label="t('download').capitalizeFirstLetter()"/>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import DataView from 'primevue/dataview';
  import Divider from 'primevue/divider';
  import InlineMessage from 'primevue/inlinemessage';
  import OverlayPanel from 'primevue/overlaypanel';
  import { ref, type Ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useAttachmentOverlayStore } from '@/stores/attachmentOverlayStore';

  const { t } = useI18n();

  const attachmentOverlayStore = useAttachmentOverlayStore();
  const { currentViewedAttachments } = storeToRefs(attachmentOverlayStore);

  const attachment_op: Ref<typeof OverlayPanel | null> = ref(null);
  const toggle = (event: PointerEvent) => {
    if (attachment_op.value) {
      attachment_op.value.toggle(event);
    }
  };

  defineExpose({
    toggle
  });
</script>

<style>

</style>