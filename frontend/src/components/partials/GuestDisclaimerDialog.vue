<template>
  <Dialog
    v-model:visible="showGuestInfoModal"
    modal
    :header="$t('enter-the-page-as-guest')"
    :style="{ width: '45rem' }"
    :breakpoints="{
      '640px': '95vw' }">
    <template #closeicon>
      <font-awesome-icon
        @click="userInfoStore.toggleGuestInfoModal"
        size="xl"
        icon="circle-xmark" />
    </template>
    <div v-html="$t('some-information-are-unavailable-for-guests')" />
    <div class="mt-4">
      {{ $t('contact-me-if-you-want-to-have-credentials') }}
    </div>
    <template #footer>
      <div class="flex flex-col sm:flex-row gap-8 sm:gap-0 justify-end mt-8">
        <Button
          v-if="false"
          class="!justify-end"
          :label="$t('request-credentials')"
          severity="secondary"
          text/>
        <Button
          class="!justify-end"
          icon="fa-arrow-right"
          :label="$t('proceed-as-guest')"
          :iconPosition="ButtonIconPosition.Right"
          severity="info"
          @click="proceedAsGuest"/>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import Dialog from 'primevue/dialog';

  import { useUserInfoStore } from '@/stores/userInfoStore';

  const userInfoStore = useUserInfoStore();
  const { guestInfoModalIsToggled, userHasAcceptedGuestInformation } = storeToRefs(userInfoStore);

  const router = useRouter();

  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  import { ButtonIconPosition } from '@/models/core';

  const proceedAsGuest = (): void => {
    userInfoStore.acceptGuestInformation();
    router.push({ name: 'home' });
  };

  const showGuestInfoModal = computed((): boolean => {
    return guestInfoModalIsToggled.value && !userHasAcceptedGuestInformation.value;
  });
</script>