<template>
  <div class="custom-select-component"
       @mouseleave="isOpen = false"
       @blur="isOpen = false"
       @keyup.esc="isOpen = false">
    <div class="active-option"
         @click="isOpen = !isOpen"
         @keyup.tab="isOpen = !isOpen">

      <img :src="select.img" :alt="select.img"/>
    </div>
    <transition name="select">
      <div class="selection-list" v-if="isOpen">
        <img class="selection-item"
             v-for="option in options" :key="option"
             :src="option.img"
             :alt="option.img"
             @click="toggleSelection(option.img)"
             @keyup.enter="toggleSelection(option.img)"/>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">

import {
  defineComponent,
  PropType,
  ref,
} from 'vue';

export type SelectOption = {
  img: string,
}

export default defineComponent({
  icon: 'AppSelect',
  emits: ['changeIcon'],
  props: {
    options: {
      type: Array as PropType<Array<SelectOption>>,
      required: true,
    },
    select: {
      type: Object as PropType<SelectOption>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isOpen = ref<boolean>(false);

    const toggleSelection = (value: string) => {
      const el = props.options.find((op) => op.img === value);
      if (el) {
        isOpen.value = false;
        emit('changeIcon', el.img);
      }
    };

    return {
      isOpen,
      toggleSelection,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';

$animation-name: 'select';

.custom-select-component {
  display: flex;
  flex-flow: row;
  position: relative;
  align-self: center;
  justify-content: center;
  align-items: center;

  @include utils.animation-to($name: 'select') {
    transition: all 0.5s ease;
  }

  @include utils.animation-from($name: 'select') {
    transform: translateY(-20%);
    opacity: 0;
  }

  .active-option {
    padding: 0.5rem 1.5rem;
    border: 0.2rem solid prop.$primary-color;
    border-radius: 0.5rem;

    &:not(:focus):hover {
      cursor: pointer;
      border: 0.2rem solid adjust-color($color: prop.$primary-color, $red: 37, $green: 26, $blue: -2);
    }
  }

  .selection-list {
    z-index: 333;
    position: absolute;
    top: 100%;
    background: prop.$main-second-color;
    border-bottom: 0.2rem solid adjust-color($color: prop.$primary-color, $red: 37, $green: 26, $blue: -2);
    border-right: 0.2rem solid adjust-color($color: prop.$primary-color, $red: 37, $green: 26, $blue: -2);
    border-left: 0.2rem solid adjust-color($color: prop.$primary-color, $red: 37, $green: 26, $blue: -2);
    border-radius: 0 0 0.5rem 0.5rem;

    .selection-item {
      z-index: 444;
      padding: 0.5rem 1.5rem;

      &:hover {
        cursor: pointer;
        background: prop.$main-second-additional-color;
      }
    }
  }

}

</style>
