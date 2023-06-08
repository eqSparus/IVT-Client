<template>
  <div class="edit-entrant-item-container">

    <app-base-field id="name"
                    class="mt-10 mb-10"
                    :fails="[{
                      description: 'Поле не должно быть пустым',
                      isShow: valid.title.$invalid && valid.title.$dirty,
                    }]">
    <textarea class="field-standard text-while"
              placeholder="Введите название направления"
              aria-label="Название направления"
              @blur="valid.title.$touch()"
              rows="3"
              id="name"
              v-model="editDirection.title">
    </textarea>
    </app-base-field>

    <app-base-field id="type"
                    class="mb-10"
                    :fails="[{
                      description: 'Поле не должно быть пустым',
                      isShow: valid.degree.$invalid && valid.degree.$dirty,
                    }]">
      <input type="text"
             placeholder="Введите ступень обучения"
             aria-label="Ступень обучения"
             id="type"
             @blur="valid.degree.$touch()"
             class="field-standard text-while"
             v-model="editDirection.degree">
    </app-base-field>

    <app-base-field id="form"
                    class="mb-10"
                    :fails="[{
                      description: 'Поле не должно быть пустым',
                      isShow: valid.form.$invalid && valid.form.$dirty,
                    }]">
      <input type="text"
             placeholder="Введите форму обучения"
             aria-label="Форма обучения направления"
             @blur="valid.form.$touch()"
             id="form"
             class="field-standard text-while"
             v-model="editDirection.form">
    </app-base-field>

    <app-base-field id="duration"
                    :fails="[{
                      description: 'Число должно быть от 1 до 10',
                      isShow: valid.duration.$invalid && valid.duration.$dirty,
                    }]">
      <input type="number"
             placeholder="Введите время обучения"
             aria-label="Время обучения на направление"
             @blur="valid.duration.$touch()"
             id="duration"
             class="field-standard text-while"
             v-model.number="editDirection.duration">
    </app-base-field>

    <div class="setting-item mt-20">
      <button class="btn-standard-icon"
              :disabled="valid.$invalid"
              @click="update">
        <img :src="refreshIcon"
             alt="assets/images/icon/refresh.svg">
      </button>

      <button class="btn-warning-icon"
              @click="$emit('delete', editDirection.id)">
        <img :src="trashcanIcon"
             alt="assets/images/icon/trashcan.svg">
      </button>
    </div>

    <div class="setting-item mt-10">
      <button class="btn-standard-icon"
              :disabled="direction.position === disableDown"
              @click="$emit('down', direction.id, direction.position)">
        <img :src="arrowLeft"
             alt="assets/images/icon/arrow-circle.svg">
      </button>

      <button class="btn-standard-icon"
              :disabled="direction.position === disableUp"
              @click="$emit('up', direction.id, direction.position)">
        <img :src="arrowRight"
             alt="assets/images/icon/arrow-circle.svg">
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import {
  defineComponent, PropType,
} from 'vue';
import { Direction } from '@/types/site.types';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import arrowLeft from '@/assets/images/icons/pointer-left.svg';
import arrowRight from '@/assets/images/icons/pointer-right.svg';
import useEditDirection from '@/hooks/useEditDirection';
import useAlerts from '@/hooks/useAlerts';
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  components: { AppBaseField },
  icon: 'AppDirectionsItem',
  emits: ['update', 'delete', 'up', 'down'],
  props: {
    direction: {
      type: Object as PropType<Direction>,
      required: true,
    },
    disableUp: {
      type: Number,
      required: true,
    },
    disableDown: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { alerts } = useAlerts();
    const {
      direction: editDirection,
      valid,
    } = useEditDirection({
      id: props.direction.id,
      title: props.direction.title,
      degree: props.direction.degree,
      form: props.direction.form,
      duration: props.direction.duration,
    });

    const update = () => {
      if (editDirection.value.title !== props.direction.title
        || editDirection.value.degree !== props.direction.degree
        || editDirection.value.form !== props.direction.form
        || editDirection.value.duration !== props.direction.duration) {
        emit('update', editDirection.value);
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Данные не изменены',
        });
      }
    };

    return {
      valid,
      editDirection,
      update,
      trashcanIcon,
      refreshIcon,
      arrowLeft,
      arrowRight,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

.edit-entrant-item-container {
  border-radius: 0.8rem;
  padding: 1rem;
  background: prop.$main-first-extra-color;
  display: flex;
  flex-flow: column;
  width: 100%;

  .setting-item {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    gap: 5%;

    button {
      flex: 1;
      height: 4rem;
    }
  }

  .text-while {
    color: prop.$main-second-color;
  }
}

</style>
