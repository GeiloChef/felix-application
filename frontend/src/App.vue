<template>
  <div :key="selectedLanguage.strapiLocalCode">
    <div>
      <HeaderBar />
    </div>
    <RouterView :key="selectedLanguage.strapiLocalCode" />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { onBeforeMount } from 'vue';
  import { RouterView } from 'vue-router';

  import HeaderBar from '@/components/partials/HeaderBar.vue';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useLanguageStore } from '@/stores/languageStore';

  const featureToggleStore = useFeatureToggleStore();
  const languageStore = useLanguageStore();
  const { selectedLanguage } = storeToRefs(languageStore);

  onBeforeMount(async (): Promise<void> => {
    await featureToggleStore.getFeatureTogglesFromService();
    languageStore.getLanguagesFromService();
  });
</script>
