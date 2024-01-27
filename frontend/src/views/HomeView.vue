<template>
  <main>
    <PersonalInformationCard/>
    <CVTimelineCard/>
    <ColoredBackgroundCard :color-type="ColoredBackgroundCardTypes.Bright">
      bright
    </ColoredBackgroundCard>
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
  import ColoredBackgroundCard from '@/components/partials/ColoredBackgroundCard.vue';
  import { ColoredBackgroundCardTypes } from '@/models/core';
  import { useDataStore } from '@/stores/dataStore';

  const dataStore = useDataStore();

  onBeforeMount((): void => {
    dataStore.fetchAllInformationForHomeView();
  });
</script>
