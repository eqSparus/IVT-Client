<template>
    <div class="footer-container">

        <div id="map" class="map"></div>

        <div class="finish-info mt-50 mb-30">
            <div>
                <span class="fs-24 span-title">Телефон</span>
                <span class="fs-24 span-new-line span-content">+7 (3812) 72-90-55</span>
            </div>
            <div>
                <span class="fs-24 span-title">Электронная почта:</span>
                <span class="fs-24 span-new-line span-content">ivt@omgtu.ru</span>
            </div>
            <div>
                <span class="fs-24 span-title">Адрес:</span>
                <span class="fs-24 span-new-line span-content">Пр. Мира, 11 гл. корпус, каб. П-102</span>
            </div>
        </div>

    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheFooter',
  setup() {
    /* eslint-disable */
        function init() {
            const myMap = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 7,
            });
        }
        ymaps.ready(init);
    },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

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

.footer-container {
    background: prop.$background-black-color;
    padding-top: 5rem;
    overflow: hidden;

    display: flex;
    flex-flow: column;


    .finish-info {

        display: flex;
        flex-flow: row;
        justify-content: space-around;

        .span-new-line {
            display: block;
        }

        span {
            color: prop.$title-text-while-color;
        }

        .span-title {
            font-weight: 700;
            font-style: normal;
        }

        .span-content {
            font-weight: 400;
            font-style: normal;
        }
    }


    .map {
        grid-column: 1/4;
        width: 100%;
    }
}
</style>
