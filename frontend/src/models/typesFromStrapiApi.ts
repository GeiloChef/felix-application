/**
 * Here are all the types we expect from the BE
 *
 * they will get mapped in the service file to a fitting type from the 'frontendDataModel.ts'
 */
import { MilestoneType, ReferenceType, TechStackCategory } from '@/models/ui-models';

export interface StrapiApiResponseMeta {
  meta?: never
}

export interface DataObject<T> {
  id: number,
  attributes: T
}

export interface StrapiApiResponse<T> {
  data: DataObject<T>,
  meta: StrapiApiResponseMeta,
}

export interface StrapiArrayApiResponse<T> {
  data: DataObject<T>[],
  meta: StrapiApiResponseMeta,
}

export interface StrapiMediaApiResponse<T> {
  data: DataObject<T>,
  localizations: {
    data: []
  }
}

export interface StrapiMultiMediaApiResponse<T> {
  data: DataObject<T>[],
  localizations: {
    data: []
  }
}

export interface StrapiData {
  createdAt: string,
  updatedAt: string,
}

export interface StrapiMediaDto extends StrapiData {
  name: string,
  alternativeText: string | null,
  caption: string | null,
  width: number,
  height: number,
  formats: StrapiMediaFormats | null,
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  previewUrl: string | null,
  provider: string,
  provider_metadata: null
}

export interface StrapiMediaFormat {
  name: string,
  hash: string,
  ext: string,
  mime: string,
  path: string | null,
  width: number,
  height: number,
  size: number,
  url: string
}

export interface StrapiMediaFormats {
  thumbnail: StrapiMediaFormat,
  medium: StrapiMediaFormat,
  large: StrapiMediaFormat,
  small: StrapiMediaFormat
}

export interface PersonalInformationPublicStrapiDto extends StrapiData {
  firstname: string,
  locale: string,
  lastname: string,
  birthday: string,
  professionalExperienceStart: string,
  introductionText: string,
  lookingFor: string | null,
  currentJob: string | null,
  currentEmployer: string | null,
  githubProfile: StrapiMediaApiResponse<ExternalLinkDto> | null,
  linkedInProfile: StrapiMediaApiResponse<ExternalLinkDto> | null,
  image: StrapiMediaApiResponse<StrapiMediaDto>
}

export interface PersonalInformationPrivateStrapiDto extends StrapiData {
  locale: string,
  location: string,
  mailAddress: string,
  phone: string,
}

export interface MilestoneStrapiDto extends StrapiData {
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  locale: string,
  type: MilestoneType,
  attachments:  StrapiMultiMediaApiResponse<StrapiMediaDto> | null
}

export interface TechStackStrapiDto extends StrapiData {
  orderNumber: number,
  name: string,
  category: TechStackCategory,
  skillRating: number,
  locale: string,
  image: StrapiMediaApiResponse<StrapiMediaDto>
}

export interface ExternalLinkDto extends StrapiData {
  name: string,
  description: string,
  link: string,
}

export interface ReferencesStrapiDto extends StrapiData {
  name: string,
  subHeadline: string,
  description: string,
  external_links: StrapiMultiMediaApiResponse<ExternalLinkDto> | null,
  referenceType: ReferenceType,
  skillRating: number,
  locale: string,
  attachments: StrapiMultiMediaApiResponse<StrapiMediaDto> | null
}

export interface FeatureTogglesDto extends StrapiData {
  name: string;
  active: boolean
}

export interface LocaleEntryDto extends StrapiData {
  id: number,
  name: string,
  code: string,
  isDefault: boolean
}