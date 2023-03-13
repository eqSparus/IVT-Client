<template>
  <transition name="alert">
    <div v-if="message && isShow" class="message-alert-container fs-32">
      <div :class="['message-alert', `message-${type}`]">
        <span class="fs-26"> {{ message }} </span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">

import { defineComponent, onUpdated, PropType } from 'vue';

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
    isShow: {
      type: Boolean,
      default: true,
    },
    timeout: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    onUpdated(() => {
      setTimeout(() => {
        emit('vanish');
      }, props.timeout);
    });
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as util;

.alert-enter-active,
.alert-leave-active {
  transition: all 0.5s ease;
}

.alert-enter-from,
.alert-leave-to {
  transform: translateX(20vw);
  opacity: 0;
}

.message-alert-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 999999;

  .message-alert {
    user-select: none;
    background: white;
    margin: 10px 0;
    padding: 15px 5% 15px 15px;
    border-left-width: 5px;
    border-left-style: solid;
  }

  .message-info {
    @include util.fontStyle(prop.$info-color);
    border-left-color: prop.$info-color;
  }

  .message-warning {
    @include util.fontStyle(prop.$warning-color);
    border-left-color: prop.$warning-color;
  }
}

</style>
