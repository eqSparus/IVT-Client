<template>
  <app-base-screen title="Партнёры" type-screen="second">

    <the-modal-add-partner :is-show="isShow"
                           @close="toggleModal"/>

    <div class="partners-edit-block" v-if="isAuth">
      <input type="button"
             class="btn-standard"
             @click="toggleModal"
             value="добавить">
    </div>

    <div class="partners-screen-container mt-20">
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
import useTokenAuthentication from '@/hooks/useTokenAuthentication';

export default defineComponent({
  name: 'ThePartnersScreen',
  components: {
    AppPartnerItem,
    TheModalAddPartner,
    AppBaseScreen,
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
      toggleModal,
      isAuth,
      partners: computed(() => store.getters['partner/getPartners']),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utils.scss';

.partners-edit-block {
  margin: 0 auto 2rem auto;
}

.partners-screen-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  row-gap: 5rem;

  @include utils.phone-style {
    display: flex;
    flex-flow: column;
    row-gap: 8rem;
    align-items: center;
    justify-content: center;
  }
}

</style>
