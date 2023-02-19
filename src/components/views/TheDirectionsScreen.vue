<template>
  <app-base-screen title="Направления">
    <the-modal-change-directions
      :directions="information"
      :is-show="isShow"
      @close="changeShowModal"/>
    <div class="directions-screen-container">
      <app-direction-screen-item v-for="(info, index) in information" :key="info.id" :index-drawing="index"
                                 :direction-info="info"/>
    </div>
    <div class="direction-change mt-20" v-if="isAuth">
      <input type="button" class="btn-standard" value="РЕДАКТИРОВАТЬ" @click="changeShowModal"/>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { InformationDirection } from '@/api/model/ModelTypes';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import useShowModal from '@/hooks/useShowModal';
import TheModalChangeDirections from '@/components/UI/modals/TheModalChangeDirections.vue';
import AppBaseScreen from '../UI/AppBaseScreen.vue';
import AppDirectionScreenItem from '../UI/items/AppDirectionScreenItem.vue';

export default defineComponent({
  name: 'TheDirectionsScreen',
  components: {
    TheModalChangeDirections,
    AppBaseScreen,
    AppDirectionScreenItem,
  },
  setup() {
    const store = useStore();
    const {
      isShow,
      changeShowModal,
    } = useShowModal();
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
      // {
      //   id: '4',
      //   title: 'Проектирование отказоустойчивых вычислительных систем',
      //   degree: 'магистр',
      //   formTraining: '2 года',
      //   durationTraining: 'очная',
      // },
    ]);

    return {
      information,
      isShow,
      changeShowModal,
      isAuth: computed(() => store.getters.isAuth),
    };
  },
});
</script>

<style lang="scss" scoped>

.directions-screen-container {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  justify-items: center;
  gap: 5%;
}

.direction-change {
  display: flex;
  justify-content: center;
}

</style>
