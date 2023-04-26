<template>
  <div class="edit-entrant-item-container">
    <div class="item-icon ml-20">
      <div class="circle">
        <img class="img-icon" :src="aboutInfo.icon" :alt="aboutInfo.icon"/>
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
@use '@/assets/scss/utils.scss';

.edit-entrant-item-container {
  display: flex;
  flex-flow: column;

  @include utils.phone-style {
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

      .img-icon {
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
      @include utils.font-style($weight: 500,
      $color: prop.$main-first-color);
    }
  }

  .item-description {
    margin-top: 1.5rem;

    .description {
      @include utils.font-style($color: prop.$main-second-elevated-color);
    }
  }
}
</style>
