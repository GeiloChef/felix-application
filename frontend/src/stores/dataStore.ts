import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type { Milestone, PersonalInformation, Reference, TechStackEntry } from '@/models/ui-models';
import { fetchMilestones } from '@/services/MilestoneService';
import { fetchPersonalInformation } from '@/services/PersonalInformationService';
import { fetchReferences } from '@/services/ReferenceService';
import { fetchTechStack } from '@/services/TechStackService';

/**
 * @description Stores all the data that is coming from the strapi backend that will NOT be changed
 * it mainly just there to access data in every component
 */
export const useDataStore = defineStore('dataStore', () => {
  const personalInformation: Ref<PersonalInformation> = ref({} as PersonalInformation);
  const milestones: Ref<Milestone[]> = ref([]);
  const techStack: Ref<TechStackEntry[]> = ref([]);
  const references: Ref<Reference[]> = ref([]);

  const getPersonalInformationFromService = async () => {
    fetchPersonalInformation().then((data: PersonalInformation) => personalInformation.value = data);
  };

  const getMilestonesFromService = async () => {
    fetchMilestones().then((data: Milestone[]) => {
      milestones.value = data;
    });
  };

  const getTechStackFromService = async () => {
    fetchTechStack().then((data: TechStackEntry[]) => {
      techStack.value = data;
    });
  };

  const getReferencesFromService = async () => {
    fetchReferences().then((data: Reference[]) => {
      references.value = data;
    });
  };

  const fetchAllInformationForHomeView = async () => {
    getPersonalInformationFromService();
    getMilestonesFromService();
    getTechStackFromService();
    getReferencesFromService();
  };

  return {
    personalInformation,
    milestones,
    techStack,
    references,
    fetchAllInformationForHomeView
  };
});
