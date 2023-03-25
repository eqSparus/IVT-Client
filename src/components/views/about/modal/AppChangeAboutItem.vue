<template>
  <div class="item-about">

    <label class="field-label" for="title">Введите описание</label>
    <span class="field-fail" v-if="validate.title.$invalid && validate.title.$dirty">
       Поле не должно быть пустым
    </span>
    <input type="text"
           class="field-standard"
           placeholder="Введите название"
           v-model="changeAbout.title"
           id="title"
           @blur="validate.title.$touch()"
           aria-label="Введите название"/>

    <label class="field-label mt-10" for="description">Введите описание</label>
    <span class="field-fail" v-if="validate.description.$invalid && validate.description.$dirty">
      Поле не должно быть пустым
    </span>
    <textarea placeholder="Введите описание"
              id="description"
              class="field-standard item-description"
              v-model="changeAbout.description"
              rows="10"
              @blur="validate.description.$touch()"
              aria-label="Введите описание">

        </textarea>

    <input type="button"
           value="применить"
           :disabled="validate.title.$invalid || validate.description.$invalid"
           @click="$emit('updateAbout', changeAbout)"
           class="btn-standard mt-20">
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { AboutDepartment } from '@/types/SiteContentTypes';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default defineComponent({
  name: 'AppChangeAboutItem',
  emits: ['updateAbout'],
  props: {
    about: {
      type: Object as PropType<AboutDepartment>,
      required: true,
    },
  },
  setup(props) {
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

    const validate = useVuelidate(rules, changeAbout);

    return {
      validate,
      changeAbout,
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

  .item-description {
    resize: none;
    @include utils.scrollbar(prop.$scroll-slider-color, prop.$scroll-slider-body-color)
  }
}

</style>
