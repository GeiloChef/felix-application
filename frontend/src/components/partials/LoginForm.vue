<template>
  <div>
    <Card>
      <template #content>
        <div class="flex flex-col gap-8">
          <!--   Username   -->
          <div class="flex flex-col gap-2">
            <label for="username">
              {{ $t('username') }}
            </label>
            <span class="p-input-icon-left">
              <FontAwesomeIcon icon="fa-user" />
              <InputText
                id="username"
                class="w-96"
                :class="{ 'p-invalid': loginHasErrors }"
                v-model="username"
                :placeholder="$t('username')"
                @input="resetLoginErrorStatus"
                @keyup.enter.prevent="login" />
            </span>
          </div>

          <!--   Password   -->
          <div class="flex flex-col gap-2">
            <label for="password">
              {{ $t('password') }}
            </label>
            <Password
              id="password"
              inputClass="w-96"
              :class="{ 'p-invalid': loginHasErrors }"
              v-model="password"
              :feedback="false"
              toggleMask
              :placeholder="$t('password')"
              @input="resetLoginErrorStatus"
              @keyup.enter.prevent="login" />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-row justify-end">
          <div class="flex flex-col gap-10 mt-1">
            <Button
              class="!max-h-12 !justify-end"
              icon="fa-arrow-right"
              size="large"
              :label="$t('login')"
              :iconPosition="ButtonIconPosition.Right"
              severity="success"
              @click="login"/>
            <Button
              class="!justify-end"
              :label="$t('proceed-as-guest')"
              text
              severity="secondary"
              @click="toggleGuestInfoModal"/>
          </div>
        </div>
      </template>
    </Card>

    <Dialog
      v-model:visible="showGuestInfoModal"
      modal
      :header="$t('enter-the-page-as-guest')"
      :style="{ width: '45rem' }">
      <div v-html="$t('some-information-are-unavailable-for-guests')" />
      <div class="mt-4">
        {{ $t('contact-me-if-you-want-to-have-credentials') }}
      </div>
      <template #footer>
        <div class="flex flex-row justify-end mt-8">
          <Button
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
  </div>

</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import Card from 'primevue/card';
  import Dialog from 'primevue/dialog';
  import Password from 'primevue/password';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { ButtonIconPosition } from '@/models/core';
  import { useUserInfoStore } from '@/stores/userInfoStore';

  const router = useRouter();

  const userInfoStore = useUserInfoStore();

  const username = ref('');
  const password = ref('');

  const showGuestInfoModal = ref(false);

  const toggleGuestInfoModal = ((): void => {
    showGuestInfoModal.value = true;
  });

  const loginHasErrors = ref(false);

  const resetLoginErrorStatus = (): void => {
    loginHasErrors.value = false;
  };

  const proceedAsGuest = (): void => {
    router.push({ name: 'home' });
  };

  const login = async (): Promise<void> => {
    resetLoginErrorStatus();

    const loginSuccessful = await userInfoStore.processLogin(username.value, password.value);

    loginHasErrors.value = !loginSuccessful;
  };
</script>

<style>

</style>