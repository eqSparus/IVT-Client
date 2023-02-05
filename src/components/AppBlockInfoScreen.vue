<template>
  <section :class="[isWhile ? 'while' : 'black', 'info-screen']">
    <div class="info-screen-container">

      <div class="info-screen-title">
        <h1 class="fs-48">
          {{ title }}
        </h1>
      </div>

      <div class="info-screen-content mt-80">
        <slot></slot>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppBlockInfoScreen',
  props: {
    title: {
      type: String,
      required: true,
    },
    isWhile: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

.info-screen {
  width: 100vw;
  overflow: hidden;
  height: 100%;
  padding: 8% 0 10% 0;

  &.black {
    background: prop.$background-black-color;
    color: prop.$title-text-while-color;
  }

  &.while {
    background: prop.$background-while-color;
    color: prop.$title-text-black-color;
  }

  .info-screen-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 auto;
    width: 90%;

    .info-screen-title {

      h1 {
        font-weight: 700;
        font-style: normal;
      }
    }

    .info-screen-content {
      grid-column: 1/4;
      grid-row: 2/3;
    }
  }
}
</style>
