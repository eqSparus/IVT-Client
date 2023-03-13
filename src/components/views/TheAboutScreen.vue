<template>
  <app-base-screen title="О кафедре" :is-second="true">

    <the-modal-change-about :abouts="abouts" :is-show="isShow" @close="changeShowModal"/>

    <div class="about-screen-container">
      <app-about-screen-item v-for="(about) in abouts" :key="about.id" :about-info="about"
                             :icon-index="about.order - 1"/>
      <div class="about-change mt-20" v-if="isAuth">
        <input type="button" class="btn-standard" value="РЕДАКТИРОВАТЬ" @click="changeShowModal"/>
      </div>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
import AppAboutScreenItem from '@/components/views/items/AppAboutScreenItem.vue';
import { useStore } from 'vuex';
import TheModalChangeAbout from '@/components/modals/about/TheModalChangeAbout.vue';
import useShowModal from '@/hooks/useShowModal';

export default defineComponent({
  icon: 'TheAboutScreen',
  components: {
    TheModalChangeAbout,
    AppBaseScreen,
    AppAboutScreenItem,
  },
  setup() {
    const store = useStore();

    const {
      isShow,
      changeShowModal,
    } = useShowModal();

    return {
      abouts: computed(() => store.getters['about/getAboutInfo']),
      isAuth: computed(() => store.getters['auth/isAuth']),
      isShow,
      changeShowModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.about-screen-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;

  .about-change {
    grid-column: 1/4;
  }
}
</style>
