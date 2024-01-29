import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

import type { FeatureToggle } from '@/models/ui-models';
import { fetchFeatureToggles } from '@/services/FeatureToggleService';

export const useFeatureToggleStore = defineStore('featureToggle', () => {
  const featureToggles: Ref<FeatureToggle[]> = ref([]);

  const isFeatureActive = (featureName: string): boolean => {
    const foundFeature = featureToggles.value.find((toggle) => toggle.name === featureName);

    return foundFeature ? foundFeature.active : false;
  };

  const getFeatureTogglesFromService = async () => {
    fetchFeatureToggles().then((data: FeatureToggle[]) => {
      featureToggles.value = data;
    });
  };

  return {
    featureToggles,
    isFeatureActive,
    getFeatureTogglesFromService
  };

});
