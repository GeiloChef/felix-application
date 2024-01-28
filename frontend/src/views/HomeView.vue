<template>
  <main>
    <PersonalInformationCard />
    <CVTimelineCard />
    <TechStackCard />
    <ColoredBackgroundCard :color-type="ColoredBackgroundCardTypes.Dark">
      dark
    </ColoredBackgroundCard>
  </main>
</template>

<script setup lang="ts">

  import moment from 'moment';
  import { onBeforeMount } from 'vue';

  import CVTimelineCard from '@/components/cards/CVTimelineCard.vue';
  import PersonalInformationCard from '@/components/cards/PersonalInformationCard.vue';
  import TechStackCard from '@/components/cards/TechStackCard.vue';
  import ColoredBackgroundCard from '@/components/partials/ColoredBackgroundCard.vue';
  import { ColoredBackgroundCardTypes } from '@/models/core';
  import { useDataStore } from '@/stores/dataStore';

  const dataStore = useDataStore();

  onBeforeMount((): void => {
    dataStore.fetchAllInformationForHomeView();
  });
</script>
