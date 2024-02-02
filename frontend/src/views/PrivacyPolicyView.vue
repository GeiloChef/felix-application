<template>
  <main>
    <Card class="markdown-formatting px-4 py-6 md:px-32 md:py-12 lg:px-40 lg:py-16  xl:px-64 xl:py-24 select-none">
      <template #content>
        <div v-html="privacyPolicyInHtml" />
      </template>
    </Card>
  </main>
</template>

<script setup lang="ts">
  import markdownit from 'markdown-it';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import { useDataStore } from '@/stores/dataStore';

  const md = markdownit();

  const dataStore = useDataStore();
  const { legalInformation } = storeToRefs(dataStore);

  const { t } = useI18n();

  const privacyPolicyInHtml = computed((): string => {
    if (legalInformation.value && legalInformation.value.privacyPolicy) {
      return md.render(legalInformation.value.privacyPolicy);
    } else {
      return '<h2>t(\'could-not-load-legal-information\')</h2>';
    }
  });
</script>
