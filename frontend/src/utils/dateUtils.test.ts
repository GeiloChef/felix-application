import moment from 'moment';
import { describe, expect, test } from 'vitest';

import { UnitOfTimeForDifference } from '@/models/core';
import { calculateDifferenceBetweenDateAndToday, getTranslatedNumber } from '@/utils/dateUtils';

describe('calculate difference between a given date and today in years', () => {
  test('calculate the difference in years for past dates', () => {
    const unitOfTime = UnitOfTimeForDifference.Year;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInThePast = moment('1997-05-13');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInThePast, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 26;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });

  test('calculate the difference in years for dates in the near past (< 1 year)', () => {
    const unitOfTime = UnitOfTimeForDifference.Year;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInTheNearPast = moment('2023-12-24');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInTheNearPast, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);

  });

  test('calculate the difference in years for dates in the near future (< 1 year)', () => {
    const unitOfTime = UnitOfTimeForDifference.Year;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInTheNearFuture = moment('2024-12-24');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInTheNearFuture, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);

  });

  test('calculate the difference in years for dates in the far future', () => {
    const unitOfTime = UnitOfTimeForDifference.Year;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInThePast = moment('2030-05-05');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInThePast, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 6;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);

  });
});

describe('calculate difference between a given date and today in months', () => {
  test('calculate the difference in month for past dates', () => {
    const unitOfTime = UnitOfTimeForDifference.Month;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInThePast = moment('2023-05-13');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInThePast, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 8;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });

  test('calculate the difference in month for dates in the near past (< 1 month)', () => {
    const unitOfTime = UnitOfTimeForDifference.Month;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInTheNearPast = moment('2024-01-01');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInTheNearPast, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);

  });

  test('calculate the difference in month for dates in the near future (< 1 month)', () => {
    const unitOfTime = UnitOfTimeForDifference.Month;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInTheNearFuture = moment('2024-02-24');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInTheNearFuture, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);

  });

  test('calculate the difference in month for dates in the far future', () => {
    const unitOfTime = UnitOfTimeForDifference.Month;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInThePast = moment('2030-05-05');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInThePast, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 75; // (6 years * 12 month) + 3 month

    expect(calculatedDifferenceForDate).toBe(expectedOutput);

  });
});

describe('calculate difference between a given date and today in days', () => {
  test('calculate the difference in days for past dates', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInThePast = moment('2023-05-13');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInThePast, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 259;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });

  test('calculate the difference if day is the same as today', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const sameDayAsReference = moment('2024-01-27');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(sameDayAsReference, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);

  });

  test('calculate the difference in month for dates in the far future', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const dateInThePast = moment('2030-05-05');
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(dateInThePast, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 2290;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);

  });
});

describe('test fallback for date difference calculation', () => {
  test('return 0 in case the date to test for is null', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const invalidDate = null;
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(invalidDate, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });

  test('return 0 in case the date to test for is undefined', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const invalidDate = undefined;
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(invalidDate, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });

  test('return 0 in case the date to test for is 0', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const invalidDate = 0;
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(invalidDate, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });

  test('return 0 in case the date to test for is any kind of number', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const invalidDate = 10;
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(invalidDate, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });

  test('return 0 in case the date to test for is any kind of number as string', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const invalidDate = '10';
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(invalidDate, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });

  test('return 0 in case the date to test for is boolean false', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const invalidDate = false;
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(invalidDate, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });

  test('return 0 in case the date to test for is boolean true', () => {
    const unitOfTime = UnitOfTimeForDifference.Day;
    const dateAsReferenceForTesting = moment('2024-01-27');

    const invalidDate = true;
    const calculatedDifferenceForDate = calculateDifferenceBetweenDateAndToday(invalidDate, unitOfTime, dateAsReferenceForTesting);
    const expectedOutput = 0;

    expect(calculatedDifferenceForDate).toBe(expectedOutput);
  });
});
