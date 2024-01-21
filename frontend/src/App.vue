<template>
  <div>
    <HeaderBar />
    <span class="text-green-500">
      {{ $t('test') }}
    </span>
    <Button
      label="Success"
      severity="success" />

    <InputText
      type="text"
      v-model="value" />
  </div>
  <RouterView />
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';

  import HeaderBar from '@/components/HeaderBar.vue';

</script>
