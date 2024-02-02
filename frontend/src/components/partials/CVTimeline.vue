<template>
  <div class="my-16">
    <Timeline
      :value="milestones"
      :align="timelineAlignment">
      <template #marker="slotProps">
        <span class="flex w-12 h-12 items-center justify-center text-white rounded-full z-1 shadow-1 bg-blue-200">
          <FontAwesomeIcon
            class="text-gray-900"
            size="xl"
            :icon="getTimelineIconByMilestoneType(slotProps.item.type)" />
        </span>
      </template>
      <template #content="slotProps">
        <Card class="mt-0 mb-8 text-left relative">
          <template #title>
            {{ slotProps.item.title }}
          </template>
          <template #subtitle>
            {{ formatDateForUi(slotProps.item.startDate, DateFormats.MonthYear) }}
          </template>
          <template #content>
            <p>
              {{ slotProps.item.description}}
            </p>
          </template>
          <template #footer>
            <div
              v-if="slotProps.item.files.length"
              class="flex gap-3 mt-1 justify-end">
              <Button
                @click="openAttachmentOverlay($event, slotProps.item.files)"
                :label="t('attachment-with-number', slotProps.item.files.length, { count: slotProps.item.files.length }).capitalizeFirstLetter()"
                icon="fa-paperclip"
                size="small">
              </Button>
            </div>
          </template>
        </Card>
      </template>
    </Timeline>
    <AttachmentOverlay ref="AttachmentOverlayRef" />
  </div>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import Timeline from 'primevue/timeline';
  import { computed, onBeforeUnmount, onMounted, type Ref, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import AttachmentOverlay from '@/components/partials/AttachmentOverlay.vue';
  import { DateFormats } from '@/models/core';
  import { type MediaObject, MilestoneType } from '@/models/ui-models';
  import { useAttachmentOverlayStore } from '@/stores/attachmentOverlayStore';
  import { useDataStore } from '@/stores/dataStore';
  import { formatDateForUi } from '@/utils/dateUtils';

  const { t } = useI18n();

  const dataStore = useDataStore();
  const { milestones } = storeToRefs(dataStore);

  const attachmentOverlayStore = useAttachmentOverlayStore();

  const AttachmentOverlayRef: Ref<typeof AttachmentOverlay | null> = ref(null);

  const timelineAlignment: Ref<'alternate' | 'left'> = ref('alternate');

  const getTimelineIconByMilestoneType = (type: MilestoneType): string => {
    switch (type) {
      case MilestoneType.CodingExperience:
        return 'fa-laptop-code';
      case MilestoneType.SchoolEducation:
        return 'fa-school';
      case MilestoneType.WorkingExperience:
        return 'fa-briefcase';

      default:
        return 'fa-star';

    }
  };

  const openAttachmentOverlay = (event: PointerEvent | MouseEvent, attachments: MediaObject[]) => {
    if (AttachmentOverlayRef.value) {
      attachmentOverlayStore.setCurrentViewedAttachments(attachments);
      AttachmentOverlayRef.value.toggle(event);
    }
  };

  const checkForResponsivenessOfTimeline = (): void => {
    const thresholdForResponsivenessOfTimeline = 1536; // px -> lg breakpoint of tailwind

    if (window.innerWidth <= thresholdForResponsivenessOfTimeline) {
      timelineAlignment.value = 'left';
    } else {
      timelineAlignment.value = 'alternate';
    }
  };

  onMounted((): void => {
    checkForResponsivenessOfTimeline();
    window.addEventListener('resize', checkForResponsivenessOfTimeline);
  });

  onBeforeUnmount((): void => {
    window.removeEventListener('resize', checkForResponsivenessOfTimeline);
  });
</script>

<style>
.p-timeline-event-opposite {
  @apply hidden 2xl:block
}
</style>