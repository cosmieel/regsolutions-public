<template>
  <div class="free-domain">
    <div class="free-domain__input-wrapper">
      <UiInput
        v-model.trim="domainModel"
        class="free-domain__input"
        :type="'text'"
        :placeholder="'Домен'"
        :trailing="'.regsolutions.site'"
        :error-message="domainErrorMessage"
        :max-length="'63'"
        @input="setCheckButtonVisible"
        @input-blur="setCheckButtonHidden"
        @keyup.enter="lookupDomain"
      />
    </div>
    <UiButton
      v-if="isCheckButtonVisible"
      is-outline
      :pending="isPending"
      :disabled="isPending"
      class="free-domain__check"
      @click="lookupDomain"
    >
      <UiIcon name="checkmark" :size="16" />
    </UiButton>
  </div>
</template>

<script setup>
import { UiButton, UiIcon, UiInput } from 'account-ui';
import { computed, ref } from 'vue';

const isCheckButtonVisible = ref(false);

const props = defineProps({
  domain: {
    type: String,
    default: '',
  },

  domainErrorMessage: {
    type: String,
    default: '',
  },

  isDomainValid: {
    type: Boolean,
    default: false,
  },

  isPending: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:domain', 'lookup-domain']);

const domainModel = computed({
  get() {
    return props.domain;
  },
  set(value) {
    emit('update:domain', value);
  },
});

const setCheckButtonVisible = () => {
  isCheckButtonVisible.value = true;
};
const setCheckButtonHidden = () => {
  setTimeout(() => {
    isCheckButtonVisible.value = false;
  }, 300);
};

function lookupDomain() {
  emit('lookup-domain');
}
</script>

<style lang="postcss" scoped>
.free-domain {
  @apply flex items-start justify-between;

  &__input-wrapper {
    @apply w-full mr-2;
  }

  &__input {
    @apply w-full;

    &_valid {
      @apply pointer-events-none;
    }
  }

  &__check {
    @apply w-10 h-10 flex-none;

    svg {
      @apply flex-none;
    }
  }
}
</style>
