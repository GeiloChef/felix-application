import {
  mapLocaleToFrontendObject,
} from '@/mapper/StrapiApiToFrontendMapper';
import type { LocaleEntry } from '@/models/ui-models';
import { fetchLocalesFromStrapi } from '@/services/api/StrapiApi';

export const fetchLocales = async (): Promise<LocaleEntry[]>  => {
  try {
    const { data: responseData } = await fetchLocalesFromStrapi();

    return mapLocaleToFrontendObject(responseData);
  } catch (error) {
    console.log(error);

    return [];
    //todo: implement error handling
  }
};