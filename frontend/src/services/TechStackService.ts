import {
  mapMilestonesToFrontendObject, mapTechStackToFrontendObject
} from '@/mapper/StrapiApiToFrontendMapper';
import type { Milestone, TechStackEntry } from '@/models/ui-models';
import { fetchMilestonesFromStrapi, fetchTechStackFromStrapi } from '@/services/api/StrapiApi';

export const fetchTechStack = async (): Promise<TechStackEntry[]>  => {
  try {
    const { data: responseData } = await fetchTechStackFromStrapi();

    const techStackData = responseData.data;

    return mapTechStackToFrontendObject(techStackData);
  } catch (error) {
    console.log(error);

    return [];
    //todo: implement error handling
  }
};