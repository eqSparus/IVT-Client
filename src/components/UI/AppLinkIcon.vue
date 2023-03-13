<template>
  <a :href="href" target="_blank">
    <img :src="icon" :alt="alt" />
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
      default: 'Инока',
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

a {
  &:hover {
    filter: prop.$icon-svg-hover-color-info;
  }
}
</style>
