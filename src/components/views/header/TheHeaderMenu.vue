<template>
  <the-desktop-header-menu v-if="isPhone" :anchors="anchors" :logo-anchor="logoAnchor"/>
  <the-phone-header-menu v-else :anchors="anchors"/>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import TheDesktopHeaderMenu from '@/components/views/header/TheDesktopHeaderMenu.vue';
import ThePhoneHeaderMenu from '@/components/views/header/ThePhoneHeaderMenu.vue';
import { Anchor } from '@/types/util.types';

export default defineComponent({
  name: 'TheHeaderMenu',
  components: {
    ThePhoneHeaderMenu,
    TheDesktopHeaderMenu,
  },
  props: {
    anchors: {
      type: Object as PropType<Array<Anchor>>,
      required: true,
    },
    logoAnchor: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isPhone = window.devicePixelRatio < 2;

    return {
      isPhone,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
