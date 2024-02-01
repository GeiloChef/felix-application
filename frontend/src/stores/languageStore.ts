import { useLocalStorage } from '@vueuse/core';
import moment from 'moment';
import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

import { i18n } from '@/i18n/config';
import { AvailableFeatures, Languages } from '@/models/core';
import type { LocaleEntry } from '@/models/ui-models';
import axiosInstance from '@/services/api/axiosInstance';
import { fetchLocales } from '@/services/LocaleService';
import { useFeatureToggleStore } from '@/stores/featureToggleStore';

export const useLanguageStore = defineStore('language', () => {
  const featureToggleStore = useFeatureToggleStore();

  const languages: Ref<LocaleEntry[]> = ref([]);
  const selectedLanguage = useLocalStorage('selectedLanguage', {} as LocaleEntry);

  const getLanguagesFromService = async () => {
    if (featureToggleStore.isFeatureActive(AvailableFeatures.Internationalization)) {
      fetchLocales().then((data: LocaleEntry[]) => {
        languages.value = data;

        if (!selectedLanguage.value.id) {
          selectedLanguage.value = languages.value.find(language => language.isDefault);
        }

        processLanguageChange(selectedLanguage.value);
      });
    } else {
      i18n.global.locale.value = Languages.german.i18nLocale as 'de';
      moment.locale(Languages.german.momentLocale);
      axiosInstance.defaults.params['locale'] = Languages.german.strapiLocale;
    }
  };

  /**
   * This method does all the magic when it comes to selecting a language. It changes the locales of i18n and moment so every other method and
   * component that uses one of them can easily access the newly updated language
   * @param language
   */
  const processLanguageChange = (language: LocaleEntry) => {
    if (language && language.strapiLocalCode) {
      i18n.global.locale.value = language.i18nLocaleCode as 'en' | 'de' | 'es';
      moment.locale(language.momentLocaleCode);
      axiosInstance.defaults.params['locale'] = language.strapiLocalCode;
    }
  };

  return {
    getLanguagesFromService,
    processLanguageChange,
    selectedLanguage,
    languages,
  };
});
