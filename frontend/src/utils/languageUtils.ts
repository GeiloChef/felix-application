import { Languages } from '@/models/core';
import type { LocaleEntry } from '@/models/ui-models';

export const convertLanguageCodeToMomentLocale = (languageCodeFromStrapi: string) => {
  switch (languageCodeFromStrapi) {
    case Languages.english.strapiLocale:
      return Languages.english.momentLocale;
    case Languages.german.strapiLocale:
      return Languages.german.momentLocale;
    case Languages.spanish.strapiLocale:
      return Languages.spanish.momentLocale;
    default:
      return languageCodeFromStrapi;
  }
};

export const convertLanguageCodeToi18nLocale = (languageCodeFromStrapi: string) => {
  switch (languageCodeFromStrapi) {
    case Languages.english.strapiLocale:
      return Languages.english.i18nLocale;
    case Languages.german.strapiLocale:
      return Languages.german.i18nLocale;
    case Languages.spanish.strapiLocale:
      return Languages.spanish.i18nLocale;
    default:
      return languageCodeFromStrapi;
  }
};

export const getFlagCodeFromStrapiLocale = (languageCodeFromStrapi: string) => {
  switch (languageCodeFromStrapi) {
    case Languages.english.strapiLocale:
      return Languages.english.flagCode;
    case Languages.german.strapiLocale:
      return Languages.german.flagCode;
    case Languages.spanish.strapiLocale:
      return Languages.spanish.flagCode;
    default:
      return languageCodeFromStrapi;
  }
};