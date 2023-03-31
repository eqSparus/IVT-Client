<template>
  <app-modal-window :is-show="isShow"
                    :is-footer="true"
                    :title="modalTitle"
                    @close="close">

    <div class="change-entrant-container">

      <label class="field-label" for="title">Название ступени</label>
      <span class="field-fail" v-if="valid.title.$invalid && valid.title.$dirty">
        Поле не может быть пустым
      </span>
      <input type="text"
             id="title"
             v-model="editEntrant.title"
             class="field-standard"
             @blur="valid.title.$touch()"
             placeholder="Введите название ступени">

      <div class="entrant-items">
        <app-entrant-item class="mt-10"
                          v-for="(item, index) in editEntrant.items" :key="item"
                          :item="item"
                          @update:name="item.name = $event.target.value"
                          @addPoint="item.points.push({point: ''})"
                          @deletePoint="item.points.splice($event, 1)"
                          @deleteItem="editEntrant.items.splice(index,1)"/>
      </div>

      <app-plus-minus-button class="mt-10"
                             @action="addItem"/>

      <input type="button"
             class="btn-standard mt-20"
             :value="entrant? 'обновить': 'создать'"
             :disabled="valid.$invalid"
             @click="typeClickEvent">

    </div>
  </app-modal-window>
</template>

<script lang="ts">

import {
  defineComponent, onMounted, PropType,
} from 'vue';
import AppModalWindow from '@/components/UI/AppBaseModal.vue';
import { Entrant } from '@/types/SiteContentTypes';
import AppEntrantItem from '@/components/views/entrant/modal/AppEntrantItem.vue';
import AppPlusMinusButton from '@/components/UI/AppPlusMinusButton.vue';
import useEditEntrant from '@/hooks/useEditEntrant';
import useAlerts from '@/hooks/useAlerts';

export default defineComponent({
  name: 'TheModalAddEntrant',
  components: {
    AppPlusMinusButton,
    AppEntrantItem,
    AppModalWindow,
  },
  emits: ['close'],
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    entrant: {
      type: Object as PropType<Entrant>,
      required: false,
    },
    modalTitle: {
      type: String,
      default: 'Добавить новый раздел',
    },
  },
  setup(props, { emit }) {
    const { alerts } = useAlerts();
    const {
      entrant: editEntrant,
      valid,
      setEntrant,
      addItem,
      add,
      update,
      clearingBlank,
    } = useEditEntrant();

    onMounted(() => {
      if (props.entrant) {
        setEntrant(props.entrant);
      }
    });

    const close = () => {
      if (!props.entrant) {
        editEntrant.value.title = '';
        editEntrant.value.items = [];
      }
      valid.value.$reset();
      emit('close');
    };

    const addEntrant = async () => {
      try {
        clearingBlank();
        await add();
        close();
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось добавить',
        });
      }
    };

    const updateEntrant = async () => {
      try {
        clearingBlank();
        await update();
        alerts.value.push({
          type: 'info',
          message: 'Обновлено',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось обновить',
        });
      }
    };

    const typeClickEvent = () => {
      if (props.entrant) {
        updateEntrant();
      } else {
        addEntrant();
      }
    };

    return {
      alerts,
      valid,
      editEntrant,
      close,
      typeClickEvent,
      addItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.change-entrant-container {
  display: flex;
  flex-flow: column;
  width: 50vw;

  .entrant-items {
    display: flex;
    flex-flow: column;
  }
}

</style>
