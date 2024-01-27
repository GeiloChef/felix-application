export interface LanguageItem {
  key: string,
  name: string,
}

export interface LanguagesObject {
  german: LanguageItem,
  english: LanguageItem
}

export const Languages: LanguagesObject = {
  german: {
    key: 'de',
    name: 'Deutsch'
  },
  english: {
    key: 'en',
    name: 'English'
  }
};

export enum ColoredBackgroundCardTypes {
  Bright = 'BRIGHT',
  Dark = 'DARK'
}

export enum UnitOfTimeForDifference {
  Year = 'years',
  Month = 'months',
  Day = 'days'
}

export enum DateFormats {
  MonthYear = 'MMMM YYYY',
  DayMonthYearShort = 'DD.MM.YYYY',
  DayMonthYearLong = 'DD. MMMM YYYY',
}

export enum ButtonIconPosition {
  Left = 'left',
  Right = 'right'
}