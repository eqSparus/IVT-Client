<template>
  <div class="item">

    <span v-if="validate.title.$invalid && validate.title.$dirty" class="field-fail">
      Поле не должно быть пустым
    </span>
    <textarea class="field-standard item-title mt-10 mb-10"
              placeholder="Введите название направления"
              aria-label="Введите название направления"
              @blur="validate.title.$touch()"
              rows="3"
              v-model="changeDirection.title">

    </textarea>

    <span v-if="validate.degree.$invalid && validate.degree.$dirty" class="field-fail">
          Поле не должно быть пустым
    </span>
    <input type="text"
           placeholder="Введите тип направления"
           aria-label="Введите тип направления"
           @blur="validate.degree.$touch()"
           class="field-standard text-while mb-10"
           v-model="changeDirection.degree">

    <span v-if="validate.form.$invalid && validate.form.$dirty" class="field-fail">
          Поле не должно быть пустым
    </span>
    <input type="text"
           placeholder="Форма обучения направления"
           aria-label="Форма обучения направления"
           @blur="validate.form.$touch()"
           class="field-standard text-while mb-10"
           v-model="changeDirection.form">

    <span v-if="validate.duration.$invalid && validate.duration.$dirty" class="field-fail">
          Число должно быть от 1 до 10
    </span>
    <input type="number"
           placeholder="Время обучения на направление"
           aria-label="Время обучения на направление"
           @blur="validate.duration.$touch()"
           class="field-standard text-while"
           v-model.number="changeDirection.duration">

    <div class="setting-item mt-20">
      <button class="btn-standard-icon"
              :disabled="validate.$invalid"
              @click="$emit('update', changeDirection)">
        <img :src="refreshIcon"
             alt="assets/images/icon/refresh.svg">
      </button>

      <button class="btn-warning-icon"
              @click="$emit('delete', changeDirection.id)">
        <img :src="trashcanIcon"
             alt="assets/images/icon/trashcan.svg">
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import {
  defineComponent, PropType, ref, toRefs,
} from 'vue';
import { Direction } from '@/types/SiteContentTypes';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import useVuelidate from '@vuelidate/core';
import { maxValue, minValue, required } from '@vuelidate/validators';

export default defineComponent({
  icon: 'AppModalDirectionsItem',
  emits: ['update', 'delete'],
  props: {
    direction: {
      type: Object as PropType<Direction>,
      required: true,
    },
  },
  setup(props) {
    const changeDirection = ref<Direction>({
      id: props.direction.id,
      title: props.direction.title,
      degree: props.direction.degree,
      form: props.direction.form,
      duration: props.direction.duration,
    });

    const rules = {
      title: {
        required,
      },
      degree: {
        required,
      },
      form: {
        required,
      },
      duration: {
        required,
        minValue: minValue(1),
        maxValue: maxValue(10),
      },
    };

    const validate = useVuelidate(rules, toRefs(changeDirection.value));

    return {
      validate,
      changeDirection,
      trashcanIcon,
      refreshIcon,
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
