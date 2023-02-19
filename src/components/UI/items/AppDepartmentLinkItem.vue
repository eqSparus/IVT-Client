<template>
  <div class="item-container">

    <app-select-img :options="links" :select="link"/>

    <input type="text"
           placeholder="Введите ссылку"
           aria-label="Выбирете ссылку"
           :value="href"
           class="field-standard"/>

    <input type="button" @click="$emit('deleteLink')" value="УДАЛИТЬ" class="btn-warning"/>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AppSelectImg, { SelectIcon } from '@/components/UI/AppSelectImg.vue';
import linkVk from '@/assets/images/links/vk-link.svg';
import linkOmgtu from '@/assets/images/links/omgtu-link.svg';
import linkTelegram from '@/assets/images/links/telegram-link.svg';
import linkWhatsapp from '@/assets/images/links/whatsapp-link.svg';

export default defineComponent({
  name: 'AppDepartmentLinkItem',
  components: { AppSelectImg },
  emits: ['deleteLink'],
  props: {
    link: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  setup() {
    const links = [
      {
        name: 'vk',
        img: linkVk,
      },
      {
        name: 'omgtu',
        img: linkOmgtu,
      },
      {
        name: 'telegram',
        img: linkTelegram,
      },
      {
        name: 'whatsapp',
        img: linkWhatsapp,
      },
    ] as Array<SelectIcon>;

    return {
      links,
    };
  },
});
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  gap: 10px;

  select {
    border: 1px solid blue;
    background: transparent;
  }

  input:nth-child(1) {
    flex: 3;
  }

  input:nth-child(2) {
    flex: 1;
  }
}
</style>
