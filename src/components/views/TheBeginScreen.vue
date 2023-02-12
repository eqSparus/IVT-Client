<template>
    <section class="begin-screen">

        <app-modal-window :isShow="isShow" title="Редактировать информацию о кафедре" @close="changeShowModal">

            <div class="begin-edit-container">
                <input type="text" placeholder="Введите название кафедры" class="field-standard"
                    aria-label="Введите название кафедры" />

                <input type="text" placeholder="Введите девиз кафедры" class="field-standard mt-10"
                    aria-label="Введите девиз кафедры" />

                <div class="edit-block mt-10">

                    <input type="phone" placeholder="Введите телефон кафедры" class="field-standard"
                        aria-label="Введите телефон кафедры" />

                    <input type="email" placeholder="Введите почту кафедры" class="field-standard"
                        aria-label="Введите почту кафедры" />

                </div>

                <input type="text" placeholder="Введите адрес кафедры" class="field-standard mt-10"
                    aria-label="Введите адрес кафедры" />

                <app-department-link-item class="mt-10" />
                <app-department-link-item class="mt-10" />

                <div class="edit-block mt-20">
                    <input type="button" value="ДОБАВИТЬ ССЫЛКУ" class="btn-standard" />
                    <input type="button" value="ОБНОВИТЬ" class="btn-standard" />
                </div>
            </div>

            <template #footer>
                <div class="footer-container">
                    <div class="block-end">
                        <input type="button" value="ЗАКРЫТЬ" class="btn-warning" @click="changeShowModal" />
                    </div>
                </div>
            </template>

        </app-modal-window>

        <div class="begin-screen-block-left">
            <div>
                <h1 class="fs-64">Информатика<br>и вычислительная техника</h1>

                <!--mt-24-->
                <h3 class="fs-32">Научим программировать твоё будущее</h3>
            </div>

            <!-- mt-48 mt-64 -->
            <div class="begin-screen-button">
                <input type="button" value="УЗНАТЬ БОЛЬШЕ" class="btn-standard" @click="scrollToScreen" />
                <input v-if="isAuth" type="button" value="РЕДАКТИРОВАТЬ" class="btn-standard" @click="changeShowModal" />
            </div>

            <div class="begin-screen-links">
                <app-link-icon href="https://vk.com/department_of_computer_science" name="vk" alt="Иконка вк" />
                <app-link-icon href="https://www.omgtu.ru/" name="omgtu" alt="Иконка ОмГТУ" />
            </div>
        </div>

        <div class="begin-screen-block-right">
            <!-- Cкоректировать размеры, подумать над заменой на <svg> -->
            <img src="@/assets/images/logo.svg" alt="Большой логотип кафедры" />
        </div>

    </section>
</template>

<script lang="ts">

import {
  computed, defineComponent, ref,
} from 'vue';
import AppLinkIcon from '@/components/UI/AppLinkIcon.vue';
import useScroll from '@/hooks/useScroll';
import { useStore } from 'vuex';
import useShowModal from '@/hooks/useShowModal';
import AppModalWindow from '../UI/AppModalWindow.vue';
import AppDepartmentLinkItem from '../UI/items/AppDepartmentLinkItem.vue';

export default defineComponent({
  components: { AppLinkIcon, AppModalWindow, AppDepartmentLinkItem },
  name: 'TheBeginScreen',
  props: {
    scrollSelect: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { scrollTo } = useScroll();

    const { isShow, changeShowModal } = useShowModal();

    const scrollToScreen = () => {
      scrollTo(props.scrollSelect);
    };

    return {
      isAuth: computed(() => store.getters.isAuth),
      isShow,
      scrollToScreen,
      changeShowModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.begin-edit-container {
    display: flex;
    flex-flow: column;
    width: 50vw;

    .edit-block {
        display: flex;
        flex-flow: row;
        gap: 10px;

        input {
            flex: 1;
        }
    }
}

.footer-container {
    display: flex;
    flex-flow: column;

    .block-end {
        align-self: flex-end;
    }
}

.begin-screen {
    background: prop.$begin-screen-background-color;
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

            input {
                margin-right: 2rem;
            }
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
            @include utils.fontStyle($color: prop.$begin-screen-title-color,
                $weight: 700);
            user-select: none;
        }

        h3 {
            @include utils.fontStyle($weight: 300,
                $color: prop.$begin-screen-description-color);
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

            @media screen and (max-width: 1920px) {
                & {
                    width: 455px;
                }

            }

            @media screen and (max-width: 1500px) {
                & {
                    width: 300px;
                }
            }

            @media screen and (max-width: 1200px) {
                & {
                    width: 250px;
                }
            }
        }
    }

}
</style>
