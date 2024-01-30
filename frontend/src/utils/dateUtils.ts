import moment, { type Moment } from 'moment';

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
 * @description Takes a moment date object and outputs a formatted date depending on the locale selected by the user
 * @param date {Moment} - moment date object
 * @param format {DateFormats} - default: DD MM YYYY
 * @returns datestring {string} - formatted date string like: 13.05.1997
 */
export const formatDateForUi = (date: Moment, format: DateFormats = DateFormats.DayMonthYearShort) => {
  return date.format(format);
};