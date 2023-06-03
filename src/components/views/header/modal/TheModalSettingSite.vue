<template>
  <app-base-modal :is-show="isShow"
                  :is-footer="true"
                  title="Версия для слабовидящих"
                  :is-focus="true"
                  @close="$emit('close')">
    <div class="setting-site-container">
      <app-base-field id="textSize"
                      :label="`Размер текста: ${textSize * 10}`">
        <input type="range"
               min="0"
               max="1"
               step="0.1"
               v-model="textSize"
               class="field-range-standard"
               @change="toggleTextSize"
               id="textSize">
      </app-base-field>

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
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  name: 'TheModalSettingSite',
  components: {
    AppBaseField,
    AppBaseModal,
  },
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
        (root as HTMLElement).style.setProperty('--font-size', `${textSize.value}rem`);
      }
    };

    const toggleFilter = () => {
      if (colorMode.value) {
        document.documentElement.style.filter = '';
        colorMode.value = false;
      } else {
        document.documentElement.style.filter = 'grayscale(100%)';
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
