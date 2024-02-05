<template>
  <DraggableItem
    :need-offer-menu="true"
    :terms="props.terms"
    :is-not-draggable="true"
    :need-delete-menu="true"
    @delete="deleteItem"
    @change-offer-links="changeOfferLinks"
  >
    <span class="offer-text"
      >Отправляя заявку, вы соглашаетесь с
      <a :href="props.terms.rulesLink">правилами пользования сайтом</a> и
      <a :href="props.terms.policyLink">политикой обработки персональных данных</a></span
    >
  </DraggableItem>
</template>

<script setup>
import DraggableItem from './draggable-item.vue';

const props = defineProps({
  terms: {
    required: true,
    type: Object,
  },
});
const emit = defineEmits(['change-offer-links', 'delete-item']);

const changeOfferLinks = (newTerms) => {
  emit('change-offer-links', newTerms);
};

const deleteItem = () => {
  emit('delete-item');
};
</script>

<style lang="postcss">
.offer-text {
  @apply p-5 relative block text-gray-700 text-sm text-center;

  a {
    @apply underline;
  }
}
</style>
