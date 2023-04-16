<template>
  <footer class="footer-container">

    <div id="map" class="map"></div>

    <div class="information">
      <div>
        <span class="fs-24 title">Телефон</span>
        <span class="fs-24 span-new-line content">{{ department.phone }}</span>
      </div>
      <div>
        <span class="fs-24 title">Электронная почта:</span>
        <span class="fs-24 span-new-line content">{{ department.email }}</span>
      </div>
      <div>
        <span class="fs-24 title">Адрес:</span>
        <span class="fs-24 span-new-line content">{{ department.address }}</span>
      </div>
    </div>

  </footer>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  icon: 'TheFooterScreen',
  setup() {
    const store = useStore();

    /* eslint-disable */
    function init() {
      const myMap = new ymaps.Map('map', {
        center: [55.025157, 73.292771],
        zoom: 16,
      });
    }

    ymaps.ready(init);

    return {
      department: computed(() => store.getters['department/getDepartment']),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

@media screen and (min-width: 1500px) {
  .map {
    height: 520px;
  }

}

@media screen and (max-width: 1500px) {
  .map {
    height: 350px;
  }
}

@media screen and (max-width: 1000px) {
  .map {
    display: none;
  }
}

.footer-container {
  background: prop.$main-first-color;
  padding-top: 5rem;
  overflow: hidden;

  display: flex;
  flex-flow: column;


  .information {
    display: flex;
    margin-bottom: 3rem;

    @media only screen and (min-width: 1000px) {
      margin-top: 3rem;
      flex-flow: row;
      justify-content: space-around;
    }

    @media only screen and (max-width: 1000px) {
      flex-flow: column;
      align-items: center;
      text-align: center;
      row-gap: 3rem;
    }

    .span-new-line {
      display: block;
    }

    .title {
      @include utils.fontStyle($weight: 700,
      $color: prop.$main-second-color);
    }

    .content {
      @include utils.fontStyle($color: prop.$main-second-color);
    }
  }


  .map {
    grid-column: 1/4;
    width: 100%;
  }
}
</style>
