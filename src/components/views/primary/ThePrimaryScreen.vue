<template>
  <section class="begin-screen">

    <the-modal-edit-department :is-show="isShowDepartment"
                               @close="changeShowModalDepartment"
                               :department="department"
                               :links="links"/>

    <the-modal-setting-account :is-show="isShowAccount"
                               @close="changeShowModalAccount"/>

    <div class="begin-screen-block-left">

      <h1 class="title fs-64"> {{ department.title }} </h1>
      <h3 class="slogan fs-32"> {{ department.slogan }} </h3>

      <div class="begin-screen-button">
        <input type="button"
               value="узнать больше"
               class="btn-standard"
               @click="scrollTo(scrollSelect)"/>
        <input v-if="isAuth"
               type="button"
               value="редактировать"
               class="btn-standard"
               @click="changeShowModalDepartment"/>
        <input v-if="isAuth"
               type="button"
               value="настройки пользователя"
               class="btn-standard"
               @click="changeShowModalAccount"/>
      </div>

      <div class="begin-screen-links">
        <app-link-icon v-for="link in links" :key="link.id"
                       :href="link.href"
                       class="link-site"
                       :icon="link.icon"
                       :alt="link.icon"/>
      </div>
    </div>

    <div class="begin-screen-block-right">
      <div class="img-background"></div>
      <img class="img-logo"
           src="@/assets/images/logo.svg"
           alt="/assets/images/logo.svg"/>
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
import TheModalEditDepartment from '@/components/views/primary/modal/TheModalEditDepartment.vue';
import TheModalSettingAccount from '@/components/views/primary/modal/TheModalSettingAccount.vue';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';

export default defineComponent(
  {
    components: {
      TheModalSettingAccount,
      TheModalEditDepartment,
      AppLinkIcon,
    },
    icon: 'ThePrimaryScreen',
    props: {
      scrollSelect: {
        type: String,
        required: true,
      },
    },
    setup() {
      const { isAuth } = useTokenAuthentication();
      const store = useStore();
      const { scrollTo } = useScroll();

      const {
        isShow: isShowDepartment,
        toggleModal: changeShowModalDepartment,
      } = useShowModal();

      const {
        isShow: isShowAccount,
        toggleModal: changeShowModalAccount,
      } = useShowModal();

      return {
        isShowDepartment,
        isShowAccount,
        scrollTo,
        changeShowModalDepartment,
        changeShowModalAccount,
        isAuth,
        department: computed(() => store.getters['department/getDepartment']),
        links: computed(() => store.getters['siteLinks/getLinks']),
      };
    },
  },
);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';

.begin-screen {
  background: prop.$main-first-color;
  width: 100vw;
  padding: 15% 10%;
  display: flex;
  flex-flow: row;

  .begin-screen-block-left {
    margin-top: 10rem;
    flex: 2;

    .begin-screen-button {
      margin-top: 4.8rem;
      display: flex;
      flex-flow: row wrap;
      gap: 2rem;
    }

    .begin-screen-links {
      margin-top: 6.4rem;

      .link-site {
        margin-right: 2rem;
      }
    }

    .title {
      @include utils.font-style($color: prop.$main-second-color, $weight: 700);
      user-select: none;
    }

    .slogan {
      @include utils.font-style($weight: 300, $color: prop.$main-second-additional-color);
      user-select: none;
      margin-top: 4rem;
    }
  }

  .begin-screen-block-right {
    align-self: center;
    flex: 1;

    .img-background {
      filter: blur(6.55rem);
      background: adjust-color($color: prop.$primary-color, $alpha: -0.8);
    }

    .img-logo {
      height: auto;
      width: 45vw;
      max-width: 45rem;
    }
  }

  @include utils.phone-style {
    padding-top: 30%;
    flex-flow: column;

    .begin-screen-block-left {
      margin-top: 10rem;
      order: 2;
      display: flex;
      flex-flow: column;
      align-items: center;
      text-align: center;

      .title {
        display: none;
      }

      .link-site {
        display: none;
      }

      .begin-screen-button {
        .btn-setting {
          margin-top: 2rem;
          margin-right: 0;
        }
      }
    }

    .begin-screen-block-right {
      order: 1;

      .img-background {
        position: absolute;
        width: 45vw;
        height: 45vw;
      }

      .img-logo {
        transform: perspective(35rem) rotateY(-10deg) rotateX(10deg) rotateZ(3deg);
      }
    }
  }

}
</style>
