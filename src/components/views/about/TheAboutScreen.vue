<template>
  <app-base-screen title="О кафедре"
                   type-screen="second">

    <the-modal-edit-about :abouts="abouts"
                          :is-show="isShow"
                          @close="toggleModal"/>

    <div class="screen-editing-block" v-if="isAuth">
      <input type="button"
             class="btn-standard"
             value="редактировать"
             @click="toggleModal"/>
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
import useTokenAuthentication from '@/hooks/useTokenAuthentication';

export default defineComponent({
  icon: 'TheAboutScreen',
  components: {
    TheModalEditAbout,
    AppBaseScreen,
    AppAboutScreenItem,
  },
  setup() {
    const { isAuth } = useTokenAuthentication();
    const store = useStore();

    const {
      isShow,
      toggleModal,
    } = useShowModal();

    return {
      isShow,
      abouts: computed(() => store.getters['about/getAboutInfo']),
      isAuth,
      toggleModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utils.scss';

.screen-editing-block {
  margin: 0 auto 2rem auto;
}

.about-screen-container {
  display: flex;
  flex-flow: row;
  justify-content: center;
  column-gap: 5%;
}

@include utils.phone-style {
  .about-screen-container {
    flex-flow: column;
    align-items: center;
    row-gap: 8rem;
  }
}
</style>
