<template>
  <section class="auth-form">
    <div class="auth-form__inner">
      <h1 class="auth-form__logo">
        <UiSvg name="logo-main" />
      </h1>
      <p class="auth-form__description">
        Укажите свою почту и мы пришлем на нее код<br />с подтверждением
      </p>

      <form @submit.prevent>
        <div class="auth-form__input-email">
          <UiInput
            v-model.trim.lazy="email"
            class="auth-form__input"
            :type="'email'"
            :placeholder="'Email'"
            :error-message="emailErrorMessage"
            :max-length="'150'"
            :is-disabled="isEmailSendSuccess"
            @keyup.enter="sendCode"
          />
          <div v-if="isEmailSendSuccess" class="auth-form__input-change" @click="changeEmail">
            Изменить
          </div>
        </div>

        <UiInput
          v-if="isEmailSendSuccess"
          v-model.trim.lazy="confirmationCode"
          class="auth-form__input"
          :type="'text'"
          :placeholder="'Код на вашей почте'"
          :error-message="codeErrorMessage"
          :max-length="'10'"
          @keyup.enter="auth"
        />

        <UiButton v-if="!isEmailSendSuccess" class="auth-form__submit-button" @click="sendCode">
          Отправить код
        </UiButton>

        <div v-if="isEmailSendSuccess" class="auth-form__buttons">
          <UiButton
            :is-outline="true"
            :disabled="timeToResend !== 0"
            @click="resendConfirmationCode"
          >
            <UiIcon class="auth-form__retry" name="retry" :size="18" />
            <span class="mx-1">Отправить новый код</span>
            <span v-if="timeToResend" class="w-[30px] text-left">
              {{ timerValue }}
            </span>
          </UiButton>

          <UiButton @click="auth">Войти</UiButton>
        </div>
      </form>

      <p class="auth-form__personal-data">
        Отправляя заявку, вы соглашаетесь<br />
        с
        <a
          class="auth-form__personal-data-link"
          :href="TERMS"
          target="_blank"
          rel="noreferrer noopener"
        >
          правилами пользования сайтом
        </a>
        и
        <a
          class="auth-form__personal-data-link"
          :href="POLICIES"
          target="_blank"
          rel="noreferrer noopener"
        >
          политикой обработки<br />персональных данных
        </a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { UiButton, UiIcon, UiInput, UiSvg } from 'account-ui';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { POLICIES, TERMS } from '../../utility/constants/offer-links.js';
import { useAuthFormStore } from '../stores/auth-form.js';

const authStore = useAuthFormStore();
const {
  email,
  isEmailSendSuccess,
  emailErrorMessage,
  confirmationCode,
  codeErrorMessage,
  timeToResend,
  timerValue,
} = storeToRefs(authStore);

const sendCode = async () => await authStore.sendCodeRequest();
const auth = async () => await authStore.authRequest();

const resendConfirmationCode = async () => await sendCode();

onMounted(() => {
  authStore.checkIfCodeSendSuccess();
});

const changeEmail = () => authStore.changeEmail();
</script>

<style lang="postcss" scoped>
.auth-form {
  @apply flex items-center justify-center mx-auto w-full max-w-[384px];

  &__inner {
    @apply text-center w-full;
  }

  &__logo {
    @apply max-w-[170px] mx-auto;
  }

  &__description {
    @apply text-sm pt-6 pb-10;
  }

  &__input-email {
    @apply relative;
  }

  &__input-change {
    @apply absolute right-0 top-0 z-20 py-3 pr-4 text-sm leading-4 font-medium text-blue-500 cursor-pointer;

    &:hover {
      @apply text-blue-600;
    }
  }

  &__input {
    @apply mb-4;
  }

  &__submit-button {
    @apply mt-10;
  }

  &__buttons {
    @apply space-y-4 mt-10;
  }

  &__personal-data {
    @apply text-xs leading-4 pt-4;

    &-link {
      @apply text-inherit leading-[inherit] decoration-1 underline underline-offset-2;

      &:hover {
        @apply text-blue-600;
      }

      &:active {
        @apply text-blue-600 no-underline;
      }
    }
  }
}
</style>
