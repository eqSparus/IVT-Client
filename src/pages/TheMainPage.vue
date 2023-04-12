<template>
  <div>

    <the-header-menu class="desktop-menu" :anchors="anchors"/>
    <the-phone-header-menu class="phone-menu" :anchors="anchors"/>

    <main class="main-container">
      <the-primary-screen :scroll-select="'#about'"/>

      <the-about-screen id="about"/>

      <the-directions-screen id="direction"/>

      <the-entrant-screen id="entrant"/>

      <the-teachers-screen id="teachers"/>

      <the-partners-screen/>

      <the-footer-screen id="contact"/>
    </main>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import TheHeaderMenu from '@/components/views/header/TheHeaderMenu.vue';
import ThePrimaryScreen from '@/components/views/primary/ThePrimaryScreen.vue';
import TheAboutScreen from '@/components/views/about/TheAboutScreen.vue';
import TheDirectionsScreen from '@/components/views/direction/TheDirectionsScreen.vue';
import TheEntrantScreen from '@/components/views/entrant/TheEntrantScreen.vue';
import TheFooterScreen from '@/components/views/footer/TheFooterScreen.vue';
import TheTeachersScreen from '@/components/views/teacher/TheTeachersScreen.vue';
import ThePartnersScreen from '@/components/views/partner/ThePartnersScreen.vue';
import ThePhoneHeaderMenu from '@/components/views/header/ThePhoneHeaderMenu.vue';

export default defineComponent({
  icon: 'TheMainPage',
  components: {
    ThePhoneHeaderMenu,
    ThePartnersScreen,
    TheHeaderMenu,
    ThePrimaryScreen,
    TheAboutScreen,
    TheDirectionsScreen,
    TheEntrantScreen,
    TheTeachersScreen,
    TheFooterScreen,
  },
  setup() {
    const anchors = [
      {
        title: 'О кафедре',
        select: '#about',
      },
      {
        title: 'Направления',
        select: '#direction',
      },
      {
        title: 'Абитуриенту',
        select: '#entrant',
      },
      {
        title: 'Состав кафедры',
        select: '#teachers',
      },
      {
        title: 'Контакты',
        select: '#contact',
      },
    ];

    return {
      anchors,
    };
  },
});
</script>

<style lang="scss">

.desktop-menu {

  @media only screen  and (max-width: 1081px){
    display: none;
  }
}

.phone-menu {
  @media only screen  and (min-width: 1081px){
    display: none;
  }
}

.main-container {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
