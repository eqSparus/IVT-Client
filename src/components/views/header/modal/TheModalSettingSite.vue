<template>
  <app-base-modal :is-show="isShow"
                  :is-footer="true"
                  title="Версия для слабовидящих"
                  @close="$emit('close')">
    <div class="setting-site-container">
      <div class="setting-site-row">
        <input type="radio"
               id="textSize0"
               value="0"
               @change="toggleTextSize"
               style="display: none"
               v-model.number="textSize">
        <label class="block-size"
               for="textSize0"
               style="font-size: 2rem">А</label>
        <input type="radio"
               id="textSize2"
               value="2"
               @change="toggleTextSize"
               style="display: none"
               v-model.number="textSize">
        <label class="block-size ml-10"
               for="textSize2"
               style="font-size: calc(5px + 2rem)">А</label>
        <input type="radio"
               id="textSize4"
               value="4"
               @change="toggleTextSize"
               style="display: none"
               v-model.number="textSize">
        <label class="block-size ml-10"
               for="textSize4"
               style="font-size: calc(10px + 2rem)">А</label>
      </div>
      <input type="button"
             class="btn-standard mt-20"
             :value="colorMode"
             @click="toggleFilter">
    </div>
  </app-base-modal>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
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
    const textSize = ref<number>(0);
    const colorMode = ref<boolean>(false);

    const toggleTextSize = () => {
      const root = document.querySelector(':root');
      if (root) {
        (root as HTMLElement).style.setProperty('--font-size', `${textSize.value}px`);
      }
    };

    const toggleFilter = () => {
      if (colorMode.value) {
        document.body.style.filter = '';
        colorMode.value = false;
      } else {
        document.body.style.filter = 'grayscale(100%)';
        colorMode.value = true;
      }
    };

    return {
      textSize,
      colorMode: computed(() => (colorMode.value ? 'Обычный режим' : 'Черно белый режим')),
      toggleTextSize,
      toggleFilter,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

.setting-site-container {
  display: flex;
  flex-flow: column;
  align-items: center;

  .setting-site-row {
    display: flex;
    flex-flow: row;

    input[type="radio"]:hover + label {
      background: prop.$main-second-additional-color;
    }

    input[type="radio"]:checked + label {
      background: prop.$info-color;
    }

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
