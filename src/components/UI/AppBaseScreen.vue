<template>
  <section :class="[typeScreen, 'base-screen-component']">
    <div class="base-screen-container">

      <div v-if="title" class="base-screen-title">
        <h1 class="fs-48">
          {{ title }}
        </h1>
      </div>

      <slot></slot>

    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export type TypeScreen = 'main' | 'second';

export default defineComponent({
  icon: 'AppBaseScreen',
  props: {
    title: {
      type: String,
      default: '',
    },
    typeScreen: {
      type: String as PropType<TypeScreen>,
      default: 'main',
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';

.base-screen-component {
  width: 100vw;
  overflow: hidden;
  height: 100%;
  padding: 10rem 0 25rem 0;

  @include utils.phone-style {
    padding: 5rem 0 10rem 0;
  }

  &.main {
    background: prop.$main-first-color;
    color: prop.$main-second-color;
  }

  &.second {
    background: prop.$main-second-color;
    color: prop.$main-first-color;
  }

  .base-screen-container {
    display: flex;
    flex-flow: column;
    margin: 0 auto;
    width: 90%;

    .base-screen-title {
      font-weight: 700;
      font-style: normal;
      margin-bottom: 8rem;
      @include utils.phone-style {
        text-align: center;
      }
    }
  }
}
</style>
