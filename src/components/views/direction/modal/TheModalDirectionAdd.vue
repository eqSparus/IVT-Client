<template>
  <div class="direction-add">
    <label class="field-label" for="title">Название</label>
    <span v-if="validate.title.$invalid && validate.title.$dirty" class="field-fail">
      Поле не должно быть пустым
    </span>
    <textarea id="title"
              v-model="direction.title"
              class="field-standard item-title"
              @blur="validate.title.$touch()"
              placeholder="Введите название"
              rows="2">

    </textarea>

    <div class="directions-add-center mt-10">
      <div class="block">
        <label class="field-label" for="degree">Степень обучение</label>
        <span v-if="validate.degree.$invalid && validate.degree.$dirty" class="field-fail">
          Поле не должно быть пустым
        </span>
        <input type="text"
               id="degree"
               v-model="direction.degree"
               placeholder="Введите степень"
               @blur="validate.degree.$touch()"
               class="field-standard text-while">
      </div>

      <div class="block">
        <label class="field-label" for="form">Форма обучения</label>
        <span v-if="validate.form.$invalid && validate.form.$dirty" class="field-fail">
          Поле не должно быть пустым
        </span>
        <input type="text"
               id="form"
               v-model="direction.form"
               placeholder="Введите форма обучения"
               @blur="validate.form.$touch()"
               class="field-standard text-while">
      </div>

      <div class="block">
        <label class="field-label" for="duration">Время обучения</label>
        <span v-if="validate.duration.$invalid && validate.duration.$dirty" class="field-fail">
          Число должно быть от 1 до 10
        </span>
        <input type="number"
               id="duration"
               v-model.number="direction.duration"
               placeholder="Введите время обучения"
               @blur="validate.duration.$touch()"
               class="field-standard text-while">
      </div>
    </div>

    <input type="button"
           class="btn-standard mt-20"
           @click="addDirection"
           :disabled="validate.$invalid"
           value="добавить">
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, toRefs } from 'vue';
import { Direction } from '@/types/SiteContentTypes';
import { createDirection } from '@/api/DirectionApi';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { maxValue, minValue, required } from '@vuelidate/validators';

export default defineComponent({
  name: 'TheModalDirectionAdd',
  setup() {
    const store = useStore();
    const direction = ref<Direction>({
      title: '',
      degree: '',
      form: '',
      duration: 0,
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

    const validate = useVuelidate(rules, toRefs(direction.value));

    const addDirection = async () => {
      const data = await createDirection(direction.value);
      store.commit('direction/addDirection', data);
      direction.value.title = '';
      direction.value.form = '';
      direction.value.degree = '';
      direction.value.duration = 0;
      validate.value.$reset();
    };

    return {
      validate,
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
