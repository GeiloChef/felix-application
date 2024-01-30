<template>
  <div :key="selectedLanguage.strapiLocalCode">
    <div v-if="shouldShouldHeaderBar">
      <HeaderBar />
    </div>
    <!--  Used to show global messages to  -->
    <Toast />
    <RouterView :key="selectedLanguage.strapiLocalCode" />

  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Toast, { type ToastMessageOptions } from 'primevue/toast';
  import { useToast } from 'primevue/usetoast';
  import { computed, onMounted, watch } from 'vue';
  import { RouterView, useRoute } from 'vue-router';

  import HeaderBar from '@/components/partials/HeaderBar.vue';
  import { useDataStore } from '@/stores/dataStore';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useLanguageStore } from '@/stores/languageStore';
  import { useToastMessageStore } from '@/stores/toastMessageStore';
  import { useUserInfoStore } from '@/stores/userInfoStore';

  const route = useRoute();

  const toast = useToast();

  const toastMessageStore = useToastMessageStore();
  const { toastMessages } = storeToRefs(toastMessageStore);

  const featureToggleStore = useFeatureToggleStore();

  const dataStore = useDataStore();

  const languageStore = useLanguageStore();
  const { selectedLanguage } = storeToRefs(languageStore);

  const userInfoStore = useUserInfoStore();
  const { isUserLoggedIn } = storeToRefs(userInfoStore);

  const shouldShouldHeaderBar = computed((): boolean => {
    return route.name !== 'login';
  });

  onMounted(async (): Promise<void> => {
    await featureToggleStore.getFeatureTogglesFromService();
    await languageStore.getLanguagesFromService();

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
