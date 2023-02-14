<template>
  <div>

    <the-header-screen :anchors="anchors" @click-entry="showEntryModal"/>

    <main class="main-container">
      <the-begin-screen :scroll-select="'#about'" />

      <the-about-screen id="about" />

      <the-directions-screen id="direction" />

      <the-entrant-screen id="entrant" />

      <the-teachers-screen id="teachers" />

      <the-footer-screen id="contact" />
    </main>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import TheHeaderScreen from '@/components/views/TheHeaderScreen.vue';
import TheBeginScreen from '@/components/views/TheBeginScreen.vue';
import TheAboutScreen from '@/components/views/TheAboutScreen.vue';
import TheDirectionsScreen from '@/components/views/TheDirectionsScreen.vue';
import TheEntrantScreen from '@/components/views/TheEntrantScreen.vue';
import TheFooterScreen from '@/components/views/TheFooterScreen.vue';
import TheTeachersScreen from '@/components/views/TheTeachersScreen.vue';

export default defineComponent({
  name: 'TheMainPage',
  components: {
    TheHeaderScreen,
    TheBeginScreen,
    TheAboutScreen,
    TheDirectionsScreen,
    TheEntrantScreen,
    TheTeachersScreen,
    TheFooterScreen,
  },
  setup() {
    const anchors = [
      { title: 'О кафедре', select: '#about' },
      { title: 'Направления', select: '#direction' },
      { title: 'Абитуриенту', select: '#entrant' },
      { title: 'Состав кафедры', select: '#teachers' },
      { title: 'Контакты', select: '#contact' },
    ];

    const showEntryModal = () => {
      console.log('Вход');
    };

    return {
      anchors,
      showEntryModal,
    };
  },
});
</script>

<style lang="scss">

.main-container {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
