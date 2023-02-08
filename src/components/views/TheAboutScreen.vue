<template>
    <app-block-info-screen title="О кафедре" :is-while="true">
        <div class="about-screen-container">
            <app-about-item v-for="info in aboutInformation" :key="info.id" :info="info" />
        </div>
    </app-block-info-screen>
</template>

<script lang="ts">

import { InformationFaculty } from '@/api/model/ModelTypes';
import { defineComponent, ref } from 'vue';
import AppBlockInfoScreen from '@/components/UI/AppBlockInfoScreen.vue';
import AppAboutItem from '@/components/UI/items/AppAboutItem.vue';

export default defineComponent({
  name: 'TheAboutScreen',
  components: { AppBlockInfoScreen, AppAboutItem },
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

    return {
      aboutInformation,
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
