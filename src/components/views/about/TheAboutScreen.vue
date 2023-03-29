<template>
  <app-base-screen title="О кафедре" :is-second="true">

    <the-modal-edit-about :abouts="abouts"
                            :is-show="isShow"
                            @close="changeShowModal"/>

    <div class="about-change mb-20" v-if="isAuth">
      <input type="button"
             class="btn-standard"
             value="редактировать"
             @click="changeShowModal"/>
    </div>

    <div class="about-screen-container">
      <app-about-screen-item v-for="about in abouts" :key="about.id"
                             :about-info="about"/>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
import AppAboutScreenItem from '@/components/views/about/item/AppAboutScreenItem.vue';
import { useStore } from 'vuex';
import TheModalEditAbout from '@/components/views/about/modal/TheModalEditAbout.vue';
import useShowModal from '@/hooks/useShowModal';

export default defineComponent({
  icon: 'TheAboutScreen',
  components: {
    TheModalEditAbout,
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
      isShow,
      abouts: computed(() => store.getters['about/getAboutInfo']),
      isAuth: computed(() => store.getters['auth/isAuth']),
      changeShowModal,
    };
  },
});
</script>

<style lang="scss" scoped>

.about-change{
  display: flex;
  justify-content: center;
}

.about-screen-container {
  display: flex;
  flex-flow: row;
  justify-content: center;
  gap: 5%;
}
</style>
