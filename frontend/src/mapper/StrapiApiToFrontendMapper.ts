import moment from 'moment';

import { UnitOfTimeForDifference } from '@/models/core';
import type {
  DataObject,
  ExternalLinkDto,
  FeatureTogglesDto, FileDto, LegalInformationDto,
  LocaleEntryDto,
  MilestoneStrapiDto,
  PersonalInformationPrivateStrapiDto,
  PersonalInformationPublicStrapiDto,
  ReferencesStrapiDto,
  StrapiMediaDto,
  TechStackStrapiDto,
  UserDataDto,
} from '@/models/typesFromStrapiApi';
import {
  type ExternalLink,
  type FeatureToggle,
  type FileObject,
  HiddenDefaultValue,
  type LegalInformation,
  type LocaleEntry,
  type MediaObject,
  type Milestone,
  type PersonalInformation,
  type Reference,
  type TechStackEntry,
  type UserData
} from '@/models/ui-models';
import { createLinkToDocumentOnToApi } from '@/utils/coreUtils';
import { calculateDifferenceBetweenDateAndToday } from '@/utils/dateUtils';
import {
  convertLanguageCodeToi18nLocale,
  convertLanguageCodeToMomentLocale,
  getFlagCodeFromStrapiLocale
} from '@/utils/languageUtils';

export const mapPersonalInformationToFrontendObject = (publicPersonalInformation: PersonalInformationPublicStrapiDto,
                                                       privatePersonalInformation: null | PersonalInformationPrivateStrapiDto): PersonalInformation => {

  const githubLink = publicPersonalInformation.githubProfile?.data?.attributes ? mapExternalLinkToFrontendObject(publicPersonalInformation.githubProfile.data.attributes) : '';
  const linkedInLink = publicPersonalInformation.linkedInProfile?.data?.attributes ? mapExternalLinkToFrontendObject(publicPersonalInformation.linkedInProfile.data.attributes) : '';

  return {
    firstname: publicPersonalInformation.firstname,
    lastname: publicPersonalInformation.lastname,
    birthday: moment(publicPersonalInformation.birthday),
    age: calculateDifferenceBetweenDateAndToday(moment(publicPersonalInformation.birthday), UnitOfTimeForDifference.Year),
    professionalExperienceStart: moment(publicPersonalInformation.professionalExperienceStart),
    professionalExperienceYears: calculateDifferenceBetweenDateAndToday(moment(publicPersonalInformation.professionalExperienceStart), UnitOfTimeForDifference.Year),
    introductionText: publicPersonalInformation.introductionText,
    image: mapStrapiMediaToFrontendObject(publicPersonalInformation.image.data.attributes),
    location: privatePersonalInformation?.location ?? HiddenDefaultValue,
    mailAddress: privatePersonalInformation?.mailAddress ?? HiddenDefaultValue,
    phone: privatePersonalInformation?.phone ?? HiddenDefaultValue,
    lookingFor: publicPersonalInformation.lookingFor,
    currentJob: publicPersonalInformation.currentJob,
    currentEmployer: publicPersonalInformation.currentEmployer,
    githubProfile: githubLink,
    linkedInProfile: linkedInLink,
  };
};

export const mapStrapiMediaToFrontendObject = (mediaObject: StrapiMediaDto): MediaObject => {


  if (mediaObject.formats) {
    if (mediaObject.formats.thumbnail) mediaObject.formats.thumbnail.url = createLinkToDocumentOnToApi(mediaObject.formats.thumbnail.url);

    if (mediaObject.formats.medium) mediaObject.formats.medium.url = createLinkToDocumentOnToApi(mediaObject.formats.medium.url);

    if (mediaObject.formats.small) mediaObject.formats.small.url = createLinkToDocumentOnToApi(mediaObject.formats.small.url);

    if (mediaObject.formats.large) mediaObject.formats.large.url = createLinkToDocumentOnToApi(mediaObject.formats.large.url);
  }


  return {
    name: mediaObject.name,
    alternativeText: mediaObject.alternativeText || '',
    caption: mediaObject.caption || '',
    width: mediaObject.width,
    height: mediaObject.height,
    formats: mediaObject.formats || null,
    hash: mediaObject.hash,
    ext: mediaObject.ext,
    mime: mediaObject.ext,
    size: mediaObject.size,
    url: createLinkToDocumentOnToApi(mediaObject.url),
    previewUrl: mediaObject.previewUrl ? createLinkToDocumentOnToApi(mediaObject.previewUrl) : null,
  };
};

export const mapMilestonesToFrontendObject = (milestonesFromStrapi:  DataObject<MilestoneStrapiDto>[]): Milestone[] => {
  const milestones: Milestone[] = [];

  milestonesFromStrapi.map((milestoneFromStrapi) => {
    const publicFiles = milestoneFromStrapi.attributes.publicFiles ?? null;
    const mappedPublicFiles: FileObject[] = [];

    if (publicFiles && publicFiles.data) {
      publicFiles.data.map((publicFile) => {
        const mappedPublicFile = mapStrapiFileToFrontendObject(publicFile, true);

        mappedPublicFiles.push(mappedPublicFile);
      });
    }

    const privateFiles = milestoneFromStrapi.attributes.privateFiles ?? null;
    const mappedPrivateFiles: FileObject[] = [];

    if (privateFiles && privateFiles.data) {
      privateFiles.data.map((privateFile) => {
        const mappedPrivateFile = mapStrapiFileToFrontendObject(privateFile, false);

        mappedPrivateFiles.push(mappedPrivateFile);
      });
    }

    const mappedMilestone = {
      title: milestoneFromStrapi.attributes.title,
      description: milestoneFromStrapi.attributes.description,
      startDate: moment(milestoneFromStrapi.attributes.startDate),
      endDate: milestoneFromStrapi.attributes.endDate ? moment(milestoneFromStrapi.attributes.endDate) : null,
      locale: milestoneFromStrapi.attributes.locale,
      type: milestoneFromStrapi.attributes.type,
      files: [...mappedPublicFiles, ...mappedPrivateFiles]
    };

    milestones.push(mappedMilestone);
  });


  return milestones;
};

