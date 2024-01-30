import { useI18n } from 'vue-i18n';

import { i18n } from '@/i18n/config';

/**
 * @description Returns the translated value for a number to display small numbers as translated strings. Numbers above 12 will just be returned as string
 * @param number - only works with numbers from 1-12
 */
export const getTranslatedNumber = (number: number): string => {
  const t = i18n.global.t;

  switch (number) {
    case 0:
      return t('numbers.zero');
    case 1:
      return t('numbers.one');
    case 2:
      return t('numbers.two');
    case 3:
      return t('numbers.three');
    case 4:
      return t('numbers.four');
    case 5:
      return t('numbers.five');
    case 6:
      return t('numbers.six');
    case 7:
      return t('numbers.seven');
    case 8:
      return t('numbers.eight');
    case 9:
      return t('numbers.nine');
    case 10:
      return t('numbers.ten');
    case 11:
      return t('numbers.eleven');
    case 12:
      return t('numbers.twelve');
    default:
      return number.toString();
  }
};