<template>
  <app-modal-window :is-show="isShow"
                    title="Редактирование направлений"
                    :is-footer="true"
                    @close="close">

    <div class="modal-edit-directions-container">
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
                             :char="charButton"
                             class="mt-10"
                             @action="showAddDirection"/>

      <transition name="direction">
        <the-add-block v-if="charButton === '-' && directions.length !== 4"
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
import AppPlusMinusButton, { CharButton } from '@/components/UI/AppAdditionalLongButton.vue';
import TheAddBlock from '@/components/views/direction/modal/TheAddBlock.vue';
import { EditDirection } from '@/hooks/useEditDirection';
import useAlerts from '@/hooks/useAlerts';
import { useStore } from 'vuex';

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
    const store = useStore();
    const { alerts } = useAlerts();
    const charButton = ref<CharButton>('+');

    const showAddDirection = () => {
      if (charButton.value === '+') {
        charButton.value = '-';
      } else {
        charButton.value = '+';
      }
    };

    const close = () => {
      charButton.value = '+';
      emit('close');
    };

    const addDirection = async (direction: EditDirection) => {
      try {
        await store.dispatch('direction/add', direction);
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
        await store.dispatch('direction/update', direction);
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
        await store.dispatch('direction/remove', id);
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

    const directionUp = async (id: string, position: number) => {
      await store.dispatch('direction/directionUp', {
        id,
        position,
      });
    };

    const directionDown = async (id: string, position: number) => {
      await store.dispatch('direction/directionDown', {
        id,
        position,
      });
    };

    return {
      charButton,
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
@use '@/assets/scss/utils.scss';

$animation-name-direction: 'direction';
$animation-name-direction-item: 'direction-items';

@include utils.animation-to($name: $animation-name-direction) {
  transition: all 0.5s ease-in;
}

@include utils.animation-from($name: $animation-name-direction) {
  opacity: 0;
}

.modal-edit-directions-container {
  display: flex;
  flex-flow: column;
  min-width: 90rem;

  .directions-items {
    display: flex;
    flex-flow: row;
    justify-content: center;
    gap: 3rem;

    @include utils.animation-to($name: $animation-name-direction-item, $move: true) {
      transition: all 0.5s ease;
    }

    @include utils.animation-from($name: $animation-name-direction-item) {
      opacity: 0;
    }
  }
}

</style>
