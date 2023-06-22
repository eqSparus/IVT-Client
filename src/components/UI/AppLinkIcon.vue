<template>
  <a class="link-icon"
     :href="href"
     target="_blank">
    <img class="icon-img"
         :src="linksIcon.get(icon)"
         :alt="linksIcon.get(icon)"/>
  </a>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import useEditSiteLinks from '@/hooks/useEditSiteLinks';

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
  setup() {
    const {
      linksIcon,
    } = useEditSiteLinks();

    return {
      linksIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;

.link-icon {

  &:hover {
    filter: props.$icon-svg-hover-color-info;
  }

  &:focus {
    filter: props.$icon-svg-hover-color-info;
    outline: none;
  }

  .icon-img {
    width: 2.4rem;
    height: 2.4rem;
  }
}
</style>
