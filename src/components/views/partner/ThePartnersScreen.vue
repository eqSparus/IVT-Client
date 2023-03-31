<template>
  <app-base-screen title="Партнёры" :is-second="true">

    <the-modal-edit-partner :is-show="isShow"
                            @close="changeShowModal"/>

    <div class="partners-change" v-if="isAuth">
      <input type="button"
             class="btn-standard"
             @click="changeShowModal"
             value="редактировать">
    </div>

    <div class="partners-container mt-20">
      <img :src="iss" alt="assets/images/partners/coreDataNet.png">
      <img :src="zigma" alt="assets/images/partners/iss.png">
      <img :src="coreDataNew" alt="assets/images/partners/zigma.png">
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
import coreDataNew from '@/assets/images/partners/coreDataNet.png';
import iss from '@/assets/images/partners/iss.png';
import zigma from '@/assets/images/partners/zigma.png';
import TheModalEditPartner from '@/components/views/partner/modal/TheModalEditPartner.vue';
import useShowModal from '@/hooks/useShowModal';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ThePartnersScreen',
  components: {
    TheModalEditPartner,
    AppBaseScreen,
  },
  setup() {
    const store = useStore();
    const {
      isShow,
      changeShowModal,
    } = useShowModal();

    return {
      isShow,
      changeShowModal,
      isAuth: computed(() => store.getters['auth/isAuth']),
      coreDataNew,
      iss,
      zigma,
    };
  },
});
</script>

<style lang="scss" scoped>

.partners-change {
  display: flex;
  justify-content: center;
}

.partners-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

</style>
