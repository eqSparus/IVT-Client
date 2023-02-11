<template>
  <app-base-screen title="Состав кафедры">
    <div class="teachers-screen-container">

      <app-teacher-item :teacher="teacherMain" :is-main="true">
        <div class="block-top">
          <span class="additional fs-20">Адрес</span>
          <span class="fs-20 span-new-line content">{{ infoAboutDepartment.address }}</span>
        </div>
        <div class="block-bottom">
          <div>
            <span class="additional fs-20">Телефон</span>
            <span class="fs-20 span-new-line content">{{ infoAboutDepartment.phone }}</span>
          </div>

          <div>
            <span class="additional fs-20">Почта</span>
            <span class="fs-20 span-new-line content">{{ infoAboutDepartment.email }}</span>
          </div>
        </div>
      </app-teacher-item>

      <div class="list-teacher" v-for="(teacher, index) in teachers" :key="teacher.id">
        <div class="line" :style="[index === teachers.length - 1 ? 'height: 65%' : '']">
        </div>
        <app-teacher-item class="teacher" :teacher="teacher" />
      </div>

    </div>

  </app-base-screen>
</template>

<script lang="ts">

import { Teacher, InfoAboutDepartment } from '@/api/model/ModelTypes';
import { defineComponent, ref } from 'vue';
import teacher1 from '@/assets/images/teachers/1.png';
import teacher2 from '@/assets/images/teachers/2.png';
import teacher3 from '@/assets/images/teachers/3.png';
import teacher4 from '@/assets/images/teachers/4.png';
import AppTeacherItem from '../UI/items/AppTeacherItem.vue';
import AppBaseScreen from '../UI/AppBaseScreen.vue';

export default defineComponent({
  name: 'TheTeachersScreen',
  components: { AppBaseScreen, AppTeacherItem },
  setup() {
    const teacherMain = ref<Teacher>(
      {
        id: '1',
        firstName: 'Александр',
        middleName: 'Сергеевич',
        lastName: 'Грицай',
        post: 'Заведующий кафедрой',
        scientificDegree: 'Кандидат технических наук, доцент',
        image: teacher1,
      },
    );

    const teachers = ref<Array<Teacher>>([
      {
        id: '2',
        firstName: 'Виктор',
        middleName: 'Ильич',
        lastName: 'Потапов',
        post: 'Основатель кафедры',
        scientificDegree: 'Профессор, доктор технических наук, заслуженный деятель науки и техники РФ',
        image: teacher2,
      },
      {
        id: '3',
        firstName: 'Ольга',
        middleName: 'Павловна',
        lastName: 'Шафеева',
        post: 'Заместитель заведующего кафедрой',
        scientificDegree: 'Доцент, кандидат технических наук',
        image: teacher3,
      },
      {
        id: '4',
        firstName: 'Марина',
        middleName: 'Спартаковна',
        lastName: 'Дорошенко',
        post: '',
        scientificDegree: 'Старший преподаватель',
        image: teacher4,
      },
    ]);

    const infoAboutDepartment = ref<InfoAboutDepartment>({
      id: '1',
      phone: '(3812) 652208, 653314',
      address: '644050, г.Омск-50 пр.Мира 11, корпус 8, каб.321',
      email: 'ivt@omgtu.ru',
    });

    return {
      teacherMain,
      teachers,
      infoAboutDepartment,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

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
