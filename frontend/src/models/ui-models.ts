import { type Moment } from 'moment';

import type { strapiMediaDto } from '@/models/typesFromStrapiApi';

export type HiddenForUserPlaceholder = 'Hidden sample text';

export const HiddenDefaultValue =  'Hidden sample text';
export interface PersonalInformation {
  firstname: string,
  lastname: string,
  birthday: Moment,
  age: number,
  professionalExperienceStart: Moment,
  professionalExperienceYears: number,
  introductionText: string,
  image: strapiMediaDto
  location: string | HiddenForUserPlaceholder,
  mailAddress: string | HiddenForUserPlaceholder,
  phone: string | HiddenForUserPlaceholder,
  lookingFor: string | null,
  currentJob: string | null,
  currentEmployer: string | null,
}