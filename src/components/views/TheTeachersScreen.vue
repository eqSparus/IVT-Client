<template>
    <app-block-info-screen title="Состав кафедры">
        <div class="single-container">

            <app-teacher-item :teacher="teacherMain" :is-main="true">
                <div>
                    <span class="span-additional fs-20">Адрес</span>
                    <span class="fs-20 span-new-line span-content">{{ infoAboutDepartment.address }}</span>
                </div>
                <div class="block-footer mt-40">
                    <div>
                        <span class="span-additional fs-20">Телефон</span>
                        <span class="fs-20 span-new-line span-content">{{ infoAboutDepartment.phone }}</span>
                    </div>

                    <div>
                        <span class="span-additional fs-20">Почта</span>
                        <span class="fs-20 span-new-line span-content">{{ infoAboutDepartment.email }}</span>
                    </div>
                </div>
            </app-teacher-item>

            <div class="list-teacher" v-for="(teacher, index) in teachers" :key="teacher.id">
                <div class="line" :style="[index === teachers.length - 1 ? 'height: 65%' : '']">
                </div>
                <app-teacher-item class="mt-40" :teacher="teacher" />
            </div>

        </div>

    </app-block-info-screen>
</template>

<script lang="ts">

import { Teacher, InfoAboutDepartment } from '@/api/model/ModelTypes';
import { defineComponent, ref } from 'vue';
import teacher1 from '@/assets/images/teachers/1.png';
import teacher2 from '@/assets/images/teachers/2.png';
import teacher3 from '@/assets/images/teachers/3.png';
import teacher4 from '@/assets/images/teachers/4.png';
import AppTeacherItem from '../UI/items/AppTeacherItem.vue';
import AppBlockInfoScreen from '../UI/AppBlockInfoScreen.vue';

export default defineComponent({
  name: 'TheTeachersScreen',
  components: { AppBlockInfoScreen, AppTeacherItem },
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

.single-container {
    display: grid;
    grid-template-columns: 1fr;
    width: 95%;
    margin: 0 auto;
}

.list-teacher {
    display: grid;
    grid-template-columns: 1fr 3.3fr;

    .line {
        border: 2px solid prop.$main-color;
        background: prop.$main-color;
        justify-self: center;
    }
}

$text-color-main: #111111;
$text-color-additional: #11111180;

.block-footer {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
}

.span-content {
    color: $text-color-main;
    font-weight: 400;
    font-style: normal;
}

.span-additional {
    color: $text-color-additional;
    font-weight: 400;
    font-style: normal;
}

.span-new-line {
    display: block;
}
</style>
