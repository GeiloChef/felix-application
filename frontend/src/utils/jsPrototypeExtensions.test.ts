import '@/utils/jsPrototypeExtension';
import { describe, expect, test } from 'vitest';

describe('capitalize the first letter of a given string', () => {
  test('return the given string without spaces with the first letter capitalized', () => {
    const testString = 'verylongTestString';
    const capitalizedString = testString.capitalizeFirstLetter();
    const expectedOutputString = 'VerylongTestString';

    expect(capitalizedString).toBe(expectedOutputString);
  });

  test('return the given string with spaces with the first letter capitalized', () => {
    const testString = 'test string 1';
    const capitalizedString = testString.capitalizeFirstLetter();
    const expectedOutputString = 'Test string 1';

    expect(capitalizedString).toBe(expectedOutputString);
  });

  test('check capitalized first letter method for empty string', () => {
    const testString = '';
    const capitalizedString = testString.capitalizeFirstLetter();
    const expectedOutputString = '';

    expect(capitalizedString).toBe(expectedOutputString);
  });

  test('check capitalized first letter method for numbers as string', () => {
    const testString = '501';
    const capitalizedString = testString.capitalizeFirstLetter();
    const expectedOutputString = '501';

    expect(capitalizedString).toBe(expectedOutputString);
  });
});