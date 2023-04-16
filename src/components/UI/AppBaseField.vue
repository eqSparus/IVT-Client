<template>
  <div class="field-container">
    <label v-if="label" class="field-label" :for="id">{{ label }}</label>
    <span v-for="fail in failsActive" :key="fail.description"
          class="field-fail">{{ fail.description }}</span>
    <slot></slot>
  </div>
</template>

<script lang="ts">

import { computed, defineComponent, PropType } from 'vue';
import { FailField } from '@/types/utilTypes';

export default defineComponent({
  name: 'AppBaseField',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    fails: {
      type: Array as PropType<Array<FailField>>,
      default: () => [],
    },
  },
  setup(props) {
    return {
      failsActive: computed(() => props.fails?.filter((fail) => fail.isShow)),
    };
  },
});
</script>

<style lang="scss" scoped>

.field-container {
  display: flex;
  flex-flow: column;
}

</style>
