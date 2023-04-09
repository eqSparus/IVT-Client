<template>
  <header class="header"
          @mouseover="isShowMenu = true"
          @mouseleave="isShowMenu = isPhone"
          @focus="isShowMenu = true"
          @blur="isShowMenu = isPhone">

    <the-modal-authorization :is-show="isShowModalWindow"
                             @close="changeShowModal"/>

    <transition name="header">

      <div class="header-content" v-show="isShowMenu">

        <div class="header-logo">
          <img src="" alt="assets/images/logo.svg"/>
        </div>

        <label class="btn-transparent-icon btn-phone" for="show-menu">
          <img :src="menuIcon" class="mr-20" alt="assets/images/menu.svg">
        </label>
        <input type="checkbox" id="show-menu" style="display: none">

        <nav class="header-menu">

          <ul class="header-menu-links">
            <li v-for="(anchor, index) in anchors" :key="anchor.title"
                :class="{'link-margin': index !== anchors.length - 1, 'link': true, 'fs-24': true}"
                @click="scrollTo(anchor.select)"
                @keyup.enter="scrollTo(anchor.select)">
              {{ anchor.title }}
            </li>
          </ul>

          <div class="header-menu-button">
            <input type="button"
                   :value="textBtn"
                   :class="textBtn === 'выйти'? 'btn-warning-sm': 'btn-standard-sm'"
                   @click="eventLoginOrLogout"/>
          </div>

        </nav>
      </div>
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
import TheModalAuthorization from '@/components/views/header/modal/TheModalAuthorization.vue';
import { requestExit } from '@/api/user/AuthUserApi';
import menuIcon from '@/assets/images/icons/menu.svg';

export type Anchor = {
  title: string,
  select: string
}

export default defineComponent({
  components: {
    TheModalAuthorization,
  },
  icon: 'TheHeaderMenu',
  props: {
    anchors: {
      type: Object as PropType<Array<Anchor>>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const isPhone = window.screen.width < 1100;
    const isShowMenu = ref<boolean>(isPhone);
    const { scrollTo } = useScroll();

    const {
      isShow: isShowModalWindow,
      changeShowModal,
    } = useShowModal();

    const eventLoginOrLogout = async () => {
      if (store.getters['auth/isAuth']) {
        try {
          await requestExit();
          store.commit('auth/removeAccessToken');
        } catch (e) {
          store.commit('auth/removeAccessToken');
        }
      } else {
        changeShowModal();
      }
    };

    return {
      isShowMenu,
      isShowModalWindow,
      isPhone,
      changeShowModal,
      scrollTo,
      eventLoginOrLogout,
      textBtn: computed(() => (store.getters['auth/isAuth'] ? 'выйти' : 'войти')),
      menuIcon,
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
    transform: translateY(7rem);
    opacity: 0;
  }

  .hint-leave-active,
  .hint-enter-active {
    transition: all 0.5s ease-in;
  }

  .hint-container {
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 1080px) {
      display: none;
    }

    .hint-block {
      padding: 0.3rem;
      border-radius: 0 0 1rem 1rem;
      width: 10%;
      background: prop.$primary-color;
      border: 0.1rem solid prop.$primary-color;
    }
  }

  .header-content {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    padding-top: 1rem;

    .btn-phone {
      @media only screen and (min-width: 1080px) {
        display: none;
      }

      @media only screen and (max-width: 1080px) {
        display: contents;

        img {
          width: 4rem;
          height: 4rem;
        }
      }
    }

    .header-logo {
      align-self: center;

      img {
        height: 4rem;
      }

      @media only screen and (min-width: 1080px) {
        margin-left: 6rem;

        img {
          width: 4rem;
          content: url("@/assets/images/logo.svg");
        }
      }

      @media only screen and (max-width: 1080px) {
        margin-left: 3rem;

        img {
          width: auto;
          content: url("@/assets/images/logo-text.svg");
        }
      }
    }

    .header-menu {
      width: 100%;

      @media only screen and (min-width: 1080px) {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: flex-end;
      }

      @media only screen and (max-width: 1080px) {
        display: none;
      }

      .header-menu-links {
        display: flex;
        flex-flow: row;
        background: prop.$main-first-transparent-menu-color;
        border-radius: 14.3rem;
        mix-blend-mode: difference;
        padding: 1.4rem 3rem;
        margin: 0;

        .link {
          @include utils.fontStyle($color: prop.$main-second-additional-color);
          border: none;
          background: transparent;
          list-style: none;

          &.link-margin {
            margin-right: 5rem;
          }

          &:hover {
            color: prop.$primary-color;
            cursor: pointer;
          }
        }
      }

      .header-menu-button {
        margin: 0 7rem 0 7rem;
        @media only screen and (max-width: 1080px) {
          display: none;
        }
      }
    }

  }
}
</style>
