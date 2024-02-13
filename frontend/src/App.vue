<template>
  <div
    class="relative"
    :key="selectedLanguage.strapiLocalCode">
    <div v-if="shouldShouldHeaderBar">
      <HeaderBar />
    </div>
    <!--  Used to show global messages to  -->
    <Toast />
    <RouterView :key="selectedLanguage.strapiLocalCode" />
    <FooterBar />

    <!--  Cookie Accept Dialog  -->
    <CookiesDialog />

    <!--  Guest Disclaimer Dialog  -->
    <GuestDisclaimerDialog />

    <!--  Global Download Dialog  -->
    <GlobalDownloadDialog />

    <Button
      v-if="showDownloadDialogButton"
      class="h-12 w-12 flex flex-row justify-center fixed bottom-16 right-10"
      size="large"
      severity="success"
      @click="fileDownloadStore.toggleFileDownloadDialog">
      <FontAwesomeIcon
        icon="file-download"
        class="text-black" />
    </Button>
  </div>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import Button from 'primevue/button';
  import Toast, { type ToastMessageOptions } from 'primevue/toast';
  import { useToast } from 'primevue/usetoast';
  import { computed, onBeforeMount, onMounted, watch } from 'vue';
  import { RouterView, useRoute } from 'vue-router';

  import CookiesDialog from '@/components/partials/CookiesDialog.vue';
  import FooterBar from '@/components/partials/FooterBar.vue';
  import GlobalDownloadDialog from '@/components/partials/GlobalDownloadDialog.vue';
  import GuestDisclaimerDialog from '@/components/partials/GuestDisclaimerDialog.vue';
  import HeaderBar from '@/components/partials/HeaderBar.vue';
  import { useDataStore } from '@/stores/dataStore';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useFileDownloadStore } from '@/stores/fileDownloadStore';
  import { useLanguageStore } from '@/stores/languageStore';
  import { useToastMessageStore } from '@/stores/toastMessageStore';
  import { useUserInfoStore } from '@/stores/userInfoStore';

  const route = useRoute();

  const toast = useToast();

  const toastMessageStore = useToastMessageStore();
  const { toastMessages } = storeToRefs(toastMessageStore);

  const featureToggleStore = useFeatureToggleStore();

  const dataStore = useDataStore();
  const fileDownloadStore = useFileDownloadStore();

  const languageStore = useLanguageStore();
  const { selectedLanguage } = storeToRefs(languageStore);

  const userInfoStore = useUserInfoStore();
  const { isUserLoggedIn } = storeToRefs(userInfoStore);

  const shouldShouldHeaderBar = computed((): boolean => {
    return route.name !== 'login';
  });

  const showDownloadDialogButton = computed((): boolean => {
    return route.meta.hasDownloadDialogButton;
  });

  onBeforeMount(async (): Promise<void> => {
    await featureToggleStore.getFeatureTogglesFromService();
    await languageStore.getLanguagesFromService();
  });

  onMounted(async (): Promise<void> => {
    await dataStore.getLegalInformationFromService();

    // asynchronously fetch all data needed for the home view
    dataStore.fetchAllInformationForHomeView();
  });

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
