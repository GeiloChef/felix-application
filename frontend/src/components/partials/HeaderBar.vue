<template>
  <Menubar class="rounded-none shadow-lg border-b-2 border-b-gray-600">
    <template #start>
      <div class="flex align-items-center gap-2 select-none">
        <Avatar
          image="https://t3.ftcdn.net/jpg/02/43/12/34/240_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          shape="circle"
          size="large"/>
        <div class="flex items-center font-bold ml-2 gap-2">
          <span>
            {{ fullName }}
          </span>
          <Divider layout="vertical" />
          <div class="flex -ml-2">
            <Button
              v-if="personalInformation.githubProfile"
              severity="secondary"
              class="h-10 flex flex-row gap-2 px-2"
              text
              @click="openLinkInNewTab(personalInformation.githubProfile.url)">
              <font-awesome-icon
                size="xl"
                icon="fa-brands fa-github" />
              <span>Github</span>
            </Button>
            <Button
              v-if="personalInformation.linkedInProfile"
              class="h-10 flex flex-row gap-2 px-2"
              text
              @click="openLinkInNewTab(personalInformation.linkedInProfile.url)">
              <font-awesome-icon
                size="xl"
                icon="fa-brands fa-linkedin" />
              <span>LinkedIn</span>
            </Button>
          </div>
        </div>
      </div>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <Button
          :label="$t('start-a-tour')"
          size="small" />
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Avatar from 'primevue/avatar';
  import Button from 'primevue/button';
  import Divider from 'primevue/divider';
  import Menubar from 'primevue/menubar';
  import { computed } from 'vue';

  import { useDataStore } from '@/stores/dataStore';
  import { openLinkInNewTab } from '@/utils/coreUtils';

  const dataStore = useDataStore();

  const { personalInformation } = storeToRefs(dataStore);

  const fullName = computed((): string => {
    return personalInformation.value.firstname + ' ' + personalInformation.value.lastname;
  });
</script>
