<template>
  <div class="item">

    <div class="setting-block">
      <!--TODO Кнопка удаления с иконкой корзины-->
    </div>

    <textarea type="text"
              class="field-standard item-title mt-10"
              placeholder="Введите название направления"
              aria-label="Введите название направления"
              rows="3"
              :value="direction.title">

    </textarea>

    <input type="text"
           placeholder="Введите тип направления"
           aria-label="Введите тип направления"
           class="field-standard text-while mt-10"
           :value="direction.degree">

    <input type="text"
           placeholder="Время обучения на направление"
           aria-label="Время обучения на направление"
           class="field-standard text-while mt-10"
           :value="direction.formTraining">

    <input type="text"
           placeholder="Форма обучения направления"
           aria-label="Форма обучения направления"
           class="field-standard text-while mt-10"
           :value="direction.durationTraining">

    <input type="button"
           value="ОБНОВИТЬ"
           class="btn-standard mt-20"
           @click="$emit('update')">

  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import { InformationDirection } from '@/api/model/ModelTypes';

export default defineComponent({
  name: 'AppModalDirectionsItem',
  emits: ['update'],
  props: {
    direction: {
      type: Object as PropType<InformationDirection>,
      required: true,
    },
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

  .setting-block {
    display: flex;
    flex-flow: row;
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
