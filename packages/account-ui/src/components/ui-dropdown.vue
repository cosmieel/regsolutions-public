<template>
  <div class="ui-dropdown hs-dropdown-menu">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="postcss">
.ui-dropdown {
  @apply duration-[100ms] opacity-0 z-20 bg-white rounded-2xl p-2 border border-gray-200 hs-dropdown-open:opacity-100 transition-[opacity,margin] shadow-[2px_2px_12px_0px_rgba(46_64_100_/_4%),_1px_4px_20px_0px_rgba(46_64_100_/_8%)] hidden;
}

.ui-dropdown-link,
.ui-dropdown-link_blue,
.ui-dropdown-link_bg-blue,
.ui-dropdown-link_red {
  @apply flex items-center whitespace-nowrap py-1 px-4 rounded-lg text-sm leading-6 w-full;

  &:hover {
    @apply bg-blue-50 text-blue-600;
  }

  &._disabled {
    @apply opacity-40 pointer-events-none;
  }

  svg {
    @apply mr-3;
  }

  span + svg {
    @apply mr-0 ml-auto;
  }
}

.ui-dropdown-link {
  @apply text-gray-700;

  &:active {
    @apply bg-blue-100;
  }
}

.ui-dropdown-link_blue {
  @apply text-blue-700;

  &:active {
    @apply bg-blue-100;
  }
}

.ui-dropdown-link_bg-blue {
  &:hover {
    @apply bg-blue-50;
  }

  &:active {
    @apply bg-blue-100;
  }
}

.ui-dropdown-link_red {
  @apply text-red-500;

  &:hover {
    @apply bg-gray-50 text-red-500;
  }

  &:active {
    @apply bg-gray-100;
  }
}
</style>
