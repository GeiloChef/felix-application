<template>
  <SnapScrollCard class="relative">
    <div
      ref="HorizontalSnapScrollParentRef"
      class="snap-scroll-horizontal-parent flex flex-row hide-scrollbar w-screen h-full relative">
      <div
        v-intersection-observer="(observer) => onIntersectionObserver(observer, 0)"
        class="snap-scroll-horizontal-children w-screen flex-shrink-0 h-full py-4 px-2 flex flex-col items-center justify-center text-center gap-16">
        <div class="text-4xl">
          {{$t('my-milestones') }}
        </div>
        <div class="text-2xl">
          {{ $t('my-milestones-snap-scroll-description') }}
        </div>
        <div class="relative">
          <ArrowAnimation />
        </div>
        <div>
          {{ $t('swipe-left') }}
        </div>
      </div>
      <div
        v-for="(milestone, index) in milestones"
        :key="milestone.title"
        v-intersection-observer="(observer) => onIntersectionObserver(observer, index + 1)"
        class="snap-scroll-horizontal-children w-screen flex-shrink-0 h-full py-4 px-2 flex flex-col items-center justify-center text-center gap-4">
        <div class="text-3xl font-bold">
          {{ milestone.title }}
        </div>
        <!--  timespan -->
        <div class="flex flex-col text-xl text-gray-400">
          {{ getTimelineSubHeadline(milestone) }}
        </div>
        <div class="flex w-1/2">
          <Divider />
        </div>
        <!--  description-->
        <div class="flex flex-col text-2xl text-gray-400">
          {{ milestone.description }}
        </div>
        <!--  action item-->
        <div
          v-if="milestone.files.length"
          class="w-40 flex justify-center">
          <Button
            class="!max-h-16"
            @click="openAttachmentOverlay($event, milestone.files)"
            :label="$t('attachment-with-number', milestone.files.length, { count: milestone.files.length }).capitalizeFirstLetter()"
            icon="fa-paperclip">
          </Button>
        </div>
      </div>
    </div>
    <div class="absolute flex flex-row flex-wrap bottom-0 gap-2 pb-2 justify-center w-full">
      <div
        v-for="n in milestones.length + 1"
        :key="n"
        class="horizontal-snap-scroll-stepper"
        :class="{ 'horizontal-snap-scroll-stepper-active': (n-1 === activePage) }"/>
    </div>
    <AttachmentOverlay ref="AttachmentOverlayRef" />
  </SnapScrollCard>
</template>

<script setup lang="ts">
  import { vIntersectionObserver } from '@vueuse/components';
  import { storeToRefs } from 'pinia';
  import Divider from 'primevue/divider';
  import { ref, type Ref } from 'vue';


  import ArrowAnimation from '@/components/elements/ArrowAnimation.vue';
  import AttachmentOverlay from '@/components/partials/AttachmentOverlay.vue';
  import SnapScrollCard from '@/components/partials/SnapScroll/SnapScrollCard.vue';
  import { DateFormats } from '@/models/core';
  import type { MediaObject, Milestone } from '@/models/ui-models';
  import { useAttachmentOverlayStore } from '@/stores/attachmentOverlayStore';
  import { useDataStore } from '@/stores/dataStore';
  import { formatDateForUi } from '@/utils/dateUtils';

  const attachmentOverlayStore = useAttachmentOverlayStore();

  const dataStore = useDataStore();
  const { milestones } = storeToRefs(dataStore);

  const AttachmentOverlayRef: Ref<typeof AttachmentOverlay | null> = ref(null);

  const HorizontalSnapScrollParentRef = ref(null);

  const activePage = ref(0);

  /**
   * @description Checks which page of the timeline is in the viewport and sets the index of the active page.
   * @param isIntersecting { Boolean }
   * @param index { Number } - the index of the page that is intersecting in the viewport
   */
  const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[], index: number) => {
    if (isIntersecting) {
      activePage.value = index;
    }
  };

  const openAttachmentOverlay = (event: PointerEvent | MouseEvent, attachments: MediaObject[]) => {
    if (AttachmentOverlayRef.value) {
      attachmentOverlayStore.setCurrentViewedAttachments(attachments);
      AttachmentOverlayRef.value.toggle(event);
    }
  };


  const getTimelineSubHeadline = (milestone: Milestone): string => {
    let subHeadline: string = '';

    if (milestone.startDate) {
      subHeadline += formatDateForUi(milestone.startDate, DateFormats.MonthYear);
    }


    if (milestone.endDate) {
      if (milestone.startDate) {
        subHeadline += ' - ';
      }

      subHeadline += formatDateForUi(milestone.endDate, DateFormats.MonthYear);
    }

    return subHeadline;
  };
</script>