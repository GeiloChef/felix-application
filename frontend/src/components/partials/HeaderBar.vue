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

        <Button
          v-if="featureToggleStore.isFeatureActive(AvailableFeatures.Internationalization)"
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
          <div class="flex flex-row items-center gap-8">
            <div>{{$t('language')}}</div>
            <Dropdown
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
  import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown';
  import Menubar from 'primevue/menubar';
  import OverlayPanel from 'primevue/overlaypanel';
  import { computed, type Ref, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { AvailableFeatures } from '@/models/core';
  import { useDataStore } from '@/stores/dataStore';
  import { useFeatureToggleStore } from '@/stores/featureToggleStore';
  import { useLanguageStore } from '@/stores/languageStore';
  import { openLinkInNewTab } from '@/utils/coreUtils';

  const { locale } = useI18n();

  const featureToggleStore = useFeatureToggleStore();

  const dataStore = useDataStore();
  const { personalInformation, fullName } = storeToRefs(dataStore);

  const languageStore = useLanguageStore();
  const { selectedLanguage, languages } = storeToRefs(languageStore);

  const SettingsOverlay: Ref<typeof OverlayPanel | null> = ref(null);
  const toggleSettingsMenu = (event: MouseEvent | PointerEvent) => {
    if (SettingsOverlay.value) {
      SettingsOverlay.value.toggle(event);
    }
  };

  const processLanguageChange = (event: DropdownChangeEvent) => {
    languageStore.processLanguageChange(event.value);
  };
</script>
