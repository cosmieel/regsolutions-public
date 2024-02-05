<template>
  <div
    class="draggable-item"
    :class="{ '_not-draggable': isNotDraggable }"
    ghost-class="draggable-item__ghost"
  >
    <div
      ref="mainMenuReference"
      class="draggable-item-menu hs-dropdown absolute [--placement:bottom]"
      :class="{ 'draggable-item-menu_fixed': isMenuTogglerFixed }"
    >
      <div class="hs-dropdown-toggle draggable-item-menu__toggle" @click="fixMenuToggler">
        <UiIcon name="more-vertical" :size="14" />
      </div>
      <UiDropdown class="top-4 divide-y divide-gray-100">
        <div class="py-2 first:pt-0 last:pb-0">
          <button
            v-if="props.needRequiredMenu"
            class="ui-dropdown-link"
            @click="emit('toggle-required')"
          >
            <UiIcon name="warning-filled" :size="16" />
            {{ props.isRequired ? 'Сделать необязательным' : 'Сделать обязательным' }}
          </button>
          <div
            v-if="props.needRenameMenu"
            ref="renameMenuReference"
            class="hs-dropdown [--placement:right] [--auto-close:false]"
          >
            <button class="ui-dropdown-link hs-dropdown-toggle">
              <UiIcon name="edit" :size="16" />
              Переименовать
            </button>
            <UiDropdown class="top-4 p-4 divide-y divide-gray-100" @click.stop>
              <div class="input-wrapper">
                <UiInput
                  v-model="nameInput"
                  class="input-element"
                  type="text"
                  :placeholder="''"
                ></UiInput>
                <UiButton is-outline class="input-check" @click="rename">
                  <UiIcon name="checkmark" :size="16" />
                </UiButton>
              </div>
            </UiDropdown>
          </div>
          <div
            v-if="props.needOfferMenu"
            ref="offerMenuReference"
            class="hs-dropdown [--placement:right]"
          >
            <button class="ui-dropdown-link hs-dropdown-toggle">
              <UiIcon name="settings" :size="16" />
              Настроить ссылки
            </button>
            <UiDropdown class="top-4 p-4 z-10" @click.stop>
              <div class="input-wrapper">
                <UiInput
                  v-model="rulesLinkInput"
                  class="input-element"
                  type="text"
                  label="Правила пользования сайтом"
                  :placeholder="''"
                ></UiInput>
              </div>
              <div class="input-wrapper mt-4 items-end">
                <UiInput
                  v-model="policyLinkInput"
                  class="input-element"
                  type="text"
                  label="Политика обработки данных"
                  :placeholder="''"
                ></UiInput>
                <UiButton is-outline class="input-check" @click="changeOfferLinks">
                  <UiIcon name="checkmark" :size="16" />
                </UiButton>
              </div>
            </UiDropdown>
          </div>
        </div>
        <div v-if="props.needDeleteMenu" class="py-2 first:pt-0 last:pb-0">
          <button class="ui-dropdown-link" @click="emit('delete')">
            <UiIcon name="trash-delete" :size="16" />
            Удалить
          </button>
        </div>
      </UiDropdown>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { UiButton, UiDropdown, UiIcon, UiInput } from 'account-ui';
import { ref, watch } from 'vue';

const props = defineProps({
  needRequiredMenu: {
    type: Boolean,
    default: false,
  },

  isRequired: {
    type: Boolean,
    default: false,
  },

  needRenameMenu: {
    type: Boolean,
    default: false,
  },

  name: {
    type: String,
    default: '',
  },

  needOfferMenu: {
    type: Boolean,
    default: false,
  },

  terms: {
    type: Object,

    default: () => {
      return {
        rulesLink: '',
        policyLink: '',
      };
    },
  },

  needDeleteMenu: {
    type: Boolean,
    default: false,
  },

  isNotDraggable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggle-required', 'rename', 'change-offer-links', 'delete']);

const mainMenuReference = ref(null);
const renameMenuReference = ref(null);
const offerMenuReference = ref(null);

const isMenuTogglerFixed = ref(false);

const nameInput = ref('');
const rulesLinkInput = ref('');
const policyLinkInput = ref('');

const fixMenuToggler = () => {
  isMenuTogglerFixed.value = true;
};

const releaseMenuToggler = () => {
  isMenuTogglerFixed.value = false;
};

const closeMainMenu = () => {
  window.HSDropdown.close(mainMenuReference.value);
  releaseMenuToggler();
};

const rename = () => {
  emit('rename', nameInput);
  closeMainMenu();
};

const changeOfferLinks = () => {
  emit('change-offer-links', {
    rulesLink: rulesLinkInput,
    policyLink: policyLinkInput,
  });
  closeMainMenu();
};

watch(renameMenuReference, (dropdown) => {
  dropdown.addEventListener('close.hs.dropdown', () => closeMainMenu());
});

watch(offerMenuReference, (dropdown) => {
  dropdown.addEventListener('close.hs.dropdown', () => closeMainMenu());
});

watch(mainMenuReference, (dropdown) => {
  dropdown.addEventListener('close.hs.dropdown', () => releaseMenuToggler());
});

watch(
  () => props.name,
  (name) => {
    nameInput.value = name;
  },
  { immediate: true }
);

watch(
  () => props.terms,
  (terms) => {
    rulesLinkInput.value = terms.rulesLink;
    policyLinkInput.value = terms.policyLink;
  },
  { immediate: true }
);
</script>

<style lang="postcss" scoped>
.draggable-item {
  @apply ml-[-16px] mr-[-16px] border border-transparent rounded-2xl cursor-move relative bg-white;

  &._not-draggable {
    @apply cursor-pointer;
  }

  &-menu {
    @apply w-8 h-8 invisible border border-gray-200 flex items-center justify-center cursor-pointer left-[-16px] top-[-16px] bg-white rounded-2xl shadow-sm z-[1];

    &_fixed {
      @apply visible;
    }

    &__toggle {
      @apply w-full h-full flex justify-center items-center z-10;
    }
  }

  &:hover {
    @apply border-gray-200;

    .draggable-item-menu {
      @apply visible;
    }
  }

  &__ghost {
    @apply opacity-30;
  }
}

.input {
  &-wrapper {
    @apply w-full flex;
  }

  &-element {
    @apply w-64 h-16;
  }

  &-check {
    @apply w-10 h-10 flex-none ml-[8px];

    svg {
      @apply flex-none;
    }
  }
}
</style>
