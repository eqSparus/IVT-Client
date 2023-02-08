<template>
    <app-block-info-screen title="Абитуриенту" :is-while="true">
        <div class="single-container">
            <app-entrant-item :class="[index === 0 ? '' : 'mt-30']" v-for="(info, index) in entrantInformation"
                :key="info.id" :entrant="info" />
        </div>
    </app-block-info-screen>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { InformationForEntrant } from '@/api/model/ModelTypes';

import AppBlockInfoScreen from '../UI/AppBlockInfoScreen.vue';
import AppEntrantItem from '../UI/items/AppEntrantItem.vue';

export default defineComponent({
  name: 'TheEntrantScreen',
  components: { AppBlockInfoScreen, AppEntrantItem },
  setup() {
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

    return {
      entrantInformation,
    };
  },
});
</script>

<style lang="scss" scoped>
.single-container {
    display: grid;
    grid-template-columns: 1fr;
    width: 95%;
    margin: 0 auto;
}
</style>
