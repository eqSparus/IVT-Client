<template>
  <div class="item-about">

    <label class="field-label" for="title">Введите описание</label>
    <span class="field-fail" v-if="valid.title.$invalid && valid.title.$dirty">
       Поле не должно быть пустым
    </span>
    <input type="text"
           class="field-standard"
           placeholder="Введите название"
           v-model="changeAbout.title"
           id="title"
           @blur="valid.title.$touch()"
           aria-label="Введите название"/>

    <label class="field-label mt-10" for="description">Введите описание</label>
    <span class="field-fail" v-if="valid.description.$invalid && valid.description.$dirty">
      Поле не должно быть пустым
    </span>
    <textarea placeholder="Введите описание"
              id="description"
              class="field-standard field-area"
              v-model="changeAbout.description"
              rows="10"
              @blur="valid.description.$touch()"
              aria-label="Введите описание">

    </textarea>

    <input type="button"
           value="применить"
           :disabled="valid.$invalid"
           @click="editAbout"
           class="btn-standard mt-20">
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { AboutDepartment } from '@/types/SiteContentTypes';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import useAlerts from '@/hooks/useAlerts';

export default defineComponent({
  name: 'AppEditAboutBlock',
  emits: ['update'],
  props: {
    about: {
      type: Object as PropType<AboutDepartment>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { alerts } = useAlerts();
    const changeAbout = ref({
      id: props.about.id,
      title: props.about.title,
      description: props.about.description,
    });

    const rules = {
      title: {
        required,
      },
      description: {
        required,
      },
    };

    const editAbout = () => {
      if (props.about.title !== changeAbout.value.title
        || props.about.description !== changeAbout.value.description) {
        emit('update', changeAbout.value);
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Данные не изменены',
        });
      }
    };

    const valid = useVuelidate(rules, changeAbout);

    return {
      valid,
      changeAbout,
      editAbout,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utils.scss' as utils;
@use '@/assets/scss/properties.scss' as prop;

.item-about {
  display: flex;
  flex-flow: column;
}

</style>
