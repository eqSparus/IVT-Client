<template>
  <app-base-modal :is-show="isShow"
                  :is-footer="true"
                  title="Изменить партнеров"
                  @close="$emit('close')">

    <div class="edit-partner-container">
      <the-add-partner/>
    </div>
  </app-base-modal>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AppBaseModal from '@/components/UI/AppBaseModal.vue';
import TheAddPartner from '@/components/views/partner/modal/TheAddPartner.vue';

export default defineComponent({
  name: 'TheModalEditPartner',
  components: {
    TheAddPartner,
    AppBaseModal,
  },
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

.edit-partner-container{
  display: flex;
  flex-flow: column;
  width: 40vw;
}

</style>
