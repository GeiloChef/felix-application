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