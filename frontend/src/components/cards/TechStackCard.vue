<template>
  <ColoredBackgroundCard
    :title="$t('my-tech-stack')"
    :color-type="ColoredBackgroundCardTypes.Bright">
    <div class="mt-12">
      <TechStackTable />
    </div>
  </ColoredBackgroundCard>
</template>

<script setup lang="ts">

  import ColoredBackgroundCard from '@/components/partials/ColoredBackgroundCard.vue';
  import TechStackTable from '@/components/partials/TechStackTable.vue';
  import { ColoredBackgroundCardTypes } from '@/models/core';
</script>

<style>

</style>