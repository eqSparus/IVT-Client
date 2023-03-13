<template>
  <header class="header"
          @mouseover="isShowMenu = true"
          @mouseleave="isShowMenu = false"
          @focus="isShowMenu = true"
          @blur="isShowMenu = false">

    <the-modal-authorization :is-show="isShowModalWindow"
                             @close="changeShowModal"/>

    <transition name="header">

      <nav class="header-content" v-show="isShowMenu">

        <div class="header-logo">
          <img src="@/assets/images/logo.svg" alt="Логотип"/>
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
                   :class="textBtn === 'выйти'? 'btn-warning-sm': 'btn-standard-sm'"
                   @click="clickLoginOrLogout"/>
          </div>

        </div>
      </nav>
    </transition>

    <transition name="hint">
      <div class="hint-container" v-show="!isShowMenu">
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
import { useStore } from 'vuex';
import TheModalAuthorization from '@/components/modals/user/TheModalAuthorization.vue';
import { exit } from '@/api/user/AuthUserApi';

export type Anchor = {
  title: string,
  select: string
}

export default defineComponent({
  components: {
    TheModalAuthorization,
  },
  icon: 'TheHeaderScreen',
  props: {
    anchors: {
      type: Object as PropType<Array<Anchor>>,
      required: true,
    },
  },
  setup() {
    const isShowMenu = ref<boolean>(false);
    const { scrollTo } = useScroll();
    const store = useStore();

    const {
      isShow: isShowModalWindow,
      changeShowModal,
    } = useShowModal();

    const clickLoginOrLogout = async () => {
      if (store.getters['auth/isAuth']) {
        try {
          await exit(store.getters['auth/getRefreshToken']);
          store.commit('auth/removeTokens');
        } catch (e) {
          store.commit('auth/removeTokens');
        }
      } else {
        changeShowModal();
      }
    };

    return {
      isShowMenu,
      isShowModalWindow,
      textBtn: computed(() => (store.getters['auth/isAuth'] ? 'выйти' : 'войти')),
      changeShowModal,
      scrollTo,
      clickLoginOrLogout,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

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
