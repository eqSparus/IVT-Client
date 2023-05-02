<template>
  <Teleport to="body">
    <div class="alert-list">
      <transition-group name="alerts">
        <app-message-alert v-for="alert in alerts" :key="alert"
                           :message="alert.message"
                           :timeout="time"
                           :type="alert.type"
                           class="alert-item"
                           @vanish="$emit('deleteAlert')"/>
      </transition-group>
    </div>
  </Teleport>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import AppMessageAlert, { AlertType } from '@/components/UI/AppMessageAlert.vue';

export type AlertMessage = {
  message: string,
  type: AlertType,
};

export default defineComponent({
  name: 'AppListAlert',
  components: { AppMessageAlert },
  emits: ['deleteAlert'],
  props: {
    alerts: {
      type: Array as PropType<Array<AlertMessage>>,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utils.scss';

$animation-name: 'alerts';

.alert-list {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-flow: column;
  z-index: 9999999;

  .alert-item {
    align-self: flex-end;
  }

  @include utils.animation-to($name: $animation-name, $move: true) {
    transition: all 0.5s ease;
  }

  @include utils.animation-from($name: $animation-name) {
    transform: translateX(20vw);
    opacity: 0;
  }

  .#{$animation-name}-leave-active {
    position: absolute;
  }
}

</style>
