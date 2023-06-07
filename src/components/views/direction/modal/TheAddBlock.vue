<template>
  <div class="add-direction-container">
    <app-base-field id="title"
                    label="Название"
                    :fails="[{
                      description: 'Поле не должно быть пустым',
                      isShow: valid.title.$invalid && valid.title.$dirty,
                    }]">
      <textarea id="title"
                v-model="direction.title"
                class="field-standard"
                @blur="valid.title.$touch()"
                placeholder="Введите название направления"
                rows="2">
      </textarea>
    </app-base-field>

    <div class="add-direction-center mt-10">
      <div class="block">
        <app-base-field id="degree"
                        label="Степень обучение"
                        :fails="[{
                          description: 'Поле не должно быть пустым',
                          isShow: valid.degree.$invalid && valid.degree.$dirty,
                        }]">
          <input type="text"
                 id="degree"
                 v-model="direction.degree"
                 placeholder="Введите степень"
                 @blur="valid.degree.$touch()"
                 class="field-standard text-while">
        </app-base-field>
      </div>

      <div class="block">
        <app-base-field id="form"
                        label="Форма обучения"
                        :fails="[{
                          description: 'Поле не должно быть пустым',
                          isShow: valid.form.$invalid && valid.form.$dirty,
                        }]">
          <input type="text"
                 id="form"
                 v-model="direction.form"
                 placeholder="Введите форму обучения"
                 @blur="valid.form.$touch()"
                 class="field-standard text-while">
        </app-base-field>
      </div>

      <div class="block">
        <app-base-field id="duration"
                        label="Время обучения"
                        :fails="[{
                          description: 'Число должно быть от 1 до 10',
                          isShow: valid.duration.$invalid && valid.duration.$dirty,
                        }]">
          <input type="number"
                 id="duration"
                 v-model.number="direction.duration"
                 placeholder="Введите время обучения"
                 @blur="valid.duration.$touch()"
                 class="field-standard text-while">
        </app-base-field>
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
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  name: 'TheAddBlock',
  components: { AppBaseField },
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

.add-direction-container {
  display: flex;
  flex-flow: column;

  .add-direction-center {
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
}

</style>
