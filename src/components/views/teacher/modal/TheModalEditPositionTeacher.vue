<template>
  <app-base-modal :is-show="isShow"
                  :is-footer="true"
                  title="Изменить порядок преподавателей"
                  @close="$emit('close')">

    <div class="position-edit-container">
      <transition-group name="teachers">
        <teacher-position-item v-for="teacher in teachers" :key="teacher.id"
                               :teacher="teacher"
                               class="mt-10 pl-10 pr-10"/>
      </transition-group>
    </div>

  </app-base-modal>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import AppBaseModal from '@/components/UI/AppBaseModal.vue';
import { Teacher } from '@/types/SiteContentTypes';
import TeacherPositionItem from '@/components/views/teacher/modal/TeacherPositionItem.vue';

export default defineComponent({
  name: 'TheModalEditPositionTeacher',
  components: {
    TeacherPositionItem,
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
@import '@/assets/scss/extends.scss';

.teachers-move {
  transition: all 0.5s ease;
}

.position-edit-container {
  width: 100rem;
  display: flex;
  flex-flow: column;
  max-height: 40rem;
  overflow-y: auto;
  @extend %standard-scroll-bar;
}

</style>
