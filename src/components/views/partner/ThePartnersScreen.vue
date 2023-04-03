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
      <a v-for="partner in partners" :key="partner.id"
         :href="partner.href"
         target="_blank">
        <img :src="partner.urlImg" :alt="partner.urlImg">
      </a>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
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
      partners: computed(() => store.getters['partner/getPartners']),
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(33.3%, 1fr));
  justify-items: center;
  row-gap: 50%;
}

</style>
