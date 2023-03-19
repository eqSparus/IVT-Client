<template>
  <button class="btn-plus" @click="$emit('action')">
    {{ type }}
  </button>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'AppPlusMinusButton',
  emits: ['action'],
  props: {
    isPlus: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    return {
      type: computed(() => (props.isPlus ? '+' : '-')),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;
@use '@/assets/scss/utils.scss' as utils;

$color-hover: #282828;
$color: adjust-color(props.$direction-item-background-color, $red: 160, $green: 160, $blue: 160);

.btn-plus {
  background: none;
  border-radius: 8px;
  border: 3px solid $color;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $color;
  font-weight: 700;
  font-size: utils.calcFontSize(18, 24, 1024, 1920);

  &:hover {
    transition: all 0.2s ease-in;
    cursor: pointer;
    color: $color-hover;
    border: 3px solid $color-hover;
  }
}

</style>
