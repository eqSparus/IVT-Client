<template>
  <div class="item">

    <span v-if="valid.title.$invalid && valid.title.$dirty" class="field-fail">
      Поле не должно быть пустым
    </span>
    <textarea class="field-standard item-title mt-10 mb-10"
              placeholder="Введите название направления"
              aria-label="Введите название направления"
              @blur="valid.title.$touch()"
              rows="3"
              v-model="editDirection.title">

    </textarea>

    <span v-if="valid.degree.$invalid && valid.degree.$dirty" class="field-fail">
          Поле не должно быть пустым
    </span>
    <input type="text"
           placeholder="Введите тип направления"
           aria-label="Введите тип направления"
           @blur="valid.degree.$touch()"
           class="field-standard text-while mb-10"
           v-model="editDirection.degree">

    <span v-if="valid.form.$invalid && valid.form.$dirty" class="field-fail">
          Поле не должно быть пустым
    </span>
    <input type="text"
           placeholder="Форма обучения направления"
           aria-label="Форма обучения направления"
           @blur="valid.form.$touch()"
           class="field-standard text-while mb-10"
           v-model="editDirection.form">

    <span v-if="valid.duration.$invalid && valid.duration.$dirty" class="field-fail">
          Число должно быть от 1 до 10
    </span>
    <input type="number"
           placeholder="Время обучения на направление"
           aria-label="Время обучения на направление"
           @blur="valid.duration.$touch()"
           class="field-standard text-while"
           v-model.number="editDirection.duration">

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

    <div class="setting-item mt-20">
      <button class="btn-standard-icon"
              :disabled="direction.position === disableDown"
              @click="$emit('down', direction.id, direction.position)">
        <img :src="arrowCircleArrow"
             style="transform: rotate(180deg)"
             alt="assets/images/icon/arrow-circle.svg">
      </button>

      <button class="btn-standard-icon"
              :disabled="direction.position === disableUp"
              @click="$emit('up', direction.id, direction.position)">
        <img :src="arrowCircleArrow"
             alt="assets/images/icon/arrow-circle.svg">
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import {
  defineComponent, PropType,
} from 'vue';
import { Direction } from '@/types/SiteContentTypes';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import arrowCircleArrow from '@/assets/images/icons/arrow-circle.svg';
import useEditDirection from '@/hooks/useEditDirection';

export default defineComponent({
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
      }
    };

    return {
      valid,
      editDirection,
      update,
      trashcanIcon,
      refreshIcon,
      arrowCircleArrow,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.item {
  border-radius: 8px;
  padding: 10px;
  background: prop.$direction-item-background-color;
  display: flex;
  flex-flow: column;

  .setting-item {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    gap: 5%;

    button {
      flex: 1;
      height: 40px;
    }
  }

  .item-title {
    color: prop.$direction-item-title-color;
    @include utils.scrollbar(prop.$scroll-slider-color, prop.$scroll-slider-body-color);
    resize: none;
  }

  .text-while {
    color: prop.$direction-item-title-color;
  }

}

</style>