export const mapTechStackToFrontendObject = (techStackFromStrapi: DataObject<TechStackStrapiDto>[]): TechStackEntry[] => {
  const techStack: TechStackEntry[] = [];

  techStackFromStrapi.map((techStackEntryFromStrapi) => {
    const mappedImage = mapStrapiMediaToFrontendObject(techStackEntryFromStrapi.attributes.image.data.attributes);

    const mappedTechStackEntry: TechStackEntry = {
      orderNumber: techStackEntryFromStrapi.attributes.orderNumber,
      name: techStackEntryFromStrapi.attributes.name,
      category: techStackEntryFromStrapi.attributes.category,
      skillRating: techStackEntryFromStrapi.attributes.skillRating,
      local: techStackEntryFromStrapi.attributes.locale,
      image: mappedImage
    };

    techStack.push(mappedTechStackEntry);
  });

  return techStack;
};

export const mapExternalLinkToFrontendObject = (externalLink: ExternalLinkDto): ExternalLink => {
  return {
    name: externalLink.name,
    description: externalLink.description,
    url: externalLink.link
  };
};

export const mapStrapiFileToFrontendObject = (file:  DataObject<FileDto>, isPublic: boolean): FileObject => {
  return {
    id: file.id,
    name: file.attributes.name,
    description: file.attributes.description,
    locale: file.attributes.locale,
    isPublic: isPublic
  };
};

export const mapReferencesToFrontendObject = (referencesFromStrapi: DataObject<ReferencesStrapiDto>[]): Reference[] => {
  const references: Reference[] = [];

  referencesFromStrapi.map((referenceFromStrapi) => {
    const publicFiles = referenceFromStrapi.attributes.publicFiles ?? null;
    const mappedPublicFiles: FileObject[] = [];

    if (publicFiles && publicFiles.data) {
      publicFiles.data.map((publicFile) => {
        const mappedPublicFile = mapStrapiFileToFrontendObject(publicFile, true);

        mappedPublicFiles.push(mappedPublicFile);
      });
    }

    const privateFiles = referenceFromStrapi.attributes.privateFiles ?? null;
    const mappedPrivateFiles: FileObject[] = [];

    if (privateFiles && privateFiles.data) {
      privateFiles.data.map((privateFile) => {
        const mappedPrivateFile = mapStrapiFileToFrontendObject(privateFile, false);

        mappedPrivateFiles.push(mappedPrivateFile);
      });
    }

    const externalLinks = referenceFromStrapi.attributes.external_links ?? null;
    const mappedExternalLinks: ExternalLink[] = [];

    if (externalLinks && externalLinks.data) {
      externalLinks.data.map((externalLink) => {
        const mappedLink = mapExternalLinkToFrontendObject(externalLink.attributes);

        mappedExternalLinks.push(mappedLink);
      });
    }

    const mappedReference: Reference = {
      name: referenceFromStrapi.attributes.name,
      subHeadline: referenceFromStrapi.attributes.subHeadline,
      description: referenceFromStrapi.attributes.description,
      type: referenceFromStrapi.attributes.referenceType,
      externalLinks: mappedExternalLinks,
      files: [...mappedPublicFiles, ...mappedPrivateFiles]
    };

    references.push(mappedReference);
  });

  return references;
};

export const mapFeatureTogglesToFrontendObject = (featureTogglesFromStrapi: DataObject<FeatureTogglesDto>[]): FeatureToggle[] => {
  const mappedFeatureToggles: FeatureToggle[] = [];

  featureTogglesFromStrapi.map((featureToggleFromStrapi) => {
    const mappedToggle: FeatureToggle = {
      name: featureToggleFromStrapi.attributes.name,
      active: featureToggleFromStrapi.attributes.active
    };

    mappedFeatureToggles.push(mappedToggle);
  });

  return mappedFeatureToggles;
};

export const mapLocaleToFrontendObject = (localesFromStrapi: LocaleEntryDto[]): LocaleEntry[] => {
  const mappedLocales: LocaleEntry[] = [];

  localesFromStrapi.map((localeFromStrapi) => {
    const mappedLocale: LocaleEntry = {
      id: localeFromStrapi.id,
      name: localeFromStrapi.name,
      strapiLocalCode: localeFromStrapi.code,
      i18nLocaleCode: convertLanguageCodeToi18nLocale(localeFromStrapi.code),
      momentLocaleCode : convertLanguageCodeToMomentLocale(localeFromStrapi.code),
      flagCode: getFlagCodeFromStrapiLocale(localeFromStrapi.code),
      isDefault: localeFromStrapi.isDefault
    };

    mappedLocales.push(mappedLocale);
  });

  return mappedLocales;
};

export const mapUserToFrontendObject = (user: UserDataDto, jwt: string): UserData => {
  return {
    id: user.id,
    username: user.username,
    email: user.email ?? '',
    jwt: jwt,
    blocked: user.blocked,
    confirmed: user.confirmed,
  };
};

export const mapLegalInformationToFrontendObject = (legalInformationFromStrapi: DataObject<LegalInformationDto>): LegalInformation => {
  return {
    imprint: legalInformationFromStrapi.attributes.imprint,
    privacyPolicy: legalInformationFromStrapi.attributes.privacyPolicy
  };
};