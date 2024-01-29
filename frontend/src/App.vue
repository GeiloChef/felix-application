<template>
  <div>
    <HeaderBar />
  </div>
  <RouterView />
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';

  import HeaderBar from '@/components/partials/HeaderBar.vue';
</script>
