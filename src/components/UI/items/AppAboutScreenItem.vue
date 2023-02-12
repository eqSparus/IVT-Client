<template>
  <div class="item item-size">

    <div class="item-icon ml-20">
      <div class="circle">
        <img :src="icons[iconIndex]" alt="Иконка" />
      </div>
    </div>

    <div class="item-title">
      <h4 class="title fs-48">{{ aboutInfo.title }}</h4>
    </div>

    <div class="item-description">
      <p class="description fs-32">{{ aboutInfo.description }}</p>
    </div>

  </div>
</template>

<script lang="ts">
import { InformationFaculty } from '@/api/model/ModelTypes';
import { defineComponent, PropType } from 'vue';
import humanSvg from '@/assets/images/icons/human.svg';
import bookSvg from '@/assets/images/icons/book.svg';
import suitcaseSvg from '@/assets/images/icons/suitcase.svg';

export default defineComponent({
  name: 'AppAboutScreenItem',
  props: {
    aboutInfo: {
      type: Object as PropType<InformationFaculty>,
      required: true,
    },
    iconIndex: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const icons = [humanSvg, bookSvg, suitcaseSvg];

    return {
      icons,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.item {

  display: flex;
  flex-flow: column;

  &.item-size {
    height: auto;

    @media screen and (min-width: 1500px) {
      & {
        width: 415px;
      }
    }

    @media screen and (max-width: 1500px) {
      & {
        width: 300px;
      }
    }
  }

  .item-icon {
    width: 78px;
    height: 78px;

    .circle {
      position: relative;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: prop.$about-item-circle-color;

      img {
        position: absolute;
        top: 25%;
        right: 25%;
        width: 64px;
        height: 64px;
      }
    }

  }

  .item-title {
    margin-top: 1.5rem;

    .title {
      @include utils.fontStyle($weight: 500,
        $color: prop.$about-item-title-color);
    }
  }

  .item-description {
    margin-top: 1.5rem;

    .description {
      @include utils.fontStyle($color: prop.$about-item-description-color);
      line-height: 99%;
    }
  }

}
</style>
