import { callSuccessfullySiteCreationNotification } from 'account/src/utility/notifications/success/successfuly-site-creation';
import { defineStore, storeToRefs } from 'pinia';
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fullImageSource } from '../../components/composables/full-image-source.js';
import { useUploadMutation } from '../../components/composables/upload-mutation.js';
import { useValidateDomainMutation } from '../../components/composables/validate-domain-mutation.js';
import { useUserAccountStore } from '../../user-account/stores/user-account.js';
import { AbortControllerManager } from '../../utility/abort-controller-manager.js';
import { useCreateSiteMutation } from '../composables/create-site-mutation.js';

const INITIAL_DATA = {
  selectedBusiness: '',
  domain: '',
  logo: '',
  logoUri: '',
  color: '',
  description: '',
  name: '',
  isPaletteColorSelected: false,
  isCustomColorSelected: false,
  domainValidationErrorMessage: '',
  logoValidationErrorMessage: '',
  isLogoUploading: false,
  isCompleted: false,
};

const abortManager = new AbortControllerManager();

export const useWizardStore = defineStore('wizardStore', () => {
  const router = useRouter();

  const createSiteMutation = useCreateSiteMutation();
  const validateDomainMutation = useValidateDomainMutation();
  const uploadMutation = useUploadMutation();

  const userAccountStore = useUserAccountStore();
  const { currentImagesStorage } = storeToRefs(userAccountStore);

  const wizardResult = reactive({
    name: '',
    type: '',
    domain: '',
    logo: '',
    color: '',
    description: '',
  });

  const selectedBusiness = ref(INITIAL_DATA.selectedBusiness);
  const domain = ref(INITIAL_DATA.domain);
  const logo = ref(INITIAL_DATA.logo);
  const logoUri = ref(INITIAL_DATA.logoUri);
  const color = ref(INITIAL_DATA.color);
  const description = ref(INITIAL_DATA.description);
  const name = ref(INITIAL_DATA.name);

  const isPaletteColorSelected = ref(INITIAL_DATA.isPaletteColorSelected);
  const isCustomColorSelected = ref(INITIAL_DATA.isCustomColorSelected);

  const domainValidationErrorMessage = ref(INITIAL_DATA.domainValidationErrorMessage);
  const logoValidationErrorMessage = ref(INITIAL_DATA.logoValidationErrorMessage);

  const isCompleted = ref(INITIAL_DATA.isCompleted);

  const allValues = computed(() => ({
    selectedBusiness: selectedBusiness.value,
    domain: domain.value,
    logo: logo.value,
    logoUri: logoUri.value,
    color: color.value,
    description: description.value,
    name: name.value,
  }));

  const hasAnyValue = computed(() => Object.values(allValues.value).some((value) => !!value));

  const isLogoUploading = ref(false);

  watch(wizardResult, (value) => {
    localStorage.setItem('wizard', JSON.stringify(value));
  });

  watch(selectedBusiness, (value) => {
    wizardResult.type = value;
  });

  watch(name, (value) => {
    wizardResult.name = value;
  });

  watch(domain, (value) => {
    nextTick(() => {
      domain.value = value.toLowerCase().replaceAll(/[^\d.a-zа-я-]/g, '');
    });
    wizardResult.domain = `${value}.regsolutions.site`;
    domainValidationErrorMessage.value = '';
  });

  watch(logo, (value) => {
    wizardResult.logo = value;
    logoValidationErrorMessage.value = '';
  });

  watch(color, (value) => {
    wizardResult.color = value;
  });

  watch(description, (value) => {
    wizardResult.description = value;
  });

  watch(currentImagesStorage, (storage) => {
    if (localStorage.getItem('wizard')) {
      const wizard = JSON.parse(localStorage.getItem('wizard'));

      if (wizard.logo) {
        logoUri.value = fullImageSource(wizard.logo, storage);
      }
    }
  });

  onMounted(() => {
    if (localStorage.getItem('wizard')) {
      const wizard = JSON.parse(localStorage.getItem('wizard'));

      Object.keys(wizardResult).map((item) => (wizardResult[item] = wizard[item]));

      selectedBusiness.value = wizard.type;
      domain.value = wizard.domain.split('.')[0];
      logo.value = wizard.logo;
      logoUri.value = wizard.logo;
      color.value = wizard.color;
      description.value = wizard.description;
      name.value = wizard.name;
    }

    if (localStorage.getItem('isPaletteColorSelected')) {
      isPaletteColorSelected.value = Boolean(localStorage.getItem('isPaletteColorSelected'));
    }
  });

  async function createSiteRequest() {
    const isDomainValid = await validateDomain();

    if (!isDomainValid) {
      return;
    }

    const wizardData = {
      ...wizardResult,
    };

    await createSiteMutation.mutateAsync(wizardData);

    if (createSiteMutation.isSuccess.value) {
      router.push({ name: 'wizardStepSuccess' });

      callSuccessfullySiteCreationNotification();

      isCompleted.value = true;
    }
  }

  function $reset() {
    selectedBusiness.value = INITIAL_DATA.selectedBusiness;
    domain.value = INITIAL_DATA.domain;
    logo.value = INITIAL_DATA.logo;
    logoUri.value = INITIAL_DATA.logoUri;
    color.value = INITIAL_DATA.color;
    description.value = INITIAL_DATA.description;
    name.value = INITIAL_DATA.name;
    isPaletteColorSelected.value = INITIAL_DATA.isPaletteColorSelected;
    isCustomColorSelected.value = INITIAL_DATA.isCustomColorSelected;
    domainValidationErrorMessage.value = INITIAL_DATA.domainValidationErrorMessage;
    logoValidationErrorMessage.value = INITIAL_DATA.logoValidationErrorMessage;
    isCompleted.value = INITIAL_DATA.isCompleted;

    localStorage.removeItem('wizard');
    localStorage.removeItem('isPaletteColorSelected');
  }

  async function validateDomainRequest() {
    try {
      const isDomainValid = await validateDomain();

      if (isDomainValid) {
        domainValidationErrorMessage.value = '';
        router.push({ name: 'wizardStepLogo' });
      }
    } catch (error) {
      domainValidationErrorMessage.value = error.message;
    }
  }

  async function validateDomain() {
    try {
      await validateDomainMutation.mutateAsync({ domain: wizardResult.domain });
      domainValidationErrorMessage.value = '';
    } catch (error) {
      if (error.message === 'ValidationError') {
        domainValidationErrorMessage.value = 'Домен уже занят. Попробуйте другой домен';

        router.push({ name: 'wizardStepDomain' });

        return;
      }

      domainValidationErrorMessage.value = error.message;
    }

    return validateDomainMutation.isSuccess.value;
  }

  function abortUploading() {
    if (isLogoUploading.value) {
      abortManager.abort();

      if (abortManager.signal.aborted) {
        abortManager.reinitialize();
      }
    }
  }

  async function uploadRequest() {
    abortUploading();

    isLogoUploading.value = true;

    try {
      const data = await uploadMutation.mutateAsync({
        file: wizardResult.logo,
        signal: abortManager.signal,
      });

      if (uploadMutation.isSuccess.value) {
        if (logoValidationErrorMessage.value) {
          logoValidationErrorMessage.value = '';
        }

        wizardResult.logo = data.url;

        isLogoUploading.value = false;
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        logoValidationErrorMessage.value = error.message;
      }

      isLogoUploading.value = false;
    }
  }

  async function createSiteByYourself(callback) {
    const domain = `${Math.random().toString(16).slice(2)}.regsolutions.site`;

    const siteData = {
      type: 'OTHER',
      domain: domain,
      name: 'Мой сайт',
      color: '#406cff',
      description: '',
      logo: '',
    };

    try {
      await createSiteMutation.mutateAsync(siteData);

      if (createSiteMutation.isSuccess.value) {
        callback?.();

        callSuccessfullySiteCreationNotification();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    wizardResult,
    selectedBusiness,
    name,
    domain,
    logo,
    logoUri,
    color,
    isCompleted,
    hasAnyValue,
    description,
    isLogoUploading,
    isPaletteColorSelected,
    isCustomColorSelected,
    createSiteRequest,
    validateDomainRequest,
    domainValidationErrorMessage,
    uploadRequest,
    logoValidationErrorMessage,
    currentImagesStorage,
    createSiteByYourself,
    abortUploading,
    $reset,
  };
});
