<template>
  <app-modal-window :is-footer="true"
                    title="Раздел &quotСостав кафедры&quot"
                    :is-show="isShow"
                    @close="close">

    <div class="edit-teacher-container">
      <div class="edit-teacher">
        <the-add-teacher v-if="isAdd"/>
        <the-edit-teacher v-else v-for="teacher in teachers" :key="teacher.id"
                          :teacher="teacher"
                          :show="teacher.id === indexTeacher"
                          @remove="isAdd = true"/>
      </div>

      <div class="teachers-list mt-10">
        <teacher-list-item v-for="teacher in teachers" :key="teacher.id"
                           :path-img="teacher.urlImg"
                           class="m-5"
                           :title="`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`"
                           @action="selectTeacher(teacher.id)"/>
        <teacher-list-item class="m-5"
                           title="Добавить преподавателя"
                           @action="isAdd = true"/>
      </div>
    </div>
  </app-modal-window>
</template>

<script lang="ts">

import AppModalWindow from '@/components/UI/AppBaseModal.vue';
import {
  defineComponent, PropType, ref,
} from 'vue';
import TheAddTeacher from '@/components/views/teacher/modal/TheAddTeacher.vue';
import { Teacher } from '@/types/site.types';
import TeacherListItem from '@/components/views/teacher/modal/TeacherListItem.vue';
import TheEditTeacher from '@/components/views/teacher/modal/TheEditTeacher.vue';

export default defineComponent({
  name: 'TheModalEditTeacher',
  components: {
    TheEditTeacher,
    TeacherListItem,
    TheAddTeacher,
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
  setup(props, context) {
    const indexTeacher = ref<string>('');
    const isAdd = ref<boolean>(true);

    const selectTeacher = (id: string) => {
      isAdd.value = false;
      indexTeacher.value = id;
    };

    const close = () => {
      isAdd.value = true;
      context.emit('close');
    };

    return {
      isAdd,
      indexTeacher,
      selectTeacher,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>

.edit-teacher-container {
  display: flex;
  flex-flow: column;
  width: 115rem;

  .edit-teacher {
    display: flex;
    flex-flow: column;

  }

  .teachers-list {
    width: 80%;
    align-self: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
}

</style>
