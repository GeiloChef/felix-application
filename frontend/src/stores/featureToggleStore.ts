import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

import type { AvailableFeatures } from '@/models/core';
import type { FeatureToggle } from '@/models/ui-models';
import { fetchFeatureToggles } from '@/services/FeatureToggleService';

export const useFeatureToggleStore = defineStore('featureToggle', () => {
  const featureToggles: Ref<FeatureToggle[]> = ref([]);

  const isFeatureActive = (featureName: AvailableFeatures): boolean => {
    const foundFeature = featureToggles.value.find((toggle) => toggle.name === featureName);

    return foundFeature ? foundFeature.active : false;
  };

  const getFeatureTogglesFromService = async () => {
    featureToggles.value = await fetchFeatureToggles();
  };

  return {
    featureToggles,
    isFeatureActive,
    getFeatureTogglesFromService
  };

});
