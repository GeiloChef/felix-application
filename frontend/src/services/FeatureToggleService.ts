import { mapFeatureTogglesToFrontendObject } from '@/mapper/StrapiApiToFrontendMapper';
import type { FeatureToggle } from '@/models/ui-models';
import { fetchFeatureTogglesFromStrapi } from '@/services/api/StrapiApi';

export const fetchFeatureToggles = async (): Promise<FeatureToggle[]>  => {
  try {
    const { data: responseData } = await fetchFeatureTogglesFromStrapi();

    const featureToggleData = responseData.data;

    return mapFeatureTogglesToFrontendObject(featureToggleData);
  } catch (error) {
    console.log(error);

    return [];
    //todo: implement error handling
  }
};