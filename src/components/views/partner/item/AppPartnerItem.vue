<template>
  <the-modal-edit-partner :is-show="isShow"
                          :partner="partner"
                          @close="toggleModal"/>
  <div class="partner-item">
    <a :href="partner.href"
       target="_blank">
      <img :src="partner.urlImg" :alt="partner.urlImg">
    </a>

    <button class="btn-standard-icon ml-10"
            v-if="isAuth"
            @click="toggleModal">
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
      toggleModal,
    } = useShowModal();

    return {
      isShow,
      isAuth: computed(() => store.getters['auth/isAuth']),
      toggleModal,
      refreshIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

.partner-item {
  display: flex;
  flex-flow: row;
  align-items: center;

  a {
    img {
      width: 30rem;
    }
    &:focus{
      outline: none;
      border-bottom: 0.2rem solid prop.$primary-color;
    }
  }

  button {
    width: 4rem;
    height: 4rem;
  }
}

</style>
