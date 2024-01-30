<template>
  <div :key="selectedLanguage.strapiLocalCode">
    <div>
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
  import { onMounted, watch } from 'vue';
  import { RouterView } from 'vue-router';

  import HeaderBar from '@/components/partials/HeaderBar.vue';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useLanguageStore } from '@/stores/languageStore';
  import { useToastMessageStore } from '@/stores/toastMessageStore';

  const toast = useToast();

  const toastMessageStore = useToastMessageStore();
  const { toastMessages } = storeToRefs(toastMessageStore);

  const featureToggleStore = useFeatureToggleStore();

  const languageStore = useLanguageStore();
  const { selectedLanguage } = storeToRefs(languageStore);

  onMounted(async (): Promise<void> => {
    await featureToggleStore.getFeatureTogglesFromService();
    languageStore.getLanguagesFromService();
  });

  watch(toastMessages.value, async (newToastMessages: ToastMessageOptions[]) => {
    if (newToastMessages.length) {
      for (const toastMessage of newToastMessages) {
        toast.add(toastMessage);
      }

      toastMessages.value = [];
    }
  }, { deep: false, immediate: true });
</script>
