<template>
  <main class="main-container">

    <the-begin-screen />

    <app-block-info-screen title="О кафедре" :is-while="true">
      <div class="triple-container">
        <app-about-item v-for="info in aboutInformation" :key="info.id" :info="info" />
      </div>
    </app-block-info-screen>

    <app-block-info-screen title="Направления">
      <div class="triple-container">
        <app-direction-item v-for="(info, index) in information" :key="info.id" :index-drawing="index" :info="info" />
      </div>
    </app-block-info-screen>

    <app-block-info-screen title="Абитуриенту" :is-while="true">
      <div class="single-container">
        <app-entrant-item :class="[index === 0 ? '' : 'mt-30']" v-for="(info, index) in entrantInformation"
          :key="info.id" :entrant="info" />
      </div>
    </app-block-info-screen>

    <app-block-info-screen title="Состав Кафедры">
      <div class="single-container">
        <app-teacher-item :teacher="teacherMain" :is-main="true" />

        <div class="list-teacher" v-for="(teacher, index) in teachers" :key="teacher.id">
          <div class="line" :style="[index === teachers.length - 1 ? 'height: 65%' : '']">
          </div>
          <app-teacher-item class="mt-40" :teacher="teacher" />
        </div>
      </div>

    </app-block-info-screen>

    <the-footer />
  </main>
</template>

<script lang="ts">
import AppBlockInfoScreen from '@/components/AppBlockInfoScreen.vue';
import TheBeginScreen from '@/components/TheBeginScreen.vue';
import AppAboutItem from '@/components/UI/AppAboutItem.vue';
import AppDirectionItem from '@/components/UI/AppDirectionItem.vue';
import AppEntrantItem from '@/components/UI/AppEntrantItem.vue';
import AppTeacherItem from '@/components/UI/AppTeacherItem.vue';
import TheFooter from '@/components/TheFooter.vue';
import { defineComponent, ref } from 'vue';
import {
  InformationDirection, InformationFaculty, InformationForEntrant, Teacher,
} from '@/api/model/ModelTypes';

import teacher1 from '@/assets/images/teachers/1.png';
import teacher2 from '@/assets/images/teachers/2.png';
import teacher3 from '@/assets/images/teachers/3.png';
import teacher4 from '@/assets/images/teachers/4.png';

