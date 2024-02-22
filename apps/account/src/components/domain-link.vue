<template>
  <a
    v-if="domain"
    :href="`https://${domain}`"
    target="_blank"
    rel="noreferrer noopener"
    class="domain-link"
  >
    {{ domain }}
  </a>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  domainFree: {
    type: [String, null],
    required: true,
  },

  domain: {
    type: [String, null],
    required: false,
    default: '',
  },
});

const domain = computed(() => props.domain || props.domainFree);
</script>

<style lang="postcss" scoped>
.domain-link {
  @apply block text-blue-600 decoration-0 underline-offset-2 truncate break-all;

  &:hover {
    @apply decoration-1 underline;
  }

  &:focus,
  &:active {
    @apply no-underline;
  }
}
</style>
