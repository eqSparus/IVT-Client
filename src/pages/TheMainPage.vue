<template>
  <the-header-menu :anchors="anchors" logo-anchor="#primary"/>

  <main class="main-container">
    <the-primary-screen :scroll-select="'#about'" id="primary"/>

    <the-about-screen id="about"/>

    <the-directions-screen id="direction"/>

    <the-entrant-screen id="entrant"/>

    <the-teachers-screen id="teachers"/>

    <the-partners-screen id="partners"/>

    <the-review-screen id="reviews"/>

    <the-footer-screen/>
  </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import ThePrimaryScreen from '@/components/views/primary/ThePrimaryScreen.vue';
import TheAboutScreen from '@/components/views/about/TheAboutScreen.vue';
import TheDirectionsScreen from '@/components/views/direction/TheDirectionsScreen.vue';
import TheEntrantScreen from '@/components/views/entrant/TheEntrantScreen.vue';
import TheFooterScreen from '@/components/views/footer/TheFooterScreen.vue';
import TheTeachersScreen from '@/components/views/teacher/TheTeachersScreen.vue';
import ThePartnersScreen from '@/components/views/partner/ThePartnersScreen.vue';
import TheHeaderMenu from '@/components/views/header/TheHeaderMenu.vue';
import TheReviewScreen from '@/components/views/review/TheReviewScreen.vue';

export default defineComponent({
  icon: 'TheMainPage',
  components: {
    TheReviewScreen,
    TheHeaderMenu,
    ThePartnersScreen,
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
        title: 'Партнеры',
        select: '#partners',
      },
      {
        title: 'Отзывы',
        select: '#reviews',
      },
    ];

    return {
      anchors,
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
