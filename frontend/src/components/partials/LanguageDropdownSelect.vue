<template>
  <Dropdown
    data-test-id="Language-select"
    v-model="selectedLanguage"
    :options="languages"
    optionLabel="name"
    :placeholder="$t('select-a-language')"
    class="w-full md:w-14rem"
    @change="processLanguageChange">
    <template #value="slotProps">
      <div
        v-if="slotProps.value"
        class="flex flex-row gap-4 items-center">
        <CountryFlag
          class="!-mt-2"
          :country="slotProps.value.flagCode" />
        <div>{{ slotProps.value.name }}</div>
      </div>
    </template>
    <template #option="slotProps">
      <div
        v-if="slotProps.option"
        class="flex flex-row gap-4 items-center">
        <CountryFlag
          class="!-mt-2"
          :country="slotProps.option.flagCode" />
        <div>
          {{ slotProps.option.name }}
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">

  import { storeToRefs } from 'pinia';
  import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown';

  import { useLanguageStore } from '@/stores/languageStore';

  const languageStore = useLanguageStore();
  const { selectedLanguage, languages } = storeToRefs(languageStore);

  const processLanguageChange = (event: DropdownChangeEvent) => {
    languageStore.processLanguageChange(event.value);
  };
</script>