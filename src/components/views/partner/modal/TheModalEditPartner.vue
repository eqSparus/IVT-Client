<template>
  <app-base-modal :is-show="isShow"
                  :is-footer="true"
                  title="Редактировать партнеров"
                  @close="$emit('close')">

  </app-base-modal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AppBaseModal from '@/components/UI/AppBaseModal.vue';

export default defineComponent({
  name: 'TheModalEditPartner',
  components: { AppBaseModal },
  emits: ['close'],
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
