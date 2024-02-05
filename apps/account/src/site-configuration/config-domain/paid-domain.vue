<template>
  <div class="paid-domain">
    <div class="paid-domain__main">
      <div class="paid-domain__input-wrapper">
        <UiInput
          v-model.trim="domainModel"
          class="paid-domain__input"
          :class="{ 'paid-domain__input_valid': isDomainValid }"
          :type="'text'"
          :placeholder="'Домен'"
          :error-message="domainErrorMessage"
          :is-success="isDomainValid"
          :max-length="'100'"
          @keyup.enter="lookupDomain"
        />
        <div v-if="isDomainValid" class="paid-domain__cancel" @click="changeDomain">
          <UiIcon name="close" :size="16" />
        </div>
      </div>
      <UiButton
        v-if="isDomainValueChanged"
        is-outline
        :pending="isPending"
        :disabled="isPending"
        class="paid-domain__check"
        @click="lookupDomain"
      >
        <UiIcon name="checkmark" :size="16" />
      </UiButton>
    </div>

    <div v-if="isDomainValid && !isDomainConfigured" class="paid-domain__card paid-domain__dns">
      <div class="paid-domain__card-main">
        <div class="paid-domain__dns-icon">
          <UiIcon name="warning-filled" class="text-red-500 w-5 h-5" :size="20" />
        </div>
        <div class="paid-domain__card-text">
          <div class="paid-domain__card-title">Настройте DNS-записи</div>
          <div class="paid-domain__card-description">
            Отсутствует А-запись. Добавьте А-запись со значением IP: 194.58.112.10 в панели
            управления доменом у регистратора
          </div>
        </div>
      </div>
      <div class="paid-domain__dns-button">
        <a
          href="https://help.reg.ru/support/dns-servery-i-nastroyka-zony/nastroyka-resursnykh-zapisey-dns/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <UiButton is-ghost>Как настроить</UiButton>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon, UiInput } from 'account-ui';
import { computed } from 'vue';

const props = defineProps({
  domain: {
    type: String,
    required: true,
  },

  domainInitial: {
    type: String,
    required: true,
  },

  isDomainValid: {
    type: Boolean,
    default: false,
  },

  isDomainConfigured: {
    type: Boolean,
    default: false,
  },

  domainErrorMessage: {
    type: String,
    default: '',
  },

  isPending: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:domain', 'lookup-domain', 'change-domain']);

const domainModel = computed({
  get() {
    return props.domain;
  },
  set(value) {
    emit('update:domain', value);
  },
});

const isDomainValueChanged = computed(() => props.domainInitial !== domainModel.value);

function lookupDomain() {
  emit('lookup-domain');
}

function changeDomain() {
  emit('change-domain');
}
</script>

<style lang="postcss" scoped>
.paid-domain {
  &__main {
    @apply flex items-start justify-between;
  }

  &__input-wrapper {
    @apply w-full mr-2;
  }

  &__input {
    @apply w-full;
  }

  &__cancel {
    @apply absolute right-0 top-0 px-4 py-3 cursor-pointer;

    svg {
      @apply w-4 h-4;
    }
  }

  &__check {
    @apply w-10 h-10 flex-none;

    svg {
      @apply flex-none;
    }
  }

  &__card {
    @apply rounded-2xl border border-gray-200 shadow-[2px_2px_4px_0px_rgba(46_64_100_/_4%)] p-[15px] mt-4 flex items-center justify-between;

    &-main {
      @apply flex items-center;
    }

    &-text {
      @apply px-4;
    }

    &-title {
      @apply text-sm leading-6 font-medium;
    }

    &-description {
      @apply text-xs text-gray-400;
    }
  }

  &__dns {
    &-button {
      @apply whitespace-nowrap;
    }
  }
}
</style>
