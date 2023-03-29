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
import { AboutDepartment } from '@/types/SiteContentTypes';
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
        user-select: none;
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
    }
  }

}
</style>
