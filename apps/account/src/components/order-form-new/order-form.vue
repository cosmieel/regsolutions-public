<template>
  <div class="order-form">
    <AddItem class="order-form__add" :is-disabled="isDisabledAddItemOption" @add="handleAddItem" />
    <UiCard class="order-form__card" :need-divider="false" :need-header="false">
      <FieldsSection />

      <ButtonSection />

      <TermsSection v-if="terms" />
    </UiCard>
  </div>
</template>

<script setup>
import { UiCard } from 'account-ui';
import AddItem from './components/add-item.vue';
import ButtonSection from './components/button-section/button-section.vue';
import FieldsSection from './components/fields-section/fields-section.vue';
import TermsSection from './components/terms-section/terms-section.vue';
import { useOrderForm } from './use-order-form.js';

const props = defineProps({
  fields: {
    type: Array,
    required: false,
    default: () => [],
  },

  terms: {
    type: Object,
    required: false,
    default: null,
  },

  button: {
    type: Object,
    required: false,
    default: null,
  },
});

const emit = defineEmits(['change']);

const handleChange = (value) => {
  emit('change', value);
};

const { terms, handleAddItem, isDisabledAddItemOption } = useOrderForm(props, handleChange);
</script>

<style lang="postcss" scoped>
.order-form {
  &:hover {
    .order-form__add {
      @apply visible;
    }
  }

  &__add:not(.open) {
    @apply invisible;
  }

  &__card {
    @apply border border-gray-200 shadow-none;
  }
}
</style>
