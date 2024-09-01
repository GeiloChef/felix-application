<template>
  <ColoredBackgroundCard
    v-show="personalInformation"
    :color-type="ColoredBackgroundCardTypes.Bright"
    hide-triangle
    no-horizontal-margin
    no-vertical-margin>
    <div class="md-personal-information-card-parent flex flex-col lg:flex-row gap-8 justify-content items-center overflow-hidden relative xl:pb-0">
      <div class="lg:w-full xl:w-1/2">
        <div class="md-profile-image-parent overflow-hidden">
          <img
            class="hidden lg:block md-profile-image"
            v-if="personalInformation.image"
            :src="personalInformation.image.formats!.large.url"
            :alt="personalInformation.image.alternativeText">
        </div>
        <img
          class="profile-image block lg:hidden mb-12 shadow-xl"
          v-if="personalInformation.image"
          :src="personalInformation.image.formats!.large.url"
          :alt="personalInformation.image.alternativeText">
      </div>
      <div class="w-5/6 lg:w-full xl:w-1/2 h-full flex items-center justify-center mb-16 lg:mb-0">
        <div>
          <div class="text-xl lg:text-4xl text-center pr-0 lg:pr-10">
            {{ introductionText }}
          </div>
          <!--    Chips for all breakpoints besides the md-breakpoint of tailwind - md-breakpoint is handled above    -->
          <div class="mt-24 gap-8 hidden xl:flex flex-col xl:flex-row justify-center items-center">
            <Chip
              v-for="chip in chipsForPersonalInformation"
              class="!pl-0 !pr-3 !bg-gray-900 !rounded-full h-10">
              <span class="bg-white rounded-full !w-10 !h-10 flex items-center justify-center">
                <FontAwesomeIcon
                  class="text-gray-900"
                  size="lg"
                  :icon="chip.icon" />
              </span>
              <span class="ml-2 pr-2">
                {{ chip.text }}
              </span>
            </Chip>
          </div>
          <div class="flex justify-center items-center mt-12">
            <Chip class="!pl-0 !pr-3 !bg-gray-900 !rounded-full">
              <span class="bg-white rounded-full w-12 h-12 !flex !items-center !justify-center">
                <FontAwesomeIcon
                  class="text-gray-900"
                  size="lg"
                  icon="magnifying-glass" />
              </span>
              <span class="ml-2 pr-2">
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
  const { personalInformation, chipsForPersonalInformation } = storeToRefs(dataStore);

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
</script>

<style>
@media (min-width: 1024px) {
  .md-personal-information-card-parent {
    height: 40rem;
  }

  .md-profile-image-parent {
    border-radius: 100%;
    width: 100vw;
    left: -52vw;
    height: 70rem;
    top: -18.5rem;
    @apply bg-black absolute
  }

  .md-profile-image {
    object-fit: cover;
    width: 50%;
    height: 84%;
    margin-left: 50%;
  }
}

.profile-image {
  background: black;
  border-radius: 0 0 20% 20%;
  width: 100vw;
  left: 0;
  height: 45vh;
  top: 0;
  @apply  object-fill
}
</style>