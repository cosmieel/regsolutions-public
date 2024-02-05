import { useQueryClient } from '@tanstack/vue-query';
import { useProfileSettingsStore } from 'account/src/profile/stores/profile-settings.js';
import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthMutation } from '../auth-form/composables/auth-mutation.js';
import { useLogoutMutation } from '../auth-form/composables/logout-mutation.js';
import { useSendCodeMutation } from '../auth-form/composables/send-code-mutation.js';
import { useTimer } from '../auth-form/composables/timer.js';

export const useAuthFormStore = defineStore('authForm', () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { timeToResend, startTimer, stopTimer, timerValue } = useTimer();
  const sendCodeMutation = useSendCodeMutation();
  const authMutation = useAuthMutation();
  const logoutMutation = useLogoutMutation();

  const profileSettingsStore = useProfileSettingsStore();

  const email = ref('');
  const isEmailSendSuccess = ref(false);
  const isCodeExist = ref(false);
  const emailErrorMessage = ref('');

  async function sendCodeRequest() {
    try {
      validateEmail();

      const data = await sendCodeMutation.mutateAsync({ email: email.value });

      if (sendCodeMutation.isSuccess.value) {
        isEmailSendSuccess.value = sendCodeMutation.isSuccess.value;
        isCodeExist.value = data.codeExist;
        emailErrorMessage.value = '';

        startTimer();

        sessionStorage.setItem('isEmailSendSuccess', isEmailSendSuccess.value);
        sessionStorage.setItem('email', email.value);
      }
    } catch (error) {
      emailErrorMessage.value = error.message;
    }
  }

  function checkIfCodeSendSuccess() {
    if (sessionStorage.getItem('isEmailSendSuccess')) {
      isEmailSendSuccess.value = sessionStorage.getItem('isEmailSendSuccess');
      email.value = sessionStorage.getItem('email');
    }
  }

  function validateEmail() {
    if (email.value.length === 0) {
      throw new Error('Введите электронную почту');
    }
  }

  watch(email, () => {
    emailErrorMessage.value = '';
  });

  const confirmationCode = ref('');
  const codeErrorMessage = ref('');
  const isAuthenticated = ref(JSON.parse(localStorage.getItem('isAuthenticated')) || false);

  async function authRequest() {
    try {
      validateCode();

      const data = await authMutation.mutateAsync({
        email: email.value,
        code: confirmationCode.value,
      });

      if (authMutation.isSuccess.value) {
        isAuthenticated.value = true;

        codeErrorMessage.value = '';
        router.push({ name: 'wizardWelcome' });

        stopTimer();

        sessionStorage.removeItem('isEmailSendSuccess');
        sessionStorage.removeItem('email');

        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated.value));
        localStorage.setItem('userId', data.id);

        return data;
      }
    } catch (error) {
      codeErrorMessage.value = error.message;
    }
  }

  function validateCode() {
    if (confirmationCode.value.length === 0) {
      throw new Error('Введите код подтверждения');
    }
  }

  watch(confirmationCode, () => {
    codeErrorMessage.value = '';
  });

  async function logoutRequest() {
    try {
      await logoutMutation.mutateAsync();

      if (logoutMutation.isSuccess.value) {
        router.push({ name: 'signup' });

        $reset();
        profileSettingsStore.$reset();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  onMounted(() => {
    if (localStorage.getItem('timeToResend')) {
      startTimer();
    }
  });

  function changeEmail() {
    isEmailSendSuccess.value = false;
    confirmationCode.value = '';

    sessionStorage.removeItem('isEmailSendSuccess');

    stopTimer();
  }

  function $reset() {
    email.value = '';
    confirmationCode.value = '';
    isAuthenticated.value = false;
    isEmailSendSuccess.value = false;

    stopTimer();

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');

    queryClient.removeQueries({ queryKey: ['sites'], exact: true });

    router.go(0);
  }

  return {
    sendCodeRequest,
    email,
    isEmailSendSuccess,
    isCodeExist,
    emailErrorMessage,
    checkIfCodeSendSuccess,
    validateEmail,
    timeToResend,
    startTimer,
    timerValue,
    authRequest,
    confirmationCode,
    codeErrorMessage,
    validateCode,
    logoutRequest,
    isAuthenticated,
    changeEmail,
  };
});
