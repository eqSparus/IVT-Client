<template>
    <app-base-screen title="Направления">
        <div class="directions-screen-container">
            <app-direction-screen-item v-for="(info, index) in information" :key="info.id" :index-drawing="index"
                :direction-info="info" />
        </div>
    </app-base-screen>
</template>

<script lang="ts">

import { InformationDirection } from '@/api/model/ModelTypes';
import { defineComponent, ref } from 'vue';
import AppBaseScreen from '../UI/AppBaseScreen.vue';
import AppDirectionScreenItem from '../UI/items/AppDirectionScreenItem.vue';

export default defineComponent({
  name: 'TheDirectionsScreen',
  components: { AppBaseScreen, AppDirectionScreenItem },
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

.directions-screen-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
}

</style>
