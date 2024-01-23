import moment from 'moment';
import { useI18n } from 'vue-i18n';

import { UnitOfTimeForDifference } from '@/models/core';

export const calculateDifferenceBetweenDateAndToday = (date: moment.Moment, unitOfTime: UnitOfTimeForDifference) => {
  const today = moment();
  const difference = today.diff(date, unitOfTime);

  return isNaN(difference) ? 0 : difference;
};

export const getTranslatedNumber = (number: number): string => {
  const { t } = useI18n();

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