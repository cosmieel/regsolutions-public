<template>
  <div
    class="card-picture"
    :class="cardClass"
    @click="click"
    @mouseenter="hover"
    @mouseleave="leave"
  >
    <div class="card-picture__wrapper">
      <img :src="pictureUrl" />
    </div>
    <span class="card-picture__title">{{ title }}</span>
  </div>
</template>

<script setup>
import { computed, onUnmounted } from 'vue';

const emit = defineEmits(['hover', 'leave', 'delete', 'click']);

const property = defineProps({
  picture: {
    type: String,
    default: '',
  },

  title: {
    type: String,
    default: '',
  },

  color: {
    type: String,
    default: 'blue',
  },

  desabled: {
    type: Boolean,
    default: false,
  },
});

const pictureUrl = new URL(`../../assets/pictures-blocks/${property.picture}.png`, import.meta.url)
  .href;

onUnmounted(() => {
  emit('delete');
});

const cardClass = computed(() => {
  return property.desabled
    ? `card-picture_color_${property.color} card-picture_desabled`
    : `card-picture_color_${property.color}`;
});

function hover() {
  if (property.desabled) {
    return;
  }

  emit('hover');
}

function leave() {
  if (property.desabled) {
    return;
  }

  emit('leave');
}

function click() {
  if (property.desabled) {
    return;
  }

  emit('click');
}
</script>

<style lang="postcss" scoped>
.card-picture {
  @apply flex flex-col items-center justify-between w-[132px] h-[132px] p-4 pt-5 rounded-2xl border border-white cursor-pointer;

  &:hover {
    @apply ring-4;
  }

  &_color {
    &_blue {
      @apply bg-blue-50;

      &:hover {
        @apply ring-blue-100;
      }

      & .card-picture__title {
        @apply text-blue-500;
      }
    }

    &_violet {
      @apply bg-violet-50;

      &:hover {
        @apply ring-violet-100;
      }

      & .card-picture__title {
        @apply text-violet-500;
      }
    }

    &_pink {
      @apply bg-pink-50;

      &:hover {
        @apply ring-pink-100;
      }

      & .card-picture__title {
        @apply text-pink-500;
      }
    }

    &_red {
      @apply bg-red-50;

      &:hover {
        @apply ring-red-100;
      }

      & .card-picture__title {
        @apply text-red-500;
      }
    }

    &_orange {
      @apply bg-orange-50;

      &:hover {
        @apply ring-orange-100;
      }

      & .card-picture__title {
        @apply text-orange-500;
      }
    }

    &_lime {
      @apply bg-lime-50;

      &:hover {
        @apply ring-lime-100;
      }

      & .card-picture__title {
        @apply text-lime-600;
      }
    }

    &_green {
      @apply bg-green-50;

      &:hover {
        @apply ring-green-100;
      }

      & .card-picture__title {
        @apply text-green-500;
      }
    }

    &_sky {
      @apply bg-sky-50;

      &:hover {
        @apply ring-sky-100;
      }

      & .card-picture__title {
        @apply text-sky-500;
      }
    }
  }

  &_desabled {
    @apply opacity-50 cursor-auto;

    &:hover {
      @apply ring-0;
    }
  }

  &__wrapper {
    @apply h-full flex flex-col justify-center;
  }

  &__title {
    @apply text-xs font-medium leading-4;
  }

  &__preview-wrapper {
    @apply absolute w-[352px] h-[286px] left-8 bg-violet-50;
  }
}
</style>
