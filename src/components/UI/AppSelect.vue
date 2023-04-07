<template>
  <div class="app-select" @mouseleave="isOpen = false" @blur="isOpen = false" @keyup.esc="isOpen = false">

    <button @click="isOpen = !isOpen">
      {{ selectContent }}
    </button>

    <transition name="options">
      <div class="option-container" v-if="isOpen">
        <p class="option"
           @click="changeSelect(option.value)"
           @keyup.enter="changeSelect(option.value)"
           v-for="option in options" :key="option.value">
          {{ option.content }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';

export type SelectOption = {
  content: string,
  value: string,
}

export default defineComponent({
  name: 'AppSelect',
  emits: ['change'],
  props: {
    options: {
      type: Array as PropType<Array<SelectOption>>,
      required: true,
    },
    select: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isOpen = ref<boolean>(false);
    const selectValue = ref<string>(props.select);
    const defaultSelect = props.options.find((op) => op.value === selectValue.value);
    const selectContent = ref<string>('');
    if (defaultSelect) {
      selectContent.value = defaultSelect.content;
    }

    const changeSelect = (value: string) => {
      const el = props.options.find((op) => op.value === value);
      if (el) {
        selectValue.value = el.value;
        selectContent.value = el.content;
        isOpen.value = false;
      }
      emit('change', selectValue.value);
    };

    return {
      selectContent,
      isOpen,
      changeSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;
@use '@/assets/scss/utils.scss' as utils;
@import '@/assets/scss/extends.scss';

.app-select {
  display: flex;
  flex-flow: column;
  position: relative;

  .options-enter-active,
  .options-leave-active {
    transition: all 0.5s ease;
  }

  .options-enter-from,
  .options-leave-to {
    transform: translateY(-20%);
    opacity: 0;
  }

  .option-container {
    z-index: 333;
    position: absolute;
    width: 100%;
    height: 300%;
    top: 100%;
    background: props.$main-second-color;
    border-bottom: 0.2rem solid adjust-color($color: props.$info-color, $red: 37, $green: 26, $blue: -2);
    border-right: 0.2rem solid adjust-color($color: props.$info-color, $red: 37, $green: 26, $blue: -2);
    border-left: 0.2rem solid adjust-color($color: props.$info-color, $red: 37, $green: 26, $blue: -2);
    border-radius: 0 0 5px 5px;
    overflow-y: scroll;
    @extend %standard-scroll-bar;

    .option {
      z-index: 444;
      padding: 0.5rem 1.5rem;
      font-size: 2rem;

      &:hover {
        cursor: pointer;
        background: props.$select-img-background-hover-color;
      }
    }
  }

  button {
    text-align: start;
    background: none;
    border: props.$info-color solid 0.2rem;
    border-radius: 0.8rem;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    font-size: 2rem;

    &:hover {
      cursor: pointer;
      border: 0.2rem solid adjust-color($color: props.$info-color, $red: 37, $green: 26, $blue: -2);
    }
  }
}

</style>
