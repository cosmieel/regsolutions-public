<template>
  <a class="ds-social" :class="socialClass" :href="url" :target="target">
    <DsIcon :name="social.icon" class="ds-social__icon" />
  </a>
</template>

<script setup>
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import { computed } from 'vue';

const property = defineProps({
  social: {
    type: Object,
    required: true,
  },
});

const target = computed(() => {
  if (property.social.icon === 'mail') {
    return '_self';
  }

  return '_blank';
});

const url = computed(() => {
  if (property.social.icon === 'mail' && !/^(mailto:)/.test(property.social.url)) {
    return `mailto:${property.social.url}`;
  }

  if (property.social.icon === 'whats-app' && !/^(http)/.test(property.social.url)) {
    return `https://wa.me/${property.social.url}`;
  }

  return property.social.url;
});

const socialClass = computed(() => {
  return `ds-social_type_${property.social.icon}`;
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-social {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 12px 24px;
  border-radius: $radius-m;
  background-color: var(--basic-09);
  transition: all 0.15s ease-in-out;

  &:focus,
  &:hover {
    & .ds-social__icon {
      color: var(--font-primary-inverse);
    }
  }

  &_type {
    &_youtube {
      &:focus,
      &:hover {
        background-color: #f33736;
      }
    }

    &_vk {
      &:focus,
      &:hover {
        background-color: #4081ff;
      }
    }

    &_twitter {
      &:focus,
      &:hover {
        background-color: #1ea1f2;
      }
    }

    &_ok {
      &:focus,
      &:hover {
        background-color: #ff7700;
      }
    }

    &_telegram {
      &:focus,
      &:hover {
        background-color: #5dafe9;
      }
    }

    &_instagram {
      &:focus,
      &:hover {
        background-color: #f1296a;
      }
    }

    &_whats-app {
      &:focus,
      &:hover {
        background-color: #20dd5e;
      }
    }

    &_tiktok {
      &:focus,
      &:hover {
        background-color: #2b2d33;
      }
    }

    &_linkedin {
      &:focus,
      &:hover {
        background-color: #4699e1;
      }
    }

    &_facebook {
      &:focus,
      &:hover {
        background-color: #0b82ed;
      }
    }

    &_google {
      &:focus,
      &:hover {
        background-color: #fac03f;
      }
    }

    &_yandex {
      &:focus,
      &:hover {
        background-color: #e85032;
      }
    }

    &_apple {
      &:focus,
      &:hover {
        background-color: #2b2d33;
      }
    }

    &_mail {
      &:focus,
      &:hover {
        background-color: #265cff;
      }
    }

    &_discord {
      &:focus,
      &:hover {
        background-color: #5865f2;
      }
    }

    &_share {
      &:focus,
      &:hover {
        background-color: #f3f3f3;

        & .ds-social__icon {
          color: var(--font-primary);
        }
      }
    }
  }

  &__icon {
    color: var(--font-thertiary);
  }
}
</style>
