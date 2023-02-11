<template>
    <app-base-screen title="О кафедре" :is-second="true">
        <div class="about-screen-container">
            <app-about-screen-item v-for="(info, index) in information" :key="info.id" :about-info="info" :icon-index="index" />
        </div>
    </app-base-screen>
</template>

<script lang="ts">

import { InformationFaculty } from '@/api/model/ModelTypes';
import { defineComponent, ref } from 'vue';
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
import AppAboutScreenItem from '@/components/UI/items/AppAboutScreenItem.vue';

export default defineComponent({
  name: 'TheAboutScreen',
  components: { AppBaseScreen, AppAboutScreenItem },
  setup() {
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

    return {
      information,
    };
  },
});
</script>

<style lang="scss" scoped>
.about-screen-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
}
</style>
