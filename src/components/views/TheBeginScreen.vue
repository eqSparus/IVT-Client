<template>
  <section class="begin-screen">

    <the-modal-change-department
      :is-show="isShowDepartment"
      @close="changeShowModalDepartment"
      :department="department"
      :links="links"/>

    <the-modal-setting-account :is-show="isShowAccount" @close="changeShowModalAccount"/>

    <div class="begin-screen-block-left">

      <div>
        <h1 class="fs-64"> {{ title }} </h1>
        <h3 class="fs-32"> {{ slogan }} </h3>
      </div>

      <div class="begin-screen-button">
        <input type="button" value="УЗНАТЬ БОЛЬШЕ" class="btn-standard" @click="scrollToScreen"/>
        <input v-if="isAuth" type="button" value="РЕДАКТИРОВАТЬ" class="btn-standard"
               @click="changeShowModalDepartment"/>
        <input v-if="isAuth" type="button" value="НАСТРОЙКИ" class="btn-standard" @click="changeShowModalAccount"/>
      </div>

      <div class="begin-screen-links">
        <app-link-icon v-for="link in links" :key="link.id"
                       :href="link.href"
                       :icon="link.icon"
                       :alt="`Иконка ${link.icon}`"/>
      </div>
    </div>

    <div class="begin-screen-block-right">
      <!-- TODO Скорректировать размеры, подумать над заменой на <svg> -->
      <img src="@/assets/images/logo.svg" alt="Большой логотип кафедры"/>
    </div>

  </section>
</template>

<script lang="ts">

import {
  computed, defineComponent,
} from 'vue';
import AppLinkIcon from '@/components/UI/AppLinkIcon.vue';
import useScroll from '@/hooks/useScroll';
import { useStore } from 'vuex';
import useShowModal from '@/hooks/useShowModal';
import TheModalChangeDepartment from '@/components/modals/departmnet/TheModalChangeDepartment.vue';
import TheModalSettingAccount from '@/components/modals/user/TheModalSettingAccount.vue';

export default defineComponent(
  {
    components: {
      TheModalSettingAccount,
      TheModalChangeDepartment,
      AppLinkIcon,
    },
    icon: 'TheBeginScreen',
    props: {
      scrollSelect: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();
      const { scrollTo } = useScroll();

      const {
        isShow: isShowDepartment,
        changeShowModal: changeShowModalDepartment,
      } = useShowModal();

      const {
        isShow: isShowAccount,
        changeShowModal: changeShowModalAccount,
      } = useShowModal();

      const scrollToScreen = () => {
        scrollTo(props.scrollSelect);
      };

      return {
        isAuth: computed(() => store.getters['auth/isAuth']),
        isShowDepartment,
        isShowAccount,
        scrollToScreen,
        changeShowModalDepartment,
        changeShowModalAccount,
        department: computed(() => store.getters['department/getDepartment']),
        title: computed(() => store.getters['department/getDepartment'].title),
        slogan: computed(() => store.getters['department/getDepartment'].slogan),
        links: computed(() => store.getters['siteLinks/getLinks']),
      };
    },
  },
);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.begin-screen {
  background: prop.$begin-screen-background-color;
  width: 100vw;
  height: 100%;
  padding: 15% 10%;

  // display: grid;
  // grid-template-columns: 1.5fr 1fr;
  display: flex;
  flex-flow: row;
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
