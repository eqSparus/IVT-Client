<template>
  <app-base-screen title="О кафедре" :is-second="true">

    <the-modal-change-about :info-faculty="information" :is-show="isShow" @close="changeShowModal"/>

    <div class="about-screen-container">
      <app-about-screen-item v-for="(info, index) in information" :key="info.id" :about-info="info"
                             :icon-index="index"/>
      <div class="about-change mt-20" v-if="isAuth">
        <input type="button" class="btn-standard" value="РЕДАКТИРОВАТЬ" @click="changeShowModal"/>
      </div>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { InformationFaculty } from '@/api/model/ModelTypes';
import { computed, defineComponent, ref } from 'vue';
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
import AppAboutScreenItem from '@/components/UI/items/AppAboutScreenItem.vue';
import { useStore } from 'vuex';
import TheModalChangeAbout from '@/components/UI/modals/TheModalChangeAbout.vue';
import useShowModal from '@/hooks/useShowModal';

export default defineComponent({
  name: 'TheAboutScreen',
  components: {
    TheModalChangeAbout,
    AppBaseScreen,
    AppAboutScreenItem,
  },
  setup() {
    const store = useStore();
    const information = ref<Array<InformationFaculty>>([
      {
        id: '1',
        title: 'Выпускники',
        description: 'Наши выпускники получают широкие знания в области разработки программного обеспечения, построения высоконагруженных информационных систем, программирования мобильных устройств',
      },
      {
        id: '2',
        title: 'Профили',
        description: 'Специальность имеет множество профилей обучения, предполагающих специализацию на определенных аспектах информационных систем, технологиях, учет отраслевой специфики',
      },
      {
        id: '3',
        title: 'Профессии',
        description: 'У наших выпускников огромный выбор профессий. Выпускники могут быть программистами, верстальщиками, web-администраторами. Это лишь меньшая часть списка профессий',
      },
    ]);

    const {
      isShow,
      changeShowModal,
    } = useShowModal();

    return {
      information,
      isAuth: computed(() => store.getters.isAuth),
      isShow,
      changeShowModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.about-screen-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;

  .about-change {
    grid-column: 1/4;
  }
}
</style>
