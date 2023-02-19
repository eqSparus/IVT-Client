<template>
    <footer class="footer-container">

<!--        <div id="map" class="map"></div>-->

        <div class="information">
            <div>
                <span class="fs-24 title">Телефон</span>
                <span class="fs-24 span-new-line content">+7 (3812) 72-90-55</span>
            </div>
            <div>
                <span class="fs-24 title">Электронная почта:</span>
                <span class="fs-24 span-new-line content">ivt@omgtu.ru</span>
            </div>
            <div>
                <span class="fs-24 title">Адрес:</span>
                <span class="fs-24 span-new-line content">Пр. Мира, 11 гл. корпус, каб. П-102</span>
            </div>
        </div>

    </footer>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheFooterScreen',
  setup() {
    // TODO Вернуть карту
    /* eslint-disable */
        // function init() {
        //     const myMap = new ymaps.Map('map', {
        //         center: [55.025157, 73.292771],
        //         zoom: 16,
        //     });
        // }
        // ymaps.ready(init);
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

.footer-container {
    background: prop.$footer-background-color;
    padding-top: 5rem;
    overflow: hidden;

    display: flex;
    flex-flow: column;


    .information {

        display: flex;
        flex-flow: row;
        justify-content: space-around;
        margin-top: 2.5%;
        margin-bottom: 1.5%;

        .span-new-line {
            display: block;
        }

        .title {
            @include utils.fontStyle($weight: 700,
                $color: prop.$footer-text-color);
        }

        .content {
            @include utils.fontStyle($color: prop.$footer-text-color);
        }
    }


    .map {
        grid-column: 1/4;
        width: 100%;
    }
}
</style>
