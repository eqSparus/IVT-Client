<template>
  <button class="btn-plus fs-24" @click="$emit('action')">
    {{ char }}
  </button>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

export type CharButton = '+' | '-';

export default defineComponent({
  name: 'AppPlusMinusButton',
  emits: ['action'],
  props: {
    char: {
      type: String as PropType<CharButton>,
      default: '+',
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;
@use '@/assets/scss/utils.scss';

$color: adjust-color(props.$main-first-extra-color, $red: 160, $green: 160, $blue: 160);

.btn-plus {
  background: none;
  border-radius: 0.8rem;
  border: 0.3rem solid $color;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  @include utils.font-style($color: $color, $weight: 700);

  &:hover {
    transition: all 0.2s ease-in;
    cursor: pointer;
    color: props.$main-first-extra-color;
    border: 0.3rem solid props.$main-first-extra-color;
  }
}

</style>
