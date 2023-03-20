<template>
  <div class="custom-select" @mouseleave="isOpen = false" @blur="isOpen = false" @keyup.esc="isOpen = false">
    <div class="active-option" @click="isOpen = !isOpen" @keyup.tab="isOpen = !isOpen">
      <img :src="active" alt="Выбраня иконка"/>
    </div>
    <transition name="select-open">
      <div class="item-select-container" v-if="isOpen">
        <img class="item-select"
             v-for="option in options" :key="option"
             :src="option"
             :alt="`Иконка ${option}`"
             @click="changeSelect(option)"
             @keyup.enter="changeSelect(option)"/>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  icon: 'AppSelect',
  emits: ['changeIcon'],
  props: {
    options: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    select: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const active = ref<string>('http://localhost:8080/api/v1/images/links/message-link.svg');
    const isOpen = ref<boolean>(false);

    const selectImg = props.options.find((op) => op === props.select);

    if (selectImg) {
      active.value = selectImg;
    }

    const changeSelect = (title: string) => {
      const el = props.options.find((op) => op === title);
      if (el) {
        active.value = el;
        isOpen.value = false;
      }
      emit('changeIcon', active.value);
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
