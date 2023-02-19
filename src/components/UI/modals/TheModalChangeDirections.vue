<template>
  <app-modal-window :is-show="isShow"
                    title="Редактирование направлений"
                    :is-footer="true"
                    @close="$emit('close')">

    <div class="directions-container">
      <app-modal-directions-item v-for="direction in directions" :key="direction.id"
                                 :direction="direction"/>

      <div class="item-add" v-if="directions.length !== 4">
        <div class="img-plus">
          +
        </div>
      </div>
    </div>
  </app-modal-window>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import AppModalWindow from '@/components/UI/AppModalWindow.vue';
import { InformationDirection } from '@/api/model/ModelTypes';
import AppModalDirectionsItem from '@/components/UI/items/AppModalDirectionsItem.vue';

export default defineComponent({
  name: 'TheModalChangeDirections',
  components: {
    AppModalDirectionsItem,
    AppModalWindow,
  },
  emits: ['close'],
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    directions: {
      type: Array as PropType<Array<InformationDirection>>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use 'sass:color';

.directions-container {
  display: flex;
  flex-flow: row;
  justify-content: center;
  gap: 30px;

  .item-add {
    padding: 20px;
    border-radius: 8px;
    border: 3px solid adjust-color(prop.$direction-item-background-color, $red: 160, $green: 160, $blue: 160);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
