<template>
  <the-modal-edit-partner :is-show="isShow"
                          :partner="partner"
                          @close="changeShowModal"/>
  <div class="partner-item">
    <a :href="partner.href"
       target="_blank">
      <img :src="partner.urlImg" :alt="partner.urlImg">
    </a>

    <button class="btn-standard-icon ml-10"
            v-if="isAuth"
            @click="changeShowModal">
      <img :src="refreshIcon"
           class="icon-trashcan"
           alt="assets/images/icon/refresh.svg">
    </button>
  </div>
</template>

<script lang="ts">

import { computed, defineComponent, PropType } from 'vue';
import { Partner } from '@/types/SiteContentTypes';
import { useStore } from 'vuex';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import TheModalEditPartner from '@/components/views/partner/modal/TheModalEditPartner.vue';
import useShowModal from '@/hooks/useShowModal';

export default defineComponent({
  name: 'AppPartnerItem',
  components: { TheModalEditPartner },
  props: {
    partner: {
      type: Object as PropType<Partner>,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    const {
      isShow,
      changeShowModal,
    } = useShowModal();

    return {
      isShow,
      isAuth: computed(() => store.getters['auth/isAuth']),
      changeShowModal,
      refreshIcon,
    };
  },
});
</script>

<style lang="scss" scoped>

.partner-item {
  display: flex;
  flex-flow: row;
  align-items: center;

  button {
    width: 4rem;
    height: 4rem;
  }
}

</style>
