<template>
  <main>
    <PersonalInformationCard/>
    <ColoredBackgroundCard :color-type="ColoredBackgroundCardTypes.Dark">
      dark
    </ColoredBackgroundCard>
    <ColoredBackgroundCard :color-type="ColoredBackgroundCardTypes.Bright">
      bright
    </ColoredBackgroundCard>
  </main>
</template>

<script setup lang="ts">

  import { onBeforeMount, onMounted } from 'vue';

  import PersonalInformationCard from '@/components/cards/PersonalInformationCard.vue';
  import ColoredBackgroundCard from '@/components/partials/ColoredBackgroundCard.vue';
  import { ColoredBackgroundCardTypes } from '@/models/core';
  import { useDataStore } from '@/stores/dataStore';

  const dataStore = useDataStore();

  onBeforeMount((): void => {
    dataStore.fetchAllInformationForHomeView();
  });
</script>
