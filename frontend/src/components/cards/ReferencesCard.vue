<template>
  <ColoredBackgroundCard
    :title="$t('my-references')"
    :color-type="ColoredBackgroundCardTypes.Dark">
    <ReferencesSlider class="mt-12" />
  </ColoredBackgroundCard>
</template>

<script setup lang="ts">

  import ColoredBackgroundCard from '@/components/partials/ColoredBackgroundCard.vue';
  import ReferencesSlider from '@/components/partials/ReferencesCarousel.vue';
  import { ColoredBackgroundCardTypes } from '@/models/core';
</script>

<style>

</style>