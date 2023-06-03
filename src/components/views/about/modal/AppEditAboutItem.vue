<template>
  <form class="item-about">
    <app-base-field id="title"
                    label="Название"
                    :fails="[{
                      description: 'Поле не должно быть пустым',
                      isShow: valid.title.$invalid && valid.title.$dirty,
                    }]">
      <input type="text"
             class="field-standard"
             id="title"
             placeholder="Введите название"
             v-model="changeAbout.title"
             @blur="valid.title.$touch()"/>
    </app-base-field>

    <app-base-field id="description"
                    class="mt-10"
                    label="Описание"
                    :fails="[{
                      isShow: valid.description.$invalid && valid.description.$dirty,
                      description: 'Поле не должно быть пустым',
                    }]">
      <textarea placeholder="Введите описание"
                id="description"
                class="field-standard"
                v-model="changeAbout.description"
                rows="10"
                @blur="valid.description.$touch()"></textarea>
    </app-base-field>

    <input type="button"
           value="применить"
           :disabled="valid.$invalid"
           @click="editAbout"
           class="btn-standard mt-20">
  </form>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { AboutDepartment } from '@/types/site.types';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import useAlerts from '@/hooks/useAlerts';
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  name: 'AppEditAboutItem',
  components: { AppBaseField },
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

.item-about {
  display: flex;
  flex-flow: column;
}

</style>
