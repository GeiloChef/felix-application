import moment from 'moment';

import { UnitOfTimeForDifference } from '@/models/core';
import type {
  DataObject, ExternalLinkDto, FeatureTogglesDto,
  MilestoneStrapiDto,
  PersonalInformationPrivateStrapiDto,
  PersonalInformationPublicStrapiDto, ReferencesStrapiDto, StrapiMediaDto, StrapiMediaFormats, TechStackStrapiDto,
} from '@/models/typesFromStrapiApi';
import {
  type ExternalLink,
  type FeatureToggle,
  HiddenDefaultValue,
  type MediaObject,
  type Milestone,
  type PersonalInformation,
  type Reference,
  type TechStackEntry
} from '@/models/ui-models';
import { createLinkToDocumentOnToApi } from '@/utils/coreUtils';
import { calculateDifferenceBetweenDateAndToday } from '@/utils/dateUtils';

export const mapPersonalInformationToFrontendObject = (publicPersonalInformation: PersonalInformationPublicStrapiDto,
                                                       privatePersonalInformation: null | PersonalInformationPrivateStrapiDto): PersonalInformation => {

  const githubLink = publicPersonalInformation.githubProfile ? mapExternalLinkToFrontendObject(publicPersonalInformation.githubProfile.data.attributes) : '';
  const linkedInLink = publicPersonalInformation.linkedInProfile ? mapExternalLinkToFrontendObject(publicPersonalInformation.linkedInProfile.data.attributes) : '';

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
    mediaObject.formats.thumbnail.url = createLinkToDocumentOnToApi(mediaObject.formats.thumbnail.url);
    mediaObject.formats.medium.url = createLinkToDocumentOnToApi(mediaObject.formats.medium.url);
    mediaObject.formats.small.url = createLinkToDocumentOnToApi(mediaObject.formats.small.url);
    mediaObject.formats.large.url = createLinkToDocumentOnToApi(mediaObject.formats.large.url);
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
    const attachments = milestoneFromStrapi.attributes.attachments ?? null;
    const mappedAttachments: MediaObject[] = [];

    if (attachments && attachments.data) {
      attachments.data.map((attachment) => {
        const mappedAttachment = mapStrapiMediaToFrontendObject(attachment.attributes);

        mappedAttachments.push(mappedAttachment);
      });
    }

    const mappedMilestone = {
      title: milestoneFromStrapi.attributes.title,
      description: milestoneFromStrapi.attributes.description,
      startDate: moment(milestoneFromStrapi.attributes.startDate),
      endDate: moment(milestoneFromStrapi.attributes.endDate),
      locale: milestoneFromStrapi.attributes.locale,
      type: milestoneFromStrapi.attributes.type,
      attachments:  mappedAttachments
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

export const mapReferencesToFrontendObject = (referencesFromStrapi: DataObject<ReferencesStrapiDto>[]): Reference[] => {
  const references: Reference[] = [];

  referencesFromStrapi.map((referenceFromStrapi) => {
    const attachments = referenceFromStrapi.attributes.attachments ?? null;
    const mappedAttachments: MediaObject[] = [];

    if (attachments && attachments.data) {
      attachments.data.map((attachment) => {
        const mappedAttachment = mapStrapiMediaToFrontendObject(attachment.attributes);

        mappedAttachments.push(mappedAttachment);
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
      attachments: mappedAttachments
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