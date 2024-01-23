export const createLinkToApi = (route: string) => {
  const apiUrl = import.meta.env.VITE_BASE_IMAGE_URL;

  return apiUrl + route;
};