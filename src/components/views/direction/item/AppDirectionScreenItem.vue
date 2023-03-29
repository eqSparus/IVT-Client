<template>
  <div class="item item-size">

    <div class="item-drawing">
      <img :src="drawings[index]" alt="Рисунок фигур в формате svg"/>
    </div>

    <div class="item-content-container">
      <div class="item-content">

        <h3 class="title fs-26">{{ directionInfo.title }}</h3>

        <span class="fs-24 mt-20">{{ directionInfo.degree }}</span>

        <span class="fs-24 mt-10">{{ directionInfo.form }}</span>

        <span class="fs-24 mt-10">{{ directionInfo.duration + durationText }}</span>

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Direction } from '@/types/SiteContentTypes';
import { defineComponent, PropType, computed } from 'vue';
import direction1 from '@/assets/images/draws/direction1.svg';
import direction2 from '@/assets/images/draws/direction2.svg';
import direction3 from '@/assets/images/draws/direction3.svg';

export default defineComponent({
  icon: 'AppDirectionScreenItem',
  props: {
    directionInfo: {
      type: Object as PropType<Direction>,
      required: true,
    },
    indexDrawing: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const drawings = [direction1, direction2, direction3];

    const index = computed(() => props.indexDrawing
      - (drawings.length * (Math.floor(props.indexDrawing / drawings.length))));

    return {
      drawings,
      index,
      durationText: computed(() => (props.directionInfo.duration >= 5 ? ' лет' : ' года')),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

//@media screen and (min-width: 1500px) {
//  .item-size {
//    width: 415px;
//  }
//
//  img {
//    width: 415px;
//  }
//}
//
//@media screen and (max-width: 1500px) {
//  .item-size {
//    width: 300px;
//  }
//
//  img {
//    width: 300px;
//  }
//}

.item {
  display: flex;
  flex-flow: column;
  border-radius: 8px;
  background: prop.$direction-item-background-color;

  //&.item-size {
  //  width: 100%;
  //}

  .item-drawing {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;

    img {
      width: 100%;
      border-radius: 8px 8px 0 0;
    }
  }

  .item-content-container {
    height: 100%;
    display: flex;
    flex-flow: row;

    .item-content {
      align-self: flex-end;
      padding: 11% 5%;

      .title {
        @include utils.fontStyle($weight: 700,
        $color: prop.$direction-item-title-color);
      }

      span {
        display: block;
        @include utils.fontStyle($color: prop.$direction-item-text-color);
      }

    }
  }
}
</style>
