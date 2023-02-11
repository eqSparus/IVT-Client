<template>
  <header class="header" @mouseover="showMenu" @mouseleave="notShowMenu" @focus="showMenu" @blur="notShowMenu">
    <transition name="header">

      <nav class="header-content" v-show="isShow">

        <div class="header-logo">
          <img src="@/assets/images/logo.svg" alt="Логотим" />
        </div>

        <div class="header-menu">

          <div class="header-menu-links">
            <input v-for="(anchor, index) in anchors" :key="anchor.title" type="button" :value="anchor.title"
              :class="[index !== anchors.length - 1 ? 'link-margin' : '', 'link', 'fs-24']"
              @click="scrollTo(anchor.select)" />
          </div>

          <div class="header-menu-button">
            <input type="button" value="ВОЙТИ" class="btn-standard-sm" @click="$emit('click-entry')" />
          </div>

        </div>
      </nav>
    </transition>
  </header>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import useScroll from '@/hooks/useScroll';

export type Anchor = {
  title: string,
  select: string
}

export default defineComponent({
  name: 'TheHeaderScreen',
  props: {
    anchors: {
      type: Object as PropType<Array<Anchor>>,
      required: true,
    },
  },
  setup() {
    const isShow = ref<boolean>(false);

    const showMenu = () => {
      isShow.value = true;
    };

    const notShowMenu = () => {
      isShow.value = false;
    };

    const { scrollTo } = useScroll();

    return {
      isShow,
      showMenu,
      notShowMenu,
      scrollTo,
    };
  },
});
</script>

<style lang="scss" scoped>
$background-header-menu-color: #1A1A1A22;
$header-link-color: #ABAAB0;
$header-link-hover-color: #6162FF;

.header {
  position: fixed;
  height: 9%;
  width: 100%;
  z-index: 99999;
  padding-top: 1rem;

  .header-leave-to,
  .header-enter-from {
    transform: translateY(-60px);
    opacity: 0;
  }

  .header-leave-active,
  .header-enter-active {
    transition: all 0.5s ease-in;
  }

  .header-content {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    position: absolute;
    width: 100%;

    .header-logo {
      align-self: center;
      margin-left: 2.5%;

      img {
        width: 41px;
        height: 41px;
      }
    }

    .header-menu {

      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-end;
      width: 100%;

      .header-menu-links {

        background: $background-header-menu-color;
        border-radius: 143px;
        mix-blend-mode: difference;
        padding: 1.4rem 3rem;

        .link {
          font-weight: 400;
          font-style: normal;
          color: $header-link-color;
          border: none;
          text-decoration: none;
          background: transparent;

          &.link-margin{
            margin-right: 5rem;
          }

          &:hover {
            color: $header-link-hover-color;
            cursor: pointer;
          }
        }
      }

      .header-menu-button{
        margin: 0 2.5% 0 2.5%;
      }
    }

  }
}
</style>
