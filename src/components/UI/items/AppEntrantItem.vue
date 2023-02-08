<template>
  <div class="item">
    <h3 class="fs-32 ml-20">{{ entrant.title }}</h3>

    <div v-for="(item, index) in entrant.items" :key="item.id"
      :class="[index === 0 ? 'mt-10' : 'mt-30', 'item-content']">

      <h5 class="fs-24 ml-20">{{ item.title }}</h5>

      <ul>
        <li class="fs-24" v-for="desc in item.descriptions" :key="desc">{{ desc }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import { InformationForEntrant } from '@/api/model/ModelTypes';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AppEntrantItem',
  props: {
    entrant: {
      type: Object as PropType<InformationForEntrant>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
$text-color-title: #000000;
$text-color-item-title: #111111;
$text-color-item-content: #2E2E2E;

.item {
  h3 {
    text-align: justify;
    font-weight: 500;
    font-style: normal;
    color: $text-color-title;
  }

  .item-content {

    h5 {
      text-align: justify;
      font-weight: 600;
      font-style: normal;
      color: $text-color-item-title;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        font-weight: 400;
        text-align: justify;
        font-style: normal;
        color: $text-color-item-content;

        &:before {
          content: "·";
          font-size: 30px;
          padding-right: 10px;
          line-height: 20px;
        }
      }

    }
  }
}
</style>
