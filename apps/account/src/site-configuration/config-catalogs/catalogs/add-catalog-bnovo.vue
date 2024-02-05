<template>
  <div class="add-catalog-bnovo">
    <div class="add-catalog-bnovo__field">
      <div class="add-catalog-bnovo__main">
        <UiInput
          v-model="bnovoCatalogId"
          class="add-catalog-bnovo__input"
          :type="'text'"
          :placeholder="'ID Каталога'"
          :error-message="errorMessage"
          :label="'ID Каталога'"
          :max-length="'50'"
        />
      </div>

      <!-- TODO Вернуть, когда появится наш собственный FAQ -->
      <!-- <div class="add-catalog-bnovo__link">
        Как найти
        <a href="#">ID каталога</a>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { UiInput } from 'account-ui';
import { ref, watch } from 'vue';

defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['bnovo-catalog-id-input']);

const bnovoCatalogId = ref('');

watch(bnovoCatalogId, (value) => {
  if (value !== '') {
    emit('bnovo-catalog-id-input', value);
  }
});
</script>

<style lang="postcss" scoped>
.add-catalog-bnovo {
  @apply py-2;

  &__main {
    @apply flex items-end;
  }

  &__input {
    @apply w-full mb-[-12px];
  }

  &__link {
    @apply pt-2 text-sm text-gray-400;

    a {
      @apply text-blue-700;

      &:hover {
        @apply decoration-1 underline underline-offset-2 text-blue-600;
      }
    }
  }
}
</style>
