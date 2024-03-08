<template>
  <SnapScrollCard class="relative">
    <div
      ref="HorizontalSnapScrollParentRef"
      class="snap-scroll-horizontal-parent flex flex-row hide-scrollbar w-screen h-full relative">
      <div
        v-intersection-observer="(observer) => onIntersectionObserver(observer, 0)"
        class="snap-scroll-horizontal-children w-screen flex-shrink-0 h-full py-4 px-2 flex flex-col items-center justify-center text-center gap-16">
        <div class="text-4xl">
          {{$t('my-tech-stack') }}
        </div>
        <div class="text-2xl">
          {{ $t('my-tech-stack-snap-scroll-description') }}
        </div>
        <div class="relative">
          <ArrowAnimation />
        </div>
        <div>
          {{ $t('swipe-left') }}
        </div>
      </div>
      <!-- Display of the tech stack items -->
      <div
        v-for="(entry, index) in chunkedTechStack"
        :key="index"
        v-intersection-observer="(observer) => onIntersectionObserver(observer, index + 1)"
        class="snap-scroll-horizontal-children w-1/2 flex-shrink-0 h-full flex flex-col items-center justify-center text-center relative">
        <div
          v-for="techStackItem in entry"
          :key="techStackItem.name"
          class="flex flex-col h-1/3 justify-center items-center w-full relative">
          <div class="w-10/12 h-1/2 relative flex justify-center items-center p-8">
            <img
              class="h-full rounded-lg"
              v-if="techStackItem.image"
              :src="techStackItem.image.url"
              :alt="techStackItem.image.alternativeText">
          </div>
          <div class="h-1/2 flex flex-col gap-2">
            <span class="text-xl font-bold">
              {{techStackItem.name}}
            </span>
            <div class="flex flex-col gap-1">
              <span>
                {{ $t('skill-rating') }}:
              </span>
              <Rating
                v-model="techStackItem.skillRating"
                :stars="5"
                readonly
                :cancel="false"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute flex flex-row flex-wrap bottom-0 pb-2 justify-center w-full">
      <div
        class="horizontal-snap-scroll-stepper mr-2"
        :class="{ 'horizontal-snap-scroll-stepper-active': (activePage.includes(0)) }"/>
      <div class="flex flex-row overflow-hidden rounded-full">
        <div
          v-for="n in lengthForActivePages"
          :key="n"
          class="horizontal-snap-scroll-stepper !rounded-none"
          :class="{ 'horizontal-snap-scroll-stepper-active': (activePage.includes(n)) }"/>
      </div>
    </div>
  </SnapScrollCard>
</template>

<script setup lang="ts">

  import { vIntersectionObserver } from '@vueuse/components';
  import { orderBy } from 'lodash';
  import { storeToRefs } from 'pinia';
  import Rating from 'primevue/rating';
  import { computed, ref, type Ref } from 'vue';

  import ArrowAnimation from '@/components/elements/ArrowAnimation.vue';
  import SnapScrollCard from '@/components/partials/SnapScroll/SnapScrollCard.vue';
  import type { TechStackEntry } from '@/models/ui-models';
  import { useDataStore } from '@/stores/dataStore';
  import { chunkArray } from '@/utils/coreUtils';

  const dataStore = useDataStore();
  const { techStack } = storeToRefs(dataStore);

  const chunkedTechStack = computed((): TechStackEntry[][] => {
    const sortedTechStack = orderBy(techStack.value, ['skillRating', 'name'], ['desc', 'desc']);

    return chunkArray(sortedTechStack, 3);
  });

  const lengthForActivePages = computed((): number => {
    return chunkedTechStack.value.length - 1 > 0 ? chunkedTechStack.value.length - 1 : 0;
  });

  const activePage: Ref<number[]> = ref([]);

  /**
   * @description Checks which page of the timeline is in the viewport and sets the index of the active page.
   * @param isIntersecting { Boolean }
   * @param index { Number } - the index of the page that is intersecting in the viewport
   */
  const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[], index: number) => {
    if (isIntersecting) {
      activePage.value.push(index);
    } else {
      removePageFromActivePages(index);
    }
  };

  const removePageFromActivePages = (index: number) => {
    const pageIndexInsideArray = activePage.value.indexOf(index);

    if (pageIndexInsideArray > -1) { // only splice array when item is found
      activePage.value.splice(pageIndexInsideArray, 1); // 2nd parameter means remove one item only
    }
  };

</script>