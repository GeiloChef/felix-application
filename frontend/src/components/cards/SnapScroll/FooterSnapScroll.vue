<template>
  <SnapScrollCard>
    <div class="flex flex-col justify-center items-center text-2xl h-full gap-8 relative">
      <router-link
        :to="{ name: 'imprint' }">
        {{ $t('imprint')}}
      </router-link>
      <router-link
        :to="{ name: 'privacy-policy' }">
        {{ $t('privacy-policy')}}
      </router-link>
      <div class="flex flex-row justify-center absolute bottom-4">
        &#169; {{ fullName }} - {{ currentYear }}
      </div>
    </div>
  </SnapScrollCard>
</template>

<script setup lang="ts">
  import moment from 'moment/moment';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

  import SnapScrollCard from '@/components/partials/SnapScroll/SnapScrollCard.vue';
  import { useDataStore } from '@/stores/dataStore';


  const dataStore = useDataStore();
  const { fullName } = storeToRefs(dataStore);

  const currentYear = computed((): number => {
    return moment().year();
  });
</script>