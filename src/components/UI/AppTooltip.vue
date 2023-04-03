<template>
  <div class="tooltip-container">
    <transition name="tooltip">
      <div class="tooltip" v-if="isShow">
        {{ text }}
      </div>
    </transition>
  </div>
  <div class="slot-content" @mouseenter="onToggle" @mouseleave="onToggle"
       @focus="isShow = true" @blur="isShow = false">
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

.tooltip-container {
  display: flex;
  flex-flow: column;
  position: relative;

  .tooltip {
    word-wrap: break-word;
    position: absolute;
    bottom: 1rem;
    left: 30%;
    background: #ABAAB0E5;
    color: black;
    padding: 10px 10px;
    font-size: 1.5rem;
    max-width: 25rem;

    &:before {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 10px solid #ABAAB0E5;
      left: 20%;
      bottom: -10px;
    }
  }
}

.slot-content {
  display: flex;
  flex-flow: column;
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.5s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  transform: translateY(50%);
  opacity: 0;
}
</style>
