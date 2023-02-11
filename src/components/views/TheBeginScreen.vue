<template>
    <section class="begin-screen">

        <div class="begin-screen-block-left">
            <div>
                <h1 class="fs-64">Информатика<br>и вычислительная техника</h1>

                <!--mt-24-->
                <h3 class="fs-32">Научим программировать твоё будущее</h3>
            </div>

            <!-- mt-48 mt-64 -->
            <div class="begin-screen-button">
                <input type="button" value="УЗНАТЬ БОЛЬШЕ" class="btn-standard" @click="scrollToScreen" />
            </div>

            <div class="begin-screen-links">
                <app-link-icon href="https://vk.com/department_of_computer_science" name="vk" alt="Иконка вк" />
                <app-link-icon href="https://www.omgtu.ru/" name="omgtu" alt="Иконка ОмГТУ" />
            </div>
        </div>

        <div class="begin-screen-block-right">
            <!-- Cкоректировать размеры, подумать над заменой на <svg> -->
            <img src="@/assets/images/logo.svg" alt="Логотип" />
        </div>

    </section>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AppLinkIcon from '@/components/UI/AppLinkIcon.vue';
import useScroll from '@/hooks/useScroll';

export default defineComponent({
  components: { AppLinkIcon },
  name: 'TheBeginScreen',
  props: {
    scrollSelect: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { scrollTo } = useScroll();
    const scrollToScreen = () => {
      scrollTo(props.scrollSelect);
    };

    return {
      scrollToScreen,
    };
  },
});
</script>

<style lang="scss" scoped>

$background-color: #111111;
$title-color: #FFFFFF;
$description-color: #ABAAB0;

@media screen and (max-width: 1920px) {
    img {
        width: 455px;
    }

}

@media screen and (max-width: 1500px) {
    img {
        width: 300px;
    }
}

@media screen and (max-width: 1200px) {
    img {
        width: 250px;
    }
}

.begin-screen {
    background: $background-color;
    width: 100vw;
    height: 100%;
    padding: 15% 10%;

    // display: grid;
    // grid-template-columns: 1.5fr 1fr;
    display: flex;
    flex: row;
    justify-content: space-between;

    .begin-screen-block-left {
        align-self: flex-end;

        .begin-screen-button {
            // margin-top: 5%;
            margin-top: 7%;
        }

        .begin-screen-links {
            // margin-top: 7%;
            margin-top: 9%;

            a {
                margin-right: 2rem;
            }
        }

        h1 {
            line-height: 99%;
            color: $title-color;
            font-weight: bold;
            font-style: normal;
            user-select: none;
        }

        h3 {
            color: $description-color;
            font-weight: 300;
            font-style: normal;
            user-select: none;
            // margin-top: 2.5%;
            margin-top: 3.5%;
        }
    }

    .begin-screen-block-right {
        // justify-self: flex-end;
        align-self: center;

        img {
            height: auto;
        }
    }

}
</style>
