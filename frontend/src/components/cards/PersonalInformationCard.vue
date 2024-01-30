<template>
  <ColoredBackgroundCard
    v-show="personalInformation"
    :color-type="ColoredBackgroundCardTypes.Bright"
    hide-triangle
    no-margin>
    <div class="personal-information-card-parent flex justify-content items-center overflow-hidden relative">
      <div class="w-1/2">
        <div class="profile-image-parent overflow-hidden">
          <img
            class="profile-image"
            v-if="personalInformation.image"
            :src="personalInformation.image.formats!.large.url"
            :alt="personalInformation.image.alternativeText">
        </div>
      </div>
      <div class="w-1/2 h-full flex items-center justify-center">
        <div>
          <div class="text-4xl text-center pr-10">
            {{ introductionText }}
          </div>
          <div class="mt-24 gap-8 flex justify-center items-center">
            <Chip
              v-for="chip in chips"
              class="pl-0 pr-3 bg-gray-900 rounded-full">
              <span class="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                <FontAwesomeIcon
                  class="text-gray-900"
                  size="lg"
                  :icon="chip.icon" />
              </span>
              <span class="ml-2">
                {{ chip.text }}
              </span>
            </Chip>
          </div>
          <div class="flex justify-center items-center mt-12">
            <Chip class="pl-0 pr-3 bg-gray-900 rounded-full">
              <span class="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                <FontAwesomeIcon
                  class="text-gray-900"
                  size="lg"
                  icon="magnifying-glass" />
              </span>
              <span class="ml-2">
                {{ personalInformation.lookingFor }}
              </span>
            </Chip>
          </div>
        </div>
      </div>
    </div>
  </ColoredBackgroundCard>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import moment from 'moment';
  import { storeToRefs } from 'pinia';
  import Chip from 'primevue/chip';
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import ColoredBackgroundCard from '@/components/partials/ColoredBackgroundCard.vue';
  import { ColoredBackgroundCardTypes } from '@/models/core';
  import { useDataStore } from '@/stores/dataStore';
  import { getTranslatedNumber } from '@/utils/formatUtils';

  const { t } = useI18n();

  const dataStore = useDataStore();
  const { personalInformation } = storeToRefs(dataStore);

  const ageChipText = computed((): string => {
    return t('years-old', personalInformation.value.age, { count: personalInformation.value.age });
  });

  const professionalExperienceChipText = computed((): string => {
    return t('professional-experience', personalInformation.value.professionalExperienceYears, { count: personalInformation.value.professionalExperienceYears });
  });

  const introductionText = computed((): string => {
    const ageMarker = '__age__';
    const professionalExperienceYearsMarker = '__professionalExperienceYears__';


    if (personalInformation.value.introductionText) {
      const professionalExperienceYearsString = getTranslatedNumber(personalInformation.value.professionalExperienceYears);

      return personalInformation.value.introductionText
        .replace(ageMarker, personalInformation.value.age.toString())
        .replace(professionalExperienceYearsMarker, professionalExperienceYearsString);
    }

    return '';
  });

  interface ChipInformation {
    icon: string,
    text: string
  }

  const chips = computed((): ChipInformation[] => {
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
        text: personalInformation.value.currentJob ?? '',
      },
      {
        icon: 'fa-business-time',
        text: personalInformation.value.currentEmployer ?? '',
      },
    ];
  });
</script>

<style>
.personal-information-card-parent {
  height: 40rem;
}

.profile-image-parent {
  border-radius: 100%;
  width: 100vw;
  left: -52vw;
  height: 70rem;
  top: -18.5rem;
  @apply bg-black absolute
}

.profile-image {
  object-fit: cover;
  width: 50%;
  height: 84%;
  margin-left: 50%;
}
</style>