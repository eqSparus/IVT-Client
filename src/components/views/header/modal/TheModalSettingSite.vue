<template>
  <app-base-modal :is-show="isShow"
                  :is-footer="true"
                  title="Версия для слабовидящих"
                  @close="$emit('close')">
    <div class="setting-site-container">
      <div class="setting-site-row">
        <label class="block-size"
               for="textSize0"
               style="font-size: 2rem">А</label>
        <label class="block-size ml-10"
               for="textSize2"
               style="font-size: calc(5px + 2rem)">А</label>
        <label class="block-size ml-10"
               for="textSize4"
               style="font-size: calc(10px + 2rem)">А</label>
        <input type="radio"
               id="textSize0"
               value="1"
               @change="toggleTextSize"
               style="display: none"
               v-model.number="textSize">
        <input type="radio"
               id="textSize2"
               value="5"
               @change="toggleTextSize"
               style="display: none"
               v-model.number="textSize">
        <input type="radio"
               id="textSize4"
               value="4"
               @change="toggleTextSize"
               style="display: none"
               v-model.number="textSize">
      </div>
    </div>
  </app-base-modal>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import AppBaseModal from '@/components/UI/AppBaseModal.vue';

export default defineComponent({
  name: 'TheModalSettingSite',
  components: { AppBaseModal },
  emits: ['close'],
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const textSize = ref<number>(1);

    const toggleTextSize = () => {
      console.log(1);
    };

    return {
      textSize,
      toggleTextSize,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

.setting-site-container {
  display: flex;
  flex-flow: column;

  .setting-site-row {
    display: flex;
    flex-flow: row;

    .block-size {
      border: 2px solid prop.$main-first-extra-color;
      background: none;
      height: 4rem;
      width: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

</style>
