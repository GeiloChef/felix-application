/**
 * Here are all the types we expect from the BE
 *
 * they will get mapped in the service file to a fitting type from the 'frontendDataModel.ts'
 */

export interface StrapiApiResponseMeta {
  meta?: never
}

export interface StrapiApiResponse<T> {
  data: {
    id: number,
    attributes: T
  },
  meta: StrapiApiResponseMeta,
}
export interface StrapiMediaApiResponse<T> {
  data: {
    id: number,
    attributes: T
  },
  localizations: {
    data: []
  }
}

export interface StrapiData {
  createdAt: string,
  updatedAt: string,
}

export interface strapiMediaDto extends StrapiData {
  name: string,
  alternativeText: string | null,
  caption: string | null,
  width: number,
  height: number,
  formats: strapiMediaFormats,
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  previewUrl: string | null,
  provider: string,
  provider_metadata: null
}

export interface strapiMediaFormat {
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

export interface strapiMediaFormats {
  thumbnail: strapiMediaFormat,
  medium: strapiMediaFormat,
  large: strapiMediaFormat,
  small: strapiMediaFormat
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
  image: StrapiMediaApiResponse<strapiMediaDto>
}

export interface PersonalInformationPrivateStrapiDto extends StrapiData {
  locale: string,
  location: string,
  mailAddress: string,
  phone: string,
}