export default defineComponent({
  components: {
    TheBeginScreen, AppBlockInfoScreen, AppAboutItem, AppDirectionItem, AppEntrantItem, AppTeacherItem, TheFooter,
  },
  name: 'TheMainView',
  setup() {
    const aboutInformation = ref<Array<InformationFaculty>>([
      {
        id: '1',
        icon: 'human',
        title: 'Выпускники',
        description: 'Наши выпускники получают широкие знания в области разработки программного обеспечения, построения высоконагруженных информационных систем, программирования мобильных устройств',
      },
      {
        id: '2',
        icon: 'book',
        title: 'Профили',
        description: 'Специальность имеет множество профилей обучения, предполагающих специализацию на определенных аспектах информационных систем, технологиях, учет отраслевой специфики',
      },
      {
        id: '3',
        icon: 'suitcase',
        title: 'Профессии',
        description: 'У наших выпускников огромный выбор профессий. Выпускники могут быть программистами, верстальщиками, web-администраторами. Это лишь меньшая часть списка профессий',
      },
    ]);

    const information = ref<Array<InformationDirection>>([
      {
        id: '1',
        title: 'Вычислительные машины, комплексы и системы связи',
        degree: 'бакалавр',
        formTraining: '4 года',
        durationTraining: 'очная',
      },
      {
        id: '2',
        title: 'Технологии разработки программного обеспечения',
        degree: 'бакалавр',
        formTraining: '4 года',
        durationTraining: 'очная',
      },
      {
        id: '3',
        title: 'Проектирование отказоустойчивых вычислительных систем',
        degree: 'магистр',
        formTraining: '2 года',
        durationTraining: 'очная',
      },
    ]);

    const entrantInformation = ref<Array<InformationForEntrant>>([
      {
        id: '1',
        title: 'Бакалавриат',
        items: [
          {
            id: '1',
            title: '09.03.01 - "Информатика и вычислительная техника" на 2023/2024 учебный год определена квота в 85 бюджетных места.',
            descriptions: [
              'Вычислительные машины, комплексы, системы и сети - 30 бюджетных мест',
              'Технологии разработки программного обеспечения - 30 бюджетных мест',
              'Автоматизированные системы обработки информации и управления - 25 бюджетных мест',
            ],
          },
          {
            id: '2',
            title: 'На направлении присутствуют места для студентов с возможностью оплаты обучения:',
            descriptions: [
              '5 мест очной формы обучения',
              '100 мест заочной формы обучения',
            ],
          },
          {
            id: '3',
            title: 'Обязательные предметы для поступления:',
            descriptions: [
              'Математика',
              'Русский язык',
            ],
          },
          {
            id: '4',
            title: 'Предметы по выбору абитуриента в порядке приоритета:',
            descriptions: [
              'Информатика и информационно-коммуникационные технологии',
              'Физика',
              'Химия',
              'Иностранный язык',
            ],
          },
        ],
      },
      {
        id: '2',
        title: 'Магистратура',
        items: [
          {
            id: '5',
            title: '09.04.01 - "Информатика и вычислительная техника" на 2023/2024 учебный год определена квота в 40 бюджетных мест. Ведётся набор по трём профилям подготовки магистров (цифры распределения по профилям - примерные):',
            descriptions: [
              'Применение искусственного интеллекта в энергетике - 14 бюджетных мест',
              'Информационное и программное обеспечение автоматизированных систем - 13 бюджетных мест',
              'Безопасность и этика искусственного интеллекта - 13 бюджетных мест',
            ],
          },
          {
            id: '6',
            title: 'На направлении присутствуют места для студентов с возможностью оплаты обучения:',
            descriptions: [
              '10 мест очной формы обучения',
              '50 мест заочной формы обучения',
            ],
          },
          {
            id: '7',
            title: 'Абитуриент должен направить следующие документы:',
            descriptions: [
              'Заявление о приеме в вуз',
              'Документ государственного образца об высшем образовании и два экземпляра его копий',
              '2 фотографии размером 3х4 см и предъявить документ, удостоверяющий личность (паспорт, удостоверение личности)',
            ],
          },
        ],
      },
    ]);

    const teacherMain = ref<Teacher>(
      {
        id: '1',
        firstName: 'Александр',
        middleName: 'Сергеевич',
        lastName: 'Грицай',
        post: 'Заведующий кафедры',
        scientificDegree: 'Кандидат технических наук, доцент',
        email: 'ivt@omgtu.ru',
        phone: '(3812) 652208, 653314',
        address: '644050, г.Омск-50 пр.Мира 11, корпус 8, каб.321',
        image: teacher1,
        links: [
          {
            id: '1',
            logo: 'vk',
            link: '#',
          },
          {
            id: '2',
            logo: 'facebook',
            link: '#',
          },
          {
            id: '3',
            logo: 'twitter',
            link: '#',
          },
        ],
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
        email: 'ivt@omgtu.ru',
        phone: '(3812) 652208, 653314',
        address: '644050, г.Омск-50 пр.Мира 11, корпус 8, каб.321',
        image: teacher2,
        links: [],
      },
      {
        id: '3',
        firstName: 'Ольга',
        middleName: 'Павловна',
        lastName: 'Шафеева',
        post: 'Заместитель заведующего кафедрой',
        scientificDegree: 'Доцент, кандидат технических наук',
        email: 'ivt@omgtu.ru',
        phone: '(3812) 652208, 653314',
        address: '644050, г.Омск-50 пр.Мира 11, корпус 8, каб.321',
        image: teacher3,
        links: [],
      },
      {
        id: '4',
        firstName: 'Марина',
        middleName: 'Спартаковна',
        lastName: 'Дорошенко',
        post: '',
        scientificDegree: 'Старший преподаватель',
        email: 'ivt@omgtu.ru',
        phone: '(3812) 652208, 653314',
        address: '644050, г.Омск-50 пр.Мира 11, корпус 8, каб.321',
        image: teacher4,
        links: [],
      },
    ]);

    return {
      aboutInformation,
      information,
      entrantInformation,
      teacherMain,
      teachers,
    };
  },
});
</script>

<style lang="scss">
@use '@/assets/scss/properties.scss' as prop;

.main-container {
  display: grid;
  grid-template-columns: 1fr;
}

.triple-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
}

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
</style>
