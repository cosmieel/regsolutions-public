import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getProfileData } from '../composables/profile-data.js';
import { useSendCodeMutation } from '../composables/send-code-mutation.js';
import { useUpdateProfileDataMutation } from '../composables/update-profile-data-mutation.js';
import { ACCOUNT_TYPE } from '../constants/account-type.js';

const DEFAULT_VALUES = {
  data: null,
  userName: '',
  userEmail: '',
  userLanguage: 'RU',
  savedUserEmail: '',
  code: '',
  type: ACCOUNT_TYPE.USER,
  sendCodeErrorMessage: '',
  updateProfileDataErrorMessage: '',
  isLoading: false,
  fetchingLoading: false,
  hasDataToSave: false,
};

export const useProfileSettingsStore = defineStore('profileSettings', () => {
  const sendCodeMutation = useSendCodeMutation();
  const updateProfileDataMutation = useUpdateProfileDataMutation();

  const data = ref(DEFAULT_VALUES.data);
  const userName = ref(DEFAULT_VALUES.userName);
  const userEmail = ref(DEFAULT_VALUES.userEmail);
  const userLanguage = ref(DEFAULT_VALUES.userLanguage);
  const savedUserEmail = ref(DEFAULT_VALUES.savedUserEmail);
  const code = ref(DEFAULT_VALUES.code);
  const type = ref(DEFAULT_VALUES.type);
  const isCodeNeeded = computed(() => {
    return userEmail.value !== savedUserEmail.value;
  });

  const sendCodeErrorMessage = ref(DEFAULT_VALUES.sendCodeErrorMessage);
  const updateProfileDataErrorMessage = ref(DEFAULT_VALUES.updateProfileDataErrorMessage);
  const isLoading = ref(DEFAULT_VALUES.isLoading);
  const fetchingLoading = ref(DEFAULT_VALUES.fetchingLoading);
  const hasDataToSave = ref(DEFAULT_VALUES.hasDataToSave);

  const isAdmin = computed(() => data.value?.type === ACCOUNT_TYPE.ADMIN);

  const setUserName = (name) => {
    hasDataToSave.value = true;
    userName.value = name;
  };
  const setUserEmail = (email) => {
    hasDataToSave.value = true;
    userEmail.value = email;
  };
  const setUserLanguage = (language) => {
    hasDataToSave.value = true;
    userLanguage.value = language;
  };
  const setCode = (codeInput) => {
    code.value = codeInput;
  };

  const clearCodeErrorMessage = () => {
    sendCodeErrorMessage.value = '';
  };

  const clearUpdateProfileDataErrorMessage = () => {
    updateProfileDataErrorMessage.value = '';
  };

  const sendCode = async () => {
    try {
      isLoading.value = true;
      await sendCodeMutation.mutateAsync(userEmail.value);
    } catch (error) {
      if (error.message === 'ValidationError') {
        updateProfileDataErrorMessage.value = error.message;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const updateProfileData = async () => {
    try {
      isLoading.value = true;
      const newProfileData = {
        name: userName.value,
        language: userLanguage.value,
      };

      if (isCodeNeeded.value) {
        newProfileData.email = userEmail.value;
        newProfileData.code = code.value;
      }

      await updateProfileDataMutation.mutateAsync(newProfileData);

      hasDataToSave.value = false;
      savedUserEmail.value = newProfileData.email;
    } catch (error) {
      if (error.message === 'AccessDenied') {
        sendCodeErrorMessage.value = error.message;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const loadProfileData = async () => {
    fetchingLoading.value = true;

    try {
      const profileData = await getProfileData();

      if (profileData) {
        data.value = profileData;

        userName.value = profileData.name;
        userEmail.value = profileData.email;
        userLanguage.value = profileData.language;
        savedUserEmail.value = profileData.email;
        type.value = profileData.type;
        hasDataToSave.value = false;
      }
    } finally {
      fetchingLoading.value = false;
    }
  };

  const $reset = () => {
    data.value = DEFAULT_VALUES.data;
    userName.value = DEFAULT_VALUES.userName;
    userEmail.value = DEFAULT_VALUES.userEmail;
    userLanguage.value = DEFAULT_VALUES.userLanguage;
    savedUserEmail.value = DEFAULT_VALUES.savedUserEmail;
    code.value = DEFAULT_VALUES.code;
    type.value = DEFAULT_VALUES.type;

    sendCodeErrorMessage.value = DEFAULT_VALUES.sendCodeErrorMessage;
    updateProfileDataErrorMessage.value = DEFAULT_VALUES.updateProfileDataErrorMessage;
    isLoading.value = DEFAULT_VALUES.isLoading;
    fetchingLoading.value = DEFAULT_VALUES.fetchingLoading;
    hasDataToSave.value = DEFAULT_VALUES.hasDataToSave;
  };

  return {
    data,
    userName,
    userEmail,
    userLanguage,
    isCodeNeeded,
    sendCodeErrorMessage,
    updateProfileDataErrorMessage,
    isLoading,
    fetchingLoading,
    hasDataToSave,
    isAdmin,
    $reset,
    setUserEmail,
    setUserName,
    setUserLanguage,
    setCode,
    clearCodeErrorMessage,
    clearUpdateProfileDataErrorMessage,
    sendCode,
    updateProfileData,
    loadProfileData,
  };
});
