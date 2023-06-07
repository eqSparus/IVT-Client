<template>
  <app-base-modal :is-show="isShow"
                  :is-footer="true"
                  title="Порядок преподавателей"
                  @close="$emit('close')">

    <div class="position-edit-container">
      <table class="table-teacher">
        <tbody>
        <transition-group name="teachers">
          <app-teacher-position-item v-for="teacher in teachers" :key="teacher.id"
                                     :teacher="teacher"/>
        </transition-group>
        </tbody>
      </table>
    </div>
  </app-base-modal>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import AppBaseModal from '@/components/UI/AppBaseModal.vue';
import { Teacher } from '@/types/site.types';
import AppTeacherPositionItem from '@/components/views/teacher/modal/AppTeacherPositionItem.vue';

export default defineComponent({
  name: 'TheModalEditPositionTeacher',
  components: {
    AppTeacherPositionItem,
    AppBaseModal,
  },
  emits: ['close'],
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    teachers: {
      type: Array as PropType<Array<Teacher>>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';
@import '@/assets/scss/extends.scss';

$animation-name: 'teachers';

@include utils.animation-to($name: $animation-name, $move: true) {
  transition: all 0.5s ease;
}

.position-edit-container {
  max-height: 40rem;
  overflow-y: auto;
  overflow-x: auto;
  padding: 1rem;

  .table-teacher {
    width: 60vw;
  }

  .thead-title {
    @include utils.font-style(prop.$main-first-dark-color)
  }
}

</style>
