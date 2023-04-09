<template>
  <a class="link-icon" :href="href" target="_blank">
    <img :src="icon" :alt="alt"/>
  </a>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  icon: 'AppLinkIcon',
  props: {
    href: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'Иконка',
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;

.link-icon {

  &:hover {
    filter: props.$icon-svg-hover-color-primary;
  }

  &:focus {
    filter: props.$icon-svg-hover-color-primary;
    outline: none;
  }

  img {
    width: 2.4rem;
    height: 2.4rem;
  }
}
</style>
