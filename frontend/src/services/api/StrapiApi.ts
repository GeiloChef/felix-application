import type { AxiosPromise } from 'axios';

import type {
    FeatureTogglesDto,
    MilestoneStrapiDto,
    PersonalInformationPublicStrapiDto, ReferencesStrapiDto,
    StrapiApiResponse, StrapiArrayApiResponse, TechStackStrapiDto
} from '@/models/typesFromStrapiApi';
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