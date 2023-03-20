<template>
  <app-base-screen title="Состав кафедры">

    <the-modal-change-teacher :is-show="isShow"
                              :teachers="allTeachers"
                              @close="changeShowModal"/>

    <div class="teacher-change mb-20" v-if="isAuth">
      <input type="button"
             @click="changeShowModal"
             class="btn-standard"
             value="редактировать">
    </div>

    <div class="teachers-screen-container">

      <app-teacher-item :teacher="leaderTeacher" :is-main="true">
        <div class="block-top">
          <span class="additional fs-20">Адрес</span>
          <span class="fs-20 span-new-line content">{{ address }}</span>
        </div>
        <div class="block-bottom">
          <div>
            <span class="additional fs-20">Телефон</span>
            <span class="fs-20 span-new-line content">{{ phone }}</span>
          </div>

          <div>
            <span class="additional fs-20">Почта</span>
            <span class="fs-20 span-new-line content">{{ email }}</span>
          </div>
        </div>
      </app-teacher-item>

      <div class="list-teacher" v-for="(teacher, index) in teachers" :key="teacher.id">
        <div class="line" :style="[index === teachers.length - 1 ? 'height: 65%' : '']">
        </div>
        <app-teacher-item class="teacher" :teacher="teacher"/>
      </div>

    </div>

  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import AppTeacherItem from '@/components/views/items/AppTeacherItem.vue';
import TheModalChangeTeacher from '@/components/modals/teacher/TheModalChangeTeacher.vue';
import useShowModal from '@/hooks/useShowModal';
import AppBaseScreen from '../UI/AppBaseScreen.vue';

export default defineComponent({
  icon: 'TheTeachersScreen',
  components: {
    TheModalChangeTeacher,
    AppBaseScreen,
    AppTeacherItem,
  },
  setup() {
    const store = useStore();
    const {
      isShow,
      changeShowModal,
    } = useShowModal();

    return {
      isShow,
      changeShowModal,
      leaderTeacher: computed(() => store.getters['teacher/getLeaderTeacher']),
      teachers: computed(() => store.getters['teacher/getTeacherNotLeader']),
      allTeachers: computed(() => store.getters['teacher/getTeachers']),
      isAuth: computed(() => store.getters['auth/isAuth']),
      address: computed(() => store.getters['department/getDepartment'].address),
      email: computed(() => store.getters['department/getDepartment'].email),
      phone: computed(() => store.getters['department/getDepartment'].phone),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.teacher-change {
  display: flex;
  justify-content: center;
}

.teachers-screen-container {
  display: grid;
  grid-template-columns: 1fr;
  width: 95%;
  margin: 0 auto;

  .block-top {
    margin-bottom: 8.5%;
  }

  .block-bottom {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }
}

.list-teacher {
  display: grid;
  grid-template-columns: 1fr 3.3fr;

  .line {
    border: 2px solid prop.$teacher-screen-color-line;
    background: prop.$teacher-screen-color-line;
    justify-self: center;
  }

  .teacher {
    margin-top: 3.2%;
  }
}

.content {
  @include utils.fontStyle($color: prop.$teacher-screen-main-color);
}

.additional {
  @include utils.fontStyle($color: prop.$teacher-screen-additional-color);
}

.span-new-line {
  display: block;
}
</style>
