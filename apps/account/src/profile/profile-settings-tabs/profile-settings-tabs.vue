<template>
  <section>
    <UiCard :title="'Настройки профиля'">
      <template #ui-card-button>
        <UiButton
          class="profile-settings__save"
          size="small"
          :disabled="!hasDataToSave || isSavePending"
          :pending="isSavePending"
          @click="onSaveButtonClick"
        >
          Сохранить
        </UiButton>
      </template>
      <template #default>
        <div class="profile-settings">
          <div class="profile-settings__item">
            <UiInput
              v-model="userNameInput"
              label="Ваше имя"
              placeholder=""
              type="text"
              :max-length="'100'"
            />
          </div>
          <div class="profile-settings__item">
            <UiInput
              v-model="userEmailInput"
              label="Email"
              placeholder=""
              type="text"
              :max-length="'100'"
            />
          </div>
          <div class="profile-settings__item">
            <UiSelect
              v-model="userLanguageInput"
              label="Язык"
              :options="[
                { name: 'Русский', value: 'RU' },
                { name: 'Английский', value: 'EN' },
              ]"
            />
          </div>
        </div>
      </template>
    </UiCard>

    <div
      :id="`hs-profile-setting-code-modal`"
      ref="settingsCodeModalReference"
      class="hs-overlay modal-profile-setting-code hidden [--overlay-backdrop:static]"
      data-hs-overlay-keyboard="false"
      style="margin-top: 0px"
    >
      <SettingsCodeModal @success="onCodeModalSuccess" @close="onCodeModalClose" />
    </div>

    <UiAlertsWrapper>
      <UiError
        v-if="sendCodeErrorMessage"
        :error-text="'Неверный код подтверждения'"
        :error-description="'Проверьте написание и попробуйте еще раз'"
        notify-without-controls
        @close="closeSendCodeErrorMessage"
      />
      <UiError
        v-if="updateProfileDataErrorMessage"
        :error-text="'Такой почты не существует'"
        :error-description="'Проверьте написание и попробуйте еще раз'"
        notify-without-controls
        @close="closeUpdateProfileDataErrorMessage"
      />
    </UiAlertsWrapper>
  </section>
</template>

<script setup>
import { UiButton, UiCard, UiSelect, UiError, UiInput, UiAlertsWrapper } from 'account-ui';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import SettingsCodeModal from './settings-code-modal.vue';
import { useProfileSettingsStore } from '../stores/profile-settings.js';

const profileSettingsStore = useProfileSettingsStore();
const {
  userName,
  userEmail,
  userLanguage,
  isCodeNeeded,
  hasDataToSave,
  sendCodeErrorMessage,
  updateProfileDataErrorMessage,
} = storeToRefs(profileSettingsStore);

const settingsCodeModalReference = ref(null);
const isSavePending = ref(false);

const userNameInput = computed({
  get() {
    return userName.value;
  },
  set(newValue) {
    profileSettingsStore.setUserName(newValue);
  },
});

const userEmailInput = computed({
  get() {
    return userEmail.value;
  },
  set(newValue) {
    profileSettingsStore.setUserEmail(newValue);
  },
});

const userLanguageInput = computed({
  get() {
    return userLanguage.value;
  },
  set(newValue) {
    profileSettingsStore.setUserLanguage(newValue);
  },
});

const updateProfileData = async () => {
  await profileSettingsStore.updateProfileData();
};

const sendCode = async () => {
  await profileSettingsStore.sendCode();
};

const onSaveButtonClick = async () => {
  isSavePending.value = true;

  if (isCodeNeeded.value) {
    await sendCode();

    if (!updateProfileDataErrorMessage.value) {
      await window.HSOverlay.open(settingsCodeModalReference.value);
    }

    return;
  }

  await updateProfileData();

  isSavePending.value = false;
};

const onCodeModalSuccess = async () => {
  await updateProfileData();
};

const onCodeModalClose = async () => {
  await window.HSOverlay.close(settingsCodeModalReference.value);
};

const closeSendCodeErrorMessage = () => {
  profileSettingsStore.clearCodeErrorMessage();
};

const closeUpdateProfileDataErrorMessage = () => {
  profileSettingsStore.clearUpdateProfileDataErrorMessage();
};
</script>

<style lang="postcss" scoped>
.profile-settings {
  @apply space-y-6;
}

.modal-profile-setting-code {
  @apply w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto transition-all;

  &.open {
    @apply bg-gray-800/20;
  }
}
</style>
