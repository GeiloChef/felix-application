<template>
  <Menubar class="rounded-none shadow-lg border-b-2 border-b-gray-600">
    <template #start>
      <div class="flex align-items-center gap-0 sm:gap-2 select-none">
        <Avatar
          v-if="personalInformation.image"
          :image="personalInformation.image.formats!.small.url"
          :alt="personalInformation.image.alternativeText"
          shape="circle"
          size="large"/>
        <div class="flex items-center font-bold ml-0 sm:ml-2 gap-0 sm:gap-2">
          <router-link :to="redirectToMainPage">
            <span>
              {{ fullName }}
            </span>
          </router-link>
          <Divider
            v-if="userHasAcceptedCookies"
            layout="vertical" />
          <div
            v-if="userHasAcceptedCookies"
            class="hidden sm:flex -ml-2">
            <Button
              v-if="personalInformation.githubProfile"
              severity="secondary"
              class="h-10 flex flex-row gap-2 px-2"
              text
              @click="openLinkInNewTab(personalInformation.githubProfile.url)">
              <FontAwesomeIcon
                size="xl"
                icon="fa-brands fa-github" />
              <span class="hidden md:block">
                Github
              </span>
            </Button>
            <Button
              v-if="personalInformation.linkedInProfile"
              class="h-10 flex flex-row gap-2 px-2"
              text
              @click="openLinkInNewTab(personalInformation.linkedInProfile.url)">
              <FontAwesomeIcon
                size="xl"
                icon="fa-brands fa-linkedin" />
              <span class="hidden md:block">
                LinkedIn
              </span>
            </Button>
          </div>
        </div>
      </div>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <Button
          v-if="userHasAcceptedCookies && featureToggleStore.isFeatureActive(AvailableFeatures.DigitalTour)"
          :label="$t('start-a-tour')"
          size="small" />

        <Button
          class="block lg:hidden"
          text
          size="small"
          severity="success"
          @click="fileDownloadStore.toggleFileDownloadDialog">
          <FontAwesomeIcon
            icon="file-download"
            size="xl"/>
        </Button>

        <Button
          text
          size="small"
          severity="secondary"
          @click="toggleSettingsMenu($event)">
          <FontAwesomeIcon
            size="xl"
            icon="fa-gear" />
        </Button>

      </div>
    </template>
  </Menubar>
  <SettingsOverlay ref="SettingsOverlayRef" />
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import Avatar from 'primevue/avatar';
  import Button from 'primevue/button';
  import Divider from 'primevue/divider';
  import Menubar from 'primevue/menubar';
  import { computed, type Ref, ref } from 'vue';

  import SettingsOverlay from '@/components/partials/SettingsOverlay.vue';
  import { AvailableFeatures } from '@/models/core';
  import { useDataStore } from '@/stores/dataStore';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useFileDownloadStore } from '@/stores/fileDownloadStore';
  import { useUserInfoStore } from '@/stores/userInfoStore';
  import { openLinkInNewTab } from '@/utils/coreUtils';

  const featureToggleStore = useFeatureToggleStore();
  const fileDownloadStore = useFileDownloadStore();

  const userInfoStore = useUserInfoStore();
  const { userHasAcceptedCookies } = storeToRefs(userInfoStore);

  const dataStore = useDataStore();
  const { personalInformation, fullName } = storeToRefs(dataStore);

  const SettingsOverlayRef: Ref<typeof SettingsOverlay | null> = ref(null);

  const toggleSettingsMenu = (event: MouseEvent | PointerEvent | null) => {
    if (SettingsOverlayRef.value) {
      SettingsOverlayRef.value.toggle(event);
    }
  };

  const redirectToMainPage = computed(() => {
    if (userHasAcceptedCookies.value) {
      return { name: 'home' };
    } else {
      return { name: 'login' };
    }
  });
</script>
