<template>
  <div>
    <OverlayPanel
      id="settingsOverlay"
      ref="settings_op"
      class="min-w-64">
      <div class="text-lg font-bold">
        {{ $t('settings') }}
      </div>
      <Divider />
      <div class="flex flex-col gap-8">
        <div
          v-if="featureToggleStore.isFeatureActive(AvailableFeatures.SnapScrollHomeView)"
          class="flex flex-row items-center justify-between gap-8">
          <div class="flex flex-row gap-2 items-center">
            {{ $t('easy-home-view') }}
            <div
              v-tooltip.focus.bottom="{
                value: snapScrollSettingsTooltipText,
                fitContent: false,
                class: 'w-64',
                autoHide: false,
                escape: false
              }"
              tabindex="1">
              <FontAwesomeIcon
                icon="circle-info"
                class="text-white mt-1 opacity-75 cursor-pointer" />
            </div>
          </div>
          <InputSwitch
            v-model="userSelectedSettings.useSnapScrollHomeView"
            :disabled="!isMobile" />
        </div>

        <!-- Language Selection -->
        <div
          v-if="featureToggleStore.isFeatureActive(AvailableFeatures.Internationalization)"
          class="flex flex-row items-center gap-8">
          <div>{{$t('language')}}</div>
          <LanguageDropdownSelect />
        </div>


        <!-- Social Links -->
        <div
          v-if="userHasAcceptedCookies"
          class="flex flex-col gap-4 mt-8">
          <div>
            {{ $t('my-socials') }}
          </div>
          <Button
            v-if="personalInformation.githubProfile"
            severity="secondary"
            class="h-10 flex flex-row gap-2 px-2"
            outlined
            @click="openLinkInNewTab(personalInformation.githubProfile.url)">
            <FontAwesomeIcon
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
            <FontAwesomeIcon
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

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import Button from 'primevue/button';
  import Divider from 'primevue/divider';
  import InputSwitch from 'primevue/inputswitch';
  import OverlayPanel from 'primevue/overlaypanel';
  import { computed, ref, type Ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';

  import ButtonWithIcon from '@/components/elements/ButtonWithIcon.vue';
  import LanguageDropdownSelect from '@/components/partials/LanguageDropdownSelect.vue';
  import { i18n } from '@/i18n/config';
  import { AvailableFeatures, ButtonIconPosition } from '@/models/core';
  import { useApplicationStore } from '@/stores/applicationStore';
  import { useDataStore } from '@/stores/dataStore';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useUserInfoStore } from '@/stores/userInfoStore';
  import { openLinkInNewTab } from '@/utils/coreUtils';

  const { t } = useI18n();
  const router = useRouter();

  const featureToggleStore = useFeatureToggleStore();

  const userInfoStore = useUserInfoStore();
  const { isUserLoggedIn, userHasAcceptedCookies, userSelectedSettings } = storeToRefs(userInfoStore);

  const dataStore = useDataStore();
  const { personalInformation } = storeToRefs(dataStore);

  const applicationStore = useApplicationStore();
  const { isMobile } = storeToRefs(applicationStore);

  const snapScrollSettingsTooltipText = computed((): string => {
    let tooltipText = t('snap-scroll-setting-explanation');

    if (!isMobile.value) {
      tooltipText += `<br><br><span class="text-red-300 font-bold">${t('only-available-on-mobile-devices')}</span>`;
    }

    return tooltipText;
  });

  const goToLoginPage = (): void => {
    router.push({ name: 'login' });
  };

  const logout = (): void => {
    userInfoStore.processLogout();
    toggle(null);
  };

  const settings_op: Ref<typeof OverlayPanel | null> = ref(null);
  const toggle = (event: PointerEvent | null) => {
    if (settings_op.value) {
      settings_op.value.toggle(event);
    }
  };

  defineExpose({
    toggle
  });

</script>