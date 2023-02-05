<template>
    <section class="begin-screen">

        <div class="begin-screen-title">
            <div>
                <h1 class="fs-64">Информатика<br>и вычислительная техника</h1>

                <h3 class="fs-32 mt-24">Научим программировать твоё будущее</h3>
            </div>

            <input type="button" value="УЗНАТЬ БОЛЬШЕ" class="btn-standard mt-48" />

            <div class="mt-64">
                <app-link-icon href="https://vk.com/department_of_computer_science" name="vk" alt="Иконка вк"/>
                <app-link-icon class="ml-20" href="https://www.omgtu.ru/" name="omgtu" alt="Иконка ОмГТУ"/>
            </div>
        </div>

        <div class="begin-screen-logo">
            <!-- Cкоректировать размеры, подумать над заменой на <svg> -->
            <img src="@/assets/images/logo.svg" alt="Логотип" />
        </div>

    </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AppLinkIcon from './UI/AppLinkIcon.vue';

export default defineComponent({
  components: { AppLinkIcon },
  name: 'TheBeginScreen',
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

@media screen and (min-width: 1500px) {
  img {
    width: 455px;
  }

}

@media screen and (max-width: 1500px) {
  img {
    width: 300px;
  }
}

.begin-screen {
    background: prop.$background-black-color;
    width: 100vw;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    padding: 15% 10%;

    .begin-screen-title {
        // justify-self: center;
        // align-self: center;
        margin-top: 12%;

        h1 {
            line-height: 99%;
            color: prop.$title-text-while-color;
            font-weight: bold;
            font-style: normal;
            user-select: none;
        }

        h3 {
            color: prop.$title-description-text-color;
            font-weight: 300;
            font-style: normal;
            user-select: none;
        }
    }

    .begin-screen-logo {
        justify-self: flex-end;
        align-self: center;

        img {
            height: auto;
        }
    }

}
</style>
