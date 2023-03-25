<template>
  <app-modal-window :is-show="isShow"
                    :is-footer="true"
                    :title="modalTitle"
                    @close="close">
    <div class="change-entrant-container">

      <label class="field-label" for="title">Название раздела</label>
      <span class="field-fail" v-if="validate.title.$invalid && validate.title.$dirty">
        Поле не может быть пустым
      </span>
      <input type="text"
             id="title"
             v-model="newEntrant.title"
             class="field-standard"
             @blur="validate.title.$touch()"
             placeholder="Введите название раздела">

      <div class="entrant-items">
        <the-modal-change-entrant-item class="mt-10"
                                       v-for="(item, index) in newEntrant.items" :key="item"
                                       :item="item"
                                       @update:name="item.name = $event.target.value"
                                       @addPoint="item.points.push({point: ''})"
                                       @deletePoint="item.points.splice($event, 1)"
                                       @deleteItem="newEntrant.items.splice(index,1)"/>
      </div>

      <app-plus-minus-button class="mt-10"
                             @action="addItem"/>

      <input type="button"
             class="btn-standard mt-20"
             :value="entrant? 'обновить': 'создать'"
             :disabled="validate.$invalid"
             @click="clickEvent">

    </div>
  </app-modal-window>
</template>

<script lang="ts">

import {
  defineComponent, onMounted, PropType, ref,
} from 'vue';
import AppModalWindow from '@/components/UI/AppBaseModal.vue';
import { useStore } from 'vuex';
import { Entrant } from '@/types/SiteContentTypes';
import TheModalChangeEntrantItem from '@/components/views/entrant/modal/TheModalChangeEntrantItem.vue';
import { createEntrant, putEntrant } from '@/api/EntrantApi';
import AppPlusMinusButton from '@/components/UI/AppPlusMinusButton.vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  name: 'TheModalAddEntrant',
  components: {
    AppPlusMinusButton,
    TheModalChangeEntrantItem,
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
    const store = useStore();
    const changeEntrant = ref<Entrant>({
      title: '',
      items: [],
    });

    onMounted(() => {
      if (props.entrant) {
        changeEntrant.value.id = props.entrant.id;
        changeEntrant.value.title = props.entrant.title;
        changeEntrant.value.items = props.entrant.items.map((value) => ({
          itemId: value.itemId,
          name: value.name,
          points: value.points.map((p) => ({
            pointId: p.pointId,
            point: p.point,
          })),
        }));
      }
    });

    const rules = {
      title: {
        required,
      },
    };

    const validate = useVuelidate(rules, changeEntrant.value);

    const close = () => {
      validate.value.$reset();
      if (!props.entrant) {
        changeEntrant.value.title = '';
        changeEntrant.value.items = [];
      }
      emit('close');
    };

    const addItem = () => {
      changeEntrant.value.items.push({
        name: '',
        points: [],
      });
    };

    const create = async () => {
      changeEntrant.value.items = changeEntrant.value.items.filter((item) => item.name)
        .map((item) => {
          const filterItem = item;
          filterItem.points = item.points.filter((point) => point.point);
          return filterItem;
        });

      const data = await createEntrant(changeEntrant.value);
      store.commit('entrant/setEntrant', data);
      close();
    };

    const update = async () => {
      changeEntrant.value.items = changeEntrant.value.items.filter((item) => item.name)
        .map((item) => {
          const filterItem = item;
          filterItem.points = item.points.filter((point) => point.point);
          return filterItem;
        });

      const data = await putEntrant(changeEntrant.value);
      store.commit('entrant/updateEntrant', data);
    };

    const clickEvent = () => {
      if (props.entrant) {
        update();
      } else {
        create();
      }
    };

    return {
      validate,
      newEntrant: changeEntrant,
      close,
      clickEvent,
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
