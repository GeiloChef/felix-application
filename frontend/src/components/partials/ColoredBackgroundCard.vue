<template>
  <div>
    <!--  Start of card triangle  -->
    <div
      v-if="showTopTriangle"
      class="w-full triangle rotate-180"
      :class="triangleBackgroundClass"
      :style="triangleBorderStyle"/>
    <!--  Card content  -->
    <div
      class="w-full overflow-hidden"
      :class="[
        { 'px-64 py-24': !noMargin },
        { 'full-screen-card': fullScreenCard },
        cardColorClass
      ]">
      <div
        v-if="title"
        class="text-center text-3xl font-bold italic">
        {{ title }}
      </div>
      <slot />
    </div>
    <!--  End of card triangle  -->
    <div
      v-if="!hideTriangle"
      class="w-full triangle"
      :class="triangleBackgroundClass"
      :style="triangleBorderStyle"/>
  </div>
</template>


<script setup lang="ts">

  import { computed, type PropType, toRefs } from 'vue';

  import { ColoredBackgroundCardTypes } from '@/models/core';

  const props = defineProps({
    colorType: {
      type: String as PropType<ColoredBackgroundCardTypes>,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    hideTriangle: {
      type: Boolean,
      default: false
    },
    showTopTriangle: {
      type: Boolean,
      default: false
    },
    fullScreenCard: {
      type: Boolean,
      default: false
    },
  });

  const { colorType } = toRefs(props);

  const colorDark = 'bg-gray-900';
  const colorLight = 'bg-blue-900';

  const cardColorClass = computed((): string => {
    if (colorType?.value === ColoredBackgroundCardTypes.Dark) {
      return colorDark;
    }

    return colorLight;
  });

  const triangleBackgroundClass = computed((): string => {
    if (colorType?.value === ColoredBackgroundCardTypes.Dark) {
      return colorLight;
    }

    return colorDark;
  });

  const triangleBorderStyle = computed((): string => {
    if (colorType?.value === ColoredBackgroundCardTypes.Dark) {
      return 'border-color: rgb(17 24 39) transparent transparent transparent;';
    }

    return 'border-color: rgb(30 58 138) transparent transparent transparent;';
  });
</script>

<style lang="scss">
.triangle {
  border-style: solid;
  border-width: 4rem 35vw 0 35vw;
}

.full-screen-card {
  min-height: calc(100vh - (4rem * 2))
}
</style>