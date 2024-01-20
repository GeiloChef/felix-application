import { createI18n } from 'vue-i18n';


import deutsch from './de.json';
import english from './en.json';

import { Languages } from '@/models/core';

const messages = {
  en: english,
  de: deutsch
};

export const i18n = createI18n({
  legacy: false,
  locale: Languages.german.key,
  fallbackLocale: Languages.english.key,
  silentTranslationWarn: true,
  globalInjection: true,
  messages
});