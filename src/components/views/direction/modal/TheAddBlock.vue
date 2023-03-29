<template>
  <div class="direction-add">
    <label class="field-label" for="title">Название</label>
    <span v-if="valid.title.$invalid && valid.title.$dirty" class="field-fail">
      Поле не должно быть пустым
    </span>
    <textarea id="title"
              v-model="direction.title"
              class="field-standard item-title"
              @blur="valid.title.$touch()"
              placeholder="Введите название"
              rows="2">

    </textarea>

    <div class="directions-add-center mt-10">
      <div class="block">
        <label class="field-label" for="degree">Степень обучение</label>
        <span v-if="valid.degree.$invalid && valid.degree.$dirty" class="field-fail">
          Поле не должно быть пустым
        </span>
        <input type="text"
               id="degree"
               v-model="direction.degree"
               placeholder="Введите степень"
               @blur="valid.degree.$touch()"
               class="field-standard text-while">
      </div>

      <div class="block">
        <label class="field-label" for="form">Форма обучения</label>
        <span v-if="valid.form.$invalid && valid.form.$dirty" class="field-fail">
          Поле не должно быть пустым
        </span>
        <input type="text"
               id="form"
               v-model="direction.form"
               placeholder="Введите форма обучения"
               @blur="valid.form.$touch()"
               class="field-standard text-while">
      </div>

      <div class="block">
        <label class="field-label" for="duration">Время обучения</label>
        <span v-if="valid.duration.$invalid && valid.duration.$dirty" class="field-fail">
          Число должно быть от 1 до 10
        </span>
        <input type="number"
               id="duration"
               v-model.number="direction.duration"
               placeholder="Введите время обучения"
               @blur="valid.duration.$touch()"
               class="field-standard text-while">
      </div>
    </div>

    <input type="button"
           class="btn-standard mt-20"
           @click="addDirection"
           :disabled="valid.$invalid"
           value="добавить">
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import useEditDirection from '@/hooks/useEditDirection';

export default defineComponent({
  name: 'TheAddBlock',
  setup(props, { emit }) {
    const {
      direction,
      valid,
    } = useEditDirection();

    const addDirection = () => {
      emit('add', direction.value);
      direction.value.title = '';
      direction.value.form = '';
      direction.value.degree = '';
      direction.value.duration = 0;
      valid.value.$reset();
    };

    return {
      valid,
      direction,
      addDirection,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utils.scss' as utils;
@use '@/assets/scss/properties.scss' as props;

.direction-add {
  display: flex;
  flex-flow: column;

  .directions-add-center {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    gap: 1%;

    .block {
      display: flex;
      flex-flow: column;
      flex: 1;
    }
  }

  .item-title {
    @include utils.scrollbar(props.$scroll-slider-color, props.$scroll-slider-body-color);
    resize: none;
  }
}

</style>
