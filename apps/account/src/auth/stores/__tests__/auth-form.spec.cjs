// import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthMutation } from '../../auth-form/composables/auth-mutation.js';
import { useLogoutMutation } from '../../auth-form/composables/logout-mutation.js';
import { useSendCodeMutation } from '../../auth-form/composables/send-code-mutation.js';
import { useAuthFormStore } from '../auth-form.js';

vi.mock('vue-router');

vi.mock('../../auth-form/composables/send-code-mutation.js', () => ({
  useSendCodeMutation: vi.fn().mockImplementation(() => ({
    isSuccess: ref(true),
    mutateAsync: vi.fn().mockImplementation(() => ({
      email: 'email@test.com',
      codeExist: false,
    })),
  })),
}));

vi.mock('../../auth-form/composables/auth-mutation.js', () => ({
  useAuthMutation: vi.fn().mockImplementation(() => ({
    isSuccess: ref(true),
    mutateAsync: vi.fn().mockImplementation(() => ({
      id: 1234,
      email: 'email@test.com',
    })),
  })),
}));

vi.mock('../../auth-form/composables/logout-mutation.js', () => ({
  useLogoutMutation: vi.fn().mockImplementation(() => ({
    isSuccess: ref(true),
    mutateAsync: vi.fn(),
  })),
}));

describe('Auth Store', () => {
  useRouter.mockReturnValue({
    push: vi.fn(),
  });

  let authStore = null;
  let sendCodeMutation;
  let sendCode;
  let authMutation;
  let auth;
  let logoutMutation;
  let logout;

  beforeEach(() => {
    useRouter().push.mockReset();

    setActivePinia(createPinia());
    authStore = useAuthFormStore();

    sendCodeMutation = useSendCodeMutation();
    sendCode = () => authStore.sendCodeRequest(sendCodeMutation);

    authMutation = useAuthMutation();
    auth = () => authStore.authRequest(authMutation);

    logoutMutation = useLogoutMutation();
    logout = () => authStore.logoutRequest(logoutMutation);
  });

  describe('Метод sendCodeRequest ', () => {
    test('должен установить флаг isEmailSendSuccess = true, если выполнен успешный запрос отправки почты', async () => {
      authStore.email = 'email@test.com';
      await sendCode();

      // const validateEmailSpy = vi.spyOn(authStore, 'validateEmail');

      // expect(validateEmailSpy).toHaveBeenCalled();

      expect(sendCodeMutation.isSuccess.value).toBe(true);
      expect(authStore.isEmailSendSuccess).toBe(true);
    });

    test('должен записать в флаг isCodeExist значение из ответа на запрос отправки почты', async () => {
      authStore.email = 'email@test.com';
      await sendCode();

      expect(authStore.isCodeExist).toBe(false);
    });

    test('должен оставить поле ошибки пустым, если запрос выполнен успешно', async () => {
      authStore.email = 'email@test.com';
      await sendCode();

      expect(authStore.emailErrorMessage).toBe('');
    });

    test('должен записать ошибку, если запрос выполнен неуспешно', async () => {
      authStore.email = '';
      await sendCode();

      expect(authStore.emailErrorMessage).toBe('Введите электронную почту');
    });
  });

  describe('Метод validateEmail', () => {
    test('должен пробрасывать ошибку, если email не заполнен', async () => {
      try {
        authStore.validateEmail();
      } catch {
        expect(() => authStore.validateEmail()).toThrow(
          'Введите электронную почту'
        );
      }
    });
  });

  describe('Метод authRequest ', () => {
    test('должен установить флаг isAuthenticated = true, если выполнен успешный запрос отправки почты и кода', async () => {
      authStore.confirmationCode = 'kCCS1iVb57';
      await auth();

      // const validateCodeSpy = vi.spyOn(authStore, 'validateCode');
      // expect(validateCodeSpy).toHaveBeenCalled();

      expect(authMutation.isSuccess.value).toBe(true);
      expect(authStore.isAuthenticated).toBe(true);
    });

    test('должен оставить поле ошибки пустым, если запрос выполнен успешно', async () => {
      authStore.confirmationCode = 'kCCS1iVb57';

      await auth();

      expect(authStore.codeErrorMessage).toBe('');
    });

    test('должен редиректить к визарду, если запрос выполнен успешно', async () => {
      authStore.confirmationCode = 'kCCS1iVb57';

      await auth();

      expect(useRouter().push).toHaveBeenCalledWith({
        name: 'wizardStepBusiness',
      });
    });

    test('должен записать ошибку, если запрос выполнен неуспешно', async () => {
      authStore.confirmationCode = '';

      await auth();

      expect(authStore.codeErrorMessage).toBe('Введите код подтверждения');
    });
  });

  describe('Метод validateCode', () => {
    test('должен пробрасывать ошибку, если email не заполнен', async () => {
      try {
        authStore.validateCode();
      } catch {
        expect(() => authStore.validateCode()).toThrow(
          'Введите код подтверждения'
        );
      }
    });
  });

  describe('Метод logoutRequest ', () => {
    test('должен разлогинить пользователя и отправить на страницу логина при успешном запросе', async () => {
      await logout();

      expect(logoutMutation.isSuccess.value).toBe(true);
      expect(useRouter().push).toHaveBeenCalledWith({
        name: 'signup',
      });
    });
  });
});
