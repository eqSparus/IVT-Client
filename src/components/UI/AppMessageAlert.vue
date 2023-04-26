<template>
  <div class="message-alert-component fs-32">
    <div :class="['message-alert', `message-${type}`]">
      <img class="img-alert" :src="iconAlert" :alt="iconAlert"/>
      <span class="fs-26 ml-10"> {{ message }} </span>
    </div>
  </div>
</template>

<script lang="ts">

import { computed, defineComponent, PropType } from 'vue';
import iconInfo from '@/assets/images/icons/info.svg';
import iconWarning from '@/assets/images/icons/warning.svg';

export type AlertType = 'info' | 'warning';

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

    const iconAlert = computed(() => {
      switch (props.type) {
      case 'info':
        return iconInfo;
      case 'warning':
        return iconWarning;
      default:
        return iconInfo;
      }
    });

    return {
      iconAlert,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';

.message-alert-component {
  width: auto;
  height: auto;
  display: flex;
  flex-flow: row;
  z-index: 999999;

  .message-alert {
    display: flex;
    flex-flow: row;
    align-items: center;
    user-select: none;
    background: white;
    margin: 1rem 0;
    padding: 1.5rem 3em 1.5rem 1.5rem;
    border-left-width: 0.5rem;
    border-left-style: solid;

    .img-alert {
      height: auto;
      width: 4rem;
    }
  }

  .message-info {
    @include utils.font-style(prop.$primary-color);
    border-left-color: prop.$primary-color;

    .img-alert {
      filter: prop.$icon-svg-hover-color-primary;
    }
  }

  .message-warning {
    @include utils.font-style(prop.$warning-color);
    border-left-color: prop.$warning-color;

    .img-alert {
      filter: prop.$icon-svg-hover-color-warning;
    }
  }
}

</style>
