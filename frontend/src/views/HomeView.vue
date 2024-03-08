<template>
  <main>
    <template v-if="!userSelectedSettings.useSnapScrollHomeView">
      <PersonalInformationCard/>
      <CVTimelineCard/>
      <TechStackCard/>
      <ReferencesCard/>
    </template>

    <template v-else>
      <HomeViewSnapScroll />
    </template>
  </main>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { onBeforeMount } from 'vue';

  import CVTimelineCard from '@/components/cards/CVTimelineCard.vue';
  import PersonalInformationCard from '@/components/cards/PersonalInformationCard.vue';
  import ReferencesCard from '@/components/cards/ReferencesCard.vue';
  import TechStackCard from '@/components/cards/TechStackCard.vue';
  import { useDataStore } from '@/stores/dataStore';
  import { useFileDownloadStore } from '@/stores/fileDownloadStore';
  import { useUserInfoStore } from '@/stores/userInfoStore';
  import HomeViewSnapScroll from '@/views/HomeViewSnapScroll.vue';

  const dataStore = useDataStore();
  const fileDownloadStore = useFileDownloadStore();

  const userInfoStore = useUserInfoStore();
  const { userSelectedSettings } = storeToRefs(userInfoStore);

  onBeforeMount((): void => {
    dataStore.fetchAllInformationForHomeView();
    fileDownloadStore.getFileDownloadsFromService();
  });
</script>
