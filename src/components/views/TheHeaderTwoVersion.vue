<template>
  <header class="header pt-10">

    <div class="header-container">

      <transition name="header">
        <nav class="header-content" v-show="isShow">

          <img src="@/assets/images/logo.svg" alt="Логотим" />

          <div class="header-menu">
            <div class="header-menu-links">
              <div class="link fs-24 mr-50">О кафедре</div>
              <div class="link fs-24 mr-50">Направления</div>
              <div class="link fs-24 mr-50">Абитуриенту</div>
              <div class="link fs-24 mr-50">Состав кафедры</div>
              <div class="link fs-24">Контакты</div>
            </div>

            <div class="ml-50 mr-50">
              <input type="button" value="ВОЙТИ" class="btn-standard-sm" />
            </div>
          </div>
        </nav>
      </transition>

      <button class="mr-50" @click="changeShow">
        <img :src="svgImg" alt="Иконка стрелки" />
      </button>

    </div>

  </header>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import arrowDownSvg from '@/assets/images/icons/arrow-down.svg';
import arrowUpSvg from '@/assets/images/icons/arrow-up.svg';

export default defineComponent({
  name: 'TheHeader',
  setup() {
    const isShow = ref<boolean>(false);

    const changeShow = () => {
      isShow.value = !isShow.value;
    };

    const svgImg = computed(() => (isShow.value ? arrowUpSvg : arrowDownSvg));

    return {
      svgImg,
      isShow,
      changeShow,
    };
  },
});
</script>

<style lang="scss" scoped>
$background-header-menu-color: #1A1A1A22;
$header-link-color: #ABAAB0;
$header-link-hover-color: #6162FF;
$icon-svg-filter-color: invert(45%) sepia(83%) saturate(4231%) hue-rotate(226deg) brightness(99%) contrast(103%);

.header {
  position: fixed;
  height: 9%;
  width: 100%;
  z-index: 99999;

  .header-container {
    position: absolute;
    width: 100%;
    display: flex;
    flex-flow: column;

    button {
      border: none;
      background: transparent;
      padding: 5px 10px;
      align-self: flex-end;

      img {
        width: auto;
        height: 30px;
      }

      &:hover {
        cursor: pointer;
        filter: $icon-svg-filter-color;
      }
    }

    .header-leave-to,
    .header-enter-from {
      transform: translateY(-60px);
      opacity: 0;
    }

    .header-leave-active,
    .header-enter-active {
      transition: all 0.5s ease-out;
    }

    .header-content {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;

      img {
        align-self: center;
        margin-left: 50px;
        width: 41px;
        height: 41px;
      }

      .header-menu {
        display: flex;
        flex-flow: row;
        align-items: center;

        .header-menu-links {

          background: $background-header-menu-color;
          border-radius: 143px;
          mix-blend-mode: difference;
          padding: 1.4rem 3rem;
          display: flex;
          flex-flow: row;
          justify-content: center;
          align-items: center;

          .link {
            font-weight: 400;
            font-style: normal;
            color: $header-link-color;

            &:hover {
              color: $header-link-hover-color;
              cursor: pointer;
            }
          }
        }
      }

    }
  }

}
</style>
