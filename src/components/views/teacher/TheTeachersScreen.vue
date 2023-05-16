<template>
  <app-base-screen title="Состав кафедры">

    <the-modal-edit-teacher :is-show="isShowEditTeacher"
                            :teachers="allTeachers"
                            @close="changeShowEditTeacher"/>

    <the-modal-edit-position-teacher :is-show="isShowEditPosition"
                                     :teachers="allTeachers"
                                     @close="changeShowEditPosition"/>

    <div class="teacher-change-block mb-20" v-if="isAuth">
      <input type="button"
             @click="changeShowEditTeacher(); loadAllTeacher()"
             class="btn-standard"
             value="изменить состав">
      <input type="button"
             @click="changeShowEditPosition(); loadAllTeacher()"
             class="btn-standard ml-20"
             :disabled="allTeachers.length === 0"
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

      <button v-if="allTeachers.length > 5"
              class="fs-24 load-teacher"
              @click="changeIsAll(); loadAllTeacher()">
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
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';

export default defineComponent({
  icon: 'TheTeachersScreen',
  components: {
    TheModalEditPositionTeacher,
    TheModalEditTeacher,
    AppBaseScreen,
    AppTeacherItem,
  },
  setup() {
    const { isAuth } = useTokenAuthentication();
    const store = useStore();
    const isAll = ref<boolean>(false);

    const {
      isShow: isShowEditTeacher,
      toggleModal: changeShowEditTeacher,
    } = useShowModal();

    const {
      isShow: isShowEditPosition,
      toggleModal: changeShowEditPosition,
    } = useShowModal();

    const changeIsAll = async () => {
      isAll.value = !isAll.value;
    };

    const listTeachers = computed(() => {
      if (isAll.value) {
        return store.getters['teacher/getTeachers'];
      }
      return store.getters['teacher/getTeachers'].slice(0, 5);
    });

    const loadAllTeacher = () => {
      store.dispatch('teacher/loadAllTeacher');
    };

    return {
      isShowEditTeacher,
      isShowEditPosition,
      isAll,
      changeIsAll,
      loadAllTeacher,
      changeShowEditTeacher,
      changeShowEditPosition,
      listTeachers,
      minPosition: computed(() => store.getters['teacher/getMinPosition']),
      allTeachers: computed(() => store.getters['teacher/getTeachers']),
      isAuth,
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
@use '@/assets/scss/utils.scss';

$animation-name: 'teacher';

.teacher-change-block {
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
      width: 90%;
      margin: 3.2% auto 0 auto;

      @include utils.phone-style {
        width: 100%;
      }

      &:first-child {
        margin-top: 0;
        width: 100%;
      }
    }
  }

}

@include utils.animation-to($name: $animation-name) {
  transition: all 0.5s ease;
}

@include utils.animation-from($name: $animation-name) {
  transform: translateY(-20%);
  opacity: 0;
}

.load-teacher {
  border: none;
  background: none;
  text-transform: uppercase;
  color: prop.$primary-color;
  margin-top: 8rem;

  &:hover {
    color: adjust-color($color: prop.$primary-color, $red: 37, $green: 26, $blue: -2);
    cursor: pointer;
  }

  &:focus {
    color: adjust-color($color: prop.$primary-color, $red: 37, $green: 26, $blue: -2);
    outline: none;
  }
}

.content {
  @include utils.font-style($color: prop.$main-first-color);
}

.additional {
  @include utils.font-style($color: prop.$main-first-dark-transparent-color);
}

.span-new-line {
  display: block;
}
</style>
