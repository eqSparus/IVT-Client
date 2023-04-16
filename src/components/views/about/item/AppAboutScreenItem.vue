<template>
  <div class="item">
    <div class="item-icon ml-20">
      <div class="circle">
        <img :src="aboutInfo.icon" :alt="aboutInfo.icon"/>
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
import { AboutDepartment } from '@/types/site.types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  icon: 'AppAboutScreenItem',
  props: {
    aboutInfo: {
      type: Object as PropType<AboutDepartment>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.item {
  display: flex;
  flex-flow: column;

  @media only screen and (max-width: 1000px){
    text-align: center;
    align-items: center;
  }

  .item-icon {
    width: 7.8rem;
    height: 7.8rem;

    .circle {
      position: relative;
      width: 5.8rem;
      height: 5.8rem;
      border-radius: 50%;
      background: prop.$main-second-additional-two-color;

      img {
        user-select: none;
        position: absolute;
        top: 25%;
        right: 25%;
        width: 6.4rem;
        height: 6.4rem;
      }
    }

  }

  .item-title {
    margin-top: 1.5rem;

    .title {
      @include utils.fontStyle($weight: 500,
      $color: prop.$main-first-color);
    }
  }

  .item-description {
    margin-top: 1.5rem;

    .description {
      @include utils.fontStyle($color: prop.$main-second-elevated-color);
    }
  }

}
</style>
