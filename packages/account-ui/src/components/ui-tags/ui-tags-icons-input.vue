<template>
  <div class="ui-tags-input">
    <div>
      <div class="relative">
        <label>
          <span v-if="label" class="ui-tags-input__label">{{ label }}</span>
          <div class="ui-tags-input__input-wrapper">
            <input
              v-model.trim="newTag.text"
              type="text"
              autocomplete="off"
              :placeholder="placeholder"
              class="ui-tags-input__input"
              :class="{ 'ui-tags-input__input_invalid': errorMessage }"
              :style="{ 'padding-left': `${paddingLeft}px` }"
              maxlength="1000"
              :disabled="(isTagSingle && tags?.text) || false"
              @blur="addTag(newTag)"
              @keydown.enter="addTag(newTag)"
              @keydown.prevent.tab="addTag(newTag)"
              @keydown.delete="newTag.length > 0 || removeTag(tags?.length - 1)"
            />
          </div>
        </label>
      </div>
      <p v-if="errorMessage" class="ui-tags-input__error-message">
        {{ errorMessage }}
      </p>
    </div>

    <ul v-if="isTagSingle" ref="tagsListReference" class="ui-tags-input__tags">
      <li v-if="tags?.text" class="ui-tags-input__tag">
        {{ tags.text }}
        <button class="ui-tags-input__delete" @click="removeTag(index)">
          <UiIcon name="close" :size="12" />
        </button>
      </li>
    </ul>

    <ul
      v-else
      ref="tagsListReference"
      class="ui-tags-input__tags"
      :class="{ 'custom-scrollbar ui-tags-input__tags_custom-h-scroll': isCustomScrollbar }"
    >
      <li v-for="(tag, index) in tags" :key="tag" class="ui-tags-input__tag">
        {{ tag.text }}
        <button class="ui-tags-input__delete" @click="removeTag(index)">
          <UiIcon name="close" :size="12" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, computed } from 'vue';
import { isCustomScrollbar } from './utility/is-custom-scrollbar.js';
import { splitTags } from './utility/split-tags.js';
import UiIcon from '../ui-icon.vue';

const props = defineProps({
  modelValue: {
    type: [Array, Object],
    default: () => [],
  },

  label: {
    type: String,
    default: '',
  },

  errorMessage: {
    type: String,
    default: '',
  },

  placeholder: {
    type: String,
    default: '',
  },

  maxTags: {
    type: Number,
    default: 50,
  },

  isTagSingle: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const tags = ref(props.modelValue);
const newTag = ref({
  text: '',
  icon: '',
});

const addTag = (tag) => {
  if (!tag.text) {
    return;
  }

  if (props.modelValue?.length > props.maxTags) {
    newTag.value = {
      text: '',
      icon: '',
    };

    return;
  }

  if (JSON.stringify(tags.value).includes(JSON.stringify(tag))) {
    newTag.value = {
      text: '',
      icon: '',
    };

    return;
  }

  if (props.isTagSingle) {
    tags.value = tag;
  } else {
    tags.value.push(...splitTags(tag, true));
  }

  emit('update:modelValue', tags.value);

  newTag.value = {
    text: '',
    icon: '',
  };
};

const removeTag = (index) => {
  if (newTag.value.text) {
    return;
  }

  if (props.isTagSingle) {
    tags.value = null;
  } else {
    tags.value.splice(index, 1);
  }

  emit('update:modelValue', tags.value);
};

const paddingLeft = ref(15);
const tagsListReference = ref(null);

const extraPadding = computed(() => {
  return tags.value?.length > 0 || (props.isTagSingle && tags.value?.text) ? 24 : 15;
});

const onTagsChange = () => {
  paddingLeft.value = tagsListReference.value.clientWidth + extraPadding.value;
  tagsListReference.value.scrollTo(tagsListReference.value.scrollWidth, 0);

  if (tags.value?.length > props.maxTags) {
    tags.value = tags.value.slice(0, -1);
  }
};

watch(
  tags,
  () => {
    nextTick(onTagsChange);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value) => {
    const isNoValue = tags.value?.length === 0;
    const isValueEqualEmptyString = tags.value?.length === 1 && tags.value[0] === '';

    if (isNoValue || isValueEqualEmptyString) {
      return;
    }

    tags.value = value;
  },
  { deep: true }
);

onMounted(() => {
  onTagsChange();

  if (tags.value?.length === 1 && tags.value?.[0] === '') {
    tags.value = [];
  }
});
</script>

<style lang="postcss" scoped>
@import 'index.postcss';
</style>
