<template>
  <div class="custom-select" @mouseleave="isOpen = false" @blur="isOpen = false" @keyup.esc="isOpen = false">
    <div class="active-option" @click="isOpen = !isOpen" @keyup.tab="isOpen = !isOpen">
      <img :src="active" alt="Выбраня иконка"/>
    </div>
    <transition name="select-open">
      <div class="item-select-container" v-if="isOpen">
        <img class="item-select"
             v-for="option in options" :key="option.name"
             :src="option.img"
             :alt="`Иконка ${option.name}`"
             @click="changeSelect(option.name)"
             @keyup.enter="changeSelect(option.name)"/>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import imgDefault from '@/assets/images/links/message-link.svg';

export type SelectIcon = {
  name: string,
  img: string,
}

export default defineComponent({
  name: 'AppSelect',
  props: {
    options: {
      type: Object as PropType<Array<SelectIcon>>,
      required: true,
    },
    select: {
      type: String,
      required: true,
    },
  },
  setup(prop) {
    const active = ref<string>(imgDefault);
    const isOpen = ref<boolean>(false);

    const selectImg = prop.options.find((op) => op.name === prop.select);

    if (selectImg) {
      active.value = selectImg.img;
    }

    const changeSelect = (title: string) => {
      const el = prop.options.find((op) => op.name === title);
      if (el) {
        active.value = el.img;
        isOpen.value = false;
      }
    };

    return {
      isOpen,
      active,
      changeSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

.custom-select {
  display: flex;
  position: relative;
  align-self: center;
  justify-content: center;
  align-items: center;

  .select-open-enter-active,
  .select-open-leave-active {
    transition: all 0.5s ease;
  }

  .select-open-enter-from,
  .select-open-leave-to {
    transform: translateY(-20%);
    opacity: 0;
  }

  .active-option {
    padding: 5px 15px;
    border: 2px solid prop.$select-img-border-color;
    border-radius: 5px;

    &:not(:focus):hover {
      cursor: pointer;
      border: 2px solid adjust-color($color: prop.$select-img-border-color, $red: 37, $green: 26, $blue: -2);
    }
  }

  .item-select-container {
    z-index: 333;
    position: absolute;
    top: 100%;
    background: prop.$select-img-background-color;
    border-bottom: 2px solid adjust-color($color: prop.$select-img-border-color, $red: 37, $green: 26, $blue: -2);
    border-right: 2px solid adjust-color($color: prop.$select-img-border-color, $red: 37, $green: 26, $blue: -2);
    border-left: 2px solid adjust-color($color: prop.$select-img-border-color, $red: 37, $green: 26, $blue: -2);
    border-radius: 0 0 5px 5px;

    .item-select {
      z-index: 444;
      padding: 5px 15px;

      &:hover {
        cursor: pointer;
        background: prop.$select-img-background-hover-color;
      }
    }
  }

}

</style>
