<template>
  <div class="bg-gray-800 shadow-lg border-t-2 border-t-gray-600 flex flex-col md:flex-row gap-8 md:gap-0 justify-between px-16 py-4">
    <div class="flex flex-col gap-8 justify-center">
      <div class="flex flex-row justify-center">
        &#169; {{ fullName }} - {{ currentYear }}
      </div>
    </div>
    <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-center sm:text-left">
      <router-link
        :to="{ name: 'imprint' }">
        {{ $t('imprint')}}
      </router-link>
      <router-link
        :to="{ name: 'privacy-policy' }">
        {{ $t('privacy-policy')}}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">

  import moment from 'moment';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

  import { useDataStore } from '@/stores/dataStore';


  const dataStore = useDataStore();
  const { fullName } = storeToRefs(dataStore);

  const currentYear = computed((): number => {
    return moment().year();
  });
</script>
