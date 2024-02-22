<template>
  <span v-if="storeType === 'catalog'" class="order-form__label"> Форма заказа </span>
  <div class="order-form__main">
    <AddField class="order-form__add" @add-field="onAddField" />
    <UiCard class="order-form__card" :need-divider="false" :need-header="false">
      <template #default>
        <DraggableContainer :list="draggableItems" @change="onMove">
          <div
            v-for="(item, itemIndex) in draggableItems"
            :key="item.name"
            ghost-class="draggable-item__ghost"
          >
            <component
              :is="components[fieldTypeAndComponentMap[item.type]]"
              :label="item.label"
              :is-required="item.required"
              @delete="onDeleteItem(itemIndex)"
              @rename="onRenameItem(itemIndex, $event)"
              @toggle-required="onToggleRequiredItem(itemIndex)"
            />
          </div>
        </DraggableContainer>

        <InputButton :label="currentCheckout.button.text" @rename="onRenameButton"></InputButton>

        <InputOffer
          v-if="currentCheckout.terms"
          :terms="currentCheckout.terms"
          @change-offer-links="onChangeOfferLinks"
          @delete-item="onDeleteTerms"
        />
      </template>
    </UiCard>
  </div>
</template>

<script setup>
import { generateUniqueKey } from 'account/src/utility/generate-unique-key';
import { UiCard } from 'account-ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { VueDraggableNext as DraggableContainer } from 'vue-draggable-next';
import AddField from './add-field.vue';
import InputButton from './input-button.vue';
import InputField from './input-field.vue';
import InputOffer from './input-offer.vue';
import InputTextarea from './input-textarea.vue';
import { useCatalogConfigurationStore } from '../../site-configuration/stores/catalog-configuration-store.js';
import { useSiteConfigurationStore } from '../../site-configuration/stores/site-configuration-store.js';

const props = defineProps({
  storeType: {
    required: true,
    type: String,
  },
});

const store =
  props.storeType === 'catalog' ? useCatalogConfigurationStore() : useSiteConfigurationStore();

const { currentCheckout } = storeToRefs(store);

const components = {
  input: InputField,
  textarea: InputTextarea,
  button: InputButton,
  offer: InputOffer,
};

const fieldTypeAndComponentMap = {
  text: 'input',
  email: 'input',
  phone: 'input',
  input: 'input',
  textarea: 'textarea',
};

const getDefaultField = function (fieldType) {
  const possibleFields = [
    {
      type: 'text',
      label: 'Имя',
      required: false,
    },
    {
      type: 'email',
      label: 'E-mail',
      required: true,
    },
    {
      type: 'phone',
      label: 'Телефон',
      required: false,
    },
    {
      type: 'input',
      label: 'Однострочный текст',
      required: false,
    },
    {
      type: 'textarea',
      label: 'Многострочный текст',
      required: false,
    },
  ];

  return possibleFields.find((field) => field.type === fieldType);
};

const draggableItems = computed(() => {
  return [...currentCheckout.value.fields];
});

const isFieldExists = (fieldType) => {
  return draggableItems.value.find((item) => item.type === fieldType);
};

const onMove = (event) => {
  const { newIndex, oldIndex } = event.moved;
  store.moveCheckoutField(oldIndex, newIndex);
};

const onAddField = (fieldType) => {
  if (fieldType === 'offer') {
    if (!currentCheckout.value.terms) {
      store.addTerms();
    }

    return;
  }

  switch (fieldType) {
    case 'email':
    case 'phone':
    case 'text': {
      if (isFieldExists(fieldType)) {
        return;
      }
    }

    // eslint-disable-next-line no-fallthrough
    default: {
      store.addCheckoutField({
        name: `field${generateUniqueKey()}`,
        ...getDefaultField(fieldType),
      });

      break;
    }
  }
};

const onRenameButton = (newName) => {
  store.setButtonLabel(newName);
};

const onDeleteItem = (itemIndex) => {
  store.deleteCheckoutField(itemIndex);
};

const onRenameItem = (itemIndex, newName) => {
  store.renameCheckoutField(itemIndex, newName);
};

const onToggleRequiredItem = (itemIndex) => {
  store.toggleRequiredCheckoutField(itemIndex);
};

const onDeleteTerms = () => {
  store.deleteTerms();
};

const onChangeOfferLinks = (newTerms) => {
  store.setTerms(newTerms);
};
</script>

<style lang="postcss" scoped>
.order-form {
  &__main {
    &:hover {
      .order-form__add {
        @apply visible;
      }
    }
  }

  &__add:not(.open) {
    @apply invisible;
  }

  &__card {
    @apply border border-gray-200 shadow-none;
  }

  &__label {
    @apply block text-sm mb-2 leading-4 text-left text-gray-500;
  }
}
</style>
