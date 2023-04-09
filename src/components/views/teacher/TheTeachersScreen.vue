<template>
  <app-base-screen title="Состав кафедры">

    <the-modal-edit-teacher :is-show="isShowEditTeacher"
                            :teachers="allTeachers"
                            @close="changeShowEditTeacher"/>

    <the-modal-edit-position-teacher :is-show="isShowEditPosition"
                                     :teachers="allTeachers"
                                     @close="changeShowEditPosition"/>

    <div class="teacher-change mb-20" v-if="isAuth">
      <input type="button"
             @click="changeShowEditTeacher"
             class="btn-standard"
             value="изменить состав">
      <input type="button"
             @click="changeShowEditPosition"
             class="btn-standard ml-20"
             value="изменить последовательность">
    </div>

    <div class="teachers-screen-container">

      <div class="list-teacher">
        <transition-group name="teacher">
          <app-teacher-item class="teacher"
                            v-for="teacher in listTeachers" :key="teacher.id"
                            :teacher="teacher"
                            :is-main="teacher.position === minPosition">
            <div v-if="teacher.position === minPosition">
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
            </div>
          </app-teacher-item>
        </transition-group>
      </div>

      <button v-if="allTeachers.length > 5" class="fs-24" @click="changeIsAll">
        {{ textIsAll }}
      </button>

    </div>

  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import AppTeacherItem from '@/components/views/teacher/item/AppTeacherItem.vue';
import TheModalEditTeacher from '@/components/views/teacher/modal/TheModalEditTeacher.vue';
import useShowModal from '@/hooks/useShowModal';
import TheModalEditPositionTeacher from '@/components/views/teacher/modal/TheModalEditPositionTeacher.vue';
import AppBaseScreen from '../../UI/AppBaseScreen.vue';

export default defineComponent({
  icon: 'TheTeachersScreen',
  components: {
    TheModalEditPositionTeacher,
    TheModalEditTeacher,
    AppBaseScreen,
    AppTeacherItem,
  },
  setup() {
    const store = useStore();
    const isAll = ref<boolean>(false);

    const {
      isShow: isShowEditTeacher,
      changeShowModal: changeShowEditTeacher,
    } = useShowModal();

    const {
      isShow: isShowEditPosition,
      changeShowModal: changeShowEditPosition,
    } = useShowModal();

    const changeIsAll = () => {
      isAll.value = !isAll.value;
    };

    const listTeachers = computed(() => {
      if (isAll.value) {
        return store.getters['teacher/getTeachers'];
      }
      return store.getters['teacher/getTeachers'].slice(0, 5);
    });

    return {
      isShowEditTeacher,
      isShowEditPosition,
      isAll,
      changeIsAll,
      changeShowEditTeacher,
      changeShowEditPosition,
      listTeachers,
      minPosition: computed(() => store.getters['teacher/getMinPosition']),
      allTeachers: computed(() => store.getters['teacher/getTeachers']),
      isAuth: computed(() => store.getters['auth/isAuth']),
      textIsAll: computed(() => (isAll.value ? 'скрыть' : 'показать всех')),
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
  display: flex;
  flex-flow: column;
  justify-content: center;

  .block-top {
    margin-bottom: 4rem;
  }

  .block-bottom {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }

  .list-teacher {
    display: flex;
    flex-flow: column;

    .teacher {
      width: 80%;
      margin: 3.2% auto 0 auto;

      @media only screen and (max-width: 1080px) {
        width: 100%;
      }

      &:first-child {
        margin-top: 0;
        width: 100%;
      }
    }
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

button {
  border: none;
  background: none;
  text-transform: uppercase;
  color: prop.$info-color;
  margin-top: 8rem;

  &:hover {
    color: adjust-color($color: prop.$info-color, $red: 37, $green: 26, $blue: -2);
    cursor: pointer;
  }

  &:focus {
    color: adjust-color($color: prop.$info-color, $red: 37, $green: 26, $blue: -2);
    outline: none;
  }
}

.content {
  @include utils.fontStyle($color: prop.$main-first-color);
}

.additional {
  @include utils.fontStyle($color: prop.$main-first-dark-transparent-color);
}

.span-new-line {
  display: block;
}
</style>
