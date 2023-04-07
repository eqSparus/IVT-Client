<template>
    <div class="message-alert-container fs-32">
      <div :class="['message-alert', `message-${type}`]">
        <span class="fs-26"> {{ message }} </span>
      </div>
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

export type AlertType = 'info' | 'warning'

export default defineComponent({
  icon: 'AppMessageAlert',
  emits: ['vanish'],
  props: {
    type: {
      type: String as PropType<AlertType>,
      default: 'info',
    },
    message: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    setTimeout(() => {
      emit('vanish');
    }, props.timeout);
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as util;

.message-alert-container {
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-end;
  z-index: 999999;

  .message-alert {
    user-select: none;
    background: white;
    margin: 1rem 0;
    padding: 1.5rem 3em 1.5rem 1.5rem;
    border-left-width: 0.5rem;
    border-left-style: solid;
  }

  .message-info {
    @include util.fontStyle(prop.$primary-color);
    border-left-color: prop.$primary-color;
  }

  .message-warning {
    @include util.fontStyle(prop.$warning-color);
    border-left-color: prop.$warning-color;
  }
}

</style>
