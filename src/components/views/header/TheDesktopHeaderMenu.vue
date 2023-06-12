<template>
  <header class="header-container"
          @mouseleave="isShowMenu = false"
          @blur="isShowMenu = false"
          @focus="isShowMenu = true"
          tabindex="0">

    <the-modal-authorization :is-show="isShowModalWindow"
                             @close="toggleModal"/>

    <the-modal-setting-site :is-show="isShowSettingSite"
                            @close="changeShowSettingSite"/>

    <transition name="header">

      <div class="header-content" v-show="isShowMenu">

        <div class="header-logo">
          <img class="logo" src="@/assets/images/logo.svg" alt="assets/images/logo.svg"/>
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
               class="setting-site"
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
      <div class="hint-container"
           @mouseover="isShowMenu = true"
           @focus="isShowMenu = true"
           v-show="!isShowMenu">
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
import TheModalAuthorization from '@/components/views/header/modal/TheModalAuthorization.vue';
import { requestExit } from '@/http/user/HttpAdmin';
import { Anchor } from '@/types/util.types';
import TheModalSettingSite from '@/components/views/header/modal/TheModalSettingSite.vue';
import eyeIcon from '@/assets/images/icons/eye.svg';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';

export default defineComponent({
  components: {
    TheModalSettingSite,
    TheModalAuthorization,
  },
  icon: 'TheDesktopHeaderMenu',
  props: {
    anchors: {
      type: Object as PropType<Array<Anchor>>,
      required: true,
    },
  },
  setup() {
    const {
      isAuth,
      logout,
    } = useTokenAuthentication();
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
      if (isAuth.value) {
        await requestExit();
        logout();
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
      textBtn: computed(() => (isAuth.value ? 'выйти' : 'войти')),
      eyeIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';

$animation-name-menu: 'header';
$animation-name-hint: 'hint';

.header-container {
  position: fixed;
  height: 3rem;
  width: 100%;
  z-index: 555;

  &:focus {
    outline: none;
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

      .logo {
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
          @include utils.font-style($color: prop.$main-second-additional-color);
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

      .setting-site {
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

  .hint-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 4rem;

    &:focus {
      outline: none;
    }

    .hint-block {
      padding: 0.3rem;
      width: 10%;
      height: 0.3rem;
      border-radius: 0 0 1rem 1rem;
      background: prop.$primary-color;
      border: 0.1rem solid prop.$primary-color;
    }
  }
}

@include utils.animation-to($name: $animation-name-menu) {
  transition: all 0.5s ease-in;
}

@include utils.animation-from($name: $animation-name-menu) {
  transform: translateY(-6rem);
  opacity: 0;
}

@include utils.animation-to($name: $animation-name-hint) {
  transition: all 0.3s ease-in;
}

@include utils.animation-from($name: $animation-name-hint) {
  transform: translateY(-3rem);
  opacity: 0;
}

</style>
