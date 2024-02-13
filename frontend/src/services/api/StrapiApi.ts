import type { AxiosPromise } from 'axios';

import type { UserLoginCredentials } from '@/models/core';
import type {
    FeatureTogglesDto, FileDownloadDto, FileExtendedDto, LegalInformationDto,
    LocaleEntryDto,
    LoginResponseDto,
    MilestoneStrapiDto,
    PersonalInformationPublicStrapiDto,
    ReferencesStrapiDto,
    StrapiApiResponse,
    StrapiArrayApiResponse, StrapiMediaApiResponse, StrapiMediaDto,
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

export const getPublicFileByIdFromStrapi = async (fileId: number):AxiosPromise<StrapiApiResponse<FileExtendedDto>> => {
    return await axios.get(`/public-files/${fileId}`);
};

export const getPrivateFileByIdFromStrapi = async (fileId: number):AxiosPromise<StrapiApiResponse<FileExtendedDto>> => {
    return await axios.get(`/private-files/${fileId}`);
};

export const fetchLegalInformationFromStrapi = async ():AxiosPromise<StrapiApiResponse<LegalInformationDto>> => {
    return await axios.get('/legal-information');
};

export const fetchFileDownloadsFromStrapi = async (): AxiosPromise<StrapiArrayApiResponse<FileDownloadDto>> => {
    return await axios.get('/file-downloads');
};