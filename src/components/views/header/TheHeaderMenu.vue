<template>
  <header class="header"
          @mouseover="isShowMenu = true"
          @mouseleave="isShowMenu = false"
          @focus="isShowMenu = true"
          tabindex="0"
          @blur="isShowMenu = false">

    <the-modal-authorization :is-show="isShowModalWindow"
                             @close="toggleModal"/>

    <the-modal-setting-site :is-show="isShowSettingSite"
                            @close="changeShowSettingSite"/>

    <transition name="header">

      <div class="header-content" v-show="isShowMenu">

        <div class="header-logo">
          <img src="@/assets/images/logo.svg" alt="assets/images/logo.svg"/>
        </div>

        <nav class="header-menu">

          <ul class="header-menu-links">
            <li v-for="(anchor, index) in anchors" :key="anchor.title"
                :class="[{'margin-link': index !== anchors.length - 1},'link', 'fs-24']"
                @click="scrollTo(anchor.select)"
                tabindex="0"
                @focus="isShowMenu = true"
                @blur="isShowMenu = false"
                @keyup.enter="scrollTo(anchor.select)">
              {{ anchor.title }}
            </li>
          </ul>

          <img @click="changeShowSettingSite"
               @keyup.enter="changeShowSettingSite"
               :src="eyeIcon"
               @focus="isShowMenu = true"
               @blur="isShowMenu = false"
               tabindex="0"
               alt="/assets/images/icon/eye.svg">

          <div class="header-menu-button">
            <input type="button"
                   :value="textBtn"
                   @focus="isShowMenu = true"
                   @blur="isShowMenu = false"
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
import { Anchor } from '@/types/utilTypes';
import TheModalSettingSite from '@/components/views/header/modal/TheModalSettingSite.vue';
import eyeIcon from '@/assets/images/icons/eye.svg';

export default defineComponent({
  components: {
    TheModalSettingSite,
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
    const isShowMenu = ref<boolean>(false);
    const { scrollTo } = useScroll();

    const {
      isShow: isShowModalWindow,
      toggleModal,
    } = useShowModal();

    const {
      isShow: isShowSettingSite,
      toggleModal: changeShowSettingSite,
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
        toggleModal();
      }
    };

    return {
      isShowMenu,
      isShowModalWindow,
      isShowSettingSite,
      changeShowSettingSite,
      toggleModal,
      scrollTo,
      eventLoginOrLogout,
      textBtn: computed(() => (store.getters['auth/isAuth'] ? 'выйти' : 'войти')),
      eyeIcon,
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

  &:focus {
    outline: none;
  }

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

    .header-logo {
      align-self: center;
      margin-left: 6rem;

      img {
        width: 4.1rem;
        height: 4.1rem;
      }
    }

    .header-menu {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: flex-end;
      width: 100%;

      .header-menu-links {
        display: flex;
        flex-flow: row;
        align-items: center;
        background: prop.$main-first-transparent-menu-color;
        border-radius: 14.3rem;
        mix-blend-mode: difference;
        padding: 1.4rem 3rem;
        list-style: none;

        .link {
          @include utils.fontStyle($color: prop.$main-second-additional-color);
          border: none;
          background: transparent;

          &.margin-link {
            margin-right: 5rem;
          }

          &:focus {
            color: prop.$primary-color;
            outline: none;
          }

          &:hover {
            color: prop.$primary-color;
            cursor: pointer;
          }
        }
      }

      img {
        width: 3.5rem;
        height: 3.5rem;
        margin: 0 3.5rem 0 3.5rem;

        &:hover {
          cursor: pointer;
          filter: prop.$icon-svg-hover-color-info;
        }

        &:focus {
          outline: none;
          filter: prop.$icon-svg-hover-color-info;
        }
      }

      .header-menu-button {
        margin-right: 5rem;
      }
    }

  }
}
</style>
