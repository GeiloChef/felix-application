<template>
  <SnapScrollCard>
    <div class="flex flex-col h-full justify-around">
      <div class="flex justify-center items-center">
        <div class="flex flex-col gap-12 justify-center items-center">
          <img
            class="personal-image-snap-scroll overflow-hidden rounded-full border-blue-400 border-4 shadow-xl"
            v-if="personalInformation.image"
            :src="personalInformation.image.formats!.large.url"
            :alt="personalInformation.image.alternativeText">
          <div class="flex flex-row justify-center text-center text-4xl gap-4">
            <div>
              {{ personalInformation.firstname }}
            </div>
            <div>
              {{ personalInformation.lastname }}
            </div>
          </div>
          <div class="flex flex-col justify-center text-center text-4xl gap-4 px-4">
            <Chip
              v-for="chip in chipsForPersonalInformation"
              class="pl-0 pr-3 bg-gray-900 rounded-full border-blue-900 border">
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
            <Chip class="pl-0 pr-3 bg-blue-900 rounded-full">
              <span class="bg-white rounded-full w-10 h-10 mr-2 flex items-center justify-center">
                <FontAwesomeIcon
                  class="text-gray-900"
                  size="lg"
                  icon="magnifying-glass" />
              </span>
              <span class="line-clamp-1 text-left">
                {{ personalInformation.lookingFor }}
              </span>
            </Chip>
          </div>
        </div>
      </div>
    </div>
  </SnapScrollCard>
</template>

<script setup lang="ts">

  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import Chip from 'primevue/chip';

  import SnapScrollCard from '@/components/partials/SnapScroll/SnapScrollCard.vue';
  import { useDataStore } from '@/stores/dataStore';

  const dataStore = useDataStore();
  const { personalInformation, chipsForPersonalInformation } = storeToRefs(dataStore);
</script>

<style lang="scss">
.personal-image-snap-scroll {
  height: 33vh;
  width: 33vh;
}
</style>