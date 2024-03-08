import { type RemovableRef, useLocalStorage } from '@vueuse/core';
import _ from 'lodash';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type {
  LegalInformation,
  Milestone,
  PersonalInformation,
  Reference,
  TechStackEntry
} from '@/models/ui-models';
import { fetchLegalInformation } from '@/services/LegalInformationService';
import { fetchMilestones } from '@/services/MilestoneService';
import { fetchPersonalInformation } from '@/services/PersonalInformationService';
import { fetchReferences } from '@/services/ReferenceService';
import { fetchTechStack } from '@/services/TechStackService';
import { getTranslatedNumber } from '@/utils/formatUtils';

/**
 * @description Stores all the data that is coming from the strapi backend that will NOT be changed
 * it mainly just there to access data in every component
 */
export const useDataStore = defineStore('dataStore', () => {
  const { t } = useI18n();

  const personalInformation: Ref<PersonalInformation> = ref({} as PersonalInformation);
  const milestones: Ref<Milestone[]> = ref([]);
  const techStack: Ref<TechStackEntry[]> = ref([]);
  const references: Ref<Reference[]> = ref([]);
  const legalInformation: RemovableRef<LegalInformation> = useLocalStorage('legalInformation', {} as LegalInformation);


  const fullName = computed((): string => {
    return personalInformation.value.firstname + ' ' + personalInformation.value.lastname;
  });

  const getPersonalInformationFromService = async () => {
    fetchPersonalInformation().then((data: PersonalInformation) => personalInformation.value = data);
  };

  const getMilestonesFromService = async () => {
    fetchMilestones().then((data: Milestone[]) => {
      milestones.value = _.orderBy(data, ['startDate', 'endDate'], ['asc', 'desc']);
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

  const getLegalInformationFromService = async () => {
    fetchLegalInformation().then((data: LegalInformation | false) => {
      if (data) {
        legalInformation.value = data;
      }
    });
  };

  const ageChipText = computed((): string => {
    return t('years-old', personalInformation.value.age, { count: personalInformation.value.age });
  });

  const professionalExperienceChipText = computed((): string => {
    return t('professional-experience', personalInformation.value.professionalExperienceYears, { count: personalInformation.value.professionalExperienceYears });
  });

  const currentJobChipText = computed((): string => {
    return personalInformation.value.currentJob ?? '';
  });

  interface ChipInformation {
    icon: string,
    text: string
  }

  const chipsForPersonalInformation = computed((): ChipInformation[] => {
    return [
      {
        icon: 'fa-calendar-days',
        text: ageChipText.value
      },
      {
        icon: 'fa-laptop-code',
        text: professionalExperienceChipText.value
      },
      {
        icon: 'fa-brands fa-vuejs',
        text: currentJobChipText.value,
      },
    ];
  });

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
    fullName,
    legalInformation,
    chipsForPersonalInformation,
    fetchAllInformationForHomeView,
    getLegalInformationFromService
  };
});
