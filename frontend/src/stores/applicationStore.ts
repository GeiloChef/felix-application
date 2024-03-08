import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

/**
 * Here we store generic information that are needed to be shared all over the platform
 */
export const useApplicationStore = defineStore('applicationStore', () => {
  const maxContentHeightWithHeaderAndFooter = ref(0);
  const maxContentHeightWithHeader = ref(0);
  const maxContentHeightWithFooter = ref(0);

  /**
   * @description Takes the height of the header, the footer and the windows inner height to calculate the maximum height of the content we can fill
   * @param headerHeight {number} - header height in pixels
   * @param footerHeight {number} - footer height in pixels
   * @param windowHeight {number} - window inner height in pixels
   * @example This will set the following different variables in the store
   * maxContentHeightWithHeaderAndFooter - the height of the content (what the user could see) if he sees the footer and the header constantly in his FOV
   * maxContentHeightWithHeader - the height of the content (what the user could see) if he sees the header constantly in his FOV
   * maxContentHeightWithFooter - the height of the content (what the user could see) if he sees the footer constantly in his FOV
   */
  const calculateMaxBodyHeight = (headerHeight: number, footerHeight: number, windowHeight: number): void => {
    maxContentHeightWithHeaderAndFooter.value = windowHeight - (headerHeight + footerHeight);
    maxContentHeightWithHeader.value = windowHeight - (headerHeight);
    maxContentHeightWithFooter.value = windowHeight - (footerHeight);
  };

  /**
   * Gives the application information about if the user is on a mobile device or a desktop device
   * todo: have a proper detection that does not only rely on the screen width
   * @returns boolean
   */
  const isMobile = computed((): boolean => {
    return screen.width <= 760;
  });

  return {
    maxContentHeightWithHeaderAndFooter,
    maxContentHeightWithHeader,
    maxContentHeightWithFooter,
    isMobile,
    calculateMaxBodyHeight
  };
});