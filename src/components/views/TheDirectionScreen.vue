<template>
    <app-block-info-screen title="Направления">
        <div class="triple-container">
            <app-direction-item v-for="(info, index) in information" :key="info.id" :index-drawing="index"
                :info="info" />
        </div>
    </app-block-info-screen>
</template>

<script lang="ts">

import { InformationDirection } from '@/api/model/ModelTypes';
import { defineComponent, ref } from 'vue';
import AppBlockInfoScreen from '../UI/AppBlockInfoScreen.vue';
import AppDirectionItem from '../UI/items/AppDirectionItem.vue';

export default defineComponent({
  name: 'TheDirectionScreen',
  components: { AppBlockInfoScreen, AppDirectionItem },
  setup() {
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

    return {
      information,
    };
  },
});
</script>

<style lang="scss" scoped>

.triple-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
}

</style>
