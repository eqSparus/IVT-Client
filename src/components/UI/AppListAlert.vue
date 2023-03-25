<template>
  <div>

  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import { AlertType } from '@/components/UI/AppMessageAlert.vue';

export default defineComponent({
  name: 'AppListAlert',
  props: {
    alerts: {
      type: Array as PropType<Array<AlertType>>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
