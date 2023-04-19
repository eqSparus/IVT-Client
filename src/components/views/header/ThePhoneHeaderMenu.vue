<template>
  <header class="header-container">
    <div class="header-content">
      <div class="header-logo">
        <img src="@/assets/images/logo-text.svg" alt="assets/images/logo-text.svg"/>
      </div>
      <label class="menu-btn" for="show-menu">
        <img :src="menuIcon" alt="assets/images/icons/menu.svg">
      </label>
      <input type="checkbox"
             style="display: none"
             id="show-menu"
             v-model="isCheck"
             @click="toggle">

      <transition name="header">
        <nav class="header-menu" v-if="isCheck">
          <ul class="header-menu-links">
            <li v-for="anchor in anchors" :key="anchor.title"
                class="link-margin link fs-48"
                @click="scroll(anchor.select)"
                @keyup.enter="scroll(anchor.select)">
              {{ anchor.title }}
            </li>
          </ul>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { Anchor } from '@/types/util.types';
import useScroll from '@/hooks/useScroll';
import menuIcon from '@/assets/images/icons/menu.svg';

export default defineComponent({
  name: 'ThePhoneHeaderMenu',
  props: {
    anchors: {
      type: Object as PropType<Array<Anchor>>,
      required: true,
    },
  },
  setup() {
    const isCheck = ref<boolean>(false);
    const { scrollTo } = useScroll();

    const toggle = () => {
      isCheck.value = !isCheck.value;
      if (isCheck.value) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    };

    const scroll = (scrollId: string) => {
      scrollTo(scrollId);
      toggle();
    };

    return {
      isCheck,
      scroll,
      toggle,
      menuIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';
@import '@/assets/scss/extends.scss';

$animation-name: 'header';

.header-container {
  position: fixed;
  width: 100%;
  z-index: 555;

  .header-content {
    background: prop.$main-first-dark-transparent-color;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    position: absolute;
    width: 100%;

    @include utils.animation-to($name: $animation-name) {
      transition: all 0.5s ease-in;
    }

    @include utils.animation-from($name: $animation-name) {
      transform: translateX(20vh);
      opacity: 0;
    }

    .header-logo {
      align-self: center;
      padding: 2rem 0 2rem 2rem;

      img {
        width: 25rem;
      }
    }

    .menu-btn {
      width: 3.5rem;
      height: 3.5rem;
      align-self: center;
      margin-right: 3rem;

      img {
        &:hover {
          cursor: pointer;
          filter: prop.$icon-svg-hover-color;
        }
      }
    }

    .header-menu {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100vh;
      overflow-y: auto;
      @extend %standard-scroll-bar;

      .header-menu-links {
        display: flex;
        flex-flow: column;
        mix-blend-mode: difference;
        padding: 1.3rem 3rem;
        margin: 0;

        .link {
          @include utils.font-style($color: prop.$main-second-additional-color);
          border: none;
          background: transparent;
          list-style: none;
          text-align: center;

          &.link-margin {
            margin-top: 3rem;
          }

          &:hover {
            color: prop.$primary-color;
            cursor: pointer;
          }
        }
      }

      .header-menu-button {
        margin: 0 7rem 0 7rem;
      }
    }
  }
}

</style>
