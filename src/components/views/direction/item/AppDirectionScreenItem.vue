<template>
  <div class="item item-size">

    <div class="item-drawing">
      <img :src="drawings[index]" alt="Рисунок фигур в формате svg"/>
    </div>

    <div class="item-content-container">
      <div class="item-content">

        <h3 class="title fs-26">{{ direction.title }}</h3>

        <span class="fs-24 mt-20">{{ direction.degree }}</span>

        <span class="fs-24 mt-10">{{ direction.form }}</span>

        <span class="fs-24 mt-10">{{ direction.duration + durationText }}</span>

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Direction } from '@/types/site.types';
import { defineComponent, PropType, computed } from 'vue';
import direction1 from '@/assets/images/draws/direction1.svg';
import direction2 from '@/assets/images/draws/direction2.svg';
import direction3 from '@/assets/images/draws/direction3.svg';

export default defineComponent({
  icon: 'AppDirectionScreenItem',
  props: {
    direction: {
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
      durationText: computed(() => (props.direction.duration >= 5 ? ' лет' : ' года')),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.item {
  display: flex;
  border-radius: 0.8rem;
  background: prop.$main-first-extra-color;
  //background: linear-gradient(90deg, prop.$main-first-extra-color, 95%, #545454 100%);

  @media only screen and (min-width: 1080px) {
    flex-flow: column;
  }

  @media only screen and (max-width: 1080px) {
    flex-flow: row;

    & > div[class="item-drawing"] {
      order: 2;
    }

    & > div[class="item-content-container"] {
      .item-content {
        align-self: flex-end;
        padding: 5% 11%;
      }
    }
  }

  .item-drawing {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;

    img {
      height: auto;
      width: 100%;
      border-radius: 0.8rem 0.8rem 0 0;

      @media only screen and (max-width: 1080px) {
        width: auto;
        height: 120px;
      }
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
        $color: prop.$main-second-color);
      }

      span {
        display: block;
        @include utils.fontStyle($color: prop.$main-second-text-transparent-color);
      }

    }
  }
}
</style>
