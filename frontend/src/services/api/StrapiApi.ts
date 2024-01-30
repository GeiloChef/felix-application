import type { AxiosPromise } from 'axios';

import type { UserLoginCredentials } from '@/models/core';
import type {
    FeatureTogglesDto,
    LocaleEntryDto,
    LoginResponseDto,
    MilestoneStrapiDto,
    PersonalInformationPublicStrapiDto,
    ReferencesStrapiDto,
    StrapiApiResponse,
    StrapiArrayApiResponse,
    TechStackStrapiDto,
} from '@/models/typesFromStrapiApi';
import axiosAuthInstance from '@/services/api/axiosAuthInstance';
import axios from '@/services/api/axiosInstance';
export const fetchPublicPersonalInformationFromStrapi = async (): AxiosPromise<StrapiApiResponse<PersonalInformationPublicStrapiDto>> => {
    return await axios.get('/personal-information');
};

export const fetchMilestonesFromStrapi = async (): AxiosPromise<StrapiArrayApiResponse<MilestoneStrapiDto>> => {
    return await axios.get('/milestones');
};

export const fetchTechStackFromStrapi = async (): AxiosPromise<StrapiArrayApiResponse<TechStackStrapiDto>> => {
    return await axios.get('/my-techstack');
};

export const fetchReferencesFromStrapi = async (): AxiosPromise<StrapiArrayApiResponse<ReferencesStrapiDto>> => {
    return await axios.get('/references');
};

export const fetchFeatureTogglesFromStrapi = async (): AxiosPromise<StrapiArrayApiResponse<FeatureTogglesDto>> => {
    return await axios.get('/feature-toggles');
};

export const fetchLocalesFromStrapi = async (): AxiosPromise<LocaleEntryDto[]> => {
    return await axios.get('/i18n/locales');
};

export const postLoginToStrapi = async (userLoginCredentials: UserLoginCredentials): AxiosPromise<LoginResponseDto> => {
    return await axiosAuthInstance.post('/auth/local', { identifier: userLoginCredentials.identifier, password: userLoginCredentials.password });
};