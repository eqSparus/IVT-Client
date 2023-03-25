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

      <transition-group name="teacher">
        <div class="list-teacher" v-for="teacher in teachers" :key="teacher.id">
          <app-teacher-item class="teacher" :teacher="teacher"/>
        </div>
      </transition-group>

      <button class="fs-24" @click="changeIsAll">
        {{ textIsAll }}
      </button>

    </div>

  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import AppTeacherItem from '@/components/views/teacher/item/AppTeacherItem.vue';
import TheModalChangeTeacher from '@/components/views/teacher/modal/TheModalChangeTeacher.vue';
import useShowModal from '@/hooks/useShowModal';
import AppBaseScreen from '../../UI/AppBaseScreen.vue';

export default defineComponent({
  icon: 'TheTeachersScreen',
  components: {
    TheModalChangeTeacher,
    AppBaseScreen,
    AppTeacherItem,
  },
  setup() {
    const store = useStore();
    const isAll = ref<boolean>(false);

    const {
      isShow,
      changeShowModal,
    } = useShowModal();

    const changeIsAll = () => {
      isAll.value = !isAll.value;
    };

    const teachers = computed(() => {
      if (isAll.value) {
        return store.getters['teacher/getTeacherNotLeader'];
      }
      return store.getters['teacher/getTeacherNotLeader'].slice(0, 4);
    });

    return {
      isShow,
      isAll,
      changeIsAll,
      changeShowModal,
      leaderTeacher: computed(() => store.getters['teacher/getLeaderTeacher']),
      teachers,
      allTeachers: computed(() => store.getters['teacher/getTeachers']),
      isAuth: computed(() => store.getters['auth/isAuth']),
      address: computed(() => store.getters['department/getDepartment'].address),
      email: computed(() => store.getters['department/getDepartment'].email),
      phone: computed(() => store.getters['department/getDepartment'].phone),
      textIsAll: computed(() => (isAll.value ? 'скрыть' : 'показать всех')),
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

.teacher-enter-active,
.teacher-leave-active {
  transition: all 0.5s ease;
}

.teacher-enter-from,
.teacher-leave-to {
  transform: translateY(-20%);
  opacity: 0;
}

.list-teacher {
  display: flex;
  flex-flow: column;
  align-items: center;

  .teacher {
    margin-top: 3.2%;
    width: 80%;
  }
}

button {
  border: none;
  background: none;
  text-transform: uppercase;
  color: prop.$info-color;
  margin-top: 5%;

  &:hover {
    color: adjust-color($color: prop.$info-color, $red: 37, $green: 26, $blue: -2);;
    cursor: pointer;
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
