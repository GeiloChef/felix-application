<template>
  <div
    class="snap-scroll-card bg-gray-900"
    :style="snapScrollCardHeight">
    <slot/>
  </div>
</template>

<script setup lang="ts">

  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

  import { useApplicationStore } from '@/stores/applicationStore';

  const applicationStore = useApplicationStore();
  const { maxContentHeightWithHeader } = storeToRefs(applicationStore);

  const snapScrollCardHeight = computed((): string => {
    return `height: ${maxContentHeightWithHeader.value}px`;
  });
</script>

<style lang="scss">
.snap-scroll-card{
  scroll-snap-align: start;
}
</style>