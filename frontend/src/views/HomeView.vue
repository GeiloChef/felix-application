<template>
  <main>
    <PersonalInformationCard />
    <CVTimelineCard />
    <TechStackCard />
    <ReferencesCard />
  </main>
</template>

<script setup lang="ts">


  import { onBeforeMount } from 'vue';

  import CVTimelineCard from '@/components/cards/CVTimelineCard.vue';
  import PersonalInformationCard from '@/components/cards/PersonalInformationCard.vue';
  import ReferencesCard from '@/components/cards/ReferencesCard.vue';
  import TechStackCard from '@/components/cards/TechStackCard.vue';
  import { useDataStore } from '@/stores/dataStore';

  const dataStore = useDataStore();

  onBeforeMount((): void => {
    dataStore.fetchAllInformationForHomeView();
  });
</script>
