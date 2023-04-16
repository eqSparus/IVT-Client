<template>
  <app-base-screen title="Партнёры" type-screen="second">

    <the-modal-add-partner :is-show="isShow"
                           @close="toggleModal"/>

    <div class="partners-change" v-if="isAuth">
      <input type="button"
             class="btn-standard"
             @click="toggleModal"
             value="добавить">
    </div>

    <div class="partners-container mt-20">
      <app-partner-item v-for="partner in partners" :key="partner.id"
                        :partner="partner"/>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
import TheModalAddPartner from '@/components/views/partner/modal/TheModalAddPartner.vue';
import useShowModal from '@/hooks/useShowModal';
import { useStore } from 'vuex';
import AppPartnerItem from '@/components/views/partner/item/AppPartnerItem.vue';

export default defineComponent({
  name: 'ThePartnersScreen',
  components: {
    AppPartnerItem,
    TheModalAddPartner,
    AppBaseScreen,
  },
  setup() {
    const store = useStore();
    const {
      isShow,
      toggleModal,
    } = useShowModal();

    return {
      isShow,
      toggleModal,
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  row-gap: 50%;
}

</style>
