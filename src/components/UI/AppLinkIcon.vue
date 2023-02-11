<template>
  <a :href="href" target="_blank">
    <img :src="getLinksByName(name)" :alt="alt" />
  </a>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import vkLink from '@/assets/images/links/vk-link.svg';
import omgtuLink from '@/assets/images/links/omgtu-link.svg';
import whatsappLink from '@/assets/images/links/whatsapp-link.svg';
import telegramLink from '@/assets/images/links/telegram-link.svg';
import emailLink from '@/assets/images/links/email-link.svg';
import defaultLink from '@/assets/images/links/message-link.svg';

export default defineComponent({
  name: 'AppLinlIcon',
  props: {
    href: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'Инока',
    },
  },
  setup() {
    const reg = /\/img\/|-link.\w+.svg/g;
    const links = new Map<string, string>([
      [vkLink.replace(reg, ''), vkLink],
      [omgtuLink.replace(reg, ''), omgtuLink],
      [whatsappLink.replace(reg, ''), whatsappLink],
      [emailLink.replace(reg, ''), emailLink],
      [telegramLink.replace(reg, ''), telegramLink],
    ]);

    const getLinksByName = (name: string): string => {
      const img = links.get(name);
      if (img) {
        return img;
      }
      console.error('Иконка не найдена');
      return defaultLink;
    };

    return {
      getLinksByName,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

a {
  &:hover {
    filter: prop.$icon-svg-hover-color;
  }
}
</style>
