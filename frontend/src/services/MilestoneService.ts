import {
  mapMilestonesToFrontendObject
} from '@/mapper/StrapiApiToFrontendMapper';
import type { Milestone } from '@/models/ui-models';
import { fetchMilestonesFromStrapi } from '@/services/api/StrapiApi';

export const fetchMilestones = async (): Promise<Milestone[]>  => {
  try {
    const { data: responseData } = await fetchMilestonesFromStrapi();

    const milestoneData = responseData.data;

    return mapMilestonesToFrontendObject(milestoneData);
  } catch (error) {
    console.log(error);

    return [];
    //todo: implement error handling
  }
};