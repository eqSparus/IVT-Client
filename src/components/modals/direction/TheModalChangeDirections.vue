<template>
  <app-modal-window :is-show="isShow"
                    title="Редактирование направлений"
                    :is-footer="true"
                    @close="close">

    <div class="directions-container">
      <div class="directions-items">
        <app-modal-directions-item v-for="direction in directions" :key="direction.id"
                                   :direction="direction"
                                   @delete="deleteDirect"
                                   @update="updateDirect"/>

      </div>
      <app-plus-minus-button v-if="directions.length !== 4"
                             :is-plus="!isAdd"
                             class="mt-10"
                             @action="showAddDirection"/>

      <transition name="direction">
        <the-modal-direction-add v-if="isAdd && directions.length !== 4"
                                 class="mt-10"/>
      </transition>

    </div>

  </app-modal-window>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import AppModalWindow from '@/components/UI/AppModalWindow.vue';
import { InformationDirection } from '@/api/model/ModelTypes';
import AppModalDirectionsItem from '@/components/modals/direction/AppModalDirectionsItem.vue';
import AppPlusMinusButton from '@/components/UI/AppPlusMinusButton.vue';
import TheModalDirectionAdd from '@/components/modals/direction/TheModalDirectionAdd.vue';
import { useStore } from 'vuex';
import { deleteDirection, putDirection } from '@/api/DirectionApi';

export default defineComponent({
  icon: 'TheModalChangeDirections',
  components: {
    TheModalDirectionAdd,
    AppPlusMinusButton,
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
  setup(props, { emit }) {
    const store = useStore();
    const isAdd = ref<boolean>(false);

    const showAddDirection = () => {
      isAdd.value = !isAdd.value;
    };

    const close = () => {
      isAdd.value = false;
      emit('close');
    };

    const updateDirect = async (direction: InformationDirection) => {
      await putDirection(direction);
      store.commit('direction/updateDirection', direction);
    };

    const deleteDirect = async (id: string) => {
      await deleteDirection(id);
      store.commit('direction/removeDirection', id);
    };

    return {
      isAdd,
      showAddDirection,
      close,
      deleteDirect,
      updateDirect,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;
@use '@/assets/scss/utils.scss' as utils;

.direction-leave-to,
.direction-enter-from {
  opacity: 0;
}

.direction-leave-active,
.direction-enter-active {
  transition: all 0.5s ease-in;
}

.directions-container {
  display: flex;
  flex-flow: column;

  .directions-items {
    display: flex;
    flex-flow: row;
    justify-content: center;
    gap: 30px;
  }
}

</style>
