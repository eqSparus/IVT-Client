<template>
  <app-modal-window :is-show="isShow"
                    title="Редактировать информациб о кафедре"
                    @close="$emit('close')"
                    :is-footer="true">

    <div class="modal-about-container">

      <div class="item-about" v-for="info in infoFaculty" :key="info.id">

        <input type="text"
               class="field-standard"
               placeholder="Введите название"
               v-model="info.title"
               aria-label="Введите название"/>

        <textarea placeholder="Введите описание"
                  class="field-standard mt-10 item-description"
                  v-model="info.description"
                  rows="10"
                  aria-label="Введите описание">

        </textarea>

        <input type="button"
               value="ПРИМЕНИТЬ"
               class="btn-standard mt-20">
      </div>

    </div>

  </app-modal-window>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import AppModalWindow from '@/components/UI/AppModalWindow.vue';
import { InformationFaculty } from '@/api/model/ModelTypes';

export default defineComponent({
  name: 'TheModalChangeAbout',
  components: { AppModalWindow },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    infoFaculty: {
      type: Array as PropType<Array<InformationFaculty>>,
      required: true,
    },
  },
  emits: ['close'],
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utils.scss' as utils;
@use '@/assets/scss/properties.scss' as prop;

.modal-about-container {
  display: flex;
  flex-flow: row;
  gap: 20px;

  .item-about {
    display: flex;
    flex-flow: column;

    .item-description {
      resize: none;
      @include utils.scrollbar(prop.$scroll-slider-color, prop.$scroll-slider-body-color)
    }
  }
}

</style>
