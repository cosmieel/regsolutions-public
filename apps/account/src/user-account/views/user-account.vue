<template>
  <div class="user-account" :class="[setBgColor]">
    <header class="user-account__header">
      <AccountNavigation />
    </header>

    <section class="user-account__body">
      <router-view name="sidebar" />

      <section class="user-account__main">
        <section class="user-account__content">
          <div class="user-account__content-inner" :class="[setWidth]">
            <router-view />
          </div>
        </section>
        <footer class="user-account__footer">
          <AccountFooter />
        </footer>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AccountFooter from '../../components/account-footer.vue';
import AccountNavigation from '../../components/account-navigation.vue';

const route = useRoute();

const isMainPage = computed(() => {
  return route.name === 'accountMain' || route.name === 'accountMainEmpty';
});

const setBgColor = computed(() => {
  return isMainPage.value ? 'bg-white' : 'bg-gray-50';
});
const setWidth = computed(() => {
  return isMainPage.value ? 'max-w-[720px]' : 'max-w-[616px]';
});

defineProps({});
</script>

<style lang="postcss" scoped>
.user-account {
  @apply w-full h-full flex flex-col;

  &__header {
    @apply fixed top-0 left-0 w-full z-50;
  }

  &__body {
    @apply grow pt-16 flex;
  }

  &__main {
    @apply flex flex-col grow;
  }

  &__content {
    @apply px-6 pt-10 grow;

    &-inner {
      @apply mx-auto;
    }
  }

  &__footer {
    @apply px-6 py-[88px];
  }
}
</style>
