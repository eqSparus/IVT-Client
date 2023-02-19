<template>
  <header class="header"
          @mouseover="isShow = true"
          @mouseleave="isShow = false"
          @focus="isShow = true"
          @blur="isShow = false">

    <app-modal-window :is-show="isShowModalWindow"
                      @close="changeShowModal"
                      title="Авторизация">

      <div class="modal-container">
        <input class="field-standard mt-10"
               type="email"
               v-model="email"
               placeholder="Введите электроную почту"
               aria-label="Введите электроную почту"/>

        <input class="field-standard mt-10"
               type="password"
               v-model="password"
               placeholder="Введите пароль"
               aria-label="Введите пароль"/>

        <input type="button"
               class="btn-standard mt-20"
               value="ВОЙТИ"
               @click="loginUser"/>
      </div>

    </app-modal-window>

    <transition name="header">

      <nav class="header-content" v-show="isShow">

        <div class="header-logo">
          <img src="@/assets/images/logo.svg" alt="Логотим"/>
        </div>

        <div class="header-menu">

          <div class="header-menu-links">
            <input v-for="(anchor, index) in anchors" :key="anchor.title"
                   type="button"
                   :value="anchor.title"
                   :class="[index !== anchors.length - 1 ? 'link-margin' : '', 'link', 'fs-24']"
                   @click="scrollTo(anchor.select)"/>
          </div>

          <div class="header-menu-button">
            <input type="button"
                   :value="textBtn"
                   class="btn-standard-sm"
                   @click="clickLoginOrLogout"/>
          </div>

        </div>
      </nav>
    </transition>

    <transition name="hint">
      <div class="hint-container" v-show="!isShow">
        <div class="hint-block"/>
      </div>
    </transition>

  </header>
</template>

<script lang="ts">

import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import useScroll from '@/hooks/useScroll';
import useShowModal from '@/hooks/useShowModal';
import useAuthentication from '@/hooks/useAuthentication';
import { useStore } from 'vuex';
import AppModalWindow from '../UI/AppModalWindow.vue';

export type Anchor = {
  title: string,
  select: string
}

export default defineComponent({
  components: { AppModalWindow },
  name: 'TheHeaderScreen',
  props: {
    anchors: {
      type: Object as PropType<Array<Anchor>>,
      required: true,
    },
  },
  setup() {
    const isShow = ref<boolean>(false);
    const { scrollTo } = useScroll();
    const store = useStore();

    const {
      isShow: isShowModalWindow,
      changeShowModal,
    } = useShowModal();

    const {
      email,
      password,
      login,
      logout,
    } = useAuthentication();

    const clickLoginOrLogout = () => {
      if (store.getters.isAuth) {
        logout();
      } else {
        changeShowModal();
      }
    };

    const loginUser = () => {
      login();
      isShowModalWindow.value = false;
    };

    return {
      isShow,
      isShowModalWindow,
      email,
      password,
      textBtn: computed(() => (store.getters.isAuth ? 'ВЫЙТИ' : 'ВОЙТИ')),
      changeShowModal,
      scrollTo,
      loginUser,
      clickLoginOrLogout,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.modal-container {
  display: flex;
  flex-flow: column;
  width: 20vw;
}

.header {
  position: fixed;
  height: 9%;
  width: 100%;
  z-index: 555;

  .header-leave-to,
  .header-enter-from {
    transform: translateY(-60px);
    opacity: 0;
  }

  .header-leave-active,
  .header-enter-active {
    transition: all 0.5s ease-in;
  }

  .hint-leave-to,
  .hint-enter-from {
    transform: translateY(70px);
    opacity: 0;
  }

  .hint-leave-active,
  .hint-enter-active {
    transition: all 0.5s ease-in;
  }

  .hint-container {
    display: flex;
    justify-content: center;

    .hint-block {
      padding: 3px;
      border-radius: 0 0 10px 10px;
      width: 10%;
      background: prop.$header-hint-block-color;
      border: 1px solid prop.$header-hint-block-color;
    }
  }

  .header-content {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    padding-top: 1rem;

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

        background: prop.$header-background-menu-color;
        border-radius: 143px;
        mix-blend-mode: difference;
        padding: 1.4rem 3rem;

        .link {
          @include utils.fontStyle($color: prop.$header-link-color);
          border: none;
          background: transparent;

          &.link-margin {
            margin-right: 5rem;
          }

          &:hover {
            color: prop.$header-link-hover-color;
            cursor: pointer;
          }
        }
      }

      .header-menu-button {
        margin: 0 2.5% 0 2.5%;
      }
    }

  }
}
</style>
