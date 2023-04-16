<template>
  <app-modal-window :is-show="isShow"
                    title="Редактирование направлений"
                    :is-footer="true"
                    @close="close">

    <div class="directions-container">
      <div class="directions-items">
        <transition-group name="direction-items">
          <app-directions-item v-for="direction in directions" :key="direction.id"
                                     :direction="direction"
                                     :disable-up="directions[directions.length - 1].position"
                                     :disable-down="directions[0].position"
                                     @delete="removeDirection"
                                     @update="updateDirection"
                                     @up="directionUp"
                                     @down="directionDown"/>
        </transition-group>
      </div>
      <app-plus-minus-button v-if="directions.length !== 4"
                             :is-plus="!isAdd"
                             class="mt-10"
                             @action="showAddDirection"/>

      <transition name="direction">
        <the-add-block v-if="isAdd && directions.length !== 4"
                                 class="mt-10"
                                 @add="addDirection"/>
      </transition>

    </div>

  </app-modal-window>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import AppModalWindow from '@/components/UI/AppBaseModal.vue';
import { Direction } from '@/types/site.types';
import AppDirectionsItem from '@/components/views/direction/modal/AppDirectionItem.vue';
import AppPlusMinusButton from '@/components/UI/AppPlusMinusButton.vue';
import TheAddBlock from '@/components/views/direction/modal/TheAddBlock.vue';
import useEditDirection, { EditDirection } from '@/hooks/useEditDirection';
import useAlerts from '@/hooks/useAlerts';

export default defineComponent({
  icon: 'TheModalEditDirections',
  components: {
    TheAddBlock,
    AppPlusMinusButton,
    AppDirectionsItem,
    AppModalWindow,
  },
  emits: ['close'],
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    directions: {
      type: Array as PropType<Array<Direction>>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { alerts } = useAlerts();
    const isAdd = ref<boolean>(false);

    const {
      remove,
      update,
      add,
      directionUp,
      directionDown,
    } = useEditDirection();

    const showAddDirection = () => {
      isAdd.value = !isAdd.value;
    };

    const close = () => {
      isAdd.value = false;
      emit('close');
    };

    const addDirection = async (direction: EditDirection) => {
      try {
        await add(direction);
        alerts.value.push({
          type: 'info',
          message: 'Направление добавлено',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось добавить направления',
        });
      }
    };

    const updateDirection = async (direction: EditDirection) => {
      try {
        await update(direction);
        alerts.value.push({
          type: 'info',
          message: 'Направление обновлено',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось обновить направления',
        });
      }
    };

    const removeDirection = async (id: string) => {
      try {
        await remove(id);
        alerts.value.push({
          type: 'info',
          message: 'Направление удалено',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось удалить направления',
        });
      }
    };

    return {
      isAdd,
      alerts,
      showAddDirection,
      close,
      addDirection,
      updateDirection,
      removeDirection,
      directionUp,
      directionDown,
    };
  },
});
</script>

<style lang="scss" scoped>

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
  min-width: 90rem;

  .directions-items {
    display: flex;
    flex-flow: row;
    justify-content: center;
    gap: 3rem;

    .direction-items-move,
    .direction-items-enter-active,
    .direction-items-leave-active {
      transition: all 0.5s ease;
    }

    .direction-items-enter-from,
    .direction-items-leave-to {
      opacity: 0;
    }
  }
}

</style>
