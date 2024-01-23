import type { AxiosPromise } from 'axios';

import type { PersonalInformationPublicStrapiDto, StrapiApiResponse } from '@/models/typesFromStrapiApi';
import axios from '@/services/api/axiosInstance';
export const fetchPublicPersonalInformationFromStrapi = async (): AxiosPromise<StrapiApiResponse<PersonalInformationPublicStrapiDto>> => {
    return await axios.get('/personal-information');
};