<template>
  <app-modal-window :is-footer="true"
                    title="Изменение состава кафедры"
                    :is-show="isShow"
                    @close="$emit('close')">

    <div class="change-teacher-container">
      <the-modal-add-teacher v-if="isAdd"/>
      <the-modal-edit-teacher v-else :teacher="teachers.find((t) => t.id === indexTeacher)"
                              @remove="isAdd = true"/>
    </div>

    <div class="teachers-list mt-20">
      <teacher-list-item v-for="teacher in teachers" :key="teacher.id"
                         :path-img="teacher.pathImg"
                         @action="selectTeacher(teacher.id)"/>
      <teacher-list-item :path-img="addIcon" @action="isAdd = true"/>
    </div>
  </app-modal-window>
</template>

<script lang="ts">

import AppModalWindow from '@/components/UI/AppModalWindow.vue';
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import TheModalAddTeacher from '@/components/modals/teacher/TheModalAddTeacher.vue';
import { Teacher } from '@/api/model/ModelTypes';
import TeacherListItem from '@/components/modals/teacher/TeacherListItem.vue';
import addIcon from '@/assets/images/icons/add.svg';
import TheModalEditTeacher from '@/components/modals/teacher/TheModalEditTeacher.vue';

export default defineComponent({
  name: 'TheModalChangeTeacher',
  components: {
    TheModalEditTeacher,
    TeacherListItem,
    TheModalAddTeacher,
    AppModalWindow,
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
  setup(props) {
    const indexTeacher = ref<string>('');
    const isAdd = ref<boolean>(true);

    const selectTeacher = (id: string) => {
      isAdd.value = false;
      indexTeacher.value = id;
    };
    return {
      isAdd,
      indexTeacher,
      selectTeacher,
      addIcon,
      teacherSelect: computed(() => props.teachers.find((t) => t.id === indexTeacher.value)),
    };
  },
});
</script>

<style lang="scss" scoped>

.change-teacher-container {
  display: flex;
  flex-flow: column;
  width: 60vw;
}

.teachers-list {
  display: flex;
  justify-content: center;
}

</style>
