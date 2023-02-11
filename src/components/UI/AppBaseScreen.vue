<template>
  <section :class="[isSecond ? 'second' : 'main', 'base-screen']">
    <div class="base-screen-container">

      <div class="base-screen-title">
        <h1 class="fs-48">
          {{ title }}
        </h1>
      </div>

      <div class="base-screen-content">
        <slot></slot>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppBaseScreen',
  props: {
    title: {
      type: String,
      required: true,
    },
    isSecond: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
$background-main-color: #111111;
$text-main-color: #FFFFFF;
$background-second-color: #FFFFFF;
$text-second-color: #111111;

.base-screen {
  width: 100vw;
  overflow: hidden;
  height: 100%;
  padding: 5.2% 0 13% 0;

  &.main {
    background: $background-main-color;
    color: $text-main-color;
  }

  &.second {
    background: $background-second-color;
    color: $text-second-color;
  }

  .base-screen-container {
    // display: grid;
    // grid-template-columns: 1fr;
    display: flex;
    flex-flow: column;
    margin: 0 auto;
    width: 90%;

    .base-screen-title {

      h1 {
        font-weight: 700;
        font-style: normal;
      }
    }

    .base-screen-content {
      margin-top: 4.6%;
    }
  }
}
</style>
