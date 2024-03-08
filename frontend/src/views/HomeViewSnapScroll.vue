<template>
  <div
    class="snap-scroll-parent hide-scrollbar"
    :style="snapScrollParentHeight">
    <PersonalCardSnapScroll />
    <TimelineSnapScroll />
    <TechStackSnapScroll />
    <FooterSnapScroll />
  </div>
</template>

<script setup lang="ts">

  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

  import FooterSnapScroll from '@/components/cards/SnapScroll/FooterSnapScroll.vue';
  import PersonalCardSnapScroll from '@/components/cards/SnapScroll/PersonalCardSnapScroll.vue';
  import TechStackSnapScroll from '@/components/cards/SnapScroll/TechStackSnapScroll.vue';
  import TimelineSnapScroll from '@/components/cards/SnapScroll/TimelineSnapScroll.vue';
  import { useApplicationStore } from '@/stores/applicationStore';

  const applicationStore = useApplicationStore();
  const { maxContentHeightWithHeader } = storeToRefs(applicationStore);

  const snapScrollParentHeight = computed((): string => {
    return `height: ${maxContentHeightWithHeader.value}px`;
  });
</script>

<style lang="scss">
.snap-scroll-parent {
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
</style>