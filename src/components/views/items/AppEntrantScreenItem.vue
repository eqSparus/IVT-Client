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
  icon: 'AppEntrantScreenItem',
  props: {
    entrant: {
      type: Object as PropType<InformationForEntrant>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.item {
  h3 {
    text-align: justify;
    @include utils.fontStyle($weight: 500,
      $color: prop.$entrant-item-title-color);
  }

  .item-content {

    h5 {
      text-align: justify;
      @include utils.fontStyle($weight: 600,
        $color: prop.$entrant-item-title-content-color);
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        text-align: justify;
        @include utils.fontStyle($color: prop.$entrant-item-content-color);

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
