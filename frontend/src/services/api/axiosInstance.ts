import axios from 'axios';

import type { LocaleEntry } from '@/models/ui-models';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL
});

/**
 * todo: interceptors
 */

let languageConstant = 'de';

if (localStorage.getItem('selectedLanguage')) {
  const storedLocaleEntry = JSON.parse(localStorage.getItem('selectedLanguage')!) as LocaleEntry;

  languageConstant = storedLocaleEntry.strapiLocalCode;
}


instance.defaults.params = {
    'locale': languageConstant,
    'populate': '*'
};

const authorizationBearer = localStorage.getItem('jwt') ?? '';

instance.defaults.headers.common = {
    'Authorization': `Bearer ${authorizationBearer}`
};

export default instance;