<template>
  <button class="button-img-teacher"
          @click="$emit('action')"
          :title="title">
    <img class="img-teacher" :src="pathImg" alt="Фотография преподавателя">
  </button>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import addIcon from '@/assets/images/icons/add.svg';

export default defineComponent({
  name: 'TeacherListItem',
  emits: ['action'],
  props: {
    pathImg: {
      type: String,
      default: addIcon,
    },
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>

.button-img-teacher {
  background: none;
  border: none;
  padding: 0;

  .img-teacher {
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
