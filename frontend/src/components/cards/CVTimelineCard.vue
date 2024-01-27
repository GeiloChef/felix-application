<template>
  <ColoredBackgroundCard
    :title="$t('my-milestones')"
    :color-type="ColoredBackgroundCardTypes.Dark">
    <CVTimeline />
  </ColoredBackgroundCard>
</template>

<script setup lang="ts">
  import ColoredBackgroundCard from '@/components/partials/ColoredBackgroundCard.vue';
  import CVTimeline from '@/components/partials/CVTimeline.vue';
  import { ColoredBackgroundCardTypes } from '@/models/core';
</script>

<style>

</style>