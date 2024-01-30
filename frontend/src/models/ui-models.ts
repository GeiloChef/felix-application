import moment, { type Moment } from 'moment';

import type {
  StrapiMediaApiResponse,
  StrapiMediaDto,
  StrapiMediaFormats,
  StrapiMultiMediaApiResponse
} from '@/models/typesFromStrapiApi';

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
  image: MediaObject,
  location: string | HiddenForUserPlaceholder,
  mailAddress: string | HiddenForUserPlaceholder,
  phone: string | HiddenForUserPlaceholder,
  lookingFor: string | null,
  currentJob: string | null,
  currentEmployer: string | null,
  githubProfile: ExternalLink | '',
  linkedInProfile: ExternalLink | '',
}

export enum MilestoneType {
  SchoolEducation = 'SCHOOL_EDUCATION',
  CodingExperience = 'CODING_EXPERIENCE',
  WorkingExperience = 'WORKING_EXPERIENCE'
}

export enum TechStackCategory {
  Coding = 'CODING',
  Design = 'Design',
}

export enum ReferenceType {
  WorkingExperience = 'WORKING_EXPERIENCE',
  CodingExperience = 'CODING_EXPERIENCE',
  Education = 'EDUCATION'
}

export interface MediaObject {
  name: string,
  alternativeText: string,
  caption: string,
  width: number,
  height: number,
  formats: StrapiMediaFormats | null,
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  previewUrl: string | null,
}

export interface Milestone {
  title: string,
  description: string,
  startDate: Moment,
  endDate: Moment,
  locale: string,
  type: MilestoneType,
  attachments:  MediaObject[]
}

export interface TechStackEntry {
  orderNumber: number,
  name: string,
  category: TechStackCategory,
  skillRating: number,
  local: string,
  image: MediaObject
}

export interface ExternalLink {
  name: string,
  description: string,
  url: string,
}

export interface Reference {
  name: string,
  subHeadline: string,
  description: string,
  type: ReferenceType,
  externalLinks: ExternalLink[],
  attachments: MediaObject[]
}

export interface FeatureToggle {
  name: string,
  active: boolean
}

export interface LocaleEntry {
  id: number,
  name: string,
  strapiLocalCode: string,
  i18nLocaleCode: string,
  momentLocaleCode: string,
  flagCode: string,
  isDefault: boolean,
}

