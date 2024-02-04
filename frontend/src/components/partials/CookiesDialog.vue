<template>
  <Dialog
    id="cookie-dialog"
    class="select-none"
    v-model:visible="showCookieDialog"
    modal
    :draggable="false"
    :header="$t('before-you-enter-the-site')"
    :closeable="false"
    :closeOnEscape="false"
    :style="{ width: '35vw' }"
    :breakpoints="{
      '1199px': '75vw',
      '640px': '95vw' }">
    <template #header>
      <div class="flex flex-col md:flex-row-reverse gap-4 justify-between w-full items-start md:items-end">
        <div class="w-full md:w-auto">
          <LanguageDropdownSelect />
        </div>
        <span class="text-xl font-bold">{{ $t('before-you-enter-the-site') }}</span>
      </div>
    </template>
    <p class="m-0">
      {{ $t('please-confirm-that-you-have-read-the-privacy-policy') }}
    </p>
    <template #footer>
      <div class="flex flex-col">
        <router-link
          :to="{ name: 'privacy-policy' }">
          <Button
            class="mb-6 !max-h-full !justify-end"
            :label="$t('go-to-privacy-policy')"
            :iconPosition="ButtonIconPosition.Left"
            severity="secondary"
            text/>
        </router-link>
        <div class="flex justify-end">
          <Button
            class="!justify-end"
            icon="fa-file-circle-check"
            :label="$t('i-confirm-above-mentioned')"
            severity="success"
            @click="userInfoStore.acceptCookies"/>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import Dialog from 'primevue/dialog';

  import { useUserInfoStore } from '@/stores/userInfoStore';

  const userInfoStore = useUserInfoStore();
  const { userHasAcceptedCookies } = storeToRefs(userInfoStore);

  const route = useRoute();

  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  import LanguageDropdownSelect from '@/components/partials/LanguageDropdownSelect.vue';
  import { ButtonIconPosition } from '@/models/core';

  const showCookieDialog = computed((): boolean => {
    return !userHasAcceptedCookies.value && !route.meta.isAccessibleWithoutAcceptingCookies;
  });
</script>

<style lang="scss">
#cookie-dialog {
  .p-dialog-header-close {
    display: none
  }
}
</style>