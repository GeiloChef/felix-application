import moment from 'moment';

import { UnitOfTimeForDifference } from '@/models/core';
import type {
  PersonalInformationPrivateStrapiDto,
  PersonalInformationPublicStrapiDto, strapiMediaDto
} from '@/models/typesFromStrapiApi';
import { HiddenDefaultValue, type PersonalInformation } from '@/models/ui-models';
import { createLinkToApi } from '@/utils/coreUtils';
import { calculateDifferenceBetweenDateAndToday } from '@/utils/dateUtils';

export const mapPersonalInformationToFrontendObject = (publicPersonalInformation: PersonalInformationPublicStrapiDto,
                                                       privatePersonalInformation: null | PersonalInformationPrivateStrapiDto): PersonalInformation => {

  const imageObject = publicPersonalInformation.image.data.attributes;

  imageObject.url = createLinkToApi(imageObject.url);
  imageObject.formats.small.url = createLinkToApi(imageObject.formats.small.url);
  imageObject.formats.medium.url = createLinkToApi(imageObject.formats.medium.url);
  imageObject.formats.large.url = createLinkToApi(imageObject.formats.large.url);

  return {
    firstname: publicPersonalInformation.firstname,
    lastname: publicPersonalInformation.lastname,
    birthday: moment(publicPersonalInformation.birthday),
    age: calculateDifferenceBetweenDateAndToday(moment(publicPersonalInformation.birthday), UnitOfTimeForDifference.Year),
    professionalExperienceStart: moment(publicPersonalInformation.professionalExperienceStart),
    professionalExperienceYears: calculateDifferenceBetweenDateAndToday(moment(publicPersonalInformation.professionalExperienceStart), UnitOfTimeForDifference.Year),
    introductionText: publicPersonalInformation.introductionText,
    image: publicPersonalInformation.image.data.attributes,
    location: privatePersonalInformation?.location ?? HiddenDefaultValue,
    mailAddress: privatePersonalInformation?.mailAddress ?? HiddenDefaultValue,
    phone: privatePersonalInformation?.phone ?? HiddenDefaultValue,
    lookingFor: publicPersonalInformation.lookingFor,
    currentJob: publicPersonalInformation.currentJob,
    currentEmployer: publicPersonalInformation.currentEmployer,
  };
};