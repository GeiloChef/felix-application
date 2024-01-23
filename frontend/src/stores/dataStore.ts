import { defineStore } from 'pinia';
import { ref, computed, type Ref } from 'vue';

import type { PersonalInformation } from '@/models/ui-models';
import { fetchPersonalInformation } from '@/services/PersonalInformationService';

/**
 * @description Stores all the data that is coming from the strapi backend that will NOT be changed
 * it mainly just there to access data in every component
 */
export const useDataStore = defineStore('dataStore', () => {
  const personalInformation: Ref<PersonalInformation> = ref({} as PersonalInformation);

  const getPersonalInformationFromService = async () => {
    fetchPersonalInformation().then((data: PersonalInformation) => personalInformation.value = data);
  };

  const fetchAllInformationForHomeView = async () => {
    getPersonalInformationFromService();
  };

  return {
    personalInformation,
    fetchAllInformationForHomeView
  };
});
