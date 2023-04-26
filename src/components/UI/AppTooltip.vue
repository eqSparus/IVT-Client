<template>
  <div class="tooltip-component">
    <transition name="tooltip">
      <div class="tooltip-content" v-if="isShow">
        {{ text }}
      </div>
    </transition>
  </div>
  <div class="slot-content"
       @mouseenter="onToggle"
       @mouseleave="onToggle"
       @focus="isShow = true"
       @blur="isShow = false">
    <slot></slot>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AppTooltip',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isShow = ref<boolean>(false);

    const onToggle = () => {
      isShow.value = !isShow.value;
    };

    return {
      isShow,
      onToggle,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;
@use '@/assets/scss/utils.scss';

$animation-name: 'tooltip';

.tooltip-component {
  display: flex;
  flex-flow: column;
  position: relative;

  .tooltip-content {
    word-wrap: break-word;
    position: absolute;
    bottom: 1rem;
    left: 30%;
    background: props.$main-second-transparent-color;
    color: props.$main-first-color;
    padding: 1rem 1rem;
    font-size: 1.5rem;
    max-width: 25rem;

    &:before {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      border-left: 0.8rem solid transparent;
      border-right: 0.8rem solid transparent;
      border-top: 1rem solid props.$main-second-transparent-color;
      left: 20%;
      bottom: -1rem;
    }
  }
}

.slot-content {
  display: flex;
  flex-flow: column;
}

@include utils.animation-to($name: $animation-name) {
  transition: all 0.3s ease-in-out;
}

@include utils.animation-from($name: $animation-name) {
  transform: translateY(50%);
  opacity: 0;
}

</style>
