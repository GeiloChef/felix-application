<template>
  <Menubar class="rounded-none shadow-lg border-b-2 border-b-gray-600">
    <template #start>
      <div class="flex align-items-center gap-0 sm:gap-2 select-none">
        <Avatar
          class="hidden sm:block"
          image="https://t3.ftcdn.net/jpg/02/43/12/34/240_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
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
              <font-awesome-icon
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
              <font-awesome-icon
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
          text
          size="small"
          severity="secondary"
          @click="toggleSettingsMenu($event)">
          <font-awesome-icon
            size="xl"
            icon="fa-gear" />
        </Button>

        <OverlayPanel
          ref="SettingsOverlay"
          class="min-w-64">
          <div class="text-lg font-bold">
            {{ $t('settings') }}
          </div>
          <Divider />
          <div class="flex flex-col">

            <div
              v-if="featureToggleStore.isFeatureActive(AvailableFeatures.Internationalization)"
              class="flex flex-row items-center gap-8">
              <div>{{$t('language')}}</div>
              <LanguageDropdownSelect />
            </div>

            <div
              v-if="userHasAcceptedCookies"
              class="flex flex-col gap-4 my-12">
              <div>
                {{ $t('my-socials') }}
              </div>
              <Button
                v-if="personalInformation.githubProfile"
                severity="secondary"
                class="h-10 flex flex-row gap-2 px-2"
                outlined
                @click="openLinkInNewTab(personalInformation.githubProfile.url)">
                <font-awesome-icon
                  size="xl"
                  icon="fa-brands fa-github" />
                <span class="block">
                  Github
                </span>
              </Button>
              <Button
                v-if="personalInformation.linkedInProfile"
                class="h-10 flex flex-row gap-2 px-2"
                outlined
                @click="openLinkInNewTab(personalInformation.linkedInProfile.url)">
                <font-awesome-icon
                  size="xl"
                  icon="fa-brands fa-linkedin" />
                <span class="block">
                  LinkedIn
                </span>
              </Button>
            </div>

            <Divider />

            <div class="flex flex-row items-center justify-end">
              <ButtonWithIcon
                v-if="isUserLoggedIn"
                class="!justify-end"
                icon="fa-right-from-bracket"
                :label="$t('logout')"
                :iconPosition="ButtonIconPosition.Right"
                severity="danger"
                @click="logout" />
              <ButtonWithIcon
                v-else
                :label="$t('login')"
                @click="goToLoginPage"/>
            </div>
          </div>

        </OverlayPanel>
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
  import OverlayPanel from 'primevue/overlaypanel';
  import { computed, type Ref, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import ButtonWithIcon from '@/components/elements/ButtonWithIcon.vue';
  import LanguageDropdownSelect from '@/components/partials/LanguageDropdownSelect.vue';
  import { AvailableFeatures, ButtonIconPosition } from '@/models/core';
  import { useDataStore } from '@/stores/dataStore';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useUserInfoStore } from '@/stores/userInfoStore';
  import { openLinkInNewTab } from '@/utils/coreUtils';

  const router = useRouter();

  const featureToggleStore = useFeatureToggleStore();

  const userInfoStore = useUserInfoStore();
  const { isUserLoggedIn, userHasAcceptedCookies, userHasAcceptedGuestInformation } = storeToRefs(userInfoStore);

  const dataStore = useDataStore();
  const { personalInformation, fullName } = storeToRefs(dataStore);

  const SettingsOverlay: Ref<typeof OverlayPanel | null> = ref(null);
  const toggleSettingsMenu = (event: MouseEvent | PointerEvent | null) => {
    if (SettingsOverlay.value) {
      SettingsOverlay.value.toggle(event);
    }
  };

  const goToLoginPage = (): void => {
    router.push({ name: 'login' });
  };

  const redirectToMainPage = computed(() => {
    if (userHasAcceptedCookies.value) {
      return { name: 'home' };
    } else {
      return { name: 'login' };
    }
  });

  const logout = (): void => {
    userInfoStore.processLogout();
    toggleSettingsMenu(null);
  };
</script>
