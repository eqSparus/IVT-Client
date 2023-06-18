<template>
  <footer class="footer-container">

    <div id="map" class="map">
    </div>
    <div class="line"/>

    <div class="contact-information-container">
      <div class="contact-item">
        <span class="fs-24 title">Телефон</span>
        <span class="fs-24 content">{{ department.phone }}</span>
      </div>
      <div class="contact-item">
        <span class="fs-24 title">Электронная почта:</span>
        <span class="fs-24 content">{{ department.email }}</span>
      </div>
      <div class="contact-item">
        <span class="fs-24 title">Адрес:</span>
        <span class="fs-24 content">{{ department.address }}</span>
      </div>
    </div>

  </footer>
</template>

<script lang="ts">

import { computed, defineComponent, onMounted } from 'vue';
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

    onMounted(() => {
      try {
        ymaps.ready(init);
      } catch (e) {
        const map = document.querySelector('#map');
        if (map) {
          (map as HTMLElement).style.height = '0';
        }
        console.log('Ошибка карты');
      }
    });

    return {
      department: computed(() => store.getters['department/getDepartment']),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';

.footer-container {
  background: prop.$main-first-color;
  overflow: hidden;
  display: flex;
  flex-flow: column;


  .contact-information-container {
    display: flex;
    margin-bottom: 3rem;
    margin-top: 3rem;
    flex-flow: row;
    justify-content: space-around;

    .contact-item {
      display: flex;
      flex-flow: column;
    }

    .title {
      @include utils.font-style($weight: 700,
      $color: prop.$main-second-color);
    }

    .content {
      @include utils.font-style($color: prop.$main-second-color);
    }
  }

  .map {
    grid-column: 1/4;
    width: 100%;
    height: 52rem;
  }

  .line {
    display: none;
  }

  @include utils.phone-style {

    .contact-information-container {
      flex-flow: column;
      align-items: center;
      text-align: center;
      row-gap: 3rem;
      margin-top: 0;
    }

    .map {
      display: none;
    }

    .line {
      border: 0.05rem solid prop.$main-second-color;
      background: prop.$main-second-color;
      display: block;
      margin: 0 auto 4rem auto;
      opacity: 50%;
      width: 80%;
    }
  }
}
</style>
