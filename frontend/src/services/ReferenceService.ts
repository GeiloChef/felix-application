import {
  mapReferencesToFrontendObject
} from '@/mapper/StrapiApiToFrontendMapper';
import type { Reference } from '@/models/ui-models';
import { fetchReferencesFromStrapi } from '@/services/api/StrapiApi';

export const fetchReferences = async (): Promise<Reference[]>  => {
  try {
    const { data: responseData } = await fetchReferencesFromStrapi();

    const referencesData = responseData.data;

    return mapReferencesToFrontendObject(referencesData);
  } catch (error) {
    console.log(error);

    return [];
    //todo: implement error handling
  }
};