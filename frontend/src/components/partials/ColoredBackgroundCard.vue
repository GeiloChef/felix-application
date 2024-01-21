<template>
  <div>
    <!--  Card content  -->
    <div
      class="w-full py-8 px-64 bg-gray-900"
      :class="cardColorClass">
      <slot />
    </div>
    <!--  End of card triangle  -->
    <div
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
  });

  const { colorType } = toRefs(props);

  const cardColorClass = computed((): string => {
    if (colorType?.value === ColoredBackgroundCardTypes.Dark) {
      return 'bg-gray-900';
    }

    return 'bg-blue-800';
  });

  const triangleBackgroundClass = computed((): string => {
    if (colorType?.value === ColoredBackgroundCardTypes.Dark) {
      return 'bg-blue-800';
    }

    return 'bg-gray-900';
  });

  const triangleBorderStyle = computed((): string => {
    if (colorType?.value === ColoredBackgroundCardTypes.Dark) {
      return 'border-color: rgb(17 24 39) transparent transparent transparent;';
    }

    return 'border-color: rgb(30 64 175) transparent transparent transparent;';
  });
</script>

<style lang="scss">
.triangle {
  border-style: solid;
  border-width: 4rem 35vw 0 35vw;
}
</style>