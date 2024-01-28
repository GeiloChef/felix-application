import type { AxiosPromise } from 'axios';

import type {
    MilestoneStrapiDto,
    PersonalInformationPublicStrapiDto,
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