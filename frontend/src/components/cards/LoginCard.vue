<template>
  <ColoredBackgroundCard
    show-top-triangle
    full-screen-card
    :title="$t('login')"
    :color-type="ColoredBackgroundCardTypes.Dark">

    <div
      class="flex items-center justify-center mt-8 text-2xl text-center"
      v-html="$t('login-page.welcome-explanation')">

    </div>

    <div
      v-if="featureToggleStore.isFeatureActive(AvailableFeatures.Internationalization)"
      class="flex flex-row justify-center mt-8">
      <SelectButton
        v-model="selectedLanguage"
        :options="languages"
        optionLabel="name"
        :optionDisabled="(option: LocaleEntry) => option.id === selectedLanguage.id"
        dataKey="id"
        @change="changeLanguage">
        <template #option="slotProps">
          <div class="flex flex-row items-center gap-4">
            <CountryFlag
              class="!-mt-2"
              :country="slotProps.option.flagCode" />
            <span>
              {{ slotProps.option.name }}
            </span>
          </div>
        </template>
      </SelectButton>
    </div>

    <div class="mt-12 flex flex-row justify-center">
      <LoginForm />
    </div>
  </ColoredBackgroundCard>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import SelectButton, { type SelectButtonChangeEvent } from 'primevue/selectbutton';

  import ColoredBackgroundCard from '@/components/partials/ColoredBackgroundCard.vue';
  import LoginForm from '@/components/partials/LoginForm.vue';
  import { AvailableFeatures, ColoredBackgroundCardTypes } from '@/models/core';
  import type { LocaleEntry } from '@/models/ui-models';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useLanguageStore } from '@/stores/languageStore';

  const languageStore = useLanguageStore();
  const { languages, selectedLanguage } = storeToRefs(languageStore);

  const featureToggleStore = useFeatureToggleStore();
  const changeLanguage = (event: SelectButtonChangeEvent) => {
    languageStore.processLanguageChange(event.value);
  };
</script>

<style>

</style>