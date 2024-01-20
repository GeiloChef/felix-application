<template>
  <div>
    <span class="text-green-500">
      app vue
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
</script>
