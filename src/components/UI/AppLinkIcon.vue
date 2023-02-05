<template>
  <a :href="href" target="_blank">
    <img :src="getLinksByName(name)" :alt="alt" />
  </a>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import facebookLink from '@/assets/images/links/facebook-link.svg';
import vkLink from '@/assets/images/links/vk-link.svg';
import twitterLink from '@/assets/images/links/twitter-link.svg';
import omgtuLink from '@/assets/images/links/omgtu-link.svg';
import gitLink from '@/assets/images/links/git-link.svg';
import whatsappLink from '@/assets/images/links/whatsapp-link.svg';
import telegramLink from '@/assets/images/links/telegram-link.svg';
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
      [facebookLink.replace(reg, ''), facebookLink],
      [twitterLink.replace(reg, ''), twitterLink],
      [omgtuLink.replace(reg, ''), omgtuLink],
      [gitLink.replace(reg, ''), gitLink],
      [whatsappLink.replace(reg, ''), whatsappLink],
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
$icon-svg-filter-color: invert(45%) sepia(83%) saturate(4231%) hue-rotate(226deg) brightness(99%) contrast(103%);

a {
  &:hover {
    filter: $icon-svg-filter-color;
  }
}
</style>
