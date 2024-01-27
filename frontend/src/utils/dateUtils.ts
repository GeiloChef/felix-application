import moment, { type Moment } from 'moment';
import 'moment/dist/locale/de';
import { useI18n } from 'vue-i18n';

import { DateFormats, UnitOfTimeForDifference } from '@/models/core';

/**
 * @description calculates the difference between a given date and today. You can specify a unit of time that will be used to
 * calculate the difference (e.x. Years, Months or Days)
 * @param date {Moment}
 * @param unitOfTime {UnitOfTimeForDifference}
 * @param today {Moment} - should not be set and is used for testing purposes only
 * @example
 * const sampleDate = moment(13-05-1997);
 * calculateDifferenceBetweenDateAndToday(sampleDate, UnitOfTimeForDifference.Year)
 * // -> return the years between 13-05-1997 and today || e.x. 26
 *
 * Note: if the calculated difference is not a number, 0 will be returned
 */
export const calculateDifferenceBetweenDateAndToday = (date: moment.Moment, unitOfTime: UnitOfTimeForDifference, today: moment.Moment = moment()) => {
  if (!date || typeof date === 'number'  || typeof date === 'string' || typeof date === 'boolean') return 0;

  let difference = today.diff(date, unitOfTime);

  difference = (difference < 0) ? difference * -1 : difference;

  return isNaN(difference) ? 0 : difference;
};

/**
 * @description Returns the translated value for a number to display small numbers as translated strings. Numbers above 12 will just be returned as string
 * @param number - only works with numbers from 1-12
 */
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

/**
 * @description Takes a moment date object and outputs a formatted date depending on the locale selected by the user
 * @param date {Moment} - moment date object
 * @param format {DateFormats} - default: DD MM YYYY
 * @returns datestring {string} - formatted date string like: 13.05.1997
 */
export const formatDateForUi = (date: Moment, format: DateFormats = DateFormats.DayMonthYearShort) => {
  moment.locale('de');

  return date.format(format);
};