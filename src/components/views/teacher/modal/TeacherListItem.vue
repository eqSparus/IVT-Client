<template>
  <button @click="$emit('action')" :title="title">
    <img :src="pathImg" alt="Фотография преподавателя">
  </button>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeacherListItem',
  emits: ['action'],
  props: {
    pathImg: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>

button {
  background: none;
  border: none;
  padding: 0;

  img {
    transition: all 0.2s ease-out;
    height: 4rem;
    width: 4rem;

    &:hover {
      transform: scale(1.5);
      cursor: pointer;
    }
  }
}

</style>
