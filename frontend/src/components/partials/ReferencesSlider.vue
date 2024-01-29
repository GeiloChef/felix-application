<template>
  <div>
    <div class="flex justify-center">
      <Carousel
        class="w-2/3"
        :value="references"
        :numVisible="1"
        :numScroll="3">
        <template #item="slotProps">
          <Card class="relative">
            <template #title>
              <div>
                {{ slotProps.data.name }}
              </div>
              <div class="text-sm mt-2 text-gray-500">
                {{ slotProps.data.subHeadline }}
              </div>
            </template>
            <template #content>
              <Tag
                class="reference-type-tag"
                rounded
                :value="translatedValueForReferenceType(slotProps.data.type)"
                severity="success" />
              <p class="m-0">
                {{ slotProps.data.description }}
              </p>
            </template>
            <template #footer>
              <div class="flex gap-4 justify-end">
                <Button
                  v-for="link in slotProps.data.externalLinks"
                  :key="link.name"
                  :label="link.name"
                  icon="fa-link"
                  severity="secondary"
                  outlined
                  @click="openLinkInNewTab(link.url)"/>
                <Button
                  v-if="slotProps.data.attachments.length"
                  @click="openAttachmentOverlay($event, slotProps.data.attachments)"
                  :label="$t('attachment-with-number', slotProps.data.attachments.length, { count: slotProps.data.attachments.length }).capitalizeFirstLetter()"
                  icon="fa-paperclip"
                  size="small">
                </Button>
              </div>
            </template>
          </Card>
        </template>
      </Carousel>
    </div>
    <AttachmentOverlay ref="AttachmentOverlayRef" />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Carousel from 'primevue/carousel';
  import Tag from 'primevue/tag';
  import { ref, type Ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import AttachmentOverlay from '@/components/partials/AttachmentOverlay.vue';
  import { type MediaObject, ReferenceType } from '@/models/ui-models';
  import { useAttachmentOverlayStore } from '@/stores/attachmentOverlayStore';
  import { useDataStore } from '@/stores/dataStore';
  import { openLinkInNewTab } from '@/utils/coreUtils';

  const { t } = useI18n();

  const dataStore = useDataStore();
  const { references } = storeToRefs(dataStore);

  const attachmentOverlayStore = useAttachmentOverlayStore();

  const AttachmentOverlayRef: Ref<typeof AttachmentOverlay | null> = ref(null);

  const openAttachmentOverlay = (event: PointerEvent | MouseEvent, attachments: MediaObject[]) => {
    if (AttachmentOverlayRef.value) {
      attachmentOverlayStore.setCurrentViewedAttachments(attachments);
      AttachmentOverlayRef.value.toggle(event);
    }
  };

  const translatedValueForReferenceType = (type: ReferenceType): string => {
    switch (type) {
      case ReferenceType.Education:
        return t('education');
      case ReferenceType.CodingExperience:
        return t('coding-experience');
      case ReferenceType.WorkingExperience:
        return t('working-experience');
      default:
        return t('coding');
    }
  };

</script>

<style lang="scss">
.reference-type-tag {
  position: absolute;
  top: 1rem;
  right: 1rem
}
</style>