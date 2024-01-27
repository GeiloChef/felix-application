import { mapPersonalInformationToFrontendObject } from '@/mapper/StrapiApiToFrontendMapper';
import type { PersonalInformationPublicStrapiDto } from '@/models/typesFromStrapiApi';
import type { PersonalInformation } from '@/models/ui-models';
import { fetchPublicPersonalInformationFromStrapi } from '@/services/api/StrapiApi';
import { useUserInfoStore } from '@/stores/userInfoStore';

export const fetchPersonalInformation = async (): Promise<PersonalInformation>  => {
  const userInfoStore = useUserInfoStore();

  let publicPersonalInformation: PersonalInformationPublicStrapiDto = {} as PersonalInformationPublicStrapiDto;
  const privatePersonalInformation = null;

  try {
    const { data: responseData } = await fetchPublicPersonalInformationFromStrapi();

    publicPersonalInformation = responseData.data.attributes;


    if (userInfoStore.isUserLoggedIn) {
      // todo: fetch private information about me
    }

  } catch (error) {
    console.log(error);
    //todo: implement error handling
  }

  return mapPersonalInformationToFrontendObject(publicPersonalInformation, privatePersonalInformation);
};