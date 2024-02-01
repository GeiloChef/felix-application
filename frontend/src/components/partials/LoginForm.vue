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
  </div>

</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { storeToRefs } from 'pinia';
  import Card from 'primevue/card';
  import Dialog from 'primevue/dialog';
  import Password from 'primevue/password';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { ButtonIconPosition } from '@/models/core';
  import { useUserInfoStore } from '@/stores/userInfoStore';

  const router = useRouter();

  const userInfoStore = useUserInfoStore();
  const { userHasAcceptedGuestInformation } = storeToRefs(userInfoStore);

  const username = ref('');
  const password = ref('');

  const toggleGuestInfoModal = ((): void => {
    if (userHasAcceptedGuestInformation.value) {
      router.push({ name: 'home' });
    } else {
      userInfoStore.toggleGuestInfoModal();
    }
  });

  const loginHasErrors = ref(false);

  const resetLoginErrorStatus = (): void => {
    loginHasErrors.value = false;
  };

  const login = async (): Promise<void> => {
    resetLoginErrorStatus();

    const loginSuccessful = await userInfoStore.processLogin(username.value, password.value);

    loginHasErrors.value = !loginSuccessful;
  };
</script>

<style>

</style>