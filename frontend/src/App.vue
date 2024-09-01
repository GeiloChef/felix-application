<template>
  <div
    class="relative w-full"
    :key="selectedLanguage.strapiLocalCode">
    <div
      v-if="shouldShowHeaderBar"
      ref="HeaderBarRef">
      <HeaderBar />
    </div>
    <!--  Used to show global messages to  -->
    <Toast />
    <RouterView :key="selectedLanguage.strapiLocalCode" />
    <div ref="FooterBarRef">
      <FooterBar v-if="showFooterBar"/>
    </div>

    <!--  Cookie Accept Dialog  -->
    <CookiesDialog />

    <!--  Guest Disclaimer Dialog  -->
    <GuestDisclaimerDialog />

    <!--  Global Download Dialog  -->
    <GlobalDownloadDialog />

    <div class="fixed bottom-10 w-full flex justify-end">
      <Button
        v-if="showDownloadDialogButton"
        class="hidden fixed h-12 w-12 justify-center bottom-10 right-10"
        size="large"
        severity="success"
        @click="fileDownloadStore.toggleFileDownloadDialog">
        <FontAwesomeIcon
          icon="file-download"
          class="text-black" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import Button from 'primevue/button';
  import Toast, { type ToastMessageOptions } from 'primevue/toast';
  import { useToast } from 'primevue/usetoast';
  import { computed, onBeforeMount, onMounted, type Ref, ref, watch } from 'vue';
  import { RouterView, useRoute } from 'vue-router';

  import CookiesDialog from '@/components/partials/CookiesDialog.vue';
  import FooterBar from '@/components/partials/FooterBar.vue';
  import GlobalDownloadDialog from '@/components/partials/GlobalDownloadDialog.vue';
  import GuestDisclaimerDialog from '@/components/partials/GuestDisclaimerDialog.vue';
  import HeaderBar from '@/components/partials/HeaderBar.vue';
  import { useApplicationStore } from '@/stores/applicationStore';
  import { useDataStore } from '@/stores/dataStore';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useFileDownloadStore } from '@/stores/fileDownloadStore';
  import { useLanguageStore } from '@/stores/languageStore';
  import { useToastMessageStore } from '@/stores/toastMessageStore';
  import { useUserInfoStore } from '@/stores/userInfoStore';

  const HeaderBarRef: Ref<HTMLElement | undefined> = ref();
  const FooterBarRef: Ref<HTMLElement | undefined> = ref();

  const route = useRoute();
  const toast = useToast();

  const toastMessageStore = useToastMessageStore();
  const { toastMessages } = storeToRefs(toastMessageStore);

  const featureToggleStore = useFeatureToggleStore();

  const applicationStore = useApplicationStore();
  const { isMobile } = storeToRefs(applicationStore);

  const dataStore = useDataStore();
  const fileDownloadStore = useFileDownloadStore();

  const languageStore = useLanguageStore();
  const { selectedLanguage } = storeToRefs(languageStore);

  const userInfoStore = useUserInfoStore();
  const { userSelectedSettings } = storeToRefs(userInfoStore);

  const shouldShowHeaderBar = computed((): boolean => {
    return route.name !== 'login';
  });

  const showDownloadDialogButton = computed((): boolean => {
    return !!route.meta.hasDownloadDialogButton;
  });

  const showFooterBar = computed((): boolean => {
    const isOnHomeView = route.name === 'home';

    return !(isMobile.value && userSelectedSettings.value.useSnapScrollHomeView) || !isOnHomeView;
  });

  onBeforeMount(async (): Promise<void> => {
    await featureToggleStore.getFeatureTogglesFromService();
    await languageStore.getLanguagesFromService();
  });

  onMounted(async (): Promise<void> => {
    await dataStore.getLegalInformationFromService();

    // asynchronously fetch all data needed for the home view
    dataStore.fetchAllInformationForHomeView();

    determineMaxBodyHeight();
  });

  /**
   * This method is used to get the information about the height of the header, footer and window to calculate the actual maximum
   * view width the content on the user screen can have. The logic itself as well as the calculated height is stored in the pinia store
   * todo: call this when the screen is resized
   */
  const determineMaxBodyHeight = (): void => {
    const headerHeight = HeaderBarRef.value ? HeaderBarRef.value.clientHeight : 0;
    const footerHeight = FooterBarRef.value ? FooterBarRef.value.clientHeight : 0;
    const innerWindowHeight = window.innerHeight;

    applicationStore.calculateMaxBodyHeight(headerHeight, footerHeight, innerWindowHeight);
  };

  watch(toastMessages, async (newToastMessages: ToastMessageOptions[]) => {
    if (newToastMessages.length) {
      for (const toastMessage of newToastMessages) {
        toast.add(toastMessage);
      }

      toastMessages.value = [];
    }
  }, { deep: true, immediate: true });
</script>

<style lang="scss">
.p-toast .p-toast-message .p-toast-message-content {
  border: none
}
</style>
