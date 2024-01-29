<template>
  <div>
    <HeaderBar />
  </div>
  <RouterView />
</template>

<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { RouterView } from 'vue-router';

  import HeaderBar from '@/components/partials/HeaderBar.vue';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';

  const featureToggleStore = useFeatureToggleStore();

  onBeforeMount((): void => {
    featureToggleStore.getFeatureTogglesFromService();
  });
</script>
