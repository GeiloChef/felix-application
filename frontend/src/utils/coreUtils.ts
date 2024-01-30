/**
 * @description Takes a route returned from the strapi BE and adds the prefix of the public url.
 * @param route {string} - route to document on strapi
 * @return a full url that can be used by the browser to access the document
 * @example
 * const linkFromStrapi = '/test/image/123.png'
 * createLinkToDocumentOnToApi(linkFromStrapi)
 * // -> returns https://www.your-strapi-url.com/test/image/123.png
 */
export const createLinkToDocumentOnToApi = (route: string) => {
  const apiUrl = import.meta.env.VITE_BASE_IMAGE_URL;

  return apiUrl + route;
};

/**
 * @description Opens a link in a new browser tab
 * @param url {string}
 */
export const openLinkInNewTab = (url: string): void => {
  window.open(url, '_blank', 'noreferrer');
};

export const logError = (error: any): void => {
  if (import.meta.env.MODE === 'development') {
    console.error(error);
  }
